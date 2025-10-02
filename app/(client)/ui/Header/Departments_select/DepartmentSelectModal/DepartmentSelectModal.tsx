"use client";

import { DepartmentSelectOptions } from "@/app/(client)/types";
import { getCookieInClientComponent } from "@/app/services/client/utils.service";
import { useElementWidth } from "@/app/utils/hooks/common/useElementWidth";
import { useSelect } from "@/app/utils/hooks/common/useSelect";
import React, { RefObject, useEffect } from "react";
import styles from "./DepartmentSelectModal.module.scss";

interface DepartmentSelectProps {
	departments: DepartmentSelectOptions[] | null;
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	parentRef: RefObject<HTMLDivElement | null>;
}

export function DepartmentSelectModal({
	departments,
	setShowList,
	parentRef,
}: DepartmentSelectProps) {
	const [triangleLeftPosition, setTriangleLeftPosition] = React.useState<number | "unset">(
		"unset",
	);
	const [choseDepartment, setChoseDepartment] = React.useState<boolean>(true);

	const { width, ref } = useElementWidth<HTMLDivElement>(5);
	const { listRef } = useSelect({ setShowList, parentRef });

	// CHECK IF DEPARTMENT WAS SELECTED PREVIOUSLY
	useEffect(() => {
		const chose = getCookieInClientComponent("choseDepartment");
		if (chose === "true") return;

		setChoseDepartment(false);
	}, []);

	// OBSERVE LIST TITLE WIDTH
	useEffect(() => {
		if (!parentRef.current) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setTriangleLeftPosition(entry.contentRect.width);
			}
		});

		observer.observe(parentRef.current);
		setTriangleLeftPosition(parentRef.current.offsetWidth);

		return () => observer.disconnect();
	}, [parentRef.current]);

	const selectDepartment = (value: boolean) => {
		setChoseDepartment(true);
		setShowList(true);

		document.cookie = `choseDepartment=${value}; path=/;`;
	};

	const submitChosen = (value: boolean) => {
		setChoseDepartment(true);
		document.cookie = `choseDepartment=${value}; path=/;`;
	};

	return (
		<div
			className={styles.container}
			ref={ref}
			style={!choseDepartment ? { opacity: 1 } : undefined}
		>
			<div
				className={styles.modalBackground}
				style={!choseDepartment ? { opacity: 1, display: "block" } : undefined}
				onClick={() => submitChosen(true)}
			></div>
			<svg
				className={styles.triangle}
				style={
					width <= 728
						? {
								left:
									triangleLeftPosition === "unset"
										? "unset"
										: `${triangleLeftPosition - 31}px`,
							}
						: undefined
				}
				xmlns="http://www.w3.org/2000/svg"
				width="29"
				height="13"
				viewBox="0 0 29 13"
				fill="none"
			>
				<path
					d="M11.2031 1.16864C12.7645 -0.389545 15.2921 -0.389546 16.8535 1.16864L28.0566 12.3483H0L11.2031 1.16864Z"
					fill="#fff"
				/>
			</svg>
			<div ref={listRef} className={styles.modalContent}>
				<p className={`title xs left`}>Це ваше відділення?</p>
				<p className={styles.department}>
					{departments ? departments[0].label : "Loading"}
				</p>

				<div className={styles.btnContainer}>
					<button
						className={`btn blue md ${styles.btn}`}
						type={"button"}
						onClick={() => submitChosen(true)}
					>
						Так
					</button>
					<button
						className={`btn gray md ${styles.btn}`}
						type={"button"}
						onClick={() => selectDepartment(true)}
					>
						Обрати інше
					</button>
				</div>
			</div>
		</div>
	);
}
