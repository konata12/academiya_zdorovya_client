import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenceWithDynamicHeight";
import React, { RefObject, useEffect, useRef } from "react";
import { DepartmentSelectOptions } from "@/app/(clientErrorsLayout)/(client)/types";
import styles from "./DepartmentSelect.module.scss";

interface DepartmentSelectProps {
	showList: boolean;
	departments: DepartmentSelectOptions[] | null;
	error: string | null;
	setDepartment: React.Dispatch<React.SetStateAction<string | null>>;
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	parentRef: RefObject<HTMLDivElement | null>;
}

export function DepartmentSelect({
	showList,
	departments,
	error,
	setDepartment,
	setShowList,
	parentRef,
}: DepartmentSelectProps) {
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const departmentEl = parentRef?.current;
			// Check if click target is NOT inside the referenced element
			if (
				listRef.current &&
				!listRef.current.contains(event.target as Node) &&
				(!departmentEl || !departmentEl.contains(event.target as Node))
			) {
				setShowList(false);
			}
		}

		// Attach listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [listRef]);

	const changeDepartment = (department: DepartmentSelectOptions) => {
		setDepartment(department.label);
		document.cookie = `departmentId=${department.id}; path=/;`;
	};

	if (error !== null) return;

	// todo change position a little bit and add triangle from arrow
	return (
		<AnimatePresenceWithDynamicHeight
			childrenIsRendered={showList}
			className={{
				relativeContainer: styles.listContainer,
				absoluteContainer: styles.container,
			}}
		>
			<div ref={listRef}>
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
		</AnimatePresenceWithDynamicHeight>
	);
}
