import Link from 'next/link'
import styles from './SideNavButton.module.scss'
import { usePathname } from 'next/navigation'

export default function SideNavButton({
    path,
    label
}: {
    path: string
    label: string
}) {
    const pathname = usePathname()
    const urlPath = pathname.split('/', 3).join('/')
    const isActive = urlPath === path

    return (
        <>
            <Link
                className={`${styles.link} ${isActive && styles.active}`}
                href={path}
            >
                {label}
                <div className={`${styles.sideLine}`}></div>
            </Link>
        </>
    )
}
