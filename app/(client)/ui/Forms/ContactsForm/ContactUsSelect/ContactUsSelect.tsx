import {
	ContactUsSelectList,
	ListElement,
} from "@/app/(client)/ui/Forms/ContactsForm/ContactUsSelect/ContactUsSelectList/ContactUsSelectList";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import React, { useRef, useState } from "react";
import styles from "./ContactUsSelect.module.scss";

interface SelectProps {
	list: ListElement[];
	selectError: boolean;
	parentHandleListSelect?: (id: number, label: string) => void;
}

export function ContactUsSelect({ list, selectError, parentHandleListSelect }: SelectProps) {
	const [listValue, setListValue] = useState<string>("Оберіть послугу");
	const [showList, setShowList] = useState(false);

	const selectRef = useRef<HTMLDivElement>(null);

	const handleListSelect = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number,
		label: string,
	) => {
		e.preventDefault();
		setShowList(false);
		setListValue(label);

		if (parentHandleListSelect) {
			parentHandleListSelect(id, label);
		}
	};

	return (
		<div className={styles.selectContainer} ref={selectRef}>
			<div className={styles.selectedValue}>
				<button
					className={`button ${styles.button} ${showList ? styles.on : ""} ${selectError ? styles.btnError : ""}`}
					type="button"
					onClick={() => {
						setShowList(!showList);
					}}
				>
					<p>{listValue}</p>
					<svg
						className={`${styles.svg} ${showList ? styles.on : ""}`}
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="10"
						viewBox="0 0 16 10"
						fill="none"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M14.947 1.65244C14.8149 1.27755 14.5611 1.07606 14.1868 1.04865C13.7315 1.01533 13.8458 0.918445 11.268 3.52158L8.90274 5.91006V5.89957C8.5 6.29396 8 6.83517 8 6.83517L7.10061 5.91073L4.75583 3.53978C2.28359 1.03991 2.24054 1.00202 1.87569 1.00001C1.63429 0.998663 1.29238 1.18671 1.1451 1.40184C0.993768 1.62294 0.956416 1.95477 1.05385 2.21282C1.10701 2.35358 1.75192 3.02679 4.34581 5.64927C7.74627 9.08719 7.65087 8.9998 8.00167 8.9998C8.35247 8.9998 8.25714 9.0871 11.6581 5.64927C14.6668 2.608 14.8887 2.3741 14.9449 2.18346C15.0179 1.93649 15.0181 1.85426 14.947 1.65244Z"
							strokeWidth="0.3"
						/>
					</svg>
				</button>
			</div>

			<AnimatePresenceWithDynamicHeight
				childrenIsRendered={showList}
				className={{
					relativeContainer: styles.listContainer,
				}}
			>
				<ContactUsSelectList
					setShowList={setShowList}
					handleClick={handleListSelect}
					parentRef={selectRef}
					list={list}
				/>
			</AnimatePresenceWithDynamicHeight>
		</div>
	);
}
