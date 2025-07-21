export function renameFile(file: File, newName: string): File {
    return new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
    });
}

export function renameFileOrBlob(file: File | Blob, oldName: string) {
    if (file instanceof File) {
        // PARSE IMAGE NAME
        const extension = file.type.split('/')[1]
        const newName = `${oldName}.${extension}`
        return renameFile(file, newName)
    } else {
        const nameSplit = oldName.split('.')
        const extension = nameSplit[nameSplit.length - 1]
        return new File([file], oldName, {
            type: `image/${extension}`,
            lastModified: Date.now()
        })
    }
}
