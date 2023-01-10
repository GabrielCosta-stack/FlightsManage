import { FormEvent, useEffect, useState, useRef, Fragment } from "react";
import Select from "react-select";
import {
    faPlus,
    faMinus,
    faCircleDot,
    faAngleDown,
    faTrashCan,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getWindowSize } from "../../utils/utils";

import "./aircrafts.scss";
import {
    removeCreateMode,
    removeEditMode,
    setAdminMenuDisplay,
} from "../menu/menuSlice";
import {
    aircraftSelectors,
    changeAircraftLoadedState,
    createAircraftAsync,
    createCabinAsync,
    deleteCabinAsync,
    editAircraftChangeState,
    fetchAircraftsOptionsAsync,
    updateCabinColumns,
} from "./aircraftSlice";
import { FieldValues, useForm } from "react-hook-form";
import {
    AircraftCreateCabin,
    AircraftDeleteCabin,
    AircraftUpdate,
    AircraftUpdateCabinColumns,
} from "../../app/models/aircraft";

import AppNotification from "../../app/notifications/AppNotification";
import { showNotification } from "../../app/notifications/appNotificationSlice";
import { changeAirportsLoadedState } from "../airports/AirportSlice";

interface Cabin {
    Class: string;
    Lines: number;
    Columns: any[];
}

interface AircraftToCreate {
    ModelsQuantity: number;
    flightCompanyId: number;
    icaoTypeDesignatorId: number;
    Cabins: Cabin[];
}

const AircraftForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        getValues,
        reset,
        control,
        formState: { errors },
    } = useForm({ mode: "all" });

    const [devicesQuantity, setDevicesQuantity] = useState(1);
    const [cabinLines, setCabinLines] = useState(1);
    const [columns, setColumns] = useState<{ value: string; label: string }[]>(
        []
    );
    const [isCabinsTabOpen, setIsCabinsTabOpen] = useState(false);
    const [cabins, setCabins] = useState<Cabin[]>([]);
    const [selectOptions, setSelectOptions] = useState<any>([]);
    let checkRef = useRef<HTMLInputElement[]>([]); // Lsit of inputs
    const selectInputRef = useRef(null);
    const [isCabinColumnsEdit, setIsCabinColumnsEdit] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const dispatch = useAppDispatch();
    const { isEditMode, isCreateMode } = useAppSelector(
        (state) => state.adminMenu
    );

    const {
        isEditChanged,
        aircraftsOptionsLoaded,
        flightCompanies,
        models,
        aircraftToEdit,
    } = useAppSelector((state) => state.aircrafts);

    const alphabet = Array.from(Array(26))
        .map((e, i) => i + 65)
        .map((x) => String.fromCharCode(x));

    let selectReactOptions = alphabet.map((char) => ({
        value: char,
        label: char,
    }));

    const selectCustomStyles = {
        dropdownIndicator: (base: any) => ({
            ...base,
            color: "#485fc7",
        }),
    };

    useEffect(() => {
        const handleWindowResize = () => setWindowSize(getWindowSize());
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (!isCabinColumnsEdit) {
            setColumns([]);
        }

        setValue("class", "");
        setCabinLines(1);
    }, [cabins, setCabins]);

    useEffect(() => {
        setSelectOptions(selectReactOptions);

        if (isEditMode) {
            const newArray: Cabin[] = [];

            aircraftToEdit.cabins?.forEach((cabin: any) => {
                const newCabin: Cabin = {
                    Class: "",
                    Lines: 0,
                    Columns: [],
                };

                newCabin.Class = cabin.class;

                cabin.seats.forEach((el: any) => {
                    if (!newCabin.Columns.includes(el.column)) {
                        newCabin.Columns.push(el.column);
                    }
                });
                newCabin.Lines = cabin.seats.length / newCabin.Columns.length;
                newArray.push(newCabin);
            });

            setCabins(newArray);

            setTimeout(() => {
                setValue(
                    "ICAOTypeDesignatorId",
                    aircraftToEdit.icaoTypeDesignatorId
                );
                setValue("FlightCompanyId", aircraftToEdit.flightCompanyId);
            }, 1000);
        }
        return () => {
            if (isEditMode) dispatch(removeEditMode(false));
            if (isCreateMode) dispatch(removeCreateMode(false));
        };
    }, []);

    useEffect(() => {
        if (!aircraftsOptionsLoaded) dispatch(fetchAircraftsOptionsAsync());
    }, [aircraftsOptionsLoaded]);

    useEffect(() => {
        if (isCabinColumnsEdit) {
            let _class = "";

            checkRef.current.forEach((input) => {
                if (input !== null && input.checked) {
                    _class = input.name;
                }
            });

            const cabinColumns = columns?.map(
                (c: { value: string; label: string }) => c.value
            );

            let newCabins = [...cabins];

            newCabins.forEach((cabin) => {
                if (cabin.Class === _class) {
                    cabin.Columns = [];

                    cabin.Columns = cabinColumns;
                }
            });

            setCabins(newCabins);
        }
    }, [columns]);

    const handleColumnsChange = (e: any) => {
        setColumns(e);

        if (isEditMode) {
            let _class = "";
            const col = e?.map(
                (c: { value: string; label: string }) => c.value
            );

            checkRef.current.forEach((input) => {
                if (input !== null && input.checked) {
                    _class = input.name;
                }
            });
        }
    };

    const handleRemoveCabin = (_class: string) => {
        setCabins((cabins) => cabins.filter((cabin) => cabin.Class !== _class));

        if (isEditMode) {
            const cabinDelete: AircraftDeleteCabin = {
                FlightCompanyId: aircraftToEdit.flightCompanyId,
                ICAOTypeDesignatorId: aircraftToEdit.icaoTypeDesignatorId,
                Class: _class,
            };

            dispatch(deleteCabinAsync(cabinDelete))
                .unwrap()
                .then(() => {
                    setIsCabinColumnsEdit(false);
                    setColumns([]);
                    dispatch(
                        showNotification({
                            message: `${_class} Cabin was successfully deleted, check your cabins list to see the details`,
                            type: "is-primary",
                            open: true,
                        })
                    );
                    dispatch(changeAircraftLoadedState(false));
                })
                .catch(() => {
                    dispatch(
                        showNotification({
                            message: `${_class} Cabin could not be deleted`,
                            type: "is-danger",
                            open: true,
                        })
                    );
                });
        }
    };

    const handleColumnsInList = (e: FormEvent<HTMLInputElement>) => {
        const checkedVAlues: boolean[] = [];
        console.log(checkRef);
        checkRef.current.forEach((input) => {
            if (input !== null && input.name !== e.currentTarget.name) {
                input.checked = false;
            }

            if (input !== null && input.checked) {
                const deleteCabinBtn = document.getElementById(
                    `trash-btn-${input.name}`
                ) as HTMLButtonElement | null;

                const increaseLineBtn = document.getElementById(
                    `increase-btn-${input.name}`
                ) as HTMLButtonElement | null;

                const decreaseLineBtn = document.getElementById(
                    `decrease-btn-${input.name}`
                ) as HTMLButtonElement | null;

                decreaseLineBtn!.removeAttribute("hidden");
                increaseLineBtn!.removeAttribute("hidden");
                deleteCabinBtn!.removeAttribute("hidden");

                if (isEditMode) {
                    const saveCabinBtn = document.getElementById(
                        `save-btn-${input.name}`
                    ) as HTMLButtonElement | null;

                    saveCabinBtn!.removeAttribute("hidden");
                }
            }

            if (input !== null && !input.checked) {
                const deleteCabinBtn = document.getElementById(
                    `trash-btn-${input.name}`
                ) as HTMLButtonElement | null;

                const increaseLineBtn = document.getElementById(
                    `increase-btn-${input.name}`
                ) as HTMLButtonElement | null;

                const decreaseLineBtn = document.getElementById(
                    `decrease-btn-${input.name}`
                ) as HTMLButtonElement | null;

                deleteCabinBtn!.setAttribute("hidden", "");
                decreaseLineBtn?.setAttribute("hidden", "");
                increaseLineBtn!.setAttribute("hidden", "");

                if (isEditMode) {
                    const saveCabinBtn = document.getElementById(
                        `save-btn-${input.name}`
                    ) as HTMLButtonElement | null;

                    saveCabinBtn!.setAttribute("hidden", "");
                }
            }

            if (input !== null) {
                checkedVAlues.push(input.checked);
            }
        });

        const cabin = cabins.find(
            (cabin) => cabin.Class === e.currentTarget.name
        );

        const col = cabin?.Columns.map((col) => ({
            value: col,
            label: col,
        }));

        if (checkedVAlues.includes(true)) {
            setColumns([...col!]);
            setIsCabinColumnsEdit(true);
        } else {
            setColumns([]);
            setIsCabinColumnsEdit(false);
        }
    };

    const handleDecreaseCabinSeat = (_class: string) => {
        const indexCabin = cabins.findIndex((c) => c.Class === _class);

        if (indexCabin === -1 || indexCabin === undefined) return;

        let newArray = [...cabins];

        if (newArray[indexCabin].Lines > 0) {
            newArray[indexCabin].Lines -= 1;
            setCabins(newArray);
        }
    };

    const handleIncreaseCabinSeat = (_class: string) => {
        const indexCabin = cabins.findIndex((c) => c.Class === _class);

        if (indexCabin === -1 || indexCabin === undefined) return;

        let newArray = [...cabins];

        if (newArray[indexCabin].Lines <= 50) {
            newArray[indexCabin].Lines += 1;
            setCabins(newArray);
        }
    };

    const handleCabinsBeforeSubmit = () => {
        const _class = getValues("class");
        const classExist = cabins.find((c) => c.Class === _class);

        if (!_class) {
            setError("class", { message: "cabin class is required" });
            return;
        } else {
            clearErrors("class");
        }

        if (columns?.length === 0) {
            setError("Columns", { message: "columns are required" });
            return;
        } else {
            clearErrors("Columns");
        }

        if (!classExist) {
            const cabinColumns = columns?.map((c: any) => c.value);

            setCabins((prevCabins) => [
                ...prevCabins,
                {
                    Class: getValues("class"),
                    Lines: cabinLines,
                    Columns: [...cabinColumns!],
                },
            ]);

            if (isEditMode) {
                const cabinCreate: AircraftCreateCabin = {
                    FlightCompanyId: aircraftToEdit.flightCompanyId,
                    ICAOTypeDesignatorId: aircraftToEdit.icaoTypeDesignatorId,
                    Cabins: [
                        {
                            Class: getValues("class"),
                            Lines: cabinLines,
                            Columns: [...cabinColumns!],
                        },
                    ],
                };

                dispatch(createCabinAsync(cabinCreate))
                    .unwrap()
                    .then(() => {
                        dispatch(
                            showNotification({
                                message: `${_class} Cabin was successfully created, check your cabins list to see the details`,
                                type: "is-primary",
                                open: true,
                            })
                        );
                        dispatch(changeAircraftLoadedState(false));
                    })
                    .catch(() => {
                        dispatch(
                            showNotification({
                                message: `${_class} Cabin could not be created, something went wrong`,
                                type: "is-danger",
                                open: true,
                            })
                        );
                    });
            }

            return;
        }

        setError("class", {
            message: `class ${_class} already exist on the list`,
        });
    };

    const toggleDetails = (cabinClass: string) => {
        const seatDetails = document.getElementById(`details-${cabinClass}`);

        seatDetails?.classList.toggle("is-hidden");
    };

    const handleCabinColumnsUpdate = () => {
        let _class: string;

        checkRef.current.forEach((input) => {
            if (input.checked) {
                _class = input.name;
            }
        });

        const cabin = cabins.find((cabin) => cabin.Class === _class);

        const cabinColumnsUpdate: AircraftUpdateCabinColumns = {
            flightCompanyId: aircraftToEdit.flightCompanyId!,
            icaoTypeDesignatorId: aircraftToEdit.icaoTypeDesignatorId!,
            class: cabin?.Class!,
            lines: cabin?.Lines!,
            columns: cabin?.Columns!,
        };

        dispatch(updateCabinColumns(cabinColumnsUpdate))
            .unwrap()
            .then(() => {
                dispatch(
                    showNotification({
                        message: `${_class} Cabin was successfully updated`,
                        type: "is-primary",
                        open: true,
                    })
                );
                dispatch(changeAircraftLoadedState(false));
            })
            .catch(() => {
                dispatch(
                    showNotification({
                        message: `${_class} Cabin could not be updated, something went wrong`,
                        type: "is-danger",
                        open: true,
                    })
                );
            });
    };

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        if (isCreateMode) {
            const aircraftToCreate: AircraftToCreate = {
                ModelsQuantity: devicesQuantity,
                icaoTypeDesignatorId: data.ICAOTypeDesignatorId,
                flightCompanyId: data.FlightCompanyId,
                Cabins: [...cabins],
            };

            dispatch(createAircraftAsync(aircraftToCreate))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("aircrafts"));
                });
        }
    };

    return (
        <AdminPanelContent>
            <div className='box is-shadowless is-size-6 is-uppercase has-text-weight-medium'>
                {isEditMode ? "Edit" : "Add"} {"Aircraft"}
            </div>

            <div className='mb-5 is-flex is-justify-content-right'>
                <button
                    onClick={() => {
                        dispatch(setAdminMenuDisplay("aircrafts"));
                        if (isEditChanged)
                            dispatch(editAircraftChangeState(false));
                    }}
                    className='button is-link is-outlined is-small '
                    type='button'>
                    <span className='icon'>
                        <i className='mdi mdi-arrow-left'></i>
                    </span>
                    <span>Back</span>
                </button>
            </div>
            <AppNotification />
            <div className='box is-shadowless'>
                <div
                    onClick={() => setIsCabinsTabOpen(!isCabinsTabOpen)}
                    className='is-flex py-5'>
                    <p className='is-flex-grow-1'>
                        <span></span>
                        <FontAwesomeIcon
                            icon={faCircleDot}
                            className={` mr-2 ${
                                cabins.some((c) => c.Class === "Premium")
                                    ? "has-text-success"
                                    : "has-text-danger"
                            }`}
                        />
                        <span>Premium</span>
                    </p>
                    <p className='is-flex-grow-1'>
                        <FontAwesomeIcon
                            icon={faCircleDot}
                            className={` mr-2 ${
                                cabins.some((c) => c.Class === "Executive")
                                    ? "has-text-success"
                                    : "has-text-danger"
                            }`}
                        />
                        <span>Executive</span>
                    </p>
                    <p className='is-flex-grow-1'>
                        <FontAwesomeIcon
                            icon={faCircleDot}
                            className={` mr-2 ${
                                cabins.some((c) => c.Class === "Economic")
                                    ? "has-text-success"
                                    : "has-text-danger"
                            }`}
                        />
                        <span>Economic</span>
                    </p>
                    <span className='icon'>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className='has-text-link'
                        />
                    </span>
                </div>

                {/* START TABLE CABIN CLASS*/}
                <table
                    className={`table ${
                        isCabinsTabOpen ? "" : "is-hidden"
                    } is-fullwidth`}>
                    {cabins.length > 0 && (
                        <thead>
                            <tr>
                                <th>
                                    <h4>Cabins</h4>
                                </th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {cabins.length > 0 ? (
                            cabins.map((cabin, index) => (
                                <Fragment key={index}>
                                    <tr>
                                        <td className='columns'>
                                            <div className='column'>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Class</th>
                                                            <th>Lines</th>
                                                            <th>Columns</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                onClick={() =>
                                                                    toggleDetails(
                                                                        cabin.Class
                                                                    )
                                                                }
                                                                className='is-chevron-cell'>
                                                                <a role='button'>
                                                                    <span className='icon is-expanded'>
                                                                        <i className='mdi mdi-chevron-right mdi-24px'></i>
                                                                    </span>
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {cabin.Class}
                                                            </td>
                                                            <td>
                                                                {cabin.Lines}
                                                            </td>
                                                            <td>
                                                                {cabin.Columns.join(
                                                                    " "
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='column'>
                                                <div
                                                    className={`is-flex is-align-items-center  ${
                                                        windowSize.innerWidth >
                                                        768
                                                            ? "is-justify-content-right"
                                                            : ""
                                                    }`}>
                                                    <div>
                                                        <div className='field'>
                                                            <input
                                                                ref={(
                                                                    el: any
                                                                ) =>
                                                                    (checkRef.current[
                                                                        index
                                                                    ] = el)
                                                                }
                                                                onChange={
                                                                    handleColumnsInList
                                                                }
                                                                id={`${cabin.Class}`}
                                                                type='checkbox'
                                                                name={`${cabin.Class}`}
                                                                className='switch'
                                                            />
                                                            <label
                                                                htmlFor={`${cabin.Class}`}></label>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id={`increase-btn-${cabin.Class}`}
                                                        hidden
                                                        className='mr-2'>
                                                        <button
                                                            onClick={() => {
                                                                handleIncreaseCabinSeat(
                                                                    cabin.Class
                                                                );
                                                            }}
                                                            className='button is-small is-link is-outlined'
                                                            data-target='sample-modal'
                                                            type='button'>
                                                            <span className='icon'>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPlus
                                                                    }
                                                                />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div
                                                        id={`decrease-btn-${cabin.Class}`}
                                                        hidden>
                                                        <button
                                                            onClick={() => {
                                                                handleDecreaseCabinSeat(
                                                                    cabin.Class
                                                                );
                                                            }}
                                                            className='button is-small is-link is-outlined mr-2'
                                                            data-target='sample-modal'
                                                            type='button'>
                                                            <span className='icon'>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faMinus
                                                                    }
                                                                />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div
                                                        hidden
                                                        id={`trash-btn-${cabin.Class}`}>
                                                        <button
                                                            onClick={() => {
                                                                handleRemoveCabin(
                                                                    cabin.Class
                                                                );
                                                            }}
                                                            className='button is-small is-danger is-outlined mr-2'
                                                            data-target='sample-modal'
                                                            type='button'>
                                                            <span className='icon'>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrashCan
                                                                    }
                                                                />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {isEditMode && (
                                                        <div
                                                            id={`save-btn-${cabin.Class}`}
                                                            hidden>
                                                            <button
                                                                onClick={
                                                                    handleCabinColumnsUpdate
                                                                }
                                                                className='button is-small is-primary is-outlined mr-2'
                                                                type='button'>
                                                                <span className='icon'>
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faFloppyDisk
                                                                        }
                                                                    />
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))
                        ) : (
                            <tr>
                                <td>Cabins Empty</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* END TABLE CABIN CLASS*/}
            </div>

            {/*INIT FORM*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                {isEditMode && <input type='hidden' />}
                <div className='columns '>
                    {/*START FIRST COLUMN*/}
                    <div className='column'>
                        {!isEditMode && (
                            <div className='field'>
                                <label className='label'>Models Quantity</label>
                                <div className='columns'>
                                    <div className='column is-half'>
                                        <div className='is-flex'>
                                            <button
                                                onMouseDown={() =>
                                                    setDevicesQuantity(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                                disabled={devicesQuantity <= 1}
                                                type='button'
                                                className='button'>
                                                <span className='icon'>
                                                    <FontAwesomeIcon
                                                        icon={faMinus}
                                                    />
                                                </span>
                                            </button>
                                            <input
                                                {...register("ModelsQuantity")}
                                                value={devicesQuantity}
                                                className='input has-text-centered'
                                                type='text'
                                                readOnly></input>
                                            <button
                                                onMouseDown={() =>
                                                    setDevicesQuantity(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                                type='button'
                                                className='button '>
                                                <span className='icon'>
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* {errors.model && (
                                <span className='help has-text-danger'>
                                    {`${errors?.model?.message}`}
                                </span>
                            )} */}
                            </div>
                        )}
                        <div className='field'>
                            <label className='label'>Model</label>
                            <div className='select is-fullwidth'>
                                <select
                                    disabled={isEditMode}
                                    {...register("ICAOTypeDesignatorId")}>
                                    <option value=''>
                                        {models.length > 0
                                            ? "--Select model--"
                                            : "No models to choose"}
                                    </option>
                                    {models.length > 0 &&
                                        models.map((model) => (
                                            <option
                                                key={model.id}
                                                value={model.id}>
                                                {model.model}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* {errors.model && (
                                <span className='help has-text-danger'>
                                    {`${errors?.model?.message}`}
                                </span>
                            )} */}
                        </div>

                        <div className='field'>
                            <label className='label'>Flight Company</label>
                            <div className='select is-fullwidth'>
                                <select
                                    disabled={isEditMode}
                                    {...register("FlightCompanyId")}>
                                    <option value=''>
                                        {flightCompanies.length > 0
                                            ? "--Select Company--"
                                            : "No companies to choose"}
                                    </option>
                                    {flightCompanies.length > 0 &&
                                        flightCompanies.map((company) => (
                                            <option
                                                key={company.id}
                                                value={company.id}>
                                                {company.companyName}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {errors.FlightCompanyId && (
                                <span className='help has-text-danger'>
                                    {`${errors?.FlightCompanyId?.message}`}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* END FIRST COLUMN*/}

                    {/* START SECOND COLUMN*/}
                    <div className='column '>
                        <div className='field'>
                            <label className='label'>Cabin Lines</label>
                            <div className='columns'>
                                <div className='column is-half'>
                                    <div className='is-flex'>
                                        <button
                                            disabled={cabinLines <= 1}
                                            onMouseDown={() =>
                                                setCabinLines(
                                                    (prev) => prev - 1
                                                )
                                            }
                                            type='button'
                                            className='button'>
                                            <span className='icon'>
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                />
                                            </span>
                                        </button>
                                        <input
                                            {...register("cabinLines")}
                                            value={cabinLines}
                                            className='input has-text-centered'
                                            type='text'
                                            readOnly></input>
                                        <button
                                            onMouseDown={() =>
                                                setCabinLines(
                                                    (prev) => prev + 1
                                                )
                                            }
                                            type='button'
                                            className='button '>
                                            <span className='icon'>
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* {errors.model && (
                                <span className='help has-text-danger'>
                                    {`${errors?.model?.message}`}
                                </span>
                            )} */}
                        </div>
                        <div className='field'>
                            <label className='label'>Cabin Class</label>
                            <div className='select is-fullwidth'>
                                <select
                                    disabled={isCabinColumnsEdit}
                                    {...register("class")}>
                                    <option value=''>
                                        {"--Select Cabin Class --"}
                                    </option>
                                    <option value='Premium'>{"Premium"}</option>
                                    <option value='Executive'>
                                        {"Executive"}
                                    </option>
                                    <option value='Economic'>
                                        {"Economic"}
                                    </option>
                                </select>
                            </div>

                            {errors.class && (
                                <span className='help has-text-danger'>
                                    {`${errors?.class?.message}`}
                                </span>
                            )}
                        </div>

                        <div className='field'>
                            <label className='label'>Cabin Columns</label>

                            <Select
                                ref={selectInputRef}
                                value={columns}
                                onChange={handleColumnsChange}
                                className='is-fullwidth'
                                styles={selectCustomStyles}
                                isClearable={true}
                                isDisabled={false}
                                isMulti
                                closeMenuOnSelect={false}
                                options={selectOptions}
                            />

                            {errors.Columns && (
                                <span className='help has-text-danger'>
                                    {`${errors?.Columns?.message}`}
                                </span>
                            )}
                        </div>
                        <div className='field'>
                            <div className='control mt-5'>
                                <button
                                    onClick={() => {
                                        handleCabinsBeforeSubmit();
                                    }}
                                    disabled={isCabinColumnsEdit}
                                    type='button'
                                    className='button is-link is-outlined is-fullwidth'>
                                    Add Cabin
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* END SECOND COLUMN*/}
                </div>
                <div className='control mt-5'>
                    <button
                        disabled={isEditMode}
                        type='submit'
                        className='button  is-primary  is-fullwidth'>
                        {"Add"}
                    </button>
                </div>
            </form>
            {/*INIT FORM*/}
        </AdminPanelContent>
    );
};

export default AircraftForm;
