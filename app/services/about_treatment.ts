import { AboutTreatment, AboutTreatmentFormData } from "@/app/types/data/about_treatment"

export const createFormData = (data: AboutTreatmentFormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.image) {
        formData.append('image', data.image[0]) // Assuming you want to send the first file in the FileList
    }
    data.treatmentTypes.forEach((type) => {
        formData.append(`list`, type.value)
    })
    return formData
}

export const parseFormDataToUpdate = (data: AboutTreatmentFormData, id: string): AboutTreatment => {
    return {
        id: +id,
        title: data.title,
        image: null,
        treatmentTypes: data.treatmentTypes.map((type) => type.value)
    }
}