export function renameFile(file: File, newName: string): File {
    return new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
    });
}

export function renameFileOrBlob(file: File | Blob, name: string): File {
    // FOR FILE NAME IS KEY FROM INDEXEDDB, FOR BLOB NAME IS FILE NAME FROM RESPONSE
    if (file instanceof File) {
        return file
    } else {
        const nameSplit = name.split('.')
        const extension = nameSplit[nameSplit.length - 1]
        return new File([file], name, {
            type: `image/${extension}`,
            lastModified: Date.now()
        })
    }
}

export function uniqFileNameAndKeepExtension(name: string, file: File) {
    const extension = file.type.split('/')[1]
    return `${name}.${extension}`
}
