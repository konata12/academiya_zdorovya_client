import styles from './SideNavigatin.module.scss'
import SideNavButton from "@/app/admin/(provider)/ui/SideNavigation/SideNavButton/SideNavButton"

export const routes = [
    { label: 'Відділення', path: '/admin/departments' },
    { label: 'Наповнення відділення', path: '/admin/fill_departments' },
    { label: 'Юридична інформація', path: '/admin/law_info' },
    { label: 'Що лікуємо', path: '/admin/what_treat' },
    { label: 'Лікарі', path: '/admin/employees' },
    { label: 'Послуги для запису', path: '/admin/booking_services' },
    { label: 'Послуги', path: '/admin/services' },
    { label: 'Ціни на послуги', path: '/admin/prices' },
    { label: 'Відгуки', path: '/admin/reviews' },
    { label: 'Новини', path: '/admin/news' },
]

export default function SideNavigation() {

    return (
        <div className={styles.sideNav}>
            {routes.map(route => {
                return (<SideNavButton
                    path={route.path}
                    label={route.label}
                    key={route.path}
                />)
            })}
        </div>
    )
}
