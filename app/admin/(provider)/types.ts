import { Dispatch, SetStateAction } from "react";

export type AuthContextType = {
    accessToken: string | null
    setAccessToken: Dispatch<SetStateAction<string | null>>
    refreshToken: () => Promise<void>
} | null;

export type DepartmentsFormData = {
    city: string
    hotline: string
    address: string
    googleMapUrl: string
    googleMapReviewsUrl: string
}