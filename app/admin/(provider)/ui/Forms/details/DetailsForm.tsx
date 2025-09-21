import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import CreateDetailsInputBtn from "@/app/admin/(provider)/ui/Forms/details/createDetailsInputBtn/CreateDetailsInputBtn";
import DetailsDraggableContainer from "@/app/admin/(provider)/ui/Forms/details/inputs/DetailsDraggableContainer";
import DetailsImageInput from "@/app/admin/(provider)/ui/Forms/details/inputs/detailsImageInput/DetailsImageInput";
import DetailsListInput from "@/app/admin/(provider)/ui/Forms/details/inputs/detailsListInput/DetailsListInput";
import DetailsParagraphInput from "@/app/admin/(provider)/ui/Forms/details/inputs/detailsParagraphInput/DetailsParagraphInput";
import DetailsQuoteInput from "@/app/admin/(provider)/ui/Forms/details/inputs/detailsQuouteInput/DetailsQuoteInput";

import DetailsTitleInput from "@/app/admin/(provider)/ui/Forms/details/inputs/detailsTitleInput/DetailsTitleInput";
import { DraggableAreaContainerForDetails } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainerForDetails";
import { getIndexedDBStoreNameForDetailsImages } from "@/app/services/admin/details.service";
import { fulfilled } from "@/app/services/admin/response.service";
import {
	DescriptionImage,
	DescriptionImageSize,
	DescriptionList,
	DescriptionParagraph,
	DescriptionQuote,
	DescriptionTitle,
	DetailsFormDataEnum,
	DetailsFormDataEnumType,
	DetailsFormDataErrorType,
	DetailsFromProps,
	DetailsRedactorType,
	ImageError,
	ListError,
	OrderComponent,
	QuoteError,
} from "@/app/types/data/details.type";
import { FormInputError } from "@/app/types/data/form.type";
import { checkIfDetailsFormDataChanged } from "@/app/utils/hooks/admin/detailsForm/useCheckIfDetailsFormDataChanged";
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice";
import { useOrderedForm } from "@/app/utils/hooks/admin/detailsForm/useOrderedForm";
import { useServiceFormsDataCheckChange } from "@/app/utils/hooks/admin/serviceForm/useServiceFormsDataCheckChange";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./DetailsForm.module.scss";

export default function DetailsForm({
	titles,
	paragraphs,
	quotes,
	lists,
	images,

	// need for determining which details order slice to use
	orderSliceName,
}: DetailsFromProps) {
	const [submitError, setSubmitError] = useState<FormInputError>({
		message: "",
	});
	const order = useAppSelector((state: RootState) => state[orderSliceName].order);
	console.log("order", order);

	const router = useRouter();
	const pathname = usePathname();
	const { id, serviceTypeIndex } = useParams<{
		id: string | undefined;
		serviceTypeIndex: string | undefined;
	}>();
	const dispatch = useAppDispatch();
	const isCreatePage = pathname.includes("create");
	const formDataIsEqualToOldData = checkIfDetailsFormDataChanged({
		order,
		orderSliceName,
		id,
		serviceTypeIndex,
	});

	const { handleDragEnd } = useOrderedForm(orderSliceName);
	const {
		addDetailsComponent,
		removeDetailsComponent,
		setDetailsComponentError,

		submitForm,
		setFormError,

		updateData,
	} = useDetailsFormSlice(orderSliceName);
	const imageStoreName = getIndexedDBStoreNameForDetailsImages(orderSliceName);

	useEffect(() => {
		if (order.length >= 1) setSubmitError({ message: "" });
	}, [order]);

	// CHECK FORM CHANGED DATA BEFORE CHANGING PAGE
	if (!isCreatePage) {
		if (pathname.includes("serviceType")) useServiceFormsDataCheckChange();
	}

	// FORM SUBMIT
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorsData: {
			error: DetailsFormDataErrorType;
			id: string;
		}[] = [];

		const titles: DescriptionTitle[] = [];
		const paragraphs: DescriptionParagraph[] = [];
		const quotesSubmitData: DescriptionQuote[] = [];
		const lists: DescriptionList[] = [];
		const images: DescriptionImage[] = [];

		order.forEach((orderComponent, index) => {
			switch (orderComponent.type) {
				case DetailsFormDataEnum.TITLES: {
					const title = orderComponent.data.title;

					// VALIDATE
					if (!title.length) {
						const error = {
							title: { message: "Заповніть заголовок" },
						};
						const id = DetailsFormDataEnum.TITLES + index;

						dispatch(
							setDetailsComponentError({
								index,
								error,
							}),
						);

						errorsData.push({ error, id });
					}

					// PASS DATA
					titles.push({
						title,
						order: index,
					});
					break;
				}
				case DetailsFormDataEnum.PARAGRAPHS: {
					const text = orderComponent.data.text;

					if (!text.length) {
						const error = { text: { message: "Заповніть абзац" } };
						const id = DetailsFormDataEnum.PARAGRAPHS + index;

						dispatch(
							setDetailsComponentError({
								index,
								error,
							}),
						);
						errorsData.push({ error, id });
					}

					paragraphs.push({
						text,
						order: index,
					});
					break;
				}
				case DetailsFormDataEnum.QUOTES: {
					const { text, author } = orderComponent.data;

					// Check if there are any errors
					if (!text.length || !author.length) {
						const error: QuoteError = {
							text: {
								message: !text.length ? "Заповніть цитату" : "",
							},
							author: {
								message: !author.length ? "Введіть автора" : "",
							},
						};
						const id = DetailsFormDataEnum.QUOTES + index;

						dispatch(
							setDetailsComponentError({
								index,
								error,
							}),
						);
						errorsData.push({ error, id });
					}

					quotesSubmitData.push({
						text,
						author,
						order: index,
					});
					break;
				}
				case DetailsFormDataEnum.LISTS: {
					const { options, numerable } = orderComponent.data;
					const listErrors: ListError = {
						options: [],
					};

					// Check if there are any errors
					listErrors.options = orderComponent.data.options.map((option) => {
						return option.length
							? { message: "" }
							: { message: "Введіть пункт списку" };
					});
					const containsError = !!listErrors.options.filter(
						(optionMessage) => optionMessage.message.length > 0,
					).length;
					if (containsError) {
						dispatch(
							setDetailsComponentError({
								index,
								error: listErrors,
							}),
						);
						errorsData.push({
							error: listErrors,
							id: DetailsFormDataEnum.LISTS + index,
						});
					}

					lists.push({
						options,
						numerable,
						order: index,
					});
					break;
				}
				case DetailsFormDataEnum.IMAGES:
					const { image, description } = orderComponent.data;

					// Check if there are any errors
					if (!image || !image?.length || !description.length) {
						const error: ImageError = {
							image: {
								message:
									!image || !image?.length ? "Завантажте зображення" : "",
							},
							description: {
								message: !description.length ? "Введіть опис" : "",
							},
						};
						const id = DetailsFormDataEnum.IMAGES + index;

						dispatch(
							setDetailsComponentError({
								index,
								error,
							}),
						);
						errorsData.push({ error, id });
					}

					images.push({
						image: image || "", //if image is empty or is null, there will be return of function after switch
						size: orderComponent.data.size,
						description: orderComponent.data.description,
						order: index,
					});
					break;

				default:
					break;
			}
		});

		// FORM VALIDATION
		if (errorsData.length) {
			// SCROLL TO INPUT
			(
				document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement
			).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
			return;
		}

		// CHECK IF FORM IS EMPTY
		const allData = [...titles, ...paragraphs, ...quotesSubmitData, ...lists, ...images];
		if (!allData.length) {
			setSubmitError({ message: "Створіть дані" });
			return;
		} else {
			setSubmitError({ message: "" });
		}

		const parsedFormData: DetailsRedactorType = {
			titles,
			paragraphs,
			quotes: quotesSubmitData,
			lists,
			images,
		};

		// CHECK IF DATA CHANGED
		if (formDataIsEqualToOldData) {
			setSubmitError({ message: "Дані ті самі, спочатку змініть значення" });
			return;
		}

		// TRANSFER DETAILS DATA TO ANOTHER FORM IF IT IS CONNECTED
		if (submitForm) dispatch(submitForm(parsedFormData));
		if (setFormError) {
			dispatch(
				setFormError({
					field: "details",
					message: "",
				}),
			);
		}
		// DIRECTLY SEND REQUEST TO UPDATE DATA
		if (updateData) {
			const response = await dispatch(updateData(parsedFormData));
			const isFulfilled = fulfilled(response.meta.requestStatus);
			if (!isFulfilled) {
				setSubmitError({ message: "Помилка " });
				return;
			} else {
			}
		}
		router.push("./");
	};

	// INPUT METHODS
	const createInput = useCallback(
		({
			elementType,
			listNumerable = false,
			imageSize = "big",
		}: {
			elementType: DetailsFormDataEnumType;
			listNumerable?: boolean;
			imageSize?: DescriptionImageSize;
		}) => {
			const orderId = uuidv4();
			let newComponent: OrderComponent;

			// create input
			switch (elementType) {
				case DetailsFormDataEnum.TITLES:
					newComponent = {
						type: DetailsFormDataEnum.TITLES,
						data: {
							orderId,
							title: "",
						},
						error: {
							title: { message: "" },
						},
					};
					break;

				case DetailsFormDataEnum.PARAGRAPHS:
					newComponent = {
						type: DetailsFormDataEnum.PARAGRAPHS,
						data: {
							orderId,
							text: "",
						},
						error: {
							text: { message: "" },
						},
					};
					break;

				case DetailsFormDataEnum.QUOTES:
					newComponent = {
						type: DetailsFormDataEnum.QUOTES,
						data: {
							orderId,
							text: "",
							author: "",
						},
						error: {
							text: { message: "" },
							author: { message: "" },
						},
					};
					break;

				case DetailsFormDataEnum.LISTS:
					newComponent = {
						type: DetailsFormDataEnum.LISTS,
						data: {
							orderId,
							options: [""],
							numerable: listNumerable,
						},
						error: {
							options: [{ message: "" }],
						},
					};
					break;

				case DetailsFormDataEnum.IMAGES:
					newComponent = {
						type: DetailsFormDataEnum.IMAGES,
						data: {
							orderId,
							size: imageSize,
							image: null,
							description: "",
						},
						error: {
							image: { message: "" },
							description: { message: "" },
						},
					};
					break;

				default:
					throw new Error(`Unknown element type: ${elementType}`);
			}

			// make input ordered
			dispatch(addDetailsComponent(newComponent));
		},
		[],
	);

	const deleteInput = useCallback((element: OrderComponent) => {
		// remove ordered component from redux
		dispatch(removeDetailsComponent(element.data.orderId));
	}, []);

	const formInputsToRender = [
		titles && {
			label: "Заголовок",
			createInputHandler: () => createInput({ elementType: DetailsFormDataEnum.TITLES }),
		},
		paragraphs && {
			label: "Абзац",
			createInputHandler: () =>
				createInput({ elementType: DetailsFormDataEnum.PARAGRAPHS }),
		},
		quotes && {
			label: "Цитата",
			createInputHandler: () => createInput({ elementType: DetailsFormDataEnum.QUOTES }),
		},
		lists && {
			label: "Нумерований список",
			createInputHandler: () =>
				createInput({
					elementType: DetailsFormDataEnum.LISTS,
					listNumerable: true,
				}),
		},
		lists && {
			label: "Маркований список",
			createInputHandler: () =>
				createInput({
					elementType: DetailsFormDataEnum.LISTS,
					listNumerable: false,
				}),
		},
		images && {
			label: "Велика картинка",
			createInputHandler: () =>
				createInput({
					elementType: DetailsFormDataEnum.IMAGES,
					imageSize: "big",
				}),
		},
		images && {
			label: "Мала картинка",
			createInputHandler: () =>
				createInput({
					elementType: DetailsFormDataEnum.IMAGES,
					imageSize: "small",
				}),
		},
	].filter((input) => !!input);

	return (
		<form onSubmit={handleSubmit}>
			<p className={styles.warning}>
				Зміни редактора буде збережено тільки після натискання кнопки
				"Створити/Підтвердити зміни"
			</p>
			<div className={styles.addInputsContainer}>
				{formInputsToRender.length &&
					formInputsToRender.map((input, i) => {
						return (
							<CreateDetailsInputBtn
								key={i}
								label={input.label}
								handleFunction={() => {
									input.createInputHandler();
								}}
							/>
						);
					})}
			</div>

			<DraggableAreaContainerForDetails
				handleDragEnd={handleDragEnd}
				dndContextId="DetailsForm"
				order={order}
				droppableAreaClassName={styles.mainBody}
			>
				{order.map((element, index) => {
					return (
						<DetailsDraggableContainer
							id={element.data.orderId}
							elementType={element.type}
							index={index}
							handleDelete={() => deleteInput(element)}
							key={index}
						>
							{(() => {
								const componentData = element.data;
								const key = componentData.orderId;

								switch (element.type) {
									case DetailsFormDataEnum.TITLES:
										return (
											<DetailsTitleInput
												key={key}
												componentData={element}
												index={index}
												orderSliceName={orderSliceName}
												className={styles.orderedComponent}
											/>
										);

									case DetailsFormDataEnum.PARAGRAPHS:
										return (
											<DetailsParagraphInput
												key={key}
												componentData={element}
												index={index}
												orderSliceName={orderSliceName}
												className={styles.orderedComponent}
											/>
										);

									case DetailsFormDataEnum.QUOTES:
										return (
											<DetailsQuoteInput
												key={key}
												componentData={element}
												index={index}
												orderSliceName={orderSliceName}
												className={{
													quote: styles.orderedComponent,
													author: styles.orderedComponent,
													container: styles.orderedComponent,
												}}
											/>
										);

									case DetailsFormDataEnum.LISTS:
										// todo add order to input options
										return (
											<DetailsListInput
												key={key}
												componentData={element}
												index={index}
												orderSliceName={orderSliceName}
												className={{
													option: styles.orderedComponent,
													container: styles.orderedComponent,
												}}
											/>
										);

									case DetailsFormDataEnum.IMAGES:
										return (
											<DetailsImageInput
												key={key}
												componentData={element}
												index={index}
												orderSliceName={orderSliceName}
												indexedDBStoreName={imageStoreName}
												className={{
													image: styles.orderedComponent,
													description: styles.orderedComponent,
													container: styles.orderedComponent,
												}}
											/>
										);

									default:
										break;
								}
							})()}
						</DetailsDraggableContainer>
					);
				})}
			</DraggableAreaContainerForDetails>

			<SubmitButton
				error={submitError}
				label={pathname.includes("create") ? "Створити" : "Підтвердити зміни"}
				className={{
					button: submitError.message ? styles.button : "",
					error: styles.error,
				}}
			/>
		</form>
	);
}
