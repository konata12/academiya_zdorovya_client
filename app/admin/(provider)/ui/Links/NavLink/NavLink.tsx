import styles from './NavLink.module.scss'
import { usePathname } from 'next/navigation'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'

export default function NavLink({
    children,
    url,
    urlsForActive = []
}: {
    children?: React.ReactNode,
    url: string,
    urlsForActive?: string[]
}) {
    const pathname = usePathname()
    let isActive: boolean

    if (urlsForActive.length) {
        // get the first 2 parts of the pathname
        const path = pathname.split('/', 3).join('/')
        isActive = urlsForActive.includes(path)
    } else {
        isActive = pathname === url
    }

    return (
        <div className={`${styles.link} ${isActive ? styles.active : ''}`}>
            <SafeLink
                className={`${styles.url} ${isActive ? styles.active : ''}`}
                href={url}
            >
                {children}
            </SafeLink>
            <div className={`${styles.bottom}`}></div>
        </div>
    )
}