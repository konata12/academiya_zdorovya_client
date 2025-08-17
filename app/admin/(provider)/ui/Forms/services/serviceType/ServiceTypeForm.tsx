import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import React, { useEffect } from "react";
import styles from "./ServiceTypeForm.module.scss";
import { ErrorWrapper } from "@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper";
import { FormInputError } from "@/app/types/data/form.type";
import { ImageInputContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputContainer";
import { ImageInputPreviewFromIndexedDB } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/ImageInputContainer/ImageInputPreviewFromIndexedDB/ImageInputPreviewFromIndexedDB";
import { parseDetailsResponseToOrderComponentArray } from "@/app/services/details.service";
import { RootState } from "@/app/utils/redux/store";
import {
	ServiceTypesDetailsSliceNameType,
	ServiceTypesEnum,
	ServiceTypesEnumType,
	ServiceTypeServiceFormData,
	ServiceTypesSliceNameType,
} from "@/app/types/data/services.type";
import { TextareaContainer } from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/TextareaContainer/TextareaContainer";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useServiceTypeFormHandleChange } from "@/app/utils/hooks/admin/serviceForm/useServiceTypeFormHandleChange";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import { useServiceTypeFormSlice } from "@/app/utils/hooks/admin/serviceForm/useServiceTypeFormSlice";
import Link from "next/link";
import { useServiceFormsDataCheckChange } from "@/app/utils/hooks/admin/serviceForm/useServiceFormsDataCheckChange";
import { useServiceTypeSetDetailsInitValue } from "@/app/utils/hooks/admin/serviceForm/useServiceTypeSetDetailsInitValue";

interface ServiceTypeFormProps {
	sliceName: ServiceTypesSliceNameType;
	detailsSliceName: ServiceTypesDetailsSliceNameType;
}

const titles = ["Стан вмісту", "Опції"];

export default function ServiceTypeForm({
	sliceName,
	detailsSliceName,
}: ServiceTypeFormProps) {
	const { orderId, errors, ...data } = useAppSelector(
		(state: RootState) => state[sliceName],
	);
	const { services } = useAppSelector((state: RootState) => state.services);
	const router = useRouter();
	const pathname = usePathname();
	const { id, serviceTypeIndex } = useParams<{
		id: string;
		serviceTypeIndex: string;
	}>();
	const dispatch = useAppDispatch();

	const isCreatePage = pathname.includes("create");
	const indexedDBStoreName = isCreatePage
		? "service_create_images"
		: "service_update_images";
	const { title, description, backgroundImg, details } = data;

	const handleChange = useServiceTypeFormHandleChange(
		indexedDBStoreName,
		detailsSliceName,
	);
	const { setServiceTypesValue, setServiceTypeDetailsInitialDataOnLink } =
		useServiceTypeFormSlice(detailsSliceName);
	const { setFormError } = useDetailsFormSlice(detailsSliceName);

	// WHEN OPENING PAGE SET DETAILS SLICE DATA
	useEffect(() => {
		const parsedDetails = details
			? parseDetailsResponseToOrderComponentArray(details)
			: [];
		dispatch(setServiceTypeDetailsInitialDataOnLink(parsedDetails));
	}, []);

	// CHECK FORM CHANGED DATA BEFORE CHANGING PAGE
	if (!isCreatePage) useServiceFormsDataCheckChange();

	console.log({
		title,
		description,
		backgroundImg,
		details,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorsData: {
			error: FormInputError;
			id: ServiceTypesEnumType;
		}[] = [];

		// FORM VALIDATION
		if (!title.length) {
			dispatch(
				setFormError({
					field: ServiceTypesEnum.TITLE,
					message: "Введіть повну назву",
				}),
			);

			errorsData.push({
				id: ServiceTypesEnum.TITLE,
				error: { message: "Введіть повну назву" },
			});
		}
		if (!description.length) {
			dispatch(
				setFormError({
					field: ServiceTypesEnum.DESCRIPTION,
					message: "Введіть опис",
				}),
			);

			errorsData.push({
				id: ServiceTypesEnum.DESCRIPTION,
				error: { message: "Введіть опис" },
			});
		}
		if (!backgroundImg) {
			dispatch(
				setFormError({
					field: ServiceTypesEnum.BACKGROUNDIMG,
					message: "Добавте зображення",
				}),
			);

			// SCROLL TO INPUT
			errorsData.push({
				id: ServiceTypesEnum.BACKGROUNDIMG,
				error: { message: "Добавте зображення" },
			});
		}
		if (!details) {
			dispatch(
				setFormError({
					field: ServiceTypesEnum.DETAILS,
					message: "Створіть вміст послуги",
				}),
			);

			errorsData.push({
				id: ServiceTypesEnum.DETAILS,
				error: { message: "Створіть вміст послуги" },
			});
		}

		// SCROLL TO ERROR INPUT
		if (errorsData.length) {
			console.log(errorsData);
			// SCROLL TO INPUT
			if (errorsData[0].id === ServiceTypesEnum.BACKGROUNDIMG) {
				(
					document.querySelector(
						`#${errorsData[0].id}`,
					) as HTMLInputElement
				).labels?.[0].scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			} else {
				(
					document.querySelector(
						`#${errorsData[0].id}`,
					) as HTMLInputElement
				).scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
			return;
		}
		if (!details || !backgroundImg) return;

		const data: ServiceTypeServiceFormData = {
			orderId,
			title,
			description,
			backgroundImg,
			details,
		};

		dispatch(
			setServiceTypesValue({
				index: Number(serviceTypeIndex),
				value: data,
			}),
		);
		router.push("../");
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputContainer
				label="Повна назва послуги"
				inputId={ServiceTypesEnum.TITLE}
				value={title}
				error={errors[ServiceTypesEnum.TITLE]}
				className={{
					inputContainer: styles.titleInputContainer,
				}}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: ServiceTypesEnum.TITLE,
					})
				}
			/>
			<TextareaContainer
				label="Короткий опис послуги"
				inputId={ServiceTypesEnum.DESCRIPTION}
				value={description}
				error={errors[ServiceTypesEnum.DESCRIPTION]}
				className={{
					inputContainer: styles.descriptionInputContainer,
				}}
				minRows={4}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: ServiceTypesEnum.DESCRIPTION,
					})
				}
			/>

			<div className={styles.imageSection}>
				<p className={`title sm left`}>Обгортка послуги</p>
				<p className={`inputLabel ${styles.paragraph}`}>Завантажте фото</p>

				<ImageInputContainer
					inputId={ServiceTypesEnum.BACKGROUNDIMG}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: ServiceTypesEnum.BACKGROUNDIMG,
							oldValue: backgroundImg,
						})
					}
				>
					<ImageInputPreviewFromIndexedDB
						imageName={backgroundImg}
						indexedDBStoreName={indexedDBStoreName}
						error={errors[ServiceTypesEnum.BACKGROUNDIMG]}
					/>
				</ImageInputContainer>
			</div>

			<div className={styles.detailsSection}>
				<p className={`title sm left ${styles.title}`}>Вміст новини</p>

				<ErrorWrapper
					error={
						errors.details.message.length
							? errors.details.message
							: undefined
					}
					className={{
						errorWrapper: styles.detailsErrorWrap,
					}}
				>
					<CommonTable titles={titles} tableId={ServiceTypesEnum.DETAILS}>
						<TableLine>
							<span>
								{details && Object.values(details).flat().length
									? "Готовий"
									: "Не створений"}
							</span>

							<Link
								className={`btn blue sm`}
								href={`${serviceTypeIndex}/details`}
							>
								Створити вміст
							</Link>
						</TableLine>
					</CommonTable>
				</ErrorWrapper>
			</div>

			<div className={styles.preview}>
				<p className={`title sm left ${styles.title}`}>
					Попередній перегляд
				</p>

				<Link
					className={`btn blue sm`}
					href={`/admin/services/${isCreatePage ? "create" : "update"}/preview`}
				>
					Дивитись сторінку новини
				</Link>
			</div>

			<SubmitButton
				error={null}
				label={isCreatePage ? "Створити" : "Підтвердити зміни"}
			/>
		</form>
	);
}
