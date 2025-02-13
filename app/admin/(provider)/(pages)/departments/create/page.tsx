import CreateDepartmentForm from '@/app/admin/(provider)/ui/Forms/depatrments/create/CreateDepartmentForm'
import styles from './page.module.scss'

export default function CreateDepartment() {
    return (
        <div className={styles.container}>
            <p className={`title left lg ${styles.title}`}>Додати відділення</p>
            <CreateDepartmentForm>
                <button
                    className={`btn blue xl`}
                    type='submit'
                >
                    Створити
                </button>
            </CreateDepartmentForm>
        </div>
    )
}
