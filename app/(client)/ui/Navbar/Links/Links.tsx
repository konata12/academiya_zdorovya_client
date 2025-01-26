import Link from "next/link"
import styles from './Links.module.scss'

const links = [
    { label: 'Про нас', url: 'about_us' },
    { label: 'Контакти', url: 'contacts' },
    { label: 'Послуги', url: 'services' },
    { label: 'Ціни', url: 'prices' },
    { label: 'Новини', url: 'news' },
]
export default function Links() {

    return (
        <div className={styles.links}>
            {
                links.map(link => {
                    return <Link
                        href={link.url}
                        key={link.url}
                    >{link.label}</Link>
                })
            }
        </div>
    )
}
