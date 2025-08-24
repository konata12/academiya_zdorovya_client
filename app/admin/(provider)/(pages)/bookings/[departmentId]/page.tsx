"use client";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import {
	getDepartmentBookings,
	updateRepliedStatus,
} from "@/app/utils/redux/booking/bookingSlice";
import { useParsedDate } from "@/app/utils/hooks/common/useParsedDate";
import styles from "./page.module.scss";

const titles = ["ПІ пацієнта", "Номер телефону", "Послуга", "Дата", "Статус"];

export default function page() {
	const { departments, errors, status } = useAppSelector(
		(state: RootState) => state.booking,
	);

	const dispatch = useAppDispatch();
	const { getParsedDateStringWithMinutes } = useParsedDate();
	const { departmentId } = useParams<{
		departmentId: string;
	}>();

	const department =
		departments && departments.find((department) => `${department.id}` === departmentId);

	useEffect(() => {
		if (!department?.bookings) {
			dispatch(getDepartmentBookings(departmentId));
		}
	}, []);

	const errorUIMessage = (): string => {
		if (status.getDepartmentBookings === "loading") return "Завантаження...";
		if (errors.getDepartmentBookings?.statusCode === 404) {
			return "Немає записів";
		} else {
			return "Помилка при отриманні записів відділення";
		}
	};
	const handleRepliedStandChange = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number,
	) => {
		// DISABLE BUTTON FOR 1 SECOND
		const button = e.currentTarget;
		button.disabled = true;
		setTimeout(() => {
			button.disabled = false;
		}, 1000);

		// MAKE REQUEST TO SERVER
		dispatch(updateRepliedStatus({ id, departmentId }));
	};

	return (
		<>
			<div className="titleContainerWithReturnBtn">
				<p className={`title left md`}>
					{department
						? `${department.city}, ${department.address}`
						: "Помилка при отриманні даних відділення"}
				</p>
				<SafeLink className="btn blue md returnBtn" href="./">
					Назад
					<RightArrow />
				</SafeLink>
			</div>

			<CommonTable
				titles={titles}
				className={{
					titles: styles.titles,
					list: styles.list,
				}}
			>
				{!department?.bookings || errors.getDepartmentBookings ? (
					<p className={`fetchError`}>{errorUIMessage()}</p>
				) : (
					department?.bookings &&
					department.bookings.map((booking, i) => (
						<TableLine key={i}>
							<span>{`${booking.name}, ${booking.surname}`}</span>
							<span>{`${booking.phoneNumber}`}</span>
							<span>{`${booking.bookingService}`}</span>
							<span>{getParsedDateStringWithMinutes(booking.createdAt)}</span>
							<span>
								<button
									className={`btn ${booking.replied ? "gray" : "blue"} sm`}
									type="button"
									onClick={(e) => handleRepliedStandChange(e, booking.id)}
								>
									{booking.replied ? "Не прийняти" : "Прийняти"}
								</button>
							</span>
						</TableLine>
					))
				)}
			</CommonTable>
		</>
	);
}
