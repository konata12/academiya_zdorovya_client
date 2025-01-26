import Link from "next/link"

const routes = [
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
        <div>
            {routes.map(route => {
                return (<Link
                    href={route.path}
                    key={route.path}
                >
                    {route.label}
                </Link>)
            })}
        </div>
    )
}
