import styles from './ModalWindow.module.scss'

export default function ModalWindow({
    children,
    title
}: Readonly<{
    children: React.ReactNode
    title: string
}>) {
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <p className={styles.title}>
                    {title}
                </p>
                {children}
            </div>
        </div>
    )
}
