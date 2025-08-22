// noinspection JSFileReferences

"use client";

import React, { useEffect } from "react";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import styles from "@/app/admin/(provider)/(pages)/departments/layout.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { usePathname } from "next/navigation";
import { fetchDepartmentsWithRelations } from "@/app/utils/redux/departments/departmentsSlice";

const titles = ["Відділення", "Опції"];

export default function page() {
	const { departments, error, status } = useAppSelector(
		(state: RootState) => state.departments,
	);

	const dispatch = useAppDispatch();
	const pathname = usePathname();

	useEffect(() => {
		dispatch(fetchDepartmentsWithRelations());
	}, []);

	return (
		<div>
			<p className={`title lg`}>Наповнення відділення</p>
			<CommonTable titles={titles}>
				{!departments.length ? (
					<CommonTable404
						error={error}
						status={status}
						notFoundMessage="Немає відділень"
					/>
				) : (
					departments.map((department) => (
						<TableLine key={department.id}>
							<span>{`${department.city}, ${department.address}`}</span>
							<span>
								<SafeLink
									className={`btn blue sm`}
									href={`${pathname}/${department.id}`}
								>
									Дивитись наповнення
								</SafeLink>
							</span>
						</TableLine>
					))
				)}
			</CommonTable>
			<SafeLink
				className={`btn blue xl ${styles.addButton}`}
				href={"/admin/departments/create"}
			>
				Додати відділення
			</SafeLink>
		</div>
	);
}
