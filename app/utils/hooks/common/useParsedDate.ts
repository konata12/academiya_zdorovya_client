import { useCallback } from "react";

export function useParsedDate() {
    const parseStringDateToActualDate = useCallback((string: string) => {
        try {
            return new Date(string)
        } catch (error) {
            console.log(error)
            return undefined
        }
    }, [])

    const getParsedDateString = useCallback((string: string) => {
        const date = parseStringDateToActualDate(string)
        if (!date) return 'Помилка при обробці дати'

        const month = date.getMonth() + 1
        const parsedMonth = month >= 10
            ? month
            : '0' + month

        return `${date.getDate()}.${parsedMonth}.${date.getFullYear()}`
    }, [])

    return {
        getParsedDateString
    }
}