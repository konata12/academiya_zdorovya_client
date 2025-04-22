'use client'

import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow';
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable';
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine';
import React, { useEffect } from 'react'
import styles from './layout.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { RootState } from "@/app/utils/redux/store"
import { usePathname } from 'next/navigation';
import { checkCreatePage, getUrlLastElement } from '@/app/services/navigation';
import { fullfilled } from '@/app/services/response';
import { closeEmployeesModal, deleteEmployeeFromState, fetchEmployees, openEmployeesModal, deleteEmployee as deleteEmployeeAction } from '@/app/utils/redux/employees/employeesSlice';
import CommonTable404 from '@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404';


const titles = ['ПІ лікаря', 'Посада', 'Опції']

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        employees,
        employeesIsModalOpen,
        error
    } = useAppSelector((state: RootState) => state.employees)

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])

    const deleteEmployee = async (id: number, i: number) => {
        const response = await dispatch(deleteEmployeeAction(id))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            dispatch(deleteEmployeeFromState(id))
            closeModalWindow(i)
        }
    }

    const openModalWindow = (i: number) => {
        dispatch(openEmployeesModal({ i }))
    }

    const closeModalWindow = (i: number) => {
        dispatch(closeEmployeesModal({ i }))
    }

    return (
        <>
            <p className={`title lg`}>Працівники</p>
            <CommonTable titles={titles}>
                {!employees.length ? (
                    <CommonTable404
                        error={error}
                        notFoundMessage='Немає працівників'
                    />
                ) : (employees.map((employee, i) => <TableLine key={employee.id}>
                    <span>{`${employee.name} ${employee.surname}`}</span>
                    <span>{employee.position}</span>
                    {employeesIsModalOpen[i] && <ModalWindow
                        title="Ви дійсно бажаєте видалити це відділеня?"
                    >
                        <button
                            className={`btn cancel`}
                            onClick={() => { closeModalWindow(i) }}
                        >
                            Скасувати видалення
                        </button>
                        <button
                            onClick={() => { deleteEmployee(employee.id, i) }}
                            className={`btn blue lg`}
                        >
                            Підтвердити
                        </button>
                    </ModalWindow>}
                    <span>
                        <button
                            onClick={() => { openModalWindow(i) }}
                            className={`btn gray sm`}
                        >
                            Видалити
                        </button>
                        <SafeLink
                            className={`btn blue sm ${(getUrlLastElement(pathname) === `${employee.id}`) ? 'disabled' : ''}`}
                            href={`/admin/employees/update/${employee.id}`}
                        >
                            Змінити
                        </SafeLink>
                    </span>
                </TableLine>))}
            </CommonTable>
            <SafeLink
                className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                href={'/admin/employees/create'}
            >
                Додати працівника
            </SafeLink>
            {children}
        </>
    )
}
