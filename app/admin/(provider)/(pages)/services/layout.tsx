"use client";

import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import { checkCreatePage, getUrlLastElement } from "@/app/services/admin/navigation.service";
import {
	closeServiceModal,
	deleteService as deleteServiceAction,
	fetchServices,
	openServiceModal,
} from "@/app/utils/redux/services/servicesSlice";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { usePathname } from "next/navigation";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";
import { setUpdatingState } from "@/app/utils/redux/services/serviceFromUISlice";

const titles = ["Назва", "Опції"];

export default function page({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { services, servicesIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.services,
	);
	console.log("services: ", services);

	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	useEffect(() => {
		dispatch(fetchServices());
	}, []);

	const deleteService = async (id: number) => {
		dispatch(deleteServiceAction(id));
	};

	const openModalWindow = (i: number) => {
		dispatch(openServiceModal(i));
	};
	const closeModalWindow = (i: number) => {
		dispatch(closeServiceModal(i));
	};

	return (
		<>
			{pathname.includes("serviceType") || (
				<>
					<p className={`title lg pb`}>Послуги</p>

					<CommonTable titles={titles}>
						{!services.length ? (
							<CommonTable404
								error={error}
								status={status}
								notFoundMessage="Немає послуг"
							/>
						) : (
							services.map((service, i) => (
								<TableLine key={service.id}>
									<span>{service.title}</span>

									{servicesIsModalOpen[i] && (
										<DeleteModalWindow
											title="Ви дійсно бажаєте видалити цю послугу?"
											error={error}
											index={i}
											id={service.id}
											closeModalHandler={closeModalWindow}
											deleteHandler={deleteService}
										/>
									)}

									<span className={styles.tableLineOptions}>
										<button
											onClick={() => {
												openModalWindow(i);
											}}
											className={`btn gray sm`}
										>
											Видалити
										</button>
										<SafeLink
											className={`btn blue sm ${getUrlLastElement(pathname) === `${service.id}` ? "disabled" : ""}`}
											href={`/admin/services/update/${service.id}`}
											customHandleClick={() =>
												dispatch(setUpdatingState(false))
											}
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
						href={"/admin/services/create"}
					>
						Додати послугу
					</SafeLink>
				</>
			)}

			{children}
		</>
	);
}
