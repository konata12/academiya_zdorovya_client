"use client";

import { useState } from "react";
import styles from "./DetailsDropdownList.module.scss";
import PlusMinusCheckbox from "@/app/common_ui/checkboxes/PlusMinusCheckbox/PlusMinusCheckbox";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";

interface DetailsDropdownListProps {
	title: string;
	text: string[] | string;
	className?: string;
}

export default function DetailsDropdownList({
	title,
	text,
	className,
}: DetailsDropdownListProps) {
	const [open, setOpen] = useState(false);

	return (
		<article className={`${styles.container} ${className || ""}`}>
			<div className={styles.labelContainer}>
				<h3>{title}</h3>
				<PlusMinusCheckbox
					isChecked={open}
					handleFunction={(e) => setOpen(e.target.checked)}
				/>
			</div>

			<AnimatePresenceWithDynamicHeight childrenIsRendered={open}>
				{typeof text === "string" ? (
					<p>{text}</p>
				) : (
					<ul className={`${styles.list}`}>
						{text.map((type, i) => {
							return <li key={i}>{type}</li>;
						})}
					</ul>
				)}
			</AnimatePresenceWithDynamicHeight>
		</article>
	);
}
