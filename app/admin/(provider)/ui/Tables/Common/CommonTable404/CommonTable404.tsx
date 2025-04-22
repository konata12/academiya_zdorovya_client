import { ErrorsResponses } from '@/app/types/data/response'
import React from 'react'

interface CommonTable404 {
    error: ErrorsResponses
    notFoundMessage?: string
    errorMessage?: string
    className?: string
}

export default function CommonTable404({
    error,
    notFoundMessage = 'Немає даних',
    errorMessage = 'Виникла помилка при отриманні даних',
    className
}: CommonTable404) {
    const errorUIMessage = (): string => {
        if (error.getAll?.statusCode === 404 || !error.delete) {
            return notFoundMessage
        } else {
            return errorMessage
        }
    }

    return (
        <p className={`fetchError ${className}`}>
            {errorUIMessage()}
        </p>
    )
}
