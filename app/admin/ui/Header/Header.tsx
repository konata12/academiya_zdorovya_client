import Image from 'next/image'
import logo from '@/public/icons/logo_admin.png'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header({
    isLoginPage
}: {
    isLoginPage: boolean
}) {

    return (
        <div className={`${styles.header} ${isLoginPage && styles.login}`}>
            <div className={styles.logo}>
                <Image
                    src={logo}
                    alt='logo'
                />
            </div>
            {/* <Link
                href={'/admin/login'}
            >
                login
            </Link> */}

            <div className={styles.links}>
                <Link
                    className={styles.link}
                    href={'/admin/departments'}
                >
                    Редактор сайту
                </Link>
                <Link
                    className={styles.link}
                    href={'/admin/bookings'}
                >
                    Записи на прийом(число) {/* must load from database amount of appointments */}
                </Link>
            </div>
        </div>
    )
}
