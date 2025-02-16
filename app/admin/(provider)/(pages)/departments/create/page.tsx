import CreateDepartmentForm from '@/app/admin/(provider)/ui/Forms/depatrments/create/CreateDepartmentForm'
import styles from './page.module.scss'

export default function CreateDepartment() {
    return (
        <div className={styles.container}>
            <p className={`title left md ${styles.title}`}>Додати відділення</p>
            <CreateDepartmentForm />
        </div>
    )
}
