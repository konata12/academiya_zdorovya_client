import DepartmentsForm from '@/app/admin/ui/Forms/depatrments/create/CreateDepartmentForm'
import styles from './page.module.scss'

export default function CreateDepartment() {
    return (
        <div className={styles.container}>
            <p className={`title left lg ${styles.title}`}>Додати відділення</p>
            <DepartmentsForm>
                <button
                    className={`btn blue xl`}
                    type='submit'
                >
                    Створити
                </button>
            </DepartmentsForm>
        </div>
    )
}
