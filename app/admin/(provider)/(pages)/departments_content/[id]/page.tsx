"use client";

import { DepartmentContentForm } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
	const { departments } = useAppSelector((state: RootState) => state.departments);

	const { id } = useParams<{
		id: string;
	}>();
	const department = departments.find((department) => `${department.id}` === id);

	return (
		<div>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>
					{department ? `${department.city}, ${department.address}` : "Помилка"}
				</p>
				<SafeLink className="btn blue md returnBtn" href="/admin/departments_content">
					Повернутись до відділів
					<RightArrow />
				</SafeLink>
			</div>
			<DepartmentContentForm />
		</div>
	);
}
