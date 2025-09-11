"use client";

import { DepartmentSelectOptions } from "@/app/(client)/types";
import { useElementWidth } from "@/app/utils/hooks/common/useElementWidth";
import { useSelect } from "@/app/utils/hooks/common/useSelect";
import React, { RefObject, useEffect } from "react";
import styles from "./DepartmentSelect.module.scss";

interface DepartmentSelectProps {
	showList: boolean;
	departments: DepartmentSelectOptions[] | null;
	setDepartment: React.Dispatch<React.SetStateAction<string | null>>;
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	parentRef: RefObject<HTMLDivElement | null>;
}

export function DepartmentSelect({
	showList,
	departments,
	setDepartment,
	setShowList,
	parentRef,
}: DepartmentSelectProps) {
	const [triangleLeftPosition, setTriangleLeftPosition] = React.useState<number | "unset">(
		"unset",
	);
	const { width, ref } = useElementWidth<HTMLDivElement>(5);
	const { listRef } = useSelect({ setShowList, parentRef });

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

	const changeDepartment = (department: DepartmentSelectOptions) => {
		setDepartment(department.label);
		document.cookie = `departmentId=${department.id}; path=/;`;
		window.location.reload();
	};

	return (
		<div
			className={styles.container}
			ref={ref}
			style={showList ? { opacity: 1, transform: "scaleY(1)" } : undefined}
		>
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
			<div ref={listRef} className={styles.listContainer}>
				{departments &&
					departments.map((department, i) => {
						return (
							<button
								key={department.id}
								type="button"
								onClick={() => changeDepartment(department)}
								className={`${styles.line} ${i >= 1 ? styles.lineBorder : ""}`}
							>
								{department.label}
							</button>
						);
					})}
			</div>
		</div>
	);
}
