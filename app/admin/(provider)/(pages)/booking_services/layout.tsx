"use client";

import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import { checkCreatePage } from "@/app/services/admin/navigation.service";
import {
	closeModalBookingServices,
	deleteBookingService as deleteBookingServiceAction,
	fetchBookingServices,
	openModalBookingServices,
} from "@/app/utils/redux/booking_services/bookingServicesSlice";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { usePathname } from "next/navigation";

import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";

const titles = ["Послуга", "Опції"];

export default function BookingServices({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { bookingServices, bookingServicesIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.bookingServices,
	);
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	useEffect(() => {
		dispatch(fetchBookingServices());
	}, []);

	const deleteBookingService = async (id: number) => {
		dispatch(deleteBookingServiceAction(id));
	};

	const openModalWindow = (i: number) => {
		dispatch(openModalBookingServices({ i }));
	};

	const closeModalWindow = (i: number) => {
		dispatch(closeModalBookingServices({ i }));
	};

	return (
		<>
			<p className={`title lg pb `}>Послуги для запису</p>
			<CommonTable titles={titles}>
				{!bookingServices.length ? (
					<CommonTable404
						error={error}
						status={status}
						notFoundMessage="Немає послуг"
					/>
				) : (
					bookingServices.map((service, i) => (
						<TableLine key={service.id}>
							<span>{service.name}</span>
							{bookingServicesIsModalOpen[i] && (
								<DeleteModalWindow
									title="Ви дійсно бажаєте видалити цю послугу для запису?"
									error={error}
									index={i}
									id={service.id}
									closeModalHandler={closeModalWindow}
									deleteHandler={deleteBookingService}
								/>
							)}
							<button
								onClick={() => {
									openModalWindow(i);
								}}
								className={`btn gray sm`}
							>
								Видалити
							</button>
						</TableLine>
					))
				)}
			</CommonTable>
			<SafeLink
				className={`btn blue xl ${styles.addButton} ${isCreatePage ? "disabled" : ""}`}
				href={"/admin/booking_services/create"}
			>
				Додати послугу
			</SafeLink>
			{children}
		</>
	);
}
