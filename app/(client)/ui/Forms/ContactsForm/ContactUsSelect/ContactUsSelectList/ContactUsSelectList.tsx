import { useSelect, UseSelectProps } from "@/app/utils/hooks/common/useSelect";
import React from "react";
import styles from "./ContactUsSelectList.module.scss";

export interface ListElement {
	id: number;
	name: string;
}
interface SelectListProps extends UseSelectProps {
	list: ListElement[];
	handleClick: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number,
		label: string,
	) => void;
}

export function ContactUsSelectList({
	setShowList,
	parentRef,
	list,
	handleClick,
}: SelectListProps) {
	const { listRef } = useSelect({ setShowList, parentRef });

	return (
		<div ref={listRef} className={styles.listContainer}>
			{list.map((item, i) => {
				return (
					<button
						key={item.id}
						type="button"
						onClick={(e) => handleClick(e, item.id, item.name)}
						className={`${styles.line} ${i >= 1 ? styles.lineBorder : ""}`}
					>
						{item.name}
					</button>
				);
			})}
		</div>
	);
}
