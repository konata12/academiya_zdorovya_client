'use client'

import ModalWindow from '@/app/admin/ui/Forms/ModalWindow/ModalWindow'
import styles from './page.module.scss'
import UpdateDepartmentForm from '@/app/admin/ui/Forms/depatrments/update/UpdateDepartmentsForm'
import { useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { DepartmentsFormData } from '@/app/admin/types'

export default function UpdateDepartment() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [formErrors, setFormErrors] = useState<FieldErrors<DepartmentsFormData>>({})
    const [responseErrors, setResponseErrors] = useState({})

    const handleErrors = (errors: FieldErrors<DepartmentsFormData>, responseError: {}) => {
        setFormErrors(errors)
        setResponseErrors(responseError)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className={styles.container}>
            <p className={`title left lg ${styles.title}`}>Редагувати відділення</p>
            <UpdateDepartmentForm
                onErrors={handleErrors}
                handleModal={closeModal}
            >
                <button
                    onClick={() => {
                        if (!Object.entries(formErrors).length) {
                            setModalIsOpen(true)
                        }
                    }}
                    type='button'
                    className={`btn blue xl`}
                >
                    Підтвердити зміни
                </button>
                {modalIsOpen && <ModalWindow
                    title='Ви дійсно бажаєте покинути сторінку?'
                >
                    <p className={styles.text}>
                        Зміни не буде збережено
                    </p>
                    <button
                        onClick={() => { setModalIsOpen(false) }}
                        type='button'
                        className='btn cancel'
                    >
                        Скасувати
                    </button>
                    <button
                        className='btn blue xl'
                        type='submit'
                    >
                        Підтвердити
                    </button>
                </ModalWindow>}
            </UpdateDepartmentForm>
        </div>
    )
}