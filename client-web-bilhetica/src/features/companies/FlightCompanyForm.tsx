import { useEffect, useState } from "react";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { FieldValues, useForm } from "react-hook-form";
import { getWindowSize } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudArrowUp,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
    removeDataToEditFromLocalStorage,
    removeEditMode,
    removeCreateMode,
    setAdminMenuDisplay,
} from "../../features/menu/menuSlice";
import {
    setFlightCompanyToEdit,
    editFlightCompanyChangeState,
    createFlightCompanyAsync,
    updateFlightCompanyAsync,
} from "../companies/companySlice";

import "./companies.scss";
import { FlightCompany } from "../../app/models/flightCompany";
import agent from "../../api/agent";

const FlightCompanyForm = () => {
    const dispatch = useAppDispatch();

    const { isEditMode, isCreateMode } = useAppSelector(
        (state) => state.adminMenu
    );

    const { isEditChanged } = useAppSelector((state) => state.flightComapny);

    const [logoImage, setLogoImage] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>();
    const [regions, setRegions] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    useEffect(() => {
        agent.FlightCompany.listOptions()
            .then((options) => {
                setRegions(options.regions);
                setCountries(options.countries);
            })
            .catch((error) => console.log(error));

        if (isEditMode) {
            const editData: FlightCompany = JSON.parse(
                localStorage.getItem("dataToEdit")!
            );

            if (editData !== null) {
                setValue("id", editData.id);
                setValue("CompanyName", editData.companyName);

                setValue("Region", editData.region);

                setValue("Country", editData.country);

                setValue("IataDesignator", editData.iataDesignator);
                setValue("ICAOCode", editData.icaoCode);
            }
        }

        return () => {
            if (isEditMode) dispatch(removeEditMode(false));
            if (isCreateMode) dispatch(removeCreateMode(false));
            dispatch(removeDataToEditFromLocalStorage());
        };
    }, []);

    useEffect(() => {
        if (logoImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(logoImage);
            console.log(logoImage);
        } else {
            setPreview(null);
        }
    }, [logoImage]);

    const handleLogoImageSelect = (file: FileList) => {
        const logoImage = file[0];

        if (logoImage && logoImage.type.substring(0, 5) === "image") {
            setLogoImage(logoImage);
        } else {
            setLogoImage(null);
        }
    };

    const handleApiErrors = (errors: any) => {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("Region")) {
                    setError("Region", { message: error });
                } else if (error.includes("Country")) {
                    setError("Country", { message: error });
                } else if (error.includes("ICAOCode")) {
                    setError("ICAOCode", { message: error });
                } else if (error.includes("CompanyName")) {
                    setError("CompanyName", { message: error });
                } else if (error.includes("IataDesignator")) {
                    setError("IataDesignator", { message: error });
                }
            });
        }
    };

    const onSubmit = async (data: FieldValues) => {
        // ATENÇÃO VERIFICAR isCreateMode se altera o estado quando criar ou
        // quando é feito reload na página
        let formData = new FormData();

        formData.append("CompanyName", data.CompanyName);
        formData.append("IataDesignator", data.IataDesignator);
        formData.append("ICAOCode", data.ICAOCode);
        formData.append("Country", data.Country);
        formData.append("Region", data.Region);
        formData.append("ImageFile", data.ImageFile[0]);

        console.log(data.ImageFile[0]);
        if (isCreateMode) {
            dispatch(createFlightCompanyAsync(formData))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("flightcompanies"));
                })
                .catch((error: any) => handleApiErrors(error));
        }

        if (isEditMode) {
            formData.append("id", data.id);

            dispatch(updateFlightCompanyAsync(formData))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("flightcompanies"));
                })
                .catch((error: any) => handleApiErrors(error));
        }
    };

    return (
        <AdminPanelContent>
            <div className='box is-shadowless is-size-6 is-uppercase has-text-weight-medium'>
                {isEditMode ? "Edit" : "Add"} {"Flight Company"}
            </div>
            <div className='mb-5 is-flex is-justify-content-right'>
                <button
                    onClick={() => {
                        dispatch(setAdminMenuDisplay("flightcompanies"));

                        if (isEditChanged)
                            dispatch(editFlightCompanyChangeState(false));

                        dispatch(
                            setFlightCompanyToEdit({
                                id: 0,
                                companyName: "",
                                country: "",
                                region: "",
                                imageId: "",
                                createdDate: "",
                                icaoCode: "",
                                iataDesignator: "",
                            })
                        );
                    }}
                    className='button is-link is-outlined is-small '
                    type='button'>
                    <span className='icon'>
                        <i className='mdi mdi-arrow-left'></i>
                    </span>
                    <span>Back</span>
                </button>
            </div>

            {/*INIT FORM*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {isEditMode && <input type='hidden' {...register("id")} />}
                <figure className='mb-6 circle'>
                    {preview ? (
                        <img src={preview} />
                    ) : (
                        <img src='/logo-default.svg' />
                    )}
                </figure>
                <div className='columns'>
                    <div className='column is-half'>
                        <div
                            className={`file is-small has-name is-boxed is-fullwidth ${
                                logoImage ? "is-success" : "is-danger"
                            }`}>
                            <label className='file-label'>
                                <input
                                    {...register("ImageFile")}
                                    className='file-input'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) =>
                                        handleLogoImageSelect(e.target.files!)
                                    }
                                />
                                <span className='file-cta'>
                                    <span className='file-icon'>
                                        <FontAwesomeIcon
                                            icon={faCloudArrowUp}
                                        />
                                    </span>

                                    {logoImage ? (
                                        <span className='file-label has-text-centered'>
                                            Company Logo is selected
                                        </span>
                                    ) : (
                                        <span className='file-label has-text-centered'>
                                            Select Company Logo
                                        </span>
                                    )}
                                </span>
                                <span className='file-name'>
                                    {logoImage ? (
                                        <span className='help'>
                                            {`${logoImage?.name}`}
                                        </span>
                                    ) : (
                                        <span className='help'>
                                            {"no image selected..."}
                                        </span>
                                    )}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='columns'>
                    {/* START COLUMN 1*/}
                    <div className='column'>
                        <div className='field'>
                            <label className='label'>Company Name</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Company Name'
                                    {...register("CompanyName", {
                                        required: "company name is required",
                                    })}
                                />
                            </div>

                            {errors.CompanyName && (
                                <span className='help has-text-danger'>
                                    {`${errors?.CompanyName?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>Iata Type Code</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Iata Type Code'
                                    {...register("IataDesignator", {
                                        required:
                                            "iata type code name is required",
                                    })}
                                />
                            </div>

                            {errors.IataDesignator && (
                                <span className='help has-text-danger'>
                                    {`${errors?.IataDesignator?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>ICAO Code</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Icao Code'
                                    {...register("ICAOCode", {
                                        required: "icao code is required",
                                    })}
                                />
                            </div>

                            {errors.ICAOCode && (
                                <span className='help has-text-danger'>
                                    {`${errors?.ICAOCode?.message}`}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* END COLUMN 1*/}

                    {/* START COLUMN 2*/}
                    <div className='column'>
                        <div className='field'>
                            <label className='label'>Country</label>
                            <div className='control has-icons-left'>
                                <div className='select is-fullwidth'>
                                    <select
                                        {...register("Country", {
                                            required: "country is required",
                                        })}>
                                        <option value=''>
                                            -- Select Country --
                                        </option>
                                        {countries.length > 0 &&
                                            countries.map(
                                                (country: any, index: any) => (
                                                    <option
                                                        key={index}
                                                        value={country.country}>
                                                        {country.country}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                                <span className='icon is-left'>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                            </div>
                            {errors.Country && (
                                <span className='help has-text-danger'>
                                    {`${errors?.Country?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>Region</label>
                            <div className='control has-icons-left'>
                                <div className='select is-fullwidth'>
                                    <select
                                        {...register("Region", {
                                            required: "region is required",
                                        })}>
                                        <option value=''>
                                            -- Select Region --
                                        </option>
                                        {regions.length > 0 &&
                                            regions.map(
                                                (region: any, index: any) => (
                                                    <option
                                                        key={index}
                                                        value={region.regions}>
                                                        {region.region}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                                <span className='icon is-left'>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                            </div>
                            {errors.Region && (
                                <span className='help has-text-danger'>
                                    {`${errors?.Region?.message}`}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* END COLUMN 2*/}
                </div>
                <div className='control mt-5'>
                    <button
                        type='submit'
                        className='button  is-primary is-fullwidth'>
                        {isEditMode ? "Edit" : "Add"}
                    </button>
                </div>
            </form>
            {/*INIT FORM*/}
        </AdminPanelContent>
    );
};

export default FlightCompanyForm;
