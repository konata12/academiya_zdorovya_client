"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import { getAllNotRepliedCountForEveryDepartment } from "@/app/utils/redux/booking/bookingSlice";

const titles = ["Відділення", "К-ть нових записів", "Опції"];

export default function page() {
	const { departments, errors, status } = useAppSelector(
		(state: RootState) => state.booking,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllNotRepliedCountForEveryDepartment());
	}, []);

	const errorUIMessage = (): string => {
		if (status.getAllNotRepliedCountForEveryDepartment === "loading")
			return "Завантаження...";

		if (errors.getAllNotRepliedCountForEveryDepartment?.statusCode === 404) {
			return "Немає відділень";
		} else {
			return "Помилка при отриманні відділень";
		}
	};

	return (
		<div>
			<p className={`title lg`}>Наповнення відділення</p>
			<CommonTable titles={titles}>
				{!departments || !departments.length ? (
					<p className={`fetchError`}>{errorUIMessage()}</p>
				) : (
					departments &&
					departments.map((department) => (
						<TableLine key={department.id}>
							<span>{`${department.city}, ${department.address}`}</span>
							<span>{`${department.notRepliedCount}`}</span>
							<span>
								<SafeLink
									className={`btn blue sm`}
									href={`/admin/bookings/${department.id}`}
								>
									Дивитись записи
								</SafeLink>
							</span>
						</TableLine>
					))
				)}
			</CommonTable>
		</div>
	);
}
