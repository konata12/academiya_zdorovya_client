import Image from 'next/image'
import logo from '@/public/icons/logo_admin.png'
import styles from './Header.module.scss'
import NavLink from '@/app/common_ui/NavLink/NavLink'
import { routes } from '@/app/admin/(provider)/ui/SideNavigation/SideNavigation'

export default function Header({
    isLoginPage
}: {
    isLoginPage: boolean
    }) {
    const urlsForRedactive = routes.map(route => route.path)

    return (
        <div className={`${styles.header}`}>
            <div className={`container ${styles.container} ${isLoginPage && styles.login}`}>
                <div className={styles.logo}>
                    <Image
                        src={logo}
                        alt='logo'
                    />
                </div>

                <div className={styles.links}>
                    <NavLink
                        text='Редактор сайту'
                        url='/admin/departments'
                        urlsForActive={urlsForRedactive}
                    />
                    <NavLink
                        text='Записи на прийом(число)'
                        url='/admin/bookings'
                    /> {/* must load from database amount of appointments */}
                </div>
            </div>
        </div>
    )
}
