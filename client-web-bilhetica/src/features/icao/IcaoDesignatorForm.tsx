import { FieldValues, useForm } from "react-hook-form";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import {
    editIcaoChangeState,
    setIcaoToEdit,
    updateIcaoAsync,
    createIcaoAsync,
} from "./icaoSlice";
import {
    removeDataToEditFromLocalStorage,
    removeEditMode,
    removeCreateMode,
    setAdminMenuDisplay,
} from "../../features/menu/menuSlice";
import LoadingComponent from "../../components/LoadingComponent";
import { IcaoDesignator } from "../../app/models/icaoDesignator";

const IcaoDesignatorForm = () => {
    const { isEditChanged, isIcaoUpdating } = useAppSelector(
        (state) => state.icao
    );
    const { isEditMode, isCreateMode } = useAppSelector(
        (state) => state.adminMenu
    );
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEditMode) {
            const editData: IcaoDesignator = JSON.parse(
                localStorage.getItem("dataToEdit")!
            );

            setValue("id", editData.id);
            setValue("model", editData.model);
            setValue("iatatypecode", editData.iataTypeCode);
            setValue("icaocode", editData.icaoCode);
        }

        return () => {
            if (isEditMode) dispatch(removeEditMode(false));
            if (isCreateMode) dispatch(removeCreateMode(false));
            dispatch(removeDataToEditFromLocalStorage());
        };
    }, []);

    const onSubmit = async (data: FieldValues) => {
        if (isCreateMode) {
            dispatch(createIcaoAsync(data))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("icaodesignators"));
                })
                .catch((error: any) => handleApiErrors(error));
        }

        if (isEditMode) {
            console.log(data);
            dispatch(updateIcaoAsync(data))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("icaodesignators"));
                })
                .catch((error: any) => handleApiErrors(error));
        }
    };

    const handleApiErrors = (errors: any) => {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("ICAOCode")) {
                    setError("icaocode", { message: error });
                } else if (error.includes("IATATypeCode")) {
                    setError("iatatypecode", { message: error });
                } else if (error.includes("Model")) {
                    setError("model", { message: error });
                }
            });
        }
    };

    return (
        <AdminPanelContent>
            <div className='box is-shadowless is-size-6 is-uppercase has-text-weight-medium'>
                {isEditMode ? "Edit" : "Add"} {"ICAO Designator"}
            </div>
            <div className='columns is-centered'>
                <div className='column is-half is-mobile'>
                    <div className='mb-5 is-flex is-justify-content-right'>
                        <button
                            onClick={() => {
                                dispatch(
                                    setAdminMenuDisplay("icaodesignators")
                                );
                                if (isEditChanged)
                                    dispatch(editIcaoChangeState(false));

                                dispatch(
                                    setIcaoToEdit({
                                        Id: 0,
                                        Model: "",
                                        IataTypeCode: "",
                                        IcaoCode: "",
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
                        {isEditMode && (
                            <input type='hidden' {...register("id")} />
                        )}
                        <div className='field'>
                            <label className='label'>Model</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Model'
                                    {...register("model", {
                                        required: "model is required",
                                    })}
                                />
                            </div>

                            {errors.model && (
                                <span className='help has-text-danger'>
                                    {`${errors?.model?.message}`}
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
                                    {...register("iatatypecode", {
                                        required: "iata type code is required",
                                    })}
                                />
                            </div>

                            {errors.iatatypecode && (
                                <span className='help has-text-danger'>
                                    {`${errors?.iatatypecode?.message}`}
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
                                    {...register("icaocode", {
                                        required: "icao code is required",
                                    })}
                                />
                            </div>

                            {errors.icaocode && (
                                <span className='help has-text-danger'>
                                    {`${errors?.icaocode?.message}`}
                                </span>
                            )}
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
                </div>
            </div>
        </AdminPanelContent>
    );
};

export default IcaoDesignatorForm;
