"use client";

import { Department } from "@/app/types/data/departments.type";
import { useObserveCookie } from "@/app/utils/hooks/common/useObserveCookie";
import { use, useEffect, useState } from "react";

export default function DepartmentPhoneNumber({
	departmentsPromise,
	handledNumber,
	className,
}: {
	departmentsPromise: Promise<Department[]>;
	handledNumber?: string;
	className?: string;
}) {
	// const number = handledNumber || (await getDepartmentIdServerComponent(departmentsPromise));
	const [number, setNumber] = useState("Loading...");

	const departments = use(departmentsPromise);

	const id = useObserveCookie("departmentId");
	useEffect(() => {
		const department = departments.find((department) => `${department.id}` === id);

		if (department) {
			setNumber(department.hotline);
		} else {
			setNumber("Loading...");
		}
	}, [id]);

	return (
		<a href={`tel:${number}`} className={className || ""}>
			{number}
		</a>
	);
}
