'use client'

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable"
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine"
import type { Departments } from "@/app/types/departments"
import axiosInstance from "@/app/utils/axios"
import { useEffect, useState } from "react"
import styles from './layout.module.scss'
import Link from "next/link"
import ModalWindow from "@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow"
import { AxiosError } from "axios"
import { ErrorResponse } from "@/app/types/response"

const titles = ['Місто', 'Адреса', 'Гаряча лінія', 'Опції']

export default function Departments({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [departments, setDepartments] = useState<Departments[]>([])
    // need to correctly display error or departments in CommonTable
    const [getDepartmentsError, setGetDepartmentsError] = useState<AxiosError | null>(null)
    // need for every department to have seperate state for ModalWindow of every department
    const [departmentsIsModalOpen, setDepartmentsIsModalOpen] = useState<boolean[]>([])

    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        try {
            const response = await axiosInstance.get('departments')
            console.log('departments: ', response)
            const departmentsModalState = new Array(response.data.length).fill(false)
            setDepartmentsIsModalOpen(departmentsModalState)
            setDepartments(response.data)
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) setGetDepartmentsError(error)
        }
    }

    const deleteDepartment = async (id: number, i: number) => {
        try {
            const response = await axiosInstance.delete(`departments/admin/${id}`)
            await getDepartments()
            console.log(response)
            closeModalWindow(i)
        } catch (error) {
            console.log(error)
            closeModalWindow(i)
        }
    }

    const openModalWindow = (i: number) => {
        const updatedStates = [...departmentsIsModalOpen]
        updatedStates[i] = true
        setDepartmentsIsModalOpen(updatedStates)
    }

    const closeModalWindow = (i: number) => {
        const updatedStates = [...departmentsIsModalOpen]
        updatedStates[i] = false
        setDepartmentsIsModalOpen(updatedStates)
    }

    return (
        <div className={`fw ${styles.container}`}>
            <p className={`title lg ${styles.title}`}>Відділення</p>
            <CommonTable titles={titles}>
                {getDepartmentsError ? (
                    <p className={styles.departmentsResponseError}>
                        {(getDepartmentsError.response?.data as ErrorResponse)?.message
                            || 'Невідома помилка'}
                    </p>
                ) : (departments.map((department, i) => <TableLine key={department.id}>
                    <span>{department.city}</span>
                    <span>{department.address}</span>
                    <span>{department.hotline}</span>
                    {departmentsIsModalOpen[i] && <ModalWindow
                        title="Ви дійсно бажаєте видалити це відділеня?"
                    >
                        <button
                            className={`btn cancel`}
                            onClick={() => { closeModalWindow(i) }}
                        >
                            Скасувати видалення
                        </button>
                        <button
                            onClick={() => { deleteDepartment(department.id, i) }}
                            className={`btn blue lg`}
                        >
                            Підтвердити
                        </button>
                    </ModalWindow>}
                    <span className={styles.buttons}>
                        <button
                            onClick={() => { openModalWindow(i) }}
                            className={`btn gray sm`}
                        >
                            Видалити
                        </button>
                        <Link href={`/admin/departments/update/${department.id}`}>
                            <button
                                className={`btn blue sm`}
                            >
                                Змінити
                            </button>
                        </Link>
                    </span>
                </TableLine>))}
            </CommonTable>
            <Link href={'/admin/departments/create'}>
                <button
                    className={`btn blue xl ${styles.addButton}`}
                >
                    Додати відділення
                </button>
            </Link>
            {children}
        </div>
    )
}