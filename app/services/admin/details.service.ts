import { renameFile, renameFileOrBlob } from "@/app/services/admin/files.service";
import {
	AppDBSchema,
	transferImageBetweenIndexDBStores,
} from "@/app/services/admin/indexedDB.service";
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from "@/app/services/admin/response.service";
import {
	DescriptionImage,
	DescriptionList,
	DescriptionListOption,
	DescriptionParagraph,
	DescriptionQuote,
	DescriptionTitle,
	DetailsFormDataEnum,
	DetailsOrderIndexedDBStoreNameType,
	DetailsOrderSliceNameType,
	DetailsRedactorType,
	ImageFormData,
	ImageFormDataEnum,
	ImageOrderComponent,
	ListError,
	ListFormData,
	ListFormDataEnum,
	ListOrderComponent,
	OrderComponent,
	ParagraphFormData,
	ParagraphFormDataEnum,
	ParagraphOrderComponent,
	QuoteFormData,
	QuoteFormDataEnum,
	QuoteOrderComponent,
	TitleFormData,
	TitleFormDataEnum,
	TitleOrderComponent,
} from "@/app/types/data/details.type";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { del, get, UseStore } from "idb-keyval";
import { v4 as uuidv4 } from "uuid";

// INDEXED DB
export function clearDetailsIndexDB(details: DetailsRedactorType | null, store: UseStore) {
	details?.images.forEach((image) => del(image[ImageFormDataEnum.IMAGE], store));
}
export function getIndexedDBStoreNameForDetailsImages(
	orderSliceName: DetailsOrderSliceNameType,
): DetailsOrderIndexedDBStoreNameType {
	let store: DetailsOrderIndexedDBStoreNameType;

	switch (orderSliceName) {
		case "newsCreateDetailsOrder":
			store = "news_create_images";
			break;
		case "newsUpdateDetailsOrder":
			store = "news_update_images";
			break;
		case "serviceTypeCreateDetailsOrder":
			store = "service_create_images";
			break;
		case "serviceTypeUpdateDetailsOrder":
			store = "service_update_images";
			break;
		case "privacyPolicyUpdateDetailsOrder":
		case "publicOfferUpdateDetailsOrder":
			store = "no_images";
			break;

		default:
			throw new Error(`Unknown order slice name: ${orderSliceName}`);
	}

	return store;
}
export async function transferDetailsRedactorTypeImagesBetweenIndexDBStores(
	details: DetailsRedactorType,
	getStoreName: keyof AppDBSchema,
	setStoreName: keyof AppDBSchema,
) {
	try {
		await Promise.all(
			details.images.map(async (image) => {
				await transferImageBetweenIndexDBStores(
					image[ImageFormDataEnum.IMAGE],
					getStoreName,
					setStoreName,
					"transferDetailsRedactorTypeImagesBetweenIndexDBStores",
				);
			}),
		);
	} catch (error) {
		throw Error("Error when transfering details images from one store to another");
	}
}

// FETCHING
export async function parseDetailsCreateRequestFormData(
	formData: FormData,
	details: DetailsRedactorType,
	storeName: DetailsOrderIndexedDBStoreNameType,
	mainKey?: string,
) {
	const store = getIndexedDBStoreForImages(storeName);
	let imagesCount = 0;
	mainKey = mainKey ? mainKey : "";

	// loop through titles, paragraphs, quotes, lists, images
	for (const [key, arr] of Object.entries(details)) {
		// loop through arrays titles, paragraphs, quotes, lists, images
		for (let index = 0; index < arr.length; index++) {
			const detailsValue = arr[index];
			const detailsValueArr = Object.entries(detailsValue);

			// loop through key/value of every title, paragraph, quote, list, image
			for (const item of detailsValueArr) {
				let [subKey, value] = item;
				const formDataKey = `${mainKey}${mainKey ? "[details]" : "details"}[${key}][${index}][${subKey}]`;

				// ADD LIST OPTIONS TO FORMDATA
				if (subKey === ListFormDataEnum.OPTIONS && value instanceof Array) {
					value.forEach((option, i) => {
						const optionFormDataKey = formDataKey + `[${i}]`;
						formData.append(optionFormDataKey, option);
					});
					continue;
				}

				// ADD IMAGE TO FORMDATA
				if (subKey === ImageFormDataEnum.IMAGE && typeof value === "string") {
					const image = await get<File>(value, store);
					if (!image) throw Error("Помилка при обробці зображень редактора");

					// CREATE IMAGE
					const requestImage = renameFile(image, value);
					formData.append(`details_images`, requestImage);
					imagesCount++;
				}

				// ADD DETAILS DATA TO FORMDATA
				formData.append(formDataKey, value);
			}
		}
	}
}
export async function parseDetailsUpdateRequestFormData(
	formData: FormData,
	details: DetailsRedactorType,
	storeName: DetailsOrderIndexedDBStoreNameType,
	mainKey?: string,
) {
	const store = getIndexedDBStoreForImages(storeName);
	let imagesCount = 0;
	mainKey = mainKey ? mainKey : "";

	// loop through titles, paragraphs, quotes, lists, images
	for (const [key, arr] of Object.entries(details)) {
		// loop through arrays titles, paragraphs, quotes, lists, images
		for (let index = 0; index < arr.length; index++) {
			const detailsValue = arr[index];
			const detailsValueArr = Object.entries(detailsValue);

			// loop through key/value of every title, paragraph, quote, list, image
			for (const item of detailsValueArr) {
				let [subKey, value] = item;
				const formDataKey = `${mainKey}${mainKey ? "[details]" : "details"}[${key}][${index}][${subKey}]`;

				// ADD LIST OPTIONS TO FORMDATA
				if (subKey === ListFormDataEnum.OPTIONS && value instanceof Array) {
					value.forEach((option, i) => {
						const optionFormDataKey = formDataKey + `[${i}]`;
						formData.append(optionFormDataKey, option);
					});
					continue;
				}

				// ADD IMAGE TO FORMDATA
				if (subKey === ImageFormDataEnum.IMAGE && typeof value === "string") {
					const image = await get<File | Blob>(value, store);
					if (!image) throw Error("Помилка при обробці зображень редактора");

					// PARSE IMAGE
					let requestImage: File = renameFileOrBlob(image, value);

					formData.append(`details_images`, requestImage);
					imagesCount++;
				}

				// ADD DETAILS DATA TO FORMDATA
				formData.append(formDataKey, value);
			}
		}
	}
}
export async function parseDetailsResponse(
	details: DetailsRedactorType,
	store: UseStore,
): Promise<DetailsRedactorType> {
	const { images, ...data } = details;
	console.log("data", data);
	const parsedLists = data.lists.map((list) => {
		return {
			...list,
			options: (list.options as unknown as DescriptionListOption[])
				.sort((a, b) => a.order - b.order)
				.map((option, i) => {
					return option.option;
				}),
		};
	});
	console.log("parsedLists", parsedLists);
	const parsedImages: DescriptionImage[] = await Promise.all(
		images.map(async (imageData) => {
			const { image, ...data } = imageData;
			let name = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(image, store);

			return {
				...data,
				image: name,
			};
		}),
	);

	return {
		...data,
		lists: parsedLists,
		images: parsedImages,
	};
}

// OTHER
export function parseOrderComponentArrayToDetailsRedactor(
	array: OrderComponent[],
): DetailsRedactorType {
	const titles: DescriptionTitle[] = [];
	const paragraphs: DescriptionParagraph[] = [];
	const quotesSubmitData: DescriptionQuote[] = [];
	const lists: DescriptionList[] = [];
	const images: DescriptionImage[] = [];

	array.forEach((orderComponent, index) => {
		switch (orderComponent.type) {
			case DetailsFormDataEnum.TITLES: {
				const title = orderComponent.data.title;

				// PASS DATA
				titles.push({
					title,
					order: index,
				});
				break;
			}
			case DetailsFormDataEnum.PARAGRAPHS: {
				const text = orderComponent.data.text;

				paragraphs.push({
					text,
					order: index,
				});
				break;
			}
			case DetailsFormDataEnum.QUOTES: {
				const { text, author } = orderComponent.data;

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

				lists.push({
					options,
					numerable,
					order: index,
				});
				break;
			}
			case DetailsFormDataEnum.IMAGES:
				const { image, description } = orderComponent.data;

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

	return {
		titles,
		paragraphs,
		quotes: quotesSubmitData,
		lists,
		images,
	};
}
export function parseDetailsResponseToOrderComponentArray(
	details: DetailsRedactorType,
): OrderComponent[] {
	const parsedTitles: TitleOrderComponent[] = details.titles.map((title) => {
		return {
			type: DetailsFormDataEnum.TITLES,
			data: {
				[TitleFormDataEnum.TITLE]: title[TitleFormDataEnum.TITLE],
				orderId: `${title.order}`,
			},
			error: {
				[TitleFormDataEnum.TITLE]: { message: "" },
			},
		};
	});
	const parsedParagraphs: ParagraphOrderComponent[] = details.paragraphs.map((paragraph) => {
		return {
			type: DetailsFormDataEnum.PARAGRAPHS,
			data: {
				[ParagraphFormDataEnum.TEXT]: paragraph[ParagraphFormDataEnum.TEXT],
				orderId: `${paragraph.order}`,
			},
			error: {
				[ParagraphFormDataEnum.TEXT]: { message: "" },
			},
		};
	});
	const parsedQuotes: QuoteOrderComponent[] = details.quotes.map(
		(quote): QuoteOrderComponent => {
			return {
				type: DetailsFormDataEnum.QUOTES,
				data: {
					[QuoteFormDataEnum.TEXT]: quote[QuoteFormDataEnum.TEXT],
					[QuoteFormDataEnum.AUTHOR]: quote[QuoteFormDataEnum.AUTHOR],
					orderId: `${quote.order}`,
				},
				error: {
					[QuoteFormDataEnum.TEXT]: { message: "" },
					[QuoteFormDataEnum.AUTHOR]: { message: "" },
				},
			};
		},
	);
	const parsedLists: ListOrderComponent[] = details.lists.map((list) => {
		return {
			type: DetailsFormDataEnum.LISTS,
			data: {
				[ListFormDataEnum.NUMERABLE]: list[ListFormDataEnum.NUMERABLE],
				[ListFormDataEnum.OPTIONS]: list[ListFormDataEnum.OPTIONS],
				orderId: `${list.order}`,
			},
			error: {
				[ListFormDataEnum.OPTIONS]: list[ListFormDataEnum.OPTIONS].map((option) => {
					return { message: "" };
				}),
			},
		};
	});
	const parsedImages: ImageOrderComponent[] = details.images.map((image) => {
		return {
			type: DetailsFormDataEnum.IMAGES,
			data: {
				[ImageFormDataEnum.IMAGE]: image[ImageFormDataEnum.IMAGE],
				[ImageFormDataEnum.DESCRIPTION]: image[ImageFormDataEnum.DESCRIPTION],
				[ImageFormDataEnum.SIZE]: image[ImageFormDataEnum.SIZE],
				orderId: `${image.order}`,
			},
			error: {
				[ImageFormDataEnum.IMAGE]: { message: "" },
				[ImageFormDataEnum.DESCRIPTION]: { message: "" },
			},
		};
	});

	return [
		...parsedTitles,
		...parsedParagraphs,
		...parsedQuotes,
		...parsedLists,
		...parsedImages,
	]
		.sort((a, b) => Number(a.data.orderId) - Number(b.data.orderId))
		.map(convertOrderToOrderId);
}
function convertOrderToOrderId(component: OrderComponent): OrderComponent {
	switch (component.type) {
		case DetailsFormDataEnum.TITLES:
			return {
				...component,
				data: {
					...(component.data as TitleFormData),
					orderId: uuidv4(),
				},
			};
		case DetailsFormDataEnum.PARAGRAPHS:
			return {
				...component,
				data: {
					...(component.data as ParagraphFormData),
					orderId: uuidv4(),
				},
			};
		case DetailsFormDataEnum.QUOTES:
			return {
				...component,
				data: {
					...(component.data as QuoteFormData),
					orderId: uuidv4(),
				},
			};
		case DetailsFormDataEnum.LISTS:
			return {
				...component,
				data: {
					...(component.data as ListFormData),
					orderId: uuidv4(),
				},
			};
		case DetailsFormDataEnum.IMAGES:
			return {
				...component,
				data: {
					...(component.data as ImageFormData),
					orderId: uuidv4(),
				},
			};
		default:
			throw new Error("Unknown component type");
	}
}
