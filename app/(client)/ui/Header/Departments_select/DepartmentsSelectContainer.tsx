"use client";

import React, { use, useEffect, useRef, useState } from "react";
import styles from "./DepartmentsSelectContainer.module.scss";
import { DepartmentSelect } from "@/app/(client)/ui/Header/Departments_select/DepartmentSelect/DepartmentSelect";
import { Department } from "@/app/types/data/departments.type";
import { getCookieInClientComponent } from "@/app/services/server/utils.service";

export default function DepartmentsSelectContainer({
	departmentsPromise,
}: {
	departmentsPromise: Promise<Department[]>;
}) {
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
	const [showList, setShowList] = useState(false);
	const componentRef = useRef<HTMLDivElement>(null);

	const departments = use(departmentsPromise);
	const departmentsList = departments.map((department: Department) => {
		return {
			id: department.id,
			label: `${department.city}, ${department.address}`,
		};
	});

	// SET INIT LIST DATA
	useEffect(() => {
		const departmentId = getCookieInClientComponent("departmentId");
		if (!departmentId) {
			setSelectedDepartment(departmentsList[0].label);
			document.cookie = `departmentId=${departmentsList[0].id}; path=/;`;
		} else {
			const department = departmentsList.find(
				(department) => `${department.id}` === departmentId,
			);
			if (department) {
				setSelectedDepartment(department.label);
			}
		}
	}, []);

	return (
		<div className={styles.container} ref={componentRef}>
			<div className={styles.selected} onClick={() => setShowList(!showList)}>
				<p
					className={`${styles.department} ${showList ? styles.on : ""} ${!selectedDepartment ? "loading" : ""}`}
				>
					{selectedDepartment}
				</p>
				<button
					className={`${styles.arrow} ${showList ? styles.on : ""}`}
					type="button"
				>
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
			<DepartmentSelect
				parentRef={componentRef}
				showList={showList}
				departments={departmentsList}
				setDepartment={setSelectedDepartment}
				setShowList={setShowList}
			/>
		</div>
	);
}
