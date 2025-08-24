import styles from "./CommonTable.module.scss";

interface CommonTableProps {
	children: React.ReactNode;
	titles: string[];
	tableId?: string;
	className?: {
		titles?: string;
		list?: string;
	};
}
export default function CommonTable({
	children,
	titles,
	tableId,
	className,
}: CommonTableProps) {
	return (
		<div className={styles.table} id={tableId}>
			<div className={`${styles.titles} ${className?.titles || ""}`}>
				{titles.map((title) => (
					<span className={styles.title} key={title}>
						{title}
					</span>
				))}
			</div>
			<div className={`${styles.list} ${className?.list || ""}`}>{children}</div>
		</div>
	);
}
