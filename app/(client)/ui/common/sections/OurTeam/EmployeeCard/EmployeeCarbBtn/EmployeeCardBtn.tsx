"use client";

import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { BigModal } from "@/app/common_ui/Modals/BigModal/BigModal";
import { Employee } from "@/app/types/data/employees.type";
import React from "react";

export function EmployeeCardBtn({ employee }: { employee: Employee }) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<div>
			<button className={`btn blue md returnBtn`} onClick={() => setModalOpen(true)}>
				Дізнатися більше
				<RightArrow />
			</button>
			<BigModal
				render={modalOpen}
				label={"Про лікаря"}
				closeHandler={() => setModalOpen(false)}
			>
				123
			</BigModal>
		</div>
	);
}
