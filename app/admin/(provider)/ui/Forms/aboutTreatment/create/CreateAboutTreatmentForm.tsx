"use client";

import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import styles from "./CreateAboutTreatmentForm.module.scss";
import {
	AboutTreatmentEnum,
	CreateAboutTreatmentFormData,
} from "@/app/types/data/about_treatment.type";
import {
	addAboutTreatmentCreateTreatmentType,
	deleteAboutTreatmentCreateTreatmentType,
	resetAboutTreatmentCreateForm,
	setAboutTreatmentCreateBasicValueError,
	setAboutTreatmentCreateTreatmentTypesValueError,
} from "@/app/utils/redux/about_treatment/aboutTreatmentCreateFormSlice";
import {
	addTreatmentTypeModal,
	closeTreatmentTypeModal,
	deleteTreatmentTypeModal,
	openTreatmentTypeModal,
	setAboutTreatmentsFormUISliceDefaultValues,
} from "@/app/utils/redux/about_treatment/aboutTreatmentsFormUISlice";
import { clear } from "idb-keyval";
import { createAboutTreatment as createAboutTreatmentAction } from "@/app/utils/redux/about_treatment/aboutTreatmentSlice";
import { FormInputError } from "@/app/types/data/form.type";
import { fulfilled } from "@/app/services/response.service";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { ImageInputContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer";
import { RootState } from "@/app/utils/redux/store";
import { useAboutTreatmentFormHandleChange } from "@/app/utils/hooks/admin/aboutTreatmentForm/useAboutTreatmentFormHandleChange";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useRouter } from "next/navigation";

import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import PreviewAboutTreatmentImage from "@/app/admin/(provider)/ui/Forms/aboutTreatment/PreviewAboutTreatmentImage/PreviewAboutTreatmentImage";
import { useEffect } from "react";

const indexedDBStoreName = "about_treatment_create_images";

export default function CreateAboutTreatmentForm() {
	const { title, treatmentTypes, image, errors } = useAppSelector(
		(state: RootState) => state.aboutTreatmentCreateForm,
	);
	const { treatmentTypesModalIsOpen } = useAppSelector(
		(state: RootState) => state.aboutTreatmentsFormUI,
	);
	const { error } = useAppSelector((state: RootState) => state.aboutTreatment);

	const handleChange = useAboutTreatmentFormHandleChange(indexedDBStoreName);
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setAboutTreatmentsFormUISliceDefaultValues(1));
	}, []);

	// TREATMENT TYPES FUNCTIONS
	const addTreatmentType = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(addAboutTreatmentCreateTreatmentType()); // Append a new title object
		dispatch(addTreatmentTypeModal());
	};
	const deleteTreatmentType = (i: number) => {
		dispatch(deleteTreatmentTypeModal({ index: i }));
		dispatch(deleteAboutTreatmentCreateTreatmentType(i));
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
				setAboutTreatmentCreateBasicValueError({
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
						setAboutTreatmentCreateTreatmentTypesValueError({
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
				setAboutTreatmentCreateBasicValueError({
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

		const response = await dispatch(createAboutTreatmentAction(data));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			// CLEAR DATA
			clear(getIndexedDBStoreForImages(indexedDBStoreName));
			dispatch(resetAboutTreatmentCreateForm());
			router.push("./");
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
						indexedDBStoreName={indexedDBStoreName}
					/>
				</ImageInputContainer>
			</div>

			<SubmitButton error={error.create} />
		</form>
	);
}
