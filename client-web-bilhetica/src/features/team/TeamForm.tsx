import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../api/agent";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
    removeCreateMode,
    removeEditMode,
    setAdminMenuDisplay,
} from "../menu/menuSlice";
import { changeTeamMemberLoadedState } from "./teamSlice";

interface TeamMember {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    address: string;
    phoneNumber: string;
    imageId: string;
}

const TeamForm = () => {
    const dispatch = useAppDispatch();
    const { isEditMode, isCreateMode } = useAppSelector(
        (state) => state.adminMenu
    );
    const [logoImage, setLogoImage] = useState<File | null>();
    const [preview, setPreview] = useState<string | null>();
    const [teamMember, setTeamMember] = useState<TeamMember>();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    const onSubmit = async (data: FieldValues) => {
        let formData = new FormData();

        formData.append("Firstname", data.Firstname);
        formData.append("Lastname", data.Lastname);
        formData.append("UserName", data.UserName);
        formData.append("Role", data.Role);
        formData.append("Address", data.Address);
        formData.append("PhoneNumber", data.PhoneNumber);
        formData.append("ImageFile", data.ImageFile[0]);

        if (isCreateMode) {
            console.log(Array.from(formData.entries()));
            agent.Team.CreateTeamMember(formData)
                .then(() => {
                    dispatch(changeTeamMemberLoadedState(false));
                    dispatch(setAdminMenuDisplay("teamsettings"));
                })
                .catch((error) => console.log(error));
        }

        if (isEditMode) {
            agent.Team.updateTeamMember(formData).then(() => {
                dispatch(changeTeamMemberLoadedState(false));
                dispatch(setAdminMenuDisplay("teamsettings"));
            });
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const { id } = JSON.parse(
                localStorage.getItem("idToFetchAndEdit")!
            );

            if (id !== null) {
                agent.Team.details(id).then((result) => {
                    console.log(result.firstName);
                    setTeamMember(result);
                });
            }
        }
        return () => {
            if (isEditMode) dispatch(removeEditMode(false));
            if (isCreateMode) dispatch(removeCreateMode(false));
            if (localStorage.getItem("idToFetchAndEdit") !== null) {
                localStorage.removeItem("idToFetchAndEdit");
            }
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

    useEffect(() => {
        setValue("Firstname", teamMember?.firstName);
        setValue("Lastname", teamMember?.lastName);
        setValue("UserName", teamMember?.userName);
        setValue("Address", teamMember?.address);
        setValue("PhoneNumber", teamMember?.phoneNumber);
    }, [teamMember]);

    const handleLogoImageSelect = (file: FileList) => {
        const logoImage = file[0];

        if (logoImage && logoImage.type.substring(0, 5) === "image") {
            setLogoImage(logoImage);
        } else {
            setLogoImage(null);
        }
    };

    return (
        <AdminPanelContent>
            <div className='box is-shadowless is-size-6 is-uppercase has-text-weight-medium'>
                {isEditMode ? "Edit" : "Add"} {"Team Member"}
            </div>
            <div className='mb-5 is-flex is-justify-content-right'>
                <button
                    onClick={() => {
                        dispatch(setAdminMenuDisplay("teamsettings"));

                        // if (isEditChanged)
                        //     dispatch(editFlightCompanyChangeState(false));
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
                            <label className='label'>First Name</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='First Name'
                                    {...register("Firstname", {
                                        required: "first name is required",
                                    })}
                                />
                            </div>

                            {errors.Firstname && (
                                <span className='help has-text-danger'>
                                    {`${errors?.Firstname?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>Last Name</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Last Name'
                                    {...register("Lastname", {
                                        required: "last name is required",
                                    })}
                                />
                            </div>

                            {errors.Lastname && (
                                <span className='help has-text-danger'>
                                    {`${errors?.Lastname?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>Email</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Email'
                                    {...register("UserName", {
                                        required: "email is required",
                                    })}
                                />
                            </div>

                            {errors.UserName && (
                                <span className='help has-text-danger'>
                                    {`${errors?.UserName?.message}`}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* END COLUMN 1*/}

                    {/* START COLUMN 2*/}
                    <div className='column'>
                        <div className='field'>
                            <label className='label'>Role</label>
                            <div className='control'>
                                <input
                                    readOnly
                                    className='input'
                                    type='text'
                                    value='TeamMember'
                                    {...register("Role")}
                                />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Address</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Address'
                                    {...register("Address", {
                                        required: "address is required",
                                    })}
                                />
                            </div>
                        </div>
                        {errors.Address && (
                            <span className='help has-text-danger'>
                                {`${errors?.Address?.message}`}
                            </span>
                        )}
                        <div className='field'>
                            <label className='label'>Phone Number</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Phone Number'
                                    {...register("PhoneNumber", {
                                        required: "phone number is required",
                                    })}
                                />
                            </div>
                        </div>
                        {errors.PhoneNumber && (
                            <span className='help has-text-danger'>
                                {`${errors?.PhoneNumber?.message}`}
                            </span>
                        )}
                    </div>
                </div>
                {/* END COLUMN 2*/}

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

export default TeamForm;
