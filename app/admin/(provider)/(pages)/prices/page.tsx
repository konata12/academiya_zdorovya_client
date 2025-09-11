"use client";

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import React, { useEffect } from "react";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import { fetchDepartments } from "@/app/utils/redux/departments/departmentsSlice";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";

const titles = ["Відділення", "Опції"];

export default function page() {
	const { departments, error } = useAppSelector((state: RootState) => state.departments);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchDepartments());
	}, []);

	return (
		<>
			<p className={`title lg mb`}>Виберіть відділення</p>
			<CommonTable titles={titles}>
				{!departments.length ? (
					<p className="fetchError">
						{error.getAll?.statusCode === 404 || !error.delete
							? "Немає відділень"
							: "Виникла помилка"}
					</p>
				) : (
					departments.map((department) => (
						<TableLine key={department.id}>
							<span>
								{department.city}, {department.address}
							</span>
							<SafeLink
								className={`btn blue sm`}
								href={`/admin/prices/${department.id}`}
							>
								Дивитись послуги відділення
							</SafeLink>
						</TableLine>
					))
				)}
			</CommonTable>
		</>
	);
}
