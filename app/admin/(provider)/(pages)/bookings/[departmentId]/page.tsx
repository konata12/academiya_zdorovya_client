"use client";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { Pagination } from "@/app/common_ui/Pagination/Pagination";
import { useParsedDate } from "@/app/utils/hooks/common/useParsedDate";
import {
	getDepartmentBookings,
	updateRepliedStatus,
} from "@/app/utils/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./page.module.scss";

const titles = ["ПІ пацієнта", "Номер телефону", "Послуга", "Дата", "Статус"];

export default function page() {
	const { departments, errors, status } = useAppSelector(
		(state: RootState) => state.booking,
	);

	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const { getParsedDateStringWithMinutes } = useParsedDate();
	const { departmentId } = useParams<{
		departmentId: string;
	}>();
	const page = searchParams.get("page");

	const department =
		departments && departments.find((department) => `${department.id}` === departmentId);

	useEffect(() => {
		dispatch(getDepartmentBookings({ id: departmentId, page }));
	}, [page]);

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

			<Pagination dataCount={department?.countAllBookings || 1} limit={15} />
		</>
	);
}
