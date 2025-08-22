"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import React from "react";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { DepartmentContentForm } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";

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
					{department ? `${department.city}, ${department.address}` : "Проблема"}
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
