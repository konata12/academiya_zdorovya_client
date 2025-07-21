import { ParsingResponseErrorsEnum } from "@/app/types/data/response.type"
import { set, UseStore } from "idb-keyval"

// CHECK IF ASYNC THUNK FULLFILLED
export const fullfilled = (type: string) => {
    return type === 'fulfilled'
}

export const responseStatus = (status: string) => {
    switch (status) {
        case 'fulfilled':
            return 'fulfilled'

        case 'rejected':
            return 'rejected'

        case 'pending':
            return 'pending'

        default:
            break;
    }
}

export function getFileNameFromSignedURL(str: string) {
    return str.match(/[^/]+\.(?:png|jpe?g|webp|gif|bmp|svg|pdf|txt|zip|tar|gz|mp4|mp3)(?=\?)/)?.[0]
}

export async function getFileNameFromSignedURLAndSaveBlobInIndexedDB(
    str: string,
    store: UseStore
) {
    // GET FILENAME
    let fileName = getFileNameFromSignedURL(str)

    // Get the image as a Blob and save it if URL is correct
    if (str && fileName) {
        const response = await fetch(str)
        const blob = await response.blob()

        set(fileName, blob, store)
    }

    // IF SIGNED IS WRONG MAKE NAME ERROR
    if (!fileName) fileName = ParsingResponseErrorsEnum.GETNAMEFROMSIGNEDURL
    return fileName
}