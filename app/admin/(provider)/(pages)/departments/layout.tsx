'use client'

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable"
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine"
import { useEffect } from "react"
import styles from './layout.module.scss'
import ModalWindow from "@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow"
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks"
import { fetchDepartments, deleteDepartment as deleteDepartmentAction, deleteDepartmentFromState, openDepartmentsModal, closeDepartmentsModal } from "@/app/utils/redux/departments/departmentsSlice"
import { RootState } from "@/app/utils/redux/store"
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink"
import { fullfilled } from "@/app/services/response"
import { usePathname } from "next/navigation"
import { checkCreatePage, getUrlLastElement } from "@/app/services/navigation"

const titles = ['Місто', 'Адреса', 'Гаряча лінія', 'Опції']

export default function Departments({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { departments, departmentsIsModalOpen, error } = useAppSelector((state: RootState) => state.departments)

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const isCreatePage = checkCreatePage(pathname)

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [])

    const deleteDepartment = async (id: number, i: number) => {
        const response = await dispatch(deleteDepartmentAction(id))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            dispatch(deleteDepartmentFromState(id))
            closeModalWindow(i)
        }
    }

    const openModalWindow = (i: number) => {
        dispatch(openDepartmentsModal({ i }))
    }

    const closeModalWindow = (i: number) => {
        dispatch(closeDepartmentsModal({ i }))
    }

    return (
        <>
            <p className={`title lg`}>Відділення</p>
            <CommonTable titles={titles}>
                {!departments.length ? (
                    <p className='fetchError'>
                        {error.getAll?.statusCode === 404 || !error.delete ?
                            'Немає відділень' :
                            'Виникла помилка'}
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
                    <span>
                        <button
                            onClick={() => { openModalWindow(i) }}
                            className={`btn gray sm`}
                        >
                            Видалити
                        </button>
                        <SafeLink
                            className={`btn blue sm ${(getUrlLastElement(pathname) === `${department.id}`) ? 'disabled' : ''}`}
                            href={`/admin/departments/update/${department.id}`}
                        >
                            Змінити
                        </SafeLink>
                    </span>
                </TableLine>))}
            </CommonTable>
            <SafeLink
                className={`btn blue xl ${styles.addButton} ${isCreatePage ? 'disabled' : ''}`}
                href={'/admin/departments/create'}
            >
                Додати відділення
            </SafeLink>
            {children}
        </>
    )
}