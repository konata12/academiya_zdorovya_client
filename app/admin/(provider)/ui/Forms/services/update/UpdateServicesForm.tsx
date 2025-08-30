// noinspection DuplicatedCode

import _ from "lodash";
import FormElementContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/HookForm/children/FormElementContainerWithCheckbox/FormElementContainerWithCheckbox";
import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import InputContainerWithTwoInputsWithDeleteBtn from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithTwoInputsWithDeleteBtn/InputContainerWithTwoInputsWithDeleteBtn";
import React, { useEffect } from "react";
import styles from "./UpdateServicesForm.module.scss";
import TextareaContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainerWithCheckbox/TextareaContainerWithCheckbox";
import {
	addServiceUpdateTreatmentStagesValue,
	deleteServiceUpdateEmployeesValue,
	deleteServiceUpdateTreatmentStagesValue,
	deleteServiceUpdateTypesValue,
	resetServiceFromData,
	setAllServiceUpdateFormData,
	setServiceUpdateTreatmentStagesError,
} from "@/app/utils/redux/services/serviceUpdateFormSlice";
import { clear } from "idb-keyval";
import {
	CreateServiceFormData,
	Service,
	ServiceEmployeeFormData,
	ServiceFormDataEnum,
	ServiceFormDataUICheckboxesEnum,
	ServiceFormDataUICheckboxesType,
	ServiceFormDataUIModalsStatesEnum,
	ServiceHandleSubmitErrorIdType,
	ServiceHandleSubmitStringKeysType,
	ServiceModalsStatesType,
	ServiceTreatmentStageBasicType,
	ServiceTreatmentStageEnum,
	ServiceTypesEnum,
	ServiceTypeServiceFormData,
} from "@/app/types/data/services.type";
import { DraggableAreaContainer } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer";
import { DraggableElementContainer } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableElementContainer/DraggableElementContainer";
import { FormInputError } from "@/app/types/data/form.type";
import { fulfilled } from "@/app/services/admin/response.service";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { ImageInputContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer";
import { ImageInputPreviewFromIndexedDB } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB";
import {
	OrderedListServiceTypeInterface,
	useOrderedList,
} from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";
import { parseOrderedArrayToRequest } from "@/app/services/admin/order.service";
import {
	parseServiceToServiceFormData,
	transferServiceImagesBetweenIndexDBStores,
} from "@/app/services/admin/service.service";
import {
	setServiceTypeUpdateFormDataOnLink,
	setServiceTypeUpdateFormInitData,
} from "@/app/utils/redux/services/serviceTypeUpdateFormSlice";
import {
	resetServiceUpdateError,
	setServiceUpdateError,
	updateService,
} from "@/app/utils/redux/services/servicesSlice";
import { RootState } from "@/app/utils/redux/store";
import { TextareaContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { useServiceFormHandleChange } from "@/app/utils/hooks/admin/serviceForm/useServiceFormHandleChange";
import { useServiceFormSlice } from "@/app/utils/hooks/admin/serviceForm/useServiceFormSlice";
import {
	addModalState,
	deleteModalState,
	resetServiceUIFormData,
	setModalState,
	setServiceUIFormValues,
	setUpdatingState,
	triggerServiceUICheckbox,
} from "@/app/utils/redux/services/serviceFromUISlice";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { EmployeeSearchbarWithTable } from "@/app/admin/(provider)/ui/Forms/services/EmployeeSearchbarWithTable/EmployeeSearchbarWithTable";
import { ImageFormDataEnum } from "@/app/types/data/details.type";
import { useServiceFormChangeCheck } from "@/app/utils/hooks/admin/serviceForm/useServiceFormChangeCheck";
import Link from "next/link";

const storeName = "service_images";
const indexedDBStoreName = "service_update_images";
const serviceTypesTableTitles = ["Види послуг", "Опції"];

// todo add checking for employees change before leaving page
// todo animated block to service stages
export default function UpdateServiceForm() {
	const { errors, ...data } = useAppSelector((state: RootState) => state.serviceUpdateForm);
	const {
		serviceTypesCheckbox,
		serviceTypesDescriptionCheckbox,

		updatingData,

		treatmentStagesModalIsOpen,
		serviceTypesModalIsOpen,
		employeesModalIsOpen,
	} = useAppSelector((state: RootState) => state.serviceFormUI);
	const { services, error } = useAppSelector((state: RootState) => state.services);

	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const handleChange = useServiceFormHandleChange(indexedDBStoreName);
	const handleDragEnd = useOrderedList();
	const { setBasicValueError } = useServiceFormSlice(indexedDBStoreName);

	const oldService = services.find((service) => `${service.id}` === id);

	// GET FORM VALUES FROM SLICE
	const {
		title,
		shortDescription,
		image,
		treatmentStages,
		mainDescription,
		serviceTypesDescription,
		serviceTypes,
		employees,
	} = data;

	// CHECK IF DATA CHANGED
	let oldData: CreateServiceFormData | undefined = undefined;
	if (oldService) {
		const { id, treatmentStages, ...oldServiceData } = oldService;

		oldData = {
			...oldServiceData,
			treatmentStages: treatmentStages.map((stage, i) => {
				return {
					...stage,
					order: i,
				};
			}),
		};
	}

	// HANDLE DRAG END PROPS DATA
	const serviceTypesDragData: OrderedListServiceTypeInterface = {
		order: serviceTypes,
		valueName: ServiceFormDataEnum.SERVICETYPES,
		sliceName: "servicesUpdateForm",
	};

	// RESET ERRORS ON SOME VALUES ON THEIR CHANGE
	useEffect(() => {
		const message = "";
		dispatch(
			setBasicValueError({
				field: ServiceFormDataEnum.SERVICETYPES,
				message,
			}),
		);
	}, [serviceTypes]);

	// SET INIT DATA
	useEffect(() => {
		(async (service: Service | undefined) => {
			if (!service || updatingData) return;
			// console.log('service: ', service)

			const setStore = getIndexedDBStoreForImages(indexedDBStoreName);
			// CLEAR PREVIOUS NEWS UPDATE FORM DATA IMAGES
			await clear(setStore);

			// TRANSFER IMAGES TO ANOTHER STORE
			await transferServiceImagesBetweenIndexDBStores(
				service,
				storeName,
				indexedDBStoreName,
			);

			// PARSE DETAILS TO REDUX TYPE
			const parsedService = parseServiceToServiceFormData(service);

			// SET DATA TO UPDATE SLICES
			dispatch(setUpdatingState(true));
			dispatch(resetServiceUpdateError());
			dispatch(setAllServiceUpdateFormData(parsedService));
			dispatch(setServiceUIFormValues(parsedService));
		})(oldService);
	}, [services]);

	// CHECK IF DATA CHANGED BEFORE QUITING PAGE
	useServiceFormChangeCheck(oldService, data);

	// HANDLE ARRAY FIELDS
	const deleteTreatmentStage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();

		if (treatmentStages.length > 1) {
			dispatch(deleteServiceUpdateTreatmentStagesValue(index));
			dispatch(
				deleteModalState({
					index,
					modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN,
				}),
			);
		}
	};
	const addTreatmentStage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(addServiceUpdateTreatmentStagesValue());
		dispatch(
			addModalState({
				modalName: ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN,
			}),
		);
	};
	const deleteServiceType = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();

		dispatch(deleteServiceUpdateTypesValue(index));
		dispatch(
			deleteModalState({
				index,
				modalName: ServiceFormDataUIModalsStatesEnum.SERVICETYPESMODALISOPEN,
			}),
		);
	};
	const addServiceType = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();

		dispatch(setServiceTypeUpdateFormInitData());
		dispatch(
			addModalState({
				modalName: ServiceFormDataUIModalsStatesEnum.SERVICETYPESMODALISOPEN,
			}),
		);
	};
	const linkToUpdateServiceType = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number,
	) => {
		e.preventDefault();

		if (serviceTypes) {
			const serviceType = serviceTypes[index];
			dispatch(setServiceTypeUpdateFormDataOnLink(serviceType));
			router.push(`/admin/services/update/${id}/serviceType/${index}`);
		}
	};
	const deleteEmployee = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();

		dispatch(deleteServiceUpdateEmployeesValue(index));
		dispatch(
			deleteModalState({
				index,
				modalName: ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN,
			}),
		);
	};
	// HANDLE CHECKBOXES
	const handleServiceFormCheckbox = (
		e: React.ChangeEvent<HTMLInputElement>,
		checkboxName: ServiceFormDataUICheckboxesType,
	) => {
		const state = e.target.checked;
		dispatch(
			triggerServiceUICheckbox({
				checkboxName,
				state,
			}),
		);
	};
	// HANDLE MODAL STATES
	const setModalWindowState = (
		index: number,
		state: boolean,
		modalName: ServiceModalsStatesType,
	) => {
		dispatch(setModalState({ index, state, modalName }));
	};

	// HANDLE SUBMIT
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// SET ERROR ARRAY
		const errorsData: {
			error: FormInputError;
			id: ServiceHandleSubmitErrorIdType;
		}[] = [];
		// GET ARRAY OF DATA ENTRIES
		const entries = Object.entries(data);
		// SET ARRAYS FOR GROUPING FIELDS BY VALUE TYPES
		const stringFields: ServiceHandleSubmitStringKeysType[] = [
			ServiceFormDataEnum.TITLE,
			ServiceFormDataEnum.SHORTDESCRIPTION,
			ServiceFormDataEnum.MAINDESCRIPTION,
		];

		// FORM VALIDATION
		entries.forEach((entry) => {
			const entryKey = entry[0];
			// VALIDATION FOR STRING VALUES
			if (stringFields.includes(entryKey as ServiceHandleSubmitStringKeysType)) {
				const key = entry[0] as ServiceHandleSubmitStringKeysType;
				const value = entry[1] as string;

				if (!value) {
					// SET APPROPRIATE MESSAGE ERROR
					let message: string;
					switch (key) {
						case ServiceFormDataEnum.TITLE:
							message = "Заголовок обов'язковий";
							break;
						case ServiceFormDataEnum.SHORTDESCRIPTION:
							message = "Короткий опис обов'язковий";
							break;
						case ServiceFormDataEnum.MAINDESCRIPTION:
							message = "Головний опис обов'язковий";
							break;
					}

					dispatch(
						setBasicValueError({
							field: key,
							message,
						}),
					);

					errorsData.push({
						id: key,
						error: { message },
					});
				}
			}
			// VALIDATION FOR SERVICETYPES VALUE
			if (serviceTypesCheckbox) {
				if (
					entryKey === ServiceFormDataEnum.SERVICETYPESDESCRIPTION &&
					serviceTypesDescriptionCheckbox
				) {
					const value = entry[1] as string;

					if (!value) {
						const message = "Введіть опис";
						dispatch(
							setBasicValueError({
								field: entryKey,
								message,
							}),
						);

						errorsData.push({
							id: entryKey,
							error: { message },
						});
					}
				}
				if (entryKey === ServiceFormDataEnum.SERVICETYPES) {
					const value = entry[1] as ServiceTypeServiceFormData[];

					if (!value.length) {
						const message = "Добавте вид послуги";
						dispatch(
							setBasicValueError({
								field: entryKey,
								message,
							}),
						);

						errorsData.push({
							id: entryKey,
							error: { message },
						});
					}
				}
			}
			// VALIDATION FOR TREATMENTSTAGES VALUES
			if (entryKey === ServiceFormDataEnum.TREATMENTSTAGES) {
				const values = entry[1] as ServiceTreatmentStageBasicType[];

				values.forEach((stage, index) => {
					if (!stage[ServiceTreatmentStageEnum.TITLE]) {
						const message = "Введіть назву";
						errorsData.push({
							id: `${entryKey}_${ServiceTreatmentStageEnum.TITLE}_${index}`,
							error: { message },
						});
						dispatch(
							setServiceUpdateTreatmentStagesError({
								field: ServiceTreatmentStageEnum.TITLE,
								index,
								message,
							}),
						);
					}
					if (!stage[ServiceTreatmentStageEnum.DESCRIPTION]) {
						const message = "Введіть опис";
						errorsData.push({
							id: `${entryKey}_${ServiceTreatmentStageEnum.DESCRIPTION}_${index}`,
							error: { message },
						});
						dispatch(
							setServiceUpdateTreatmentStagesError({
								field: ServiceTreatmentStageEnum.DESCRIPTION,
								index,
								message,
							}),
						);
					}
				});
			}
			// VALIDATION FOR EMPLOYEES VALUES
			if (entryKey === ServiceFormDataEnum.EMPLOYEES) {
				const values = entry[1] as ServiceEmployeeFormData[];

				if (!values.length) {
					const message = "Добавте лікарів послуги";
					dispatch(
						setBasicValueError({
							field: entryKey,
							message,
						}),
					);

					errorsData.push({
						id: entryKey,
						error: { message },
					});
				}
			}
			// VALIDATION FOR IMAGE
			if (entryKey === ServiceFormDataEnum.IMAGE) {
				const value = entry[1] as string;
				const message = "Завантажте фото";

				if (!value) {
					dispatch(
						setBasicValueError({
							field: entryKey,
							message,
						}),
					);

					errorsData.push({
						id: entryKey,
						error: { message },
					});
				}
			}
		});
		// SCROLL TO ERROR INPUT
		if (errorsData.length) {
			// SCROLL TO INPUT
			if (errorsData[0].id === ServiceFormDataEnum.IMAGE) {
				(
					document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement
				).labels?.[0].scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			} else {
				(
					document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement
				).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
			return;
		}
		if (!image) return;

		const requestData: CreateServiceFormData = {
			title,
			shortDescription,
			treatmentStages: treatmentStages.map((stage, i) => {
				return { ...stage, order: i };
			}),
			mainDescription,
			serviceTypesDescription:
				serviceTypesCheckbox && serviceTypesDescriptionCheckbox
					? serviceTypesDescription
					: null,
			serviceTypes:
				serviceTypesCheckbox && serviceTypes
					? parseOrderedArrayToRequest(serviceTypes)
					: null,
			employees: parseOrderedArrayToRequest(employees),
			image,
		};

		const dataIsEqual = _.isEqual(requestData, oldData);

		// IF DATA HASN'T CHANGED SET ERROR AND RETURN
		if (dataIsEqual) {
			dispatch(setServiceUpdateError());
			return;
		}

		// SET ARRAY OF NAMES OF OLD IMAGES
		const oldImageNames: string[] = [];
		if (oldData?.image) oldImageNames.push(oldData.image);
		if (oldData?.serviceTypes)
			oldData.serviceTypes.forEach((type) => {
				oldImageNames.push(type.backgroundImg);
				type.details.images.forEach((image) =>
					oldImageNames.push(image[ImageFormDataEnum.IMAGE]),
				);
			});
		// SET ARRAY OF NAMES OF NEW IMAGES
		const newImageNames: string[] = [image];
		if (serviceTypes)
			serviceTypes.forEach((type) => {
				newImageNames.push(type.backgroundImg);
				type.details.images.forEach((image) =>
					newImageNames.push(image[ImageFormDataEnum.IMAGE]),
				);
			});

		const response = await dispatch(
			updateService({
				id,
				data: requestData,
				oldImageNames,
				newImageNames,
			}),
		);
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			// CLEAR DATA
			await clear(getIndexedDBStoreForImages(indexedDBStoreName));
			dispatch(resetServiceFromData());
			dispatch(resetServiceUIFormData());
			dispatch(setUpdatingState(false));
			router.push("./");
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.createServiceForm}>
			<div className={styles.minimalData}>
				<InputContainer
					label="Повна назва послуги"
					inputId={ServiceFormDataEnum.TITLE}
					value={title}
					error={errors[ServiceFormDataEnum.TITLE]}
					className={{
						inputContainer: styles.nameInputContainer,
					}}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: ServiceFormDataEnum.TITLE,
						})
					}
				/>
				<TextareaContainer
					label="Короткий опис послуги"
					inputId={ServiceFormDataEnum.SHORTDESCRIPTION}
					value={shortDescription}
					error={errors[ServiceFormDataEnum.SHORTDESCRIPTION]}
					className={{
						inputContainer: styles.textareaContainer,
					}}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: ServiceFormDataEnum.SHORTDESCRIPTION,
						})
					}
					minRows={3}
				/>

				<div className={styles.imageSection}>
					<p className={`title sm left ${styles.title}`}>Обгортка новини</p>
					<p className={`inputLabel ${styles.paragraph}`}>Завантажте фото</p>

					<ImageInputContainer
						inputId={ServiceFormDataEnum.IMAGE}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: ServiceFormDataEnum.IMAGE,
								oldValue: image,
							})
						}
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
				<p className={`title sm left`}>Етапи лікування</p>

				<div className={styles.treatmentStagesContainer}>
					{treatmentStages.map((treatmentStage, i) => {
						return (
							<div key={i}>
								<InputContainerWithTwoInputsWithDeleteBtn
									labelOne={`Етап ${i + 1}`}
									labelTwo="Короткий опис етапу"
									inputIdOne={`${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.TITLE}`}
									inputIdTwo={`${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.DESCRIPTION}`}
									valueOne={treatmentStage[ServiceTreatmentStageEnum.TITLE]}
									valueTwo={
										treatmentStage[ServiceTreatmentStageEnum.DESCRIPTION]
									}
									index={i}
									errorOne={
										errors[ServiceFormDataEnum.TREATMENTSTAGES][i][
											ServiceTreatmentStageEnum.TITLE
										]
									}
									errorTwo={
										errors[ServiceFormDataEnum.TREATMENTSTAGES][i][
											ServiceTreatmentStageEnum.DESCRIPTION
										]
									}
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
											ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN,
										);
									}}
									changeEventOne={(e) =>
										handleChange({
											e,
											arrIndex: i,
											elementType: `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.TITLE}`,
										})
									}
									changeEventTwo={(e) =>
										handleChange({
											e,
											arrIndex: i,
											elementType: `${ServiceFormDataEnum.TREATMENTSTAGES}_${ServiceTreatmentStageEnum.DESCRIPTION}`,
										})
									}
								/>

								{treatmentStagesModalIsOpen[i] && (
									<ModalWindow title="Ви дійсно бажаєте видалити цей етап?">
										<button
											className={`btn cancel`}
											onClick={() => {
												setModalWindowState(
													i,
													false,
													ServiceFormDataUIModalsStatesEnum.TREATMENTSTAGESMODALISOPEN,
												);
											}}
										>
											Скасувати видалення
										</button>
										<button
											onClick={(e) => {
												deleteTreatmentStage(e, i);
											}}
											className={`btn blue lg`}
										>
											Підтвердити
										</button>
									</ModalWindow>
								)}
							</div>
						);
					})}
				</div>

				<button
					onClick={addTreatmentStage}
					className={`btn blue xl ${styles.btn}`}
					type="button"
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
						textarea: styles.textarea,
					}}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: ServiceFormDataEnum.MAINDESCRIPTION,
						})
					}
					minRows={5}
				/>
			</div>

			<div className={styles.serviceTypes}>
				<FormElementContainerWithCheckbox
					label="Види послуги (опціонально*)"
					checkboxId={ServiceFormDataUICheckboxesEnum.SERVICETYPESCHECKBOX}
					isChecked={serviceTypesCheckbox}
					dependency={[serviceTypes, serviceTypesDescriptionCheckbox]}
					handleFunction={(e) =>
						handleServiceFormCheckbox(
							e,
							ServiceFormDataUICheckboxesEnum.SERVICETYPESCHECKBOX,
						)
					}
					className={{
						inputLabel: `title sm left ${styles.label}`,
					}}
				>
					<TextareaContainerWithCheckbox
						label="Опис видів послуги (опціонально*)"
						inputId={ServiceFormDataEnum.SERVICETYPESDESCRIPTION}
						value={serviceTypesDescription}
						isChecked={serviceTypesDescriptionCheckbox}
						error={errors[ServiceFormDataEnum.SERVICETYPESDESCRIPTION]}
						minRows={5}
						handleCheckbox={(e) =>
							handleServiceFormCheckbox(
								e,
								ServiceFormDataUICheckboxesEnum.SERVICETYPESDESCRIPTIONCHECKBOX,
							)
						}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: ServiceFormDataEnum.SERVICETYPESDESCRIPTION,
							})
						}
					/>

					{serviceTypes && !!serviceTypes.length && (
						<>
							<p className={`inputLabel ${styles.tableTitle}`}>
								Таблиця видів послуги
							</p>
							<CommonTable titles={serviceTypesTableTitles}>
								<DraggableAreaContainer<OrderedListServiceTypeInterface>
									handleDragEnd={handleDragEnd}
									dndContextId="ServiceTratmentTypesList"
									data={serviceTypesDragData}
									droppableAreaClassName={styles.mainBody}
								>
									{serviceTypes.map((serviceType, i) => {
										return (
											<DraggableElementContainer
												key={i}
												id={serviceType.orderId}
												hasDraggableArea={true}
											>
												<TableLine>
													<span>
														{serviceType[ServiceTypesEnum.TITLE]}
													</span>

													{serviceTypesModalIsOpen[i] && (
														<ModalWindow title="Ви дійсно бажаєте видалити цей етап?">
															<button
																className={`btn cancel`}
																onClick={() => {
																	setModalWindowState(
																		i,
																		false,
																		ServiceFormDataUIModalsStatesEnum.SERVICETYPESMODALISOPEN,
																	);
																}}
															>
																Скасувати видалення
															</button>
															<button
																onClick={(e) => {
																	deleteServiceType(e, i);
																}}
																className={`btn blue lg`}
															>
																Підтвердити
															</button>
														</ModalWindow>
													)}

													<span className={styles.tableLineOptions}>
														<button
															onClick={() =>
																setModalWindowState(
																	i,
																	true,
																	ServiceFormDataUIModalsStatesEnum.SERVICETYPESMODALISOPEN,
																)
															}
															type="button"
															className={`btn gray sm`}
														>
															Видалити
														</button>
														<button
															className={`btn blue sm`}
															onClick={(e) =>
																linkToUpdateServiceType(e, i)
															}
														>
															Змінити
														</button>
													</span>
												</TableLine>
											</DraggableElementContainer>
										);
									})}
								</DraggableAreaContainer>

								<p className={styles.tableUnderText}>Порядок збережено</p>
							</CommonTable>
							<p className={styles.dragReminder}>
								Затисніть та переміщуйте послуги, щоб отримати бажаний порядок
								послуг*
							</p>
						</>
					)}

					<Link
						className={`btn blue xl ${styles.btn} ${errors.serviceTypes.message ? styles.error : ""}`}
						href={`/admin/services/update/${id}/serviceType/${serviceTypes ? serviceTypes.length : 0}`}
						id={ServiceFormDataEnum.SERVICETYPES}
						onClick={(e) => {
							addServiceType(e);
							router.push(
								`/admin/services/update/${id}/serviceType/${serviceTypes ? serviceTypes.length : 0}`,
							);
						}}
					>
						{errors.serviceTypes.message
							? "Добавте вид послуги"
							: "Додати вид послуги"}
					</Link>
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
						ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN,
					)
				}
				handleDelete={(e: React.MouseEvent<HTMLButtonElement>, i: number) =>
					deleteEmployee(e, i)
				}
			/>

			<div className={styles.preview}>
				<p className={`title sm left ${styles.title}`}>Попередній перегляд</p>

				<SafeLink className={`btn blue sm`} href={`/admin/services/update/preview`}>
					Дивитись сторінку послуги
				</SafeLink>
			</div>

			<SubmitButton error={error.update} label="Підтвердити зміни" />
		</form>
	);
}
