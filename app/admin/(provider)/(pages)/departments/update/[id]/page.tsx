'use client'

import ModalWindow from '@/app/admin/(provider)/ui/Forms/ModalWindow/ModalWindow'
import styles from './page.module.scss'
import UpdateDepartmentForm from '@/app/admin/(provider)/ui/Forms/depatrments/update/UpdateDepartmentsForm'
import { useEffect, useState } from 'react'
import { FieldErrors } from 'react-hook-form'
import { DepartmentsFormData } from '@/app/types/departments'
// import { useRouter } from 'next/router'

export default function UpdateDepartment() {

    return (
        <div className={styles.container}>
            <p className={`title left lg ${styles.title}`}>Редагувати відділення</p>
            <UpdateDepartmentForm
            >
                <button
                    type='submit'
                    className={`btn blue xl`}
                >
                    Підтвердити зміни
                </button>
            </UpdateDepartmentForm>
        </div>
    )
}