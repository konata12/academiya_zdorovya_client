import axiosInstance from "@/app/utils/axios"

export async function login(formData: FormData) {
    const response = await axiosInstance.post('auth/login')
    console.log(response)

    return
}