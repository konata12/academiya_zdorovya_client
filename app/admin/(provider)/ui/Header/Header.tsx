import Image from 'next/image'
import logo from '@/public/icons/logo_admin.png'
import styles from './Header.module.scss'
import NavLink from '@/app/admin/(provider)/ui/Links/NavLink/NavLink'
import { routes } from '@/app/admin/(provider)/ui/SideNavigation/SideNavigation'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const isLoginPage = pathname.split('/')[2] === 'login'
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
                        url='/admin/departments'
                        urlsForActive={urlsForRedactive}
                    >
                        Редактор сайту
                    </NavLink>
                    <NavLink
                        url='/admin/bookings'
                    >
                        Записи на прийом(число)
                    </NavLink> {/* must load from database amount of appointments */}
                </div>
            </div>
        </div>
    )
}
