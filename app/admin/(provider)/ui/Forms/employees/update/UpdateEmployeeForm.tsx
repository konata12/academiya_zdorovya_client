"use client";

import FormElementContainerWithCheckboxHookForm from "@/app/common_ui/form_components/InputContainers/HookForm/children/FormElementContainerWithCheckbox/FormElementContainerWithCheckbox";
import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithCheckbox/InputContainerWithCheckbox";
import InputContainerWithDeleteBtn from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithDeleteBtn/InputContainerWithDeleteBtn";
import React, { useEffect } from "react";
import styles from "./UpdateEmployeeForm.module.scss";
import {
	addEmployeeUpdateStringArrayValue,
	deleteEmployeeUpdateStringArrayValue,
	resetEmployeeUpdateForm,
	setAchivementsFirstValue,
	setAllEmployeeUpdateDataOnLink,
	setEmployeeUpdateBackgroundImgColor,
} from "@/app/utils/redux/employees/employeeUpdateFormSlice";
import {
	addModalState,
	deleteModalState,
	setEmployeeUIFormValues,
	setModalState,
	triggerEmployeeUICheckbox,
} from "@/app/utils/redux/employees/employeesFormUISlice";
import { clear } from "idb-keyval";
import {
	resetEmployeeUpdateError,
	setEmployeeUpdateError,
	updateEmployee,
} from "@/app/utils/redux/employees/employeesSlice";
import {
	CreateEmployeeFormData,
	Employee,
	EmployeesBackgroundImgColorEnum,
	EmployeesCheckboxesType,
	EmployeesFormDataEnum,
	EmployeesFormDataEnumType,
	EmployeesFormDataUICheckboxesEnum,
	EmployeesFormDataUIModalsStatesEnum,
	EmployeesModalsStatesType,
	EmployeeSocialMediaKeysType,
	EmployeeStringArrayKeysType,
	EmployeeStringKeysWithoutImageType,
	UpdateEmployeeRequestIsEuqalCheck,
} from "@/app/types/data/employees.type";
import { FormInputError } from "@/app/types/data/form.type";
import { fulfilled } from "@/app/services/response.service";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { ImageInputContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer";
import { RootState } from "@/app/utils/redux/store";
import { TextareaContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useEmployeeFormHandleChange } from "@/app/utils/hooks/admin/employeeForm/useEmployeeFormHandleChange";
import { useEmployeeFormSlice } from "@/app/utils/hooks/admin/employeeForm/useEmployeeFormSlice";
import { useParams, useRouter } from "next/navigation";

import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";
import PreviewEmployeeImage from "@/app/admin/(provider)/ui/Forms/employees/PreviewEmployeeImage/PreviewEmployeeImage";
import { transferImageBetweenIndexDBStores } from "@/app/services/indexedDB.service";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";

const storeName = "employee_images";
const updateStoreName = "employee_update_images";

export default function UpdateEmployeeFrom() {
	const { errors, ...data } = useAppSelector((state: RootState) => state.employeeUpdateForm);
	const {
		instagramCheckbox,
		facebookCheckbox,
		XCheckbox,
		youtubeCheckbox,
		achivementsCheckbox,

		workSpecialitysModalIsOpen,
		achivementsModalIsOpen,
	} = useAppSelector((state: RootState) => state.employeesFormUI);
	const { employees, error } = useAppSelector((state: RootState) => state.employees);

	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const handleChange = useEmployeeFormHandleChange(updateStoreName);
	const { setBasicValueError, setStringArrayValueError } =
		useEmployeeFormSlice(updateStoreName);

	const oldEmployee = employees.find((employee) => `${employee.id}` === id);

	// GET FORM VALUES FROM SLICE
	const {
		name,
		surname,
		position,
		description,
		degree,
		instagram,
		facebook,
		X,
		youtube,
		workSpecialities,
		achivements,
		backgroundImgColor,
		image,
	} = data;
	// CHECK IF DATA CHANGED
	let oldData: UpdateEmployeeRequestIsEuqalCheck | undefined = undefined;
	if (oldEmployee) {
		const { id, instagram, facebook, X, youtube, achivements, ...oldEmployeeData } =
			oldEmployee;
		oldData = {
			...oldEmployeeData,
			instagram: instagram && instagramCheckbox ? instagram : undefined,
			facebook: facebook && facebookCheckbox ? facebook : undefined,
			X: X && XCheckbox ? X : undefined,
			youtube: youtube && youtubeCheckbox ? youtube : undefined,
			achivements: achivements && achivementsCheckbox ? achivements : undefined,
		};
	}

	// UI Slice state reset
	useEffect(() => {
		// dispatch(setEmployeeUIFormValues(data))
		if (oldEmployee) {
			(async (employee: Employee) => {
				const {
					id,
					instagram,
					facebook,
					X,
					youtube,
					achivements,
					...employeeOtherData
				} = employee;
				const setStore = getIndexedDBStoreForImages(updateStoreName);
				// CLEAR PREVIOUS NEWS UPDATE FORM DATA IMAGES
				await clear(setStore);

				// TRANSFER IMAGES TO ANOTHER STORE
				await transferImageBetweenIndexDBStores(
					employee.image,
					storeName,
					updateStoreName,
				);

				// SET DATA TO UPDATE SLICES
				dispatch(resetEmployeeUpdateError());
				dispatch(setAllEmployeeUpdateDataOnLink(employee));

				dispatch(
					setEmployeeUIFormValues({
						...employeeOtherData,
						instagram: instagram ? instagram : undefined,
						facebook: facebook ? facebook : undefined,
						X: X ? X : undefined,
						youtube: youtube ? youtube : undefined,
						achivements: achivements ? achivements : undefined,
					}),
				);
			})(oldEmployee);
		}
	}, [employees]);

	// CHECK IF FORM DATA IS DEFAULT
	useFormChangeCheck(oldData, data);

	const handleSocialMediaCheckbox = (
		e: React.ChangeEvent<HTMLInputElement>,
		checkboxName: EmployeesCheckboxesType,
	) => {
		const state = e.target.checked;
		dispatch(triggerEmployeeUICheckbox({ checkboxName, state }));
	};
	// HANDLE ARRAY FIELDS
	const deleteWorkSpeciality = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();

		if (workSpecialities.length > 1) {
			dispatch(
				deleteEmployeeUpdateStringArrayValue({
					index,
					field: EmployeesFormDataEnum.WORKSPECIALITIES,
				}),
			);
			dispatch(
				deleteModalState({
					index,
					modalName: EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN,
				}),
			);
		}
	};
	const addWorkSpeciality = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(addEmployeeUpdateStringArrayValue(EmployeesFormDataEnum.WORKSPECIALITIES));
		dispatch(
			addModalState({
				modalName: EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN,
			}),
		);
	};
	const deleteAchivement = (index: number) => {
		if (achivements && achivements.length > 1) {
			dispatch(
				deleteEmployeeUpdateStringArrayValue({
					index,
					field: EmployeesFormDataEnum.ACHIVEMENTS,
				}),
			);
			dispatch(
				deleteModalState({
					index,
					modalName: EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALISOPEN,
				}),
			);
		}
	};
	const addAchivement = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(addEmployeeUpdateStringArrayValue(EmployeesFormDataEnum.ACHIVEMENTS));
		dispatch(
			addModalState({
				modalName: EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALISOPEN,
			}),
		);
	};
	const handleAchievmentsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(
			triggerEmployeeUICheckbox({
				checkboxName: EmployeesFormDataUICheckboxesEnum.ACHIVEMENTSCHECKBOX,
				state,
			}),
		);
		if (state && !achivements) {
			dispatch(setAchivementsFirstValue());
		}
	};
	// HANDLE MODAL STATES
	const setModalWindowState = (
		index: number,
		state: boolean,
		modalName: EmployeesModalsStatesType,
	) => {
		dispatch(setModalState({ index, state, modalName }));
	};

	// CREATE EMPLOYEE FUNCTION
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log("handleSubmit");
		e.preventDefault();

		// SET ERROR ARRAY
		const errorsData: {
			error: FormInputError;
			id:
				| Exclude<EmployeesFormDataEnumType, EmployeeStringArrayKeysType>
				| `${EmployeesFormDataEnum.WORKSPECIALITIES}_${number}`
				| `${EmployeesFormDataEnum.ACHIVEMENTS}_${number}`;
		}[] = [];
		// GET ARRAY OF DATA ENTRIES
		const entries = Object.entries(data);
		// SET ARRAYS FOR GROUPING FIELDS BY VALUE TYPES
		const stringFields: EmployeeStringKeysWithoutImageType[] = [
			EmployeesFormDataEnum.NAME,
			EmployeesFormDataEnum.SURNAME,
			EmployeesFormDataEnum.POSITION,
			EmployeesFormDataEnum.DESCRIPTION,
			EmployeesFormDataEnum.DEGREE,
		];

		// FORM VALIDATION
		entries.forEach((entry) => {
			const entryKey = entry[0];
			// VALIDATION FOR STRING VALUES
			if (stringFields.includes(entryKey as EmployeeStringKeysWithoutImageType)) {
				const key = entry[0] as EmployeeStringKeysWithoutImageType;
				const value = entry[1] as string;

				if (!value) {
					// SET APPROPRIATE MESSAGE ERROR
					let message: string;
					switch (key) {
						case EmployeesFormDataEnum.NAME:
							message = "Ім'я обов'язкове";
							break;
						case EmployeesFormDataEnum.SURNAME:
							message = "Прізвище обов'язкове";
							break;
						case EmployeesFormDataEnum.POSITION:
							message = "Посада обов'язкова";
							break;
						case EmployeesFormDataEnum.DESCRIPTION:
							message = "Короткий опис обов'язковий";
							break;
						case EmployeesFormDataEnum.DEGREE:
							message = "Інформація про освіту та практику обов'язкова";
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
			// VALIDATION FOR SOCIAL MEDIA VALUES (only if checkbox is checked)
			else if (
				(entryKey === EmployeesFormDataEnum.INSTAGRAM && instagramCheckbox) ||
				(entryKey === EmployeesFormDataEnum.FACEBOOK && facebookCheckbox) ||
				(entryKey === EmployeesFormDataEnum.X && XCheckbox) ||
				(entryKey === EmployeesFormDataEnum.YOUTUBE && youtubeCheckbox)
			) {
				const key = entry[0] as EmployeeSocialMediaKeysType;
				const value = entry[1] as string;

				if (!value) {
					const message = "Будь ласка, введіть посилання";
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
			// VALIDATION FOR STRING ARRAY VALUES
			else if (
				entryKey === EmployeesFormDataEnum.WORKSPECIALITIES ||
				(entryKey === EmployeesFormDataEnum.ACHIVEMENTS && achivementsCheckbox)
			) {
				const values = entry[1] as string[];
				let message: string = "Введіть напрямок діяльності";
				switch (entryKey) {
					case EmployeesFormDataEnum.WORKSPECIALITIES:
						message = "Введіть напрямок діяльності";
						break;
					case EmployeesFormDataEnum.ACHIVEMENTS:
						message = "Введіть досягнення";
						break;
				}

				values.forEach((speciality, index) => {
					if (!speciality) {
						dispatch(
							setStringArrayValueError({
								field: entryKey,
								index,
								message,
							}),
						);

						errorsData.push({
							id: `${entryKey}_${index}`,
							error: { message },
						});
					}
				});
			}
			// VALIDATION FOR IMAGE
			else if (entryKey === EmployeesFormDataEnum.IMAGE) {
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
		if (errors[EmployeesFormDataEnum.IMAGE].message) {
			errorsData.push({
				id: EmployeesFormDataEnum.IMAGE,
				error: errors[EmployeesFormDataEnum.IMAGE],
			});
		}

		// SCROLL TO ERROR INPUT
		if (errorsData.length) {
			console.log(errorsData);
			// SCROLL TO INPUT
			if (errorsData[0].id === EmployeesFormDataEnum.IMAGE) {
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

		const dataIsEuqal = _.isEqual(data, oldData);

		// IF DATA HASN'T CHANGED SET ERROR AND RETURN
		if (dataIsEuqal) {
			dispatch(setEmployeeUpdateError());
			return;
		}

		const requestData: CreateEmployeeFormData = {
			name,
			surname,
			position,
			description,
			degree,
			instagram: instagramCheckbox ? instagram : undefined,
			facebook: facebookCheckbox ? facebook : undefined,
			X: XCheckbox ? X : undefined,
			youtube: youtubeCheckbox ? youtube : undefined,
			workSpecialities,
			achivements: achivementsCheckbox ? achivements : undefined,
			backgroundImgColor,
			image,
		};

		const response = await dispatch(
			updateEmployee({
				oldImageName: oldData?.image,
				data: requestData,
				id,
			}),
		);
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			// CLEAR DATA
			clear(getIndexedDBStoreForImages(updateStoreName));
			dispatch(resetEmployeeUpdateForm());
			router.push("../");
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.createEmployeeForm}>
			<div className={styles.inputs}>
				<div className={styles.mainInfo}>
					<div className={styles.fullName}>
						<InputContainer
							label="Ім'я"
							inputId={EmployeesFormDataEnum.NAME}
							value={name}
							error={errors[EmployeesFormDataEnum.NAME]}
							className={{
								inputContainer: styles.nameInputContainer,
							}}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.NAME,
								})
							}
						/>
						<InputContainer
							label="Прізвище"
							inputId={EmployeesFormDataEnum.SURNAME}
							value={surname}
							error={errors[EmployeesFormDataEnum.SURNAME]}
							className={{
								inputContainer: styles.surnameInputContainer,
							}}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.SURNAME,
								})
							}
						/>
					</div>

					<InputContainer
						label="Посада"
						inputId={EmployeesFormDataEnum.POSITION}
						value={position}
						error={errors[EmployeesFormDataEnum.POSITION]}
						className={{
							inputContainer: styles.surnameInputContainer,
						}}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: EmployeesFormDataEnum.POSITION,
							})
						}
					/>
					<InputContainer
						label="Коротко про лікаря"
						inputId={EmployeesFormDataEnum.DESCRIPTION}
						value={description}
						error={errors[EmployeesFormDataEnum.DESCRIPTION]}
						className={{
							inputContainer: styles.surnameInputContainer,
						}}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: EmployeesFormDataEnum.DESCRIPTION,
							})
						}
					/>
				</div>

				<div className={styles.socialMedia}>
					<p className="title sm left">Посилання на соц. мережі</p>

					<div className={styles.socialMediaCheckboxes}>
						<InputContainerWithCheckbox
							label={"Instagram"}
							inputId={EmployeesFormDataEnum.INSTAGRAM}
							value={instagram}
							isChecked={instagramCheckbox}
							error={errors[EmployeesFormDataEnum.INSTAGRAM]}
							handleCheckbox={(e) =>
								handleSocialMediaCheckbox(
									e,
									EmployeesFormDataUICheckboxesEnum.INSTAGRAMCHECKBOX,
								)
							}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.INSTAGRAM,
								})
							}
						/>
						<InputContainerWithCheckbox
							label={"Facebook"}
							inputId={EmployeesFormDataEnum.FACEBOOK}
							value={facebook}
							isChecked={facebookCheckbox}
							error={errors[EmployeesFormDataEnum.FACEBOOK]}
							handleCheckbox={(e) =>
								handleSocialMediaCheckbox(
									e,
									EmployeesFormDataUICheckboxesEnum.FACEBOOKCHECKBOX,
								)
							}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.FACEBOOK,
								})
							}
						/>
						<InputContainerWithCheckbox
							label={"X / Twitter"}
							inputId={EmployeesFormDataEnum.X}
							value={X}
							isChecked={XCheckbox}
							error={errors[EmployeesFormDataEnum.X]}
							handleCheckbox={(e) =>
								handleSocialMediaCheckbox(
									e,
									EmployeesFormDataUICheckboxesEnum.XCHECKBOX,
								)
							}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.X,
								})
							}
						/>
						<InputContainerWithCheckbox
							label={"Youtube"}
							inputId={EmployeesFormDataEnum.YOUTUBE}
							value={youtube}
							isChecked={youtubeCheckbox}
							error={errors[EmployeesFormDataEnum.YOUTUBE]}
							handleCheckbox={(e) =>
								handleSocialMediaCheckbox(
									e,
									EmployeesFormDataUICheckboxesEnum.YOUTUBECHECKBOX,
								)
							}
							changeEvent={(e) =>
								handleChange({
									e,
									elementType: EmployeesFormDataEnum.YOUTUBE,
								})
							}
						/>
					</div>
				</div>

				<div className={styles.degree}>
					<p className="title sm left">Освіта та практика</p>

					<TextareaContainer
						label="Освіта та практика"
						inputId={EmployeesFormDataEnum.DEGREE}
						value={degree}
						error={errors[EmployeesFormDataEnum.DEGREE]}
						className={{
							inputLabel: styles.label,
							textarea: styles.textarea,
						}}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: EmployeesFormDataEnum.DEGREE,
							})
						}
						minRows={5}
					/>
				</div>

				<div className={styles.workSpecialities}>
					<p className={`title sm left ${styles.label}`}>
						Основні напрямки діяльності
					</p>

					<div className={styles.workSpecialitiesContainer}>
						{workSpecialities.map((speciality, i) => {
							return (
								<div key={i}>
									<InputContainerWithDeleteBtn
										label={`Напрямок ${i + 1}`}
										inputId={EmployeesFormDataEnum.WORKSPECIALITIES}
										value={speciality}
										index={i}
										error={
											errors[EmployeesFormDataEnum.WORKSPECIALITIES][i]
										}
										className={{
											inputContainer: styles.surnameInputContainer,
										}}
										handleDelete={() => {
											setModalWindowState(
												i,
												true,
												EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN,
											);
										}}
										changeEvent={(e) =>
											handleChange({
												e,
												arrIndex: i,
												elementType:
													EmployeesFormDataEnum.WORKSPECIALITIES,
											})
										}
									/>

									{workSpecialitysModalIsOpen[i] && (
										<ModalWindow title="Ви дійсно бажаєте видалити це відділеня?">
											<button
												className={`btn cancel`}
												onClick={() => {
													setModalWindowState(
														i,
														false,
														EmployeesFormDataUIModalsStatesEnum.WORKSPECIALITYSMODALISOPEN,
													);
												}}
											>
												Скасувати видалення
											</button>
											<button
												onClick={(e) => {
													deleteWorkSpeciality(e, i);
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
						onClick={addWorkSpeciality}
						className={`btn blue xl ${styles.btn}`}
						type="button"
					>
						Додати напрям
					</button>
				</div>

				<div className={styles.achivements}>
					<FormElementContainerWithCheckboxHookForm
						label="Досягнення за час роботи (опціонально*)"
						checkboxId={EmployeesFormDataEnum.ACHIVEMENTS}
						isChecked={achivementsCheckbox}
						handleFunction={(e) => handleAchievmentsCheckbox(e)}
						className={{
							inputLabel: `title sm left ${styles.label}`,
						}}
					>
						<div className={styles.workSpecialitiesContainer}>
							{achivements &&
								achivements.map((achivement, i) => {
									return (
										<div key={i}>
											<InputContainerWithDeleteBtn
												label={`Напрямок ${i + 1}`}
												inputId={EmployeesFormDataEnum.ACHIVEMENTS}
												value={achivement}
												index={i}
												error={
													errors[EmployeesFormDataEnum.ACHIVEMENTS][
														i
													]
												}
												className={{
													inputContainer:
														styles.surnameInputContainer,
												}}
												handleDelete={() => {
													setModalWindowState(
														i,
														true,
														EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALISOPEN,
													);
												}}
												changeEvent={(e) =>
													handleChange({
														e,
														arrIndex: i,
														elementType:
															EmployeesFormDataEnum.ACHIVEMENTS,
													})
												}
											/>

											{achivementsModalIsOpen[i] && (
												<ModalWindow title="Ви дійсно бажаєте видалити це відділеня?">
													<button
														className={`btn cancel`}
														onClick={() => {
															setModalWindowState(
																i,
																false,
																EmployeesFormDataUIModalsStatesEnum.ACHIVEMENTSISMODALISOPEN,
															);
														}}
													>
														Скасувати видалення
													</button>
													<button
														onClick={() => {
															deleteAchivement(i);
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
							onClick={addAchivement}
							className={`btn blue xl ${styles.btn}`}
							type="button"
						>
							Додати досягнення
						</button>
					</FormElementContainerWithCheckboxHookForm>
				</div>

				<div className={styles.image}>
					<p className={`title sm left ${styles.sectionLabel}`}>Фото</p>

					<div className={styles.checkboxContainer}>
						<p className="inputLabel">Колір фону</p>
						<div className={styles.fullCheckbox}>
							<Checkbox
								isChecked={
									backgroundImgColor === EmployeesBackgroundImgColorEnum.BLUE
								}
								handleFunction={() => {
									const newColor =
										backgroundImgColor ===
										EmployeesBackgroundImgColorEnum.BLUE
											? EmployeesBackgroundImgColorEnum.GREY
											: EmployeesBackgroundImgColorEnum.BLUE;
									dispatch(setEmployeeUpdateBackgroundImgColor(newColor));
								}}
								className={{
									label: styles.checkbox,
								}}
							/>

							<div className={styles.checkboxLabels}>
								<span>Сірий</span>
								<span>Синій</span>
							</div>
						</div>
					</div>

					<p className={`inputLabel ${styles.inputLabel}`}>
						{"Завантажте фото (без фону, в форматі:  .png)"}
					</p>

					<ImageInputContainer
						inputId={EmployeesFormDataEnum.IMAGE}
						changeEvent={(e) =>
							handleChange({
								e,
								elementType: EmployeesFormDataEnum.IMAGE,
								oldValue: image,
							})
						}
					>
						<PreviewEmployeeImage
							image={image}
							error={errors[EmployeesFormDataEnum.IMAGE]}
							indexedDBStoreName={updateStoreName}
							backgroundImgColor={backgroundImgColor}
						/>
					</ImageInputContainer>
				</div>
			</div>

			<SubmitButton error={error.update} label="Підтвердити зміни" />
		</form>
	);
}
