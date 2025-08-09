import React from 'react';
import { ErrorsResponsesBasic, StatusBasic } from '@/app/types/data/response.type';

interface CommonTable404 {
    error: ErrorsResponsesBasic
    status: StatusBasic
    notFoundMessage?: string
    errorMessage?: string
    className?: string
}

export default function CommonTable404({
    error,
    status,
    notFoundMessage = 'Немає даних',
    errorMessage = 'Виникла помилка при отриманні даних',
    className
}: CommonTable404) {
    const errorUIMessage = (): string => {
        if (status.getAll === 'loading' || status.getAll === null) return 'Завантаження...'
        
        if (error.getAll?.statusCode === 500) return errorMessage
        if (error.getAll?.statusCode === 404 || !error.delete) {
            return notFoundMessage
        }

        return errorMessage
    }

    return (
        <p className={`fetchError ${className}`}>
            {errorUIMessage()}
        </p>
    )
}
