"use client";

import styles from "./layout.module.scss";
import {
	checkCreatePage,
	getUrlLastElement,
} from "@/app/services/navigation.service";
import {
	closeDepartmentsModal,
	deleteDepartment as deleteDepartmentAction,
	fetchDepartments,
	openDepartmentsModal,
} from "@/app/utils/redux/departments/departmentsSlice";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";

const titles = ["Місто", "Адреса", "Гаряча лінія", "Опції"];

export default function Departments({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { departments, departmentsIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.departments,
	);

	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	useEffect(() => {
		dispatch(fetchDepartments());
	}, []);

	const deleteDepartment = async (id: number) => {
		dispatch(deleteDepartmentAction(id));
	};

	const openModalWindow = (i: number) => {
		dispatch(openDepartmentsModal({ i }));
	};

	const closeModalWindow = (i: number) => {
		dispatch(closeDepartmentsModal({ i }));
	};

	return (
		<>
			<p className={`title lg`}>Відділення</p>
			<CommonTable titles={titles}>
				{!departments.length ? (
					<CommonTable404
						error={error}
						status={status}
						notFoundMessage="Немає відділень"
					/>
				) : (
					departments.map((department, i) => (
						<TableLine key={department.id}>
							<span>{department.city}</span>
							<span>{department.address}</span>
							<span>{department.hotline}</span>
							{departmentsIsModalOpen[i] && (
								<DeleteModalWindow
									title="Ви дійсно бажаєте видалити це відділення?"
									error={error}
									index={i}
									id={department.id}
									closeModalHandler={closeModalWindow}
									deleteHandler={deleteDepartment}
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
									className={`btn blue sm ${getUrlLastElement(pathname) === `${department.id}` ? "disabled" : ""}`}
									href={`/admin/departments/update/${department.id}`}
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
				href={"/admin/departments/create"}
			>
				Додати відділення
			</SafeLink>
			{children}
		</>
	);
}
