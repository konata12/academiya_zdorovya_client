"use client";

import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { Employee } from "@/app/types/data/employees.type";
import React from "react";

export function EmployeeCardBtn({ employee }: { employee: Employee }) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<div>
			<button className={`btn blue md returnBtn`}>
				Дізнатися більше
				<RightArrow />
			</button>
		</div>
	);
}
