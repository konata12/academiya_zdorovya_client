import FormElementContainerWithCheckbox from '@/app/common_ui/form_components/InputContainers/HookForm/children/FormElementContainerWithCheckbox/FormElementContainerWithCheckbox';
import InputContainer from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer';
import InputContainerWithTwoInputsWithDeleteBtn from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithTwoInputsWithDeleteBtn/InputContainerWithTwoInputsWithDeleteBtn';
import React, { useEffect } from 'react';
import styles from './CreateServicesForm.module.scss';
import TextareaContainerWithCheckbox from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainerWithCheckbox/TextareaContainerWithCheckbox';
import {
    addServiceCreateTreatmentStagesValue,
    deleteServiceCreateEmployeesValue,
    deleteServiceCreateTreatmentStagesValue,
    deleteServiceCreateTreatmentTypesValue,
    resetServiceFromData,
    setServiceCreateEmployees,
    setServiceCreateTreatmentStagesError,
    setServiceCreateTreatmentTypes
} from '@/app/utils/redux/services/serviceCreateFormSlice';
import { DraggableAreaContainer } from '@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer';
import { ImageInputContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer';
import { ImageInputPreviewFromIndexedDB } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB';
import { resetServiceTreatmentTypeCreateFormData, setServiceTreatmentTypeCreateFormDataOnLink, setServiceTreatmentTypeCreateFormInitData } from '@/app/utils/redux/services/serviceTreatmentTypeCreateFormSlice';
import { RootState } from '@/app/utils/redux/store';
import {
    CreateServiceEmployeesFormData,
    CreateServiceFormData,
    CreateServiceTreatmentStagesFormData,
    ServiceEmployeeFormData,
    ServiceFormDataEnum,
    ServiceFormDataEnumType,
    ServiceFormDataUICheckboxesEnum,
    ServiceFormDataUICheckboxesType,
    ServiceFormDataUIModalsStatesEnum,
    ServiceHandleSubmitErrorIdType,
    ServiceHandleSubmitStringKeysType,
    ServiceModalsStatesType,
    ServiceStringKeysType,
    ServiceTreatmentStageBasicType,
    ServiceTreatmentStageEnum,
    ServiceTreatmentStageFormDataError,
    ServiceTreatmentTypesEnum,
    ServiceTreatmentTypeServiceFormData
} from '@/app/types/data/services.type';
import { TextareaContainer } from '@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer';
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { OrderedListServiceTreatmentTypeInterface, useOrderedList } from '@/app/utils/hooks/admin/dragAndDrop/useOrderedList';
import { useRouter } from 'next/navigation';
import { useServiceFormHandleChange } from '@/app/utils/hooks/admin/serviceForm/useServiceFormHandleChange';
import { useServiceFormSlice } from '@/app/utils/hooks/admin/serviceForm/useServiceFormSlice';
import {
    addModalState,
    deleteModalState,
    setModalState,
    triggerServiceUICheckbox,
} from '@/app/utils/redux/services/serviceFromUISlice';
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton';
import ModalWindow from '@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow';
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable';
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine';
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink';
import { EmployeeSearchbarWithTable } from '@/app/admin/(provider)/ui/Forms/services/create/EmployeeSearchbarWithTable/EmployeeSearchbarWithTable';
import { DraggableElementContainer } from '@/app/common_ui/animated_components/DraggableAreaContainers/DraggableElementContainer/DraggableElementContainer';
import { FormInputError } from '@/app/types/data/form.type';
import { parseOrderedArrayToRequest } from '@/app/services/order.service';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { clear } from 'idb-keyval';
import { fullfilled } from '@/app/services/response.service';
import { createService } from '@/app/utils/redux/services/servicesSlice';


const indexedDBStoreName = 'service_create_images'
const treatmentTypesTableTitles = ['Види послуг', 'Опції']

export default function CreateServicesForm() {
    const {
        errors,
        ...data
    } = useAppSelector((state: RootState) => state.serviceCreateForm)
    const {
        treatmentTypesCheckbox,
        treatmentTypesDescriptionCheckbox,

        treatmentStagesModalIsOpen,
        treatmentTypesModalIsOpen,
        employeesModalIsOpen,
    } = useAppSelector((state: RootState) => state.serviceFormUI)
    const { error } = useAppSelector((state: RootState) => state.services)

    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleChange = useServiceFormHandleChange(indexedDBStoreName)
    const handleDragEnd = useOrderedList()
    const {
        setBasicValueError,
    } = useServiceFormSlice(indexedDBStoreName)


    // GET FORM VALUES FROM SLICE
    const {
        title,
        shortDescription,
        image,
        treatmentStages,
        mainDescription,
        treatmentTypesDescription,
        treatmentTypes,
        employees,
    } = data

    // HANDLE DRAG END PROPS DATA
    const treatmentTypesDragData: OrderedListServiceTreatmentTypeInterface = {
        order: treatmentTypes,
        valueName: ServiceFormDataEnum.TREATMENTTYPES,
        sliceName: 'servicesCreateForm',
    }
    // console.log('data:', data)
    // console.log('errors:', errors)
    // console.log('ui data:', {
    // treatmentTypesCheckbox,
    // treatmentTypesDescriptionCheckbox,

    // treatmentStagesModalIsOpen,
    //     treatmentTypesModalIsOpen,
    //     employeesModalIsOpen,
    // })

    // RESET ERRORS ON SOME VALUES ON THEIR CHANGE
    useEffect(() => {
        const message = ''
        dispatch(setBasicValueError({
            field: ServiceFormDataEnum.TREATMENTTYPES,
            message
        }));
    }, [treatmentTypes])

    // HANDLE ARRAY FIELDS
    const deleteTreatmentStage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()

        if (treatmentStages.length > 1) {
            dispatch(deleteServiceCreateTreatmentStagesValue(index))
            dispatch(deleteModalState({
                index,
                modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN
            }))
        }
    }
    const addTreatmentStage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(addServiceCreateTreatmentStagesValue())
        dispatch(addModalState({ modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN }))
    }
    const deteleTreatmentType = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()

        dispatch(deleteServiceCreateTreatmentTypesValue(index))
        dispatch(deleteModalState({
            index,
            modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTYPESMODALISOPEN
        }))
    }
    const addTreatmentType = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        dispatch(setServiceTreatmentTypeCreateFormInitData())
        dispatch(addModalState({ modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTYPESMODALISOPEN }))
    }
    const linkToUpdateTreatmentType = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()

        const treatmentType = treatmentTypes[index]
        dispatch(setServiceTreatmentTypeCreateFormDataOnLink(treatmentType))
        router.push(`/admin/services/create/treatmentType/${index}`)
    }
    const deleteEmoployee = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault()

        dispatch(deleteServiceCreateEmployeesValue(index))
        dispatch(deleteModalState({
            index,
            modalName: ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN
        }))
    }
    // HANDLE CHECKBOXES
    const handleServiceFormCheckbox = (
        e: React.ChangeEvent<HTMLInputElement>,
        checkboxName: ServiceFormDataUICheckboxesType
    ) => {
        const state = e.target.checked
        dispatch(triggerServiceUICheckbox({
            checkboxName,
            state,
        }))
        // if (state && !achivements) {
        //     dispatch(setAchivementsFirstValue())
        // }
    }
    // HANDLE MODAL STATES
    const setModalWindowState = (
        index: number,
        state: boolean,
        modalName: ServiceModalsStatesType
    ) => {
        dispatch(setModalState({ index, state, modalName }))
    }

    // HANDLE SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // SET ERROR ARRAY
        const errorsData: {
            error: FormInputError,
            id: ServiceHandleSubmitErrorIdType
        }[] = []
        // GET ARRAY OF DATA ENTRIES
        const entries = Object.entries(data)
        // SET ARRAYS FOR GROUPING FIELDS BY VALUE TYPES
        const stringFields: ServiceHandleSubmitStringKeysType[] = [
            ServiceFormDataEnum.TITLE,
            ServiceFormDataEnum.SHORTDESCRIPTION,
            ServiceFormDataEnum.MAINDESCRIPTION,
        ];

        // FORM VALIDATION
        entries.forEach((entry) => {
            const entryKey = entry[0]
            // VALIDATION FOR STRING VALUES
            if (stringFields.includes(entryKey as ServiceHandleSubmitStringKeysType)) {
                const key = entry[0] as ServiceHandleSubmitStringKeysType
                const value = entry[1] as string

                if (!value) {
                    // SET APPROPRIATE MESSAGE ERROR
                    let message: string
                    switch (key) {
                        case ServiceFormDataEnum.TITLE:
                            message = "Заголовок обов'язковий"
                            break;
                        case ServiceFormDataEnum.SHORTDESCRIPTION:
                            message = "Короткий опис обов'язковий"
                            break;
                        case ServiceFormDataEnum.MAINDESCRIPTION:
                            message = "Головний опис обов'язковий"
                            break;
                    }

                    dispatch(setBasicValueError({
                        field: key,
                        message
                    }));

                    errorsData.push({
                        id: key,
                        error: { message }
                    });
                }
            }
            // VALIDATION FOR TREATMENTTYPES VALUE
            else if (treatmentTypesCheckbox) {
                if (entryKey === ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION && treatmentTypesDescriptionCheckbox) {
                    const value = entry[1] as string

                    if (!value) {
                        const message = "Введіть опис"
                        dispatch(setBasicValueError({
                            field: entryKey,
                            message
                        }));

                        errorsData.push({
                            id: entryKey,
                            error: { message }
                        });
                    }
                }
                if (entryKey === ServiceFormDataEnum.TREATMENTTYPES) {
                    const value = entry[1] as ServiceTreatmentTypeServiceFormData[]

                    if (!value.length) {
                        const message = "Добавте вид послуги"
                        dispatch(setBasicValueError({
                            field: entryKey,
                            message
                        }));

                        errorsData.push({
                            id: entryKey,
                            error: { message }
                        });
                    }
                }
            }
            // VALIDATION FOR TREATMENTSTAGES VALUES
            else if (entryKey === ServiceFormDataEnum.TREATMENTSTAGES) {
                const values = entry[1] as ServiceTreatmentStageBasicType[]

                values.forEach((stage, index) => {
                    if (!stage[ServiceTreatmentStageEnum.TITLE]) {
                        const message = 'Введіть назву'
                        errorsData.push({
                            id: `${entryKey}_${ServiceTreatmentStageEnum.TITLE}_${index}`,
                            error: { message }
                        });
                        dispatch(setServiceCreateTreatmentStagesError({
                            field: ServiceTreatmentStageEnum.TITLE,
                            index,
                            message
                        }))
                    }
                    if (!stage[ServiceTreatmentStageEnum.DESCRIPTION]) {
                        const message = 'Введіть опис'
                        errorsData.push({
                            id: `${entryKey}_${ServiceTreatmentStageEnum.DESCRIPTION}_${index}`,
                            error: { message }
                        });
                        dispatch(setServiceCreateTreatmentStagesError({
                            field: ServiceTreatmentStageEnum.DESCRIPTION,
                            index,
                            message
                        }))
                    }
                })
            }
            // VALIDATION FOR EMPLOYEES VALUES
            else if (entryKey === ServiceFormDataEnum.EMPLOYEES) {
                const values = entry[1] as ServiceEmployeeFormData[]

                if (!values.length) {
                    const message = "Добавте лікарів послуги"
                    dispatch(setBasicValueError({
                        field: entryKey,
                        message
                    }));

                    errorsData.push({
                        id: entryKey,
                        error: { message }
                    });
                }
            }
            // VALIDATION FOR IMAGE
            else if (entryKey === ServiceFormDataEnum.IMAGE) {
                const value = entry[1] as string
                const message = 'Завантажте фото'

                if (!value) {
                    dispatch(setBasicValueError({
                        field: entryKey,
                        message
                    }));

                    errorsData.push({
                        id: entryKey,
                        error: { message }
                    });
                }
            }
        })

        // SCROLL TO ERROR INPUT
        if (errorsData.length) {
            console.log(errorsData)
            // SCROLL TO INPUT
            if (errorsData[0].id === ServiceFormDataEnum.IMAGE) {
                (document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement).labels?.[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            } else {
                (document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement).scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
            return
        }
        if (!image) return

        const requestData: CreateServiceFormData = {
            title,
            shortDescription,
            treatmentStages: treatmentStages.map((stage, i) => { return { ...stage, order: i } }),
            mainDescription,
            treatmentTypesDescription: treatmentTypesCheckbox && treatmentTypesDescriptionCheckbox
                ? treatmentTypesDescription : null,
            treatmentTypes: treatmentTypesCheckbox ? parseOrderedArrayToRequest(treatmentTypes) : null,
            employees: parseOrderedArrayToRequest(employees),
            image,
        }
        console.log('requestData: ', requestData)

        const response = await dispatch(createService(requestData))
        // const isFulfilled = fullfilled(response.meta.requestStatus)
        // if (isFulfilled) {
        //     // CLEAR DATA
        //     clear(getIndexedDBStoreForImages(indexedDBStoreName))
        //     dispatch(resetServiceFromData())
        //     router.push('./')
        // }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.createServiceForm}
        >
            <div className={styles.minimalData}>
                <InputContainer
                    label="Повна назва послуги"
                    inputId={ServiceFormDataEnum.TITLE}
                    value={title}
                    error={errors[ServiceFormDataEnum.TITLE]}
                    className={{
                        inputContainer: styles.nameInputContainer
                    }}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: ServiceFormDataEnum.TITLE,
                    })}
                />
                <TextareaContainer
                    label="Короткий опис послуги "
                    inputId={ServiceFormDataEnum.SHORTDESCRIPTION}
                    value={shortDescription}
                    error={errors[ServiceFormDataEnum.SHORTDESCRIPTION]}
                    className={{
                        inputContainer: styles.textareaContainer,
                    }}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: ServiceFormDataEnum.SHORTDESCRIPTION,
                    })}
                    minRows={3}
                />

                <div className={styles.imageSection}>
                    <p className={`title sm left ${styles.title}`}>
                        Обгортка новини
                    </p>
                    <p className={`inputLabel ${styles.paragraph}`}>
                        Завантажте фото
                    </p>

                    <ImageInputContainer
                        inputId={ServiceFormDataEnum.IMAGE}
                        changeEvent={(e) => handleChange({
                            e,
                            elementType: ServiceFormDataEnum.IMAGE,
                            oldValue: image
                        })}
                    >
                        <ImageInputPreviewFromIndexedDB
                            imageName={image}
                            indexedDBStoreName={indexedDBStoreName}
                            error={errors[ServiceFormDataEnum.IMAGE]}
                        />
                    </ImageInputContainer>
                </div>
            </div>

            <div className={styles.treatmentStages}>
                <p className={`title sm left`}>
                    Етапи лікування
                </p>

                <div className={styles.treatmentStagesContainer}>
                    {treatmentStages.map((treatmentStage, i) => {
                        return (
                            <div key={i}>
                                <InputContainerWithTwoInputsWithDeleteBtn
                                    labelOne={`Етап ${i + 1}`}
                                    labelTwo='Короткий опис етапу'
                                    inputIdOne={`${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.TITLE}`}
                                    inputIdTwo={`${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.DESCRIPTION}`}
                                    valueOne={treatmentStage[ServiceTreatmentStageEnum.TITLE]}
                                    valueTwo={treatmentStage[ServiceTreatmentStageEnum.DESCRIPTION]}
                                    index={i}
                                    errorOne={errors[ServiceFormDataEnum.TREATMENTSTAGES][i][ServiceTreatmentStageEnum.TITLE]}
                                    errorTwo={errors[ServiceFormDataEnum.TREATMENTSTAGES][i][ServiceTreatmentStageEnum.DESCRIPTION]}
                                    className={{
                                        buttonContainer: styles.buttonContainer,
                                        firstInput: {
                                            inputContainer: styles.inputContainer,
                                            input: styles.inputOne,
                                        },
                                        secondInput: {
                                            inputLabel: styles.inputLabelTwo,
                                            input: styles.inputTwo,
                                        },
                                    }}

                                    handleDelete={() => {
                                        setModalWindowState(
                                            i,
                                            true,
                                            ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN
                                        )
                                    }}
                                    changeEventOne={(e) => handleChange({
                                        e,
                                        arrIndex: i,
                                        elementType: `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.TITLE}`,
                                    })}
                                    changeEventTwo={(e) => handleChange({
                                        e,
                                        arrIndex: i,
                                        elementType: `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.DESCRIPTION}`,
                                    })}
                                />

                                {treatmentStagesModalIsOpen[i] && <ModalWindow
                                    title="Ви дійсно бажаєте видалити цей етап?"
                                >
                                    <button
                                        className={`btn cancel`}
                                        onClick={() => {
                                            setModalWindowState(
                                                i,
                                                false,
                                                ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN
                                            )
                                        }}
                                    >
                                        Скасувати видалення
                                    </button>
                                    <button
                                        onClick={(e) => { deleteTreatmentStage(e, i) }}
                                        className={`btn blue lg`}
                                    >
                                        Підтвердити
                                    </button>
                                </ModalWindow>}
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={addTreatmentStage}
                    className={`btn blue xl ${styles.btn}`}
                    type='button'
                >
                    Додати етап
                </button>
            </div>

            <div className={styles.mainDescription}>
                <TextareaContainer
                    label="Про послугу (повністю)"
                    inputId={ServiceFormDataEnum.MAINDESCRIPTION}
                    value={mainDescription}
                    error={errors[ServiceFormDataEnum.MAINDESCRIPTION]}
                    className={{
                        inputLabel: `title sm left`,
                        textarea: styles.textarea
                    }}
                    changeEvent={(e) => handleChange({
                        e,
                        elementType: ServiceFormDataEnum.MAINDESCRIPTION,
                    })}
                    minRows={5}
                />
            </div>

            <div className={styles.treatmentTypes}>
                <FormElementContainerWithCheckbox
                    label='Види послуги (опціонально*)'
                    checkboxId={ServiceFormDataUICheckboxesEnum.TREATMENTTYPESCHECKBOX}
                    isChecked={treatmentTypesCheckbox}
                    dependency={[
                        treatmentTypes,
                        treatmentTypesDescriptionCheckbox,
                    ]}
                    handleFunction={(e) => handleServiceFormCheckbox(
                        e,
                        ServiceFormDataUICheckboxesEnum.TREATMENTTYPESCHECKBOX,
                    )}
                    className={{
                        inputLabel: `title sm left ${styles.label}`
                    }}
                >
                    <TextareaContainerWithCheckbox
                        label='Опис видів послуги (опціонально*)'
                        inputId={ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION}
                        value={treatmentTypesDescription}
                        isChecked={treatmentTypesDescriptionCheckbox}
                        error={errors[ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION]}
                        minRows={5}

                        handleCheckbox={(e) => handleServiceFormCheckbox(
                            e,
                            ServiceFormDataUICheckboxesEnum.TREATMENTTYPESDESCRIPTIONCHECKBOX,
                        )}
                        changeEvent={(e) => handleChange({
                            e,
                            elementType: ServiceFormDataEnum.TREATMENTTYPESDESCRIPTION,
                        })}
                    />

                    {!!treatmentTypes.length && <>
                        <p className={`inputLabel ${styles.tableTitle}`}>
                            Таблиця видів послуги
                        </p>
                        <CommonTable
                            titles={treatmentTypesTableTitles}
                        >
                            <DraggableAreaContainer<OrderedListServiceTreatmentTypeInterface>
                                handleDragEnd={handleDragEnd}
                                dndContextId='ServiceTratmentTypesList'
                                data={treatmentTypesDragData}
                                droppableAreaClassName={styles.mainBody}
                            >
                                {treatmentTypes.map((treatmentType, i) => {
                                    return <DraggableElementContainer
                                        key={i}
                                        id={treatmentType.orderId}
                                        hasDraggableArea={true}
                                    >
                                        <TableLine>
                                            <span>
                                                {treatmentType[ServiceTreatmentTypesEnum.TITLE]}
                                            </span>

                                            {treatmentTypesModalIsOpen[i] && <ModalWindow
                                                title="Ви дійсно бажаєте видалити цей етап?"
                                            >
                                                <button
                                                    className={`btn cancel`}
                                                    onClick={() => {
                                                        setModalWindowState(
                                                            i,
                                                            false,
                                                            ServiceFormDataUIModalsStatesEnum.TREATMENTSTYPESMODALISOPEN
                                                        )
                                                    }}
                                                >
                                                    Скасувати видалення
                                                </button>
                                                <button
                                                    onClick={(e) => { deteleTreatmentType(e, i) }}
                                                    className={`btn blue lg`}
                                                >
                                                    Підтвердити
                                                </button>
                                            </ModalWindow>}

                                            <span className={styles.tableLineOptions}>
                                                <button
                                                    onClick={() =>
                                                        setModalWindowState(
                                                            i,
                                                            true,
                                                            ServiceFormDataUIModalsStatesEnum.TREATMENTSTYPESMODALISOPEN
                                                        )
                                                    }
                                                    type='button'
                                                    className={`btn gray sm`}
                                                >
                                                    Видалити
                                                </button>
                                                <button
                                                    className={`btn blue sm`}
                                                    onClick={(e) => linkToUpdateTreatmentType(e, i)}
                                                >
                                                    Змінити
                                                </button>
                                            </span>
                                        </TableLine>
                                    </DraggableElementContainer>
                                })}
                            </DraggableAreaContainer>

                            <p className={styles.tableUnderText}>
                                Порядок збережено
                            </p>
                        </CommonTable>
                        <p className={styles.dragReminder}>
                            Затисніть та переміщуйте послуги, щоб отримати бажаний порядок послуг*
                        </p>
                    </>}

                    <SafeLink
                        className={`btn blue xl ${styles.btn} ${errors.treatmentTypes.message ? styles.error : ''}`}
                        href={`/admin/services/create/treatmentType/${treatmentTypes.length}`}
                        customHandleClick={(e) => addTreatmentType(e)}
                    >
                        {errors.treatmentTypes.message ? 'Добавте вид послуги' : 'Додати вид послуги'}
                    </SafeLink>
                </FormElementContainerWithCheckbox>
            </div>

            <EmployeeSearchbarWithTable
                employees={employees}
                employeesModalIsOpen={employeesModalIsOpen}
                error={errors[ServiceFormDataEnum.EMPLOYEES]}
                handleModalState={(state: boolean, i: number) =>
                    setModalWindowState(
                        i,
                        state,
                        ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN
                    )
                }
                handleDelete={(e: React.MouseEvent<HTMLButtonElement>, i: number) => deleteEmoployee(e, i)}
            />

            <div className={styles.preview}>
                <p className={`title sm left ${styles.title}`}>
                    Попередній перегляд
                </p>

                <SafeLink
                    className={`btn blue sm`}
                    href={`/admin/services/create/preview`}
                >
                    Дивитись сторінку послуги
                </SafeLink>
            </div>

            <SubmitButton
                error={error.create}
            />
        </form >
    )
}