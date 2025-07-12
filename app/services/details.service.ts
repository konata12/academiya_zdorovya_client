import { DetailsOrderIndexedDBStoreNameType, DetailsOrderSliceNameType, DetailsRedactorType, ImageFormDataEnum, ListFormDataEnum } from "@/app/types/data/details.type";
import { useIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { get } from "idb-keyval";

export function getIndexedDBStoreForDetailsImages(orderSliceName: DetailsOrderSliceNameType) {
    let store: DetailsOrderIndexedDBStoreNameType

    switch (orderSliceName) {
        case 'newsDetailsOrder':
            store = 'news_images';
            break;

        default:
            throw new Error(`Unknown order slice name: ${orderSliceName}`);
    }

    return store
}

export async function parseDetailsRequestFormData(
    formData: FormData,
    details: DetailsRedactorType,
    storeName: DetailsOrderIndexedDBStoreNameType,
) {
    const store = useIndexedDBStoreForImages(storeName);

    // loop through titles, paragraphs, quoutes, lists, images
    for (const [key, arr] of Object.entries(details)) {
        // loop through arrays titles, paragraphs, quoutes, lists, images
        for (let index = 0; index < arr.length; index++) {
            const detailsValue = arr[index];
            const detailsValueArr = Object.entries(detailsValue);

            // loop through key/value of every title, paragraph, quoute, list, image
            for (const item of detailsValueArr) {
                const [subKey, value] = item;
                const formDataKey = `details[${key}][${index}][${subKey}]`;
                let parsedValue: string | File = value;

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
                    try {
                        const image = await get(value, store);
                        if (image) {
                            formData.append(formDataKey, image);
                        }
                    } catch (error) {
                    }
                    continue;
                }

                // ADD DETAILS DATA TO FORMDATA
                formData.append(formDataKey, parsedValue);
            }
        }
    }
}