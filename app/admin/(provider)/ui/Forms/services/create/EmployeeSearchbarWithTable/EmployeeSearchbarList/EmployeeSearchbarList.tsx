import AnimatePresenseWithDynamicHeight from '@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenseWithDynamicHeight';
import axiosInstance from '@/app/utils/axios';
import React, { useEffect, useState } from 'react';
import styles from './EmployeeSearchbarList.module.scss';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/types/data/response.type';
import { ServiceEmployeeBasicType, ServiceFormDataUIModalsStatesEnum } from '@/app/types/data/services.type';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { addServiceCreateEmployeesValue } from '@/app/utils/redux/services/serviceCreateFormSlice';
import { addModalState } from '@/app/utils/redux/services/serviceFromUISlice';


interface EmployeeSearchbarListProps {
    showList: boolean
    query: string
}

export function EmployeeSearchbarList({
    showList,
    query,
}: EmployeeSearchbarListProps) {
    const [result, setResult] = useState<ServiceEmployeeBasicType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorResponse | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchEmployees()
    })

    async function fetchEmployees() {
        if (result.length || error) return
        try {
            setLoading(true)
            const response = await axiosInstance.get<ServiceEmployeeBasicType[]>(`employees/admin/getForService`)
            setResult(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error instanceof AxiosError) {
                console.error(error)
                const serializableError: ErrorResponse = {
                    message: error.response?.data.message || 'Unexpected server error',
                    statusCode: error.status || 500
                }
                setError(serializableError)
            }
        }
    }

    const addEmployee = (employee: ServiceEmployeeBasicType) => {
        dispatch(addServiceCreateEmployeesValue(employee))
        dispatch(addModalState({ modalName: ServiceFormDataUIModalsStatesEnum.EMPLOYEEMODALISOPEN }))

    }
    const errorUIMessage = (): string => {
        if (error?.statusCode === 500) return 'Помилка при отриманні працівників'
        if (error?.statusCode === 404) return 'Немає працівників'
        return error?.message || 'Помилка при отриманні працівників'
    }

    const filteredEmployees = result.filter(employee => employee.name.includes(query))

    return (
        <AnimatePresenseWithDynamicHeight
            childrenIsrendered={showList}
            className={{
                absoluteContainer: styles.container
            }}
        >
            {loading && <div className={`${styles.line} ${styles.center}`}>
                Загрузка...
            </div>}

            {error ? <div className={`${styles.line} ${styles.center} ${styles.error}`}>
                {errorUIMessage()}
            </div> : filteredEmployees.map((employee, i) => {
                return (<button
                    key={employee.id}
                    type='button'
                    onClick={() => addEmployee(employee)}
                    className={`${styles.line} ${(i >= 1) ? styles.lineBorder : ''}`}
                >
                    {`${employee.name} ${employee.surname}`}
                </button>)
            })}
        </AnimatePresenseWithDynamicHeight>
    )
}
