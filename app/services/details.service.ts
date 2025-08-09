import {
    del,
    get,
    set,
    UseStore
} from 'idb-keyval';
import {
    DescriptionImage,
    DetailsFormDataEnum,
    DetailsOrderIndexedDBStoreNameType,
    DetailsOrderSliceNameType,
    DetailsRedactorType,
    ImageFormData,
    ImageFormDataEnum,
    ImageOrderComponent,
    ListFormData,
    ListFormDataEnum,
    ListOrderComponent,
    OrderComponent,
    ParagraphFormData,
    ParagraphFormDataEnum,
    ParagraphOrderComponent,
    QuouteFormData,
    QuouteFormDataEnum,
    QuouteOrderComponent,
    TitleFormData,
    TitleFormDataEnum,
    TitleOrderComponent
} from '@/app/types/data/details.type';
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from '@/app/services/response.service';
import { renameFile, renameFileOrBlob } from '@/app/services/files.service';
import { getIndexedDBStoreForImages } from '@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages';
import { v4 as uuidv4 } from 'uuid';

// INDEXED DB
export function clearDetailsIndexDB(
    details: DetailsRedactorType | null,
    store: UseStore,
) {
    details?.images.forEach(image => del(image[ImageFormDataEnum.IMAGE], store))
}
export function getIndexedDBStoreNameForDetailsImages(orderSliceName: DetailsOrderSliceNameType): DetailsOrderIndexedDBStoreNameType {
    let store: DetailsOrderIndexedDBStoreNameType

    switch (orderSliceName) {
        case 'newsCreateDetailsOrder':
            store = 'news_create_images';
            break;
        case 'newsUpdateDetailsOrder':
            store = 'news_update_images';
            break;
        case 'serviceTreatmentTypeCreateDetailsOrder':
            store = 'service_create_images';
            break;
        case 'serviceTreatmentTypeUpdateDetailsOrder':
            store = 'service_update_images';
            break;

        default:
            throw new Error(`Unknown order slice name: ${orderSliceName}`);
    }

    return store
}
export async function transferDetailsRedactorTypeImagesBetweenIndexDBStores(
    details: DetailsRedactorType,
    getStore: UseStore,
    setStore: UseStore,
) {
    try {
        await Promise.all(details.images.map(async (image) => {
            const loadedImg = await get<Blob | File>(image[ImageFormDataEnum.IMAGE], getStore)
            await set(image[ImageFormDataEnum.IMAGE], loadedImg, setStore)
        }))
    } catch (error) {
        throw Error('Error when transfering details images from one store to another')
    }
}

// FETCHING
export async function parseDetailsCreateRequestFormData(
    formData: FormData,
    details: DetailsRedactorType,
    storeName: DetailsOrderIndexedDBStoreNameType,
    mainKey?: string
) {
    const store = getIndexedDBStoreForImages(storeName);
    let imagesCount = 0
    mainKey = mainKey ? mainKey : ''

    // loop through titles, paragraphs, quoutes, lists, images
    for (const [key, arr] of Object.entries(details)) {
        // loop through arrays titles, paragraphs, quoutes, lists, images
        for (let index = 0; index < arr.length; index++) {
            const detailsValue = arr[index];
            const detailsValueArr = Object.entries(detailsValue);

            // loop through key/value of every title, paragraph, quoute, list, image
            for (const item of detailsValueArr) {
                let [subKey, value] = item;
                const formDataKey = `${mainKey}${mainKey ? '[details]' : 'details'}[${key}][${index}][${subKey}]`;

                // ADD LIST OPTIONS TO FORMDATA
                if (subKey === ListFormDataEnum.OPTIONS && value instanceof Array) {
                    value.forEach((option, i) => {
                        const optionFormDataKey = formDataKey + `[${i}]`;
                        formData.append(optionFormDataKey, option);
                    });
                    continue;
                }

                // ADD IMAGE TO FORMDATA
                if (subKey === ImageFormDataEnum.IMAGE && typeof value === 'string') {
                    const image = await get<File>(value, store);
                    if (!image) throw Error('Помилка при обробці зображень редактора');

                    // PARSE IMAGE NAME
                    const extension = image.type.split('/')[1]
                    value = `${value}.${extension}`

                    // CREATE IMAGE
                    const requestImage = renameFile(image, value)
                    formData.append(`details_images`, requestImage);
                    imagesCount++
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
) {
    const store = getIndexedDBStoreForImages(storeName);
    let imagesCount = 0

    // loop through titles, paragraphs, quoutes, lists, images
    for (const [key, arr] of Object.entries(details)) {
        // loop through arrays titles, paragraphs, quoutes, lists, images
        for (let index = 0; index < arr.length; index++) {
            const detailsValue = arr[index];
            const detailsValueArr = Object.entries(detailsValue);

            // loop through key/value of every title, paragraph, quoute, list, image
            for (const item of detailsValueArr) {
                let [subKey, value] = item;
                const formDataKey = `details[${key}][${index}][${subKey}]`;

                // ADD LIST OPTIONS TO FORMDATA
                if (subKey === ListFormDataEnum.OPTIONS && value instanceof Array) {
                    value.forEach((option, i) => {
                        const optionFormDataKey = formDataKey + `[${i}]`;
                        formData.append(optionFormDataKey, option);
                    });
                    continue;
                }

                // ADD IMAGE TO FORMDATA
                if (subKey === ImageFormDataEnum.IMAGE && typeof value === 'string') {
                    const image = await get<File | Blob>(value, store);
                    if (!image) throw Error('Помилка при обробці зображень редактора');

                    // PARSE IMAGE
                    let requestImage: File = renameFileOrBlob(image, value)

                    formData.append(`details_images`, requestImage);
                    imagesCount++
                }

                // ADD DETAILS DATA TO FORMDATA
                formData.append(formDataKey, value);
            }
        }
    }
}
export async function parseDetailsResponse(details: DetailsRedactorType, store: UseStore): Promise<DetailsRedactorType> {
    const { images, ...data } = details
    const parsedImages: DescriptionImage[] = await Promise.all(images.map(async (imageData) => {
        const { image, ...data } = imageData
        let name = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(image, store)

        return {
            ...data,
            image: name
        };
    }))

    return {
        ...data,
        images: parsedImages,
    }
}

// OTHER
export function parseDetailsResponseToOrderComponent(details: DetailsRedactorType): OrderComponent[] {
    const parsedTitles: TitleOrderComponent[] = details.titles.map((title) => {
        return {
            type: DetailsFormDataEnum.TITLES,
            data: {
                [TitleFormDataEnum.TITLE]: title[TitleFormDataEnum.TITLE],
                orderId: `${title.order}`,
            },
            error: {
                [TitleFormDataEnum.TITLE]: { message: '' }
            }
        }
    })
    const parsedParagraphs: ParagraphOrderComponent[] = details.paragraphs.map((paragraph) => {
        return {
            type: DetailsFormDataEnum.PARAGRAPHS,
            data: {
                [ParagraphFormDataEnum.TEXT]: paragraph[ParagraphFormDataEnum.TEXT],
                orderId: `${paragraph.order}`,
            },
            error: {
                [ParagraphFormDataEnum.TEXT]: { message: '' }
            }
        }
    })
    const parsedQuoutes: QuouteOrderComponent[] = details.quoutes.map((quoute): QuouteOrderComponent => {
        return {
            type: DetailsFormDataEnum.QUOUTES,
            data: {
                [QuouteFormDataEnum.TEXT]: quoute[QuouteFormDataEnum.TEXT],
                [QuouteFormDataEnum.AUTHOR]: quoute[QuouteFormDataEnum.AUTHOR],
                orderId: `${quoute.order}`,
            },
            error: {
                [QuouteFormDataEnum.TEXT]: { message: '' },
                [QuouteFormDataEnum.AUTHOR]: { message: '' },
            }
        }
    })
    const parsedLists: ListOrderComponent[] = details.lists.map((list) => {
        return {
            type: DetailsFormDataEnum.LISTS,
            data: {
                [ListFormDataEnum.NUMERABLE]: list[ListFormDataEnum.NUMERABLE],
                [ListFormDataEnum.OPTIONS]: list[ListFormDataEnum.OPTIONS],
                orderId: `${list.order}`,
            },
            error: {
                [ListFormDataEnum.OPTIONS]: list[ListFormDataEnum.OPTIONS].map(option => {
                    return { message: '' }
                })
            }
        }
    })
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
                [ImageFormDataEnum.IMAGE]: { message: '' },
                [ImageFormDataEnum.DESCRIPTION]: { message: '' },
            }
        }
    })

    return [
        ...parsedTitles,
        ...parsedParagraphs,
        ...parsedQuoutes,
        ...parsedLists,
        ...parsedImages,
    ].sort((a, b) => Number(a.data.orderId) - Number(b.data.orderId))
        .map(convertOrderToOrderId)
}
function convertOrderToOrderId(component: OrderComponent): OrderComponent {
    switch (component.type) {
        case DetailsFormDataEnum.TITLES:
            return {
                ...component,
                data: {
                    ...component.data as TitleFormData,
                    orderId: uuidv4()
                }
            };
        case DetailsFormDataEnum.PARAGRAPHS:
            return {
                ...component,
                data: {
                    ...component.data as ParagraphFormData,
                    orderId: uuidv4()
                }
            };
        case DetailsFormDataEnum.QUOUTES:
            return {
                ...component,
                data: {
                    ...component.data as QuouteFormData,
                    orderId: uuidv4()
                }
            };
        case DetailsFormDataEnum.LISTS:
            return {
                ...component,
                data: {
                    ...component.data as ListFormData,
                    orderId: uuidv4()
                }
            };
        case DetailsFormDataEnum.IMAGES:
            return {
                ...component,
                data: {
                    ...component.data as ImageFormData,
                    orderId: uuidv4()
                }
            };
        default:
            throw new Error('Unknown component type');
    }
}