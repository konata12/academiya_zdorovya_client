import styles from './CommonTable.module.scss'

export default function CommonTable({
    children,
    titles,
    tableId
}: Readonly<{
    children: React.ReactNode;
    titles: string[]
    tableId?: string
}>) {
    return (
        <div
            className={styles.table}
            id={tableId}
        >
            <div className={styles.titles}>
                {titles.map(title => (<span
                    className={styles.title}
                    key={title}
                >
                    {title}
                </span>))}
            </div>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    )
}
