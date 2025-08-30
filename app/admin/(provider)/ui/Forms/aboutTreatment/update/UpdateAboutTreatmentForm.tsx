"use client";

import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import styles from "./UpdateAboutTreatmentForm.module.scss";
import {
	AboutTreatment,
	AboutTreatmentEnum,
	CreateAboutTreatmentFormData,
} from "@/app/types/data/about_treatment.type";
import {
	addTreatmentTypeModal,
	closeTreatmentTypeModal,
	deleteTreatmentTypeModal,
	openTreatmentTypeModal,
	setAboutTreatmentsFormUISliceDefaultValues,
} from "@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice";
import {
	resetAboutTreatmentUpdateError,
	setAboutTreatmentUpdateError,
	updateAboutTreatment,
} from "@/app/utils/redux/about_treatment/aboutTreatmentSlice";
import { FormInputError } from "@/app/types/data/form.type";
import { fulfilled } from "@/app/services/admin/response.service";
import { RootState } from "@/app/utils/redux/store";
import { useAboutTreatmentFormHandleChange } from "@/app/utils/hooks/admin/aboutTreatmentForm/useAboutTreatmentFormHandleChange";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useParams, useRouter } from "next/navigation";

import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import { ImageInputContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer";
import PreviewAboutTreatmentImage from "@/app/admin/(provider)/ui/Forms/aboutTreatment/PreviewAboutTreatmentImage/PreviewAboutTreatmentImage";
import { clear } from "idb-keyval";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import {
	addAboutTreatmentUpdateTreatmentType,
	deleteAboutTreatmentUpdateTreatmentType,
	resetAboutTreatmentUpdateForm,
	setAboutTreatmentUpdateBasicValueError,
	setAboutTreatmentUpdateTreatmentTypesValueError,
	setAllAboutTreatmentDataOnLink,
} from "@/app/utils/redux/about_treatment/aboutTreatmentUpdateFormSlice";
import { useEffect } from "react";
import { transferImageBetweenIndexDBStores } from "@/app/services/admin/indexedDB.service";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";

const storeName = "about_treatment_images";
const updateStoreName = "about_treatment_update_images";

export default function UpdateAboutTreatmentForm() {
	const { errors, ...data } = useAppSelector(
		(state: RootState) => state.aboutTreatmentUpdateForm,
	);
	const { treatmentTypesModalIsOpen } = useAppSelector(
		(state: RootState) => state.aboutTreatmentsFormUI,
	);
	const { aboutTreatments, error } = useAppSelector(
		(state: RootState) => state.aboutTreatment,
	);

	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const handleChange = useAboutTreatmentFormHandleChange(updateStoreName);

	const oldAboutTreatment = aboutTreatments.find(
		(aboutTreatment) => `${aboutTreatment.id}` === id,
	);
	// GET FORM VALUES FROM SLICE
	const { title, treatmentTypes, image } = data;
	// CHECK IF DATA CHANGED
	let oldData: CreateAboutTreatmentFormData | undefined = undefined;
	if (oldAboutTreatment) {
		const { id, ...oldNewsData } = oldAboutTreatment;
		oldData = oldNewsData;
	}

	// LOAD DATA TO FORM AND LOAD IMAGE TO UPLOAD STORE
	useEffect(() => {
		dispatch(
			setAboutTreatmentsFormUISliceDefaultValues(
				oldAboutTreatment?.treatmentTypes.length || 1,
			),
		);
		if (oldAboutTreatment) {
			(async (aboutTreatment: AboutTreatment) => {
				const setStore = getIndexedDBStoreForImages(updateStoreName);
				// CLEAR PREVIOUS NEWS UPDATE FORM DATA IMAGES
				await clear(setStore);

				// TRANSFER IMAGES TO ANOTHER STORE
				await transferImageBetweenIndexDBStores(
					aboutTreatment.image,
					storeName,
					updateStoreName,
				);

				// SET DATA TO UPDATE SLICES
				dispatch(resetAboutTreatmentUpdateError());
				dispatch(setAllAboutTreatmentDataOnLink(aboutTreatment));
			})(oldAboutTreatment);
		}
	}, [aboutTreatments]);

	// CHECK IF FORM DATA IS DEFAULT
	useFormChangeCheck(oldData, data);

	// TREATMENT TYPES FUNCTIONS
	const addTreatmentType = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(addAboutTreatmentUpdateTreatmentType()); // Append a new title object
		dispatch(addTreatmentTypeModal());
	};
	const deleteTreatmentType = (i: number) => {
		dispatch(deleteTreatmentTypeModal({ index: i }));
		dispatch(deleteAboutTreatmentUpdateTreatmentType(i));
	};
	const openTreatmentTypeModalWindow = (
		e: React.MouseEvent<HTMLButtonElement>,
		i: number,
	) => {
		e.preventDefault();
		dispatch(openTreatmentTypeModal(i));
	};
	const closeTreatmentTypeModalWindow = (
		e: React.MouseEvent<HTMLButtonElement>,
		i: number,
	) => {
		e.preventDefault();
		dispatch(closeTreatmentTypeModal(i));
	};

	// CREATE ABOUT TREATMENT FUNCTION
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorsData: {
			error: FormInputError;
			id:
				| `${AboutTreatmentEnum.TREATMENTTYPES}_${number}`
				| AboutTreatmentEnum.TITLE
				| AboutTreatmentEnum.IMG;
		}[] = [];

		// FORM VALIDATION
		if (!title.length) {
			dispatch(
				setAboutTreatmentUpdateBasicValueError({
					field: AboutTreatmentEnum.TITLE,
					message: "Введіть повну назву",
				}),
			);

			errorsData.push({
				id: AboutTreatmentEnum.TITLE,
				error: { message: "Введіть повну назву" },
			});
		}
		if (treatmentTypes.length) {
			treatmentTypes.forEach((treatmentType, index) => {
				if (!treatmentType.length) {
					dispatch(
						setAboutTreatmentUpdateTreatmentTypesValueError({
							index,
							message: "Введіть тип послуги",
						}),
					);

					errorsData.push({
						id: `${AboutTreatmentEnum.TREATMENTTYPES}_${index}`,
						error: { message: "Введіть тип послуги" },
					});
				}
			});
		}
		if (!image) {
			dispatch(
				setAboutTreatmentUpdateBasicValueError({
					field: AboutTreatmentEnum.IMG,
					message: "Добавте зображення",
				}),
			);

			// SCROLL TO INPUT
			errorsData.push({
				id: AboutTreatmentEnum.IMG,
				error: { message: "Добавте зображення" },
			});
		}
		if (errors[AboutTreatmentEnum.IMG].message) {
			errorsData.push({
				id: AboutTreatmentEnum.IMG,
				error: errors[AboutTreatmentEnum.IMG],
			});
		}

		// SCROLL TO ERROR INPUT
		if (errorsData.length) {
			console.log(errorsData);
			// SCROLL TO INPUT
			if (errorsData[0].id === AboutTreatmentEnum.IMG) {
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

		const data: CreateAboutTreatmentFormData = {
			title,
			treatmentTypes,
			image,
		};
		console.log("data: ", data);

		const dataIsEuqal = _.isEqual(data, oldData);

		// IF DATA HASN'T CHANGED SET ERROR AND RETURN
		if (dataIsEuqal) {
			dispatch(setAboutTreatmentUpdateError());
			return;
		}

		const response = await dispatch(
			updateAboutTreatment({
				oldImageName: oldData?.image,
				data,
				id,
			}),
		);
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			// CLEAR DATA
			clear(getIndexedDBStoreForImages(updateStoreName));
			dispatch(resetAboutTreatmentUpdateForm());
			router.push("../");
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<InputContainer
				label="Повна назва послуги"
				inputId={AboutTreatmentEnum.TITLE}
				value={title}
				error={errors[AboutTreatmentEnum.TITLE]}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: AboutTreatmentEnum.TITLE,
					})
				}
			/>

			<div className={styles.treatmentTypes}>
				<p className={`title left sm ${styles.title}`}>Що включає послуга</p>

				{treatmentTypes.map((treatmentType, i) => {
					return (
						<div className={styles.treatmentType} key={i}>
							<div className={styles.top}>
								<p className="inputLabel">Рядок {i + 1}</p>

								{!!i && (
									<button
										onClick={(e) => {
											openTreatmentTypeModalWindow(e, i);
										}}
										className={`btn blue sm`}
									>
										Видалити
									</button>
								)}
							</div>
							<InputContainer
								inputId={`${AboutTreatmentEnum.TREATMENTTYPES}_${i}`}
								value={treatmentType}
								error={errors[AboutTreatmentEnum.TREATMENTTYPES][i]}
								className={{
									input: `input ${styles.treatmentTypeInput} ${errors[AboutTreatmentEnum.TREATMENTTYPES]?.[i].message && "wrong"}`,
								}}
								changeEvent={(e) =>
									handleChange({
										e,
										elementType: AboutTreatmentEnum.TREATMENTTYPES,
										arrIndex: i,
									})
								}
							/>
							{treatmentTypesModalIsOpen[i] && (
								<ModalWindow title="Ви дійсно бажаєте видалити цей рядок?">
									<button
										className={`btn cancel`}
										onClick={(e) => {
											closeTreatmentTypeModalWindow(e, i);
										}}
									>
										Скасувати видалення
									</button>
									<button
										onClick={() => {
											deleteTreatmentType(i);
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

				<button
					className={`btn blue xl ${styles.addType}`}
					type="button"
					onClick={addTreatmentType} // Append a new field with an empty string
				>
					Додати рядок
				</button>
			</div>

			<div className={styles.addPhoto}>
				<p className={`title left sm ${styles.title}`}>Фото для детального варіанту</p>
				<p className={`inputLabel ${styles.label}`}>
					{"Завантажте фото (без фону, в форматі:  .png)"}
				</p>

				<ImageInputContainer
					inputId={AboutTreatmentEnum.IMG}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: AboutTreatmentEnum.IMG,
							oldValue: image,
						})
					}
				>
					<PreviewAboutTreatmentImage
						image={image}
						error={errors[AboutTreatmentEnum.IMG]}
						indexedDBStoreName={updateStoreName}
					/>
				</ImageInputContainer>
			</div>

			<SubmitButton error={error.update} label="Підтвердити зміни" />
		</form>
	);
}
