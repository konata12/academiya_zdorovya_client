"use client";

import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import { checkCreatePage, getUrlLastElement } from "@/app/services/admin/navigation.service";
import {
	closeEmployeesModal,
	deleteEmployee as deleteEmployeeAction,
	fetchEmployees,
	openEmployeesModal,
} from "@/app/utils/redux/employees/employeesSlice";
import { fulfilled } from "@/app/services/admin/response.service";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";

const titles = ["ПІ лікаря", "Посада", "Опції"];

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { employees, employeesIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.employees,
	);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	useEffect(() => {
		dispatch(fetchEmployees());
	}, []);

	const deleteEmployee = async (id: number) => {
		const response = await dispatch(deleteEmployeeAction(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) router.push("/admin/employees");
	};

	const openModalWindow = (i: number) => {
		dispatch(openEmployeesModal({ i }));
	};

	const closeModalWindow = (i: number) => {
		dispatch(closeEmployeesModal({ i }));
	};

	return (
		<>
			<p className={`title lg mb`}>Лікарі</p>
			<CommonTable titles={titles}>
				{!employees.length ? (
					<CommonTable404
						error={error}
						status={status}
						notFoundMessage="Немає працівників"
					/>
				) : (
					employees.map((employee, i) => (
						<TableLine key={employee.id}>
							<span>{`${employee.name} ${employee.surname}`}</span>
							<span>{employee.position}</span>
							{employeesIsModalOpen[i] && (
								<DeleteModalWindow
									title="Ви дійсно бажаєте видалити цього працівника?"
									error={error}
									index={i}
									id={employee.id}
									closeModalHandler={closeModalWindow}
									deleteHandler={deleteEmployee}
								/>
							)}
							<span>
								<button
									onClick={() => {
										openModalWindow(i);
									}}
									className={`btn gray sm`}
								>
									Видалити
								</button>
								<SafeLink
									className={`btn blue sm ${getUrlLastElement(pathname) === `${employee.id}` ? "disabled" : ""}`}
									href={`/admin/employees/update/${employee.id}`}
								>
									Змінити
								</SafeLink>
							</span>
						</TableLine>
					))
				)}
			</CommonTable>
			<SafeLink
				className={`btn blue xl ${styles.addButton} ${isCreatePage ? "disabled" : ""}`}
				href={"/admin/employees/create"}
			>
				Додати працівника
			</SafeLink>
			{children}
		</>
	);
}
