'use client'

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable"
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine"
import type { Department } from "@/app/types/departments"
import { useEffect } from "react"
import styles from './layout.module.scss'
import Link from "next/link"
import ModalWindow from "@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow"
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks"
import { closeModal, fetchDepartments, openModal, deleteDepartment as deleteDepartmentAction, deleteDepartmentFromState } from "@/app/utils/redux/departments/departmentsSlice"
import { RootState } from "@/app/utils/redux/store"

const titles = ['Місто', 'Адреса', 'Гаряча лінія', 'Опції']

export default function Departments({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch()
    const { departments, departmentsIsModalOpen, error } = useAppSelector((state: RootState) => state.departments)

    useEffect(() => {
        getDepartments()
    }, [])

    const getDepartments = async () => {
        await dispatch(fetchDepartments())
    }

    const deleteDepartment = async (id: number) => {
        await dispatch(deleteDepartmentAction(id))
        dispatch(deleteDepartmentFromState({ id }))
    }

    const openModalWindow = (i: number) => {
        dispatch(openModal({ i }))
    }

    const closeModalWindow = (i: number) => {
        dispatch(closeModal({ i }))
    }

    return (
        <>
            <p className={`title lg ${styles.title}`}>Відділення</p>
            <CommonTable titles={titles}>
                {!departments.length ? (
                    <p className={styles.departmentsResponseError}>
                        {error.get?.statusCode === 404 ?
                            'Немає відділень' :
                            'Виникла помилка'}
                    </p>
                ) : (departments && departments.map((department, i) => <TableLine key={department.id}>
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
                            onClick={() => { deleteDepartment(department.id) }}
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
        </>
    )
}