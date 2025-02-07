import { AccessToken } from "@/app/utils/redux/auth/types";
import { AsyncThunkAction } from "@reduxjs/toolkit";

export interface ErrorResponse {
    statusCode: number
    message: string
    error?: string
}