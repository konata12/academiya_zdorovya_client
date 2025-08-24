import {
	DepartmentContentSelectButtonsType,
	DetailsContentFormBasicProps,
} from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";
import {
	Department,
	DepartmentsBookingService,
	DepartmentsEmployee,
	DepartmentsService,
	DetailsContentDataType,
} from "@/app/types/data/departments.type";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import { EmployeesFormDataEnum } from "@/app/types/data/employees.type";
import { ServiceFormDataEnum } from "@/app/types/data/services.type";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import {
	deleteDepartmentContentValue,
	setDepartmentContentModalWindowState,
} from "@/app/utils/redux/departments/departmentsContentFormSlice";
import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import React from "react";

const tablesTitles = {
	services: ["Послуга", "Опції"],
	bookingServices: ["Послуга", "Опції"],
	employees: ["ПІ лікаря", "Посада", "Опції"],
};

export function DepartmentContentTable({ contentType }: DetailsContentFormBasicProps) {
	const { tableData, modalIsOpen } = useAppSelector(
		(state: RootState) => state.departmentsContentForm,
	);
	const { bookingServices, employees, services } = tableData;

	const dispatch = useAppDispatch();

	let tableDataArray: DetailsContentDataType[] | undefined = bookingServices;
	let emptyTableMessage: string;

	switch (contentType) {
		case "bookingServices":
			emptyTableMessage = "У відділення відсутні послуги для запису";
			tableDataArray = bookingServices;
			break;
		case "employees":
			emptyTableMessage = "У відділення відсутні лікарі";
			tableDataArray = employees;
			break;
		case "services":
			emptyTableMessage = "У відділення відсутні послуги";
			tableDataArray = services;
			break;
	}

	const closeModalWindow = (index: number) => {
		dispatch(
			setDepartmentContentModalWindowState({
				index,
				field: contentType,
				value: false,
			}),
		);
	};
	const openModalWindow = (index: number) => {
		dispatch(
			setDepartmentContentModalWindowState({
				index,
				field: contentType,
				value: true,
			}),
		);
	};
	const deleteValue = (index: number) => {
		dispatch(
			deleteDepartmentContentValue({
				index,
				field: contentType,
			}),
		);
	};
	return (
		<div>
			<CommonTable titles={tablesTitles[contentType]}>
				{!tableDataArray || !tableDataArray.length ? (
					<p className="fetchError">{emptyTableMessage}</p>
				) : (
					tableDataArray?.map((data, index) => {
						switch (contentType) {
							case "services":
								const service = data as DepartmentsService;
								return (
									<TableLine key={`${contentType}_${index}`}>
										<span>{service[ServiceFormDataEnum.TITLE]}</span>
										{modalIsOpen[contentType][index] && (
											<ModalWindow title="Ви дійсно бажаєте видалити цю послугу">
												<button
													className={`btn cancel`}
													onClick={() => {
														closeModalWindow(index);
													}}
												>
													Скасувати видалення
												</button>
												<button
													onClick={() => deleteValue(index)}
													className={`btn blue lg`}
												>
													Підтвердити
												</button>
											</ModalWindow>
										)}
										<span>
											<button
												onClick={() => openModalWindow(index)}
												className={`btn gray sm`}
											>
												Видалити
											</button>
										</span>
									</TableLine>
								);
							case "bookingServices":
								const bookingService = data as DepartmentsBookingService;
								return (
									<TableLine key={`${contentType}_${index}`}>
										<span>{bookingService.name}</span>
										{modalIsOpen[contentType][index] && (
											<ModalWindow title="Ви дійсно бажаєте видалити цю послугу для запису">
												<button
													className={`btn cancel`}
													onClick={() => {
														closeModalWindow(index);
													}}
												>
													Скасувати видалення
												</button>
												<button
													onClick={() => deleteValue(index)}
													className={`btn blue lg`}
												>
													Підтвердити
												</button>
											</ModalWindow>
										)}
										<span>
											<button
												onClick={() => {
													dispatch(
														setDepartmentContentModalWindowState({
															index,
															field: contentType,
															value: true,
														}),
													);
												}}
												className={`btn gray sm`}
											>
												Видалити
											</button>
										</span>
									</TableLine>
								);
							case "employees":
								const employee = data as DepartmentsEmployee;
								return (
									<TableLine key={`${contentType}_${index}`}>
										<span>{`${employee[EmployeesFormDataEnum.NAME]} ${employee[EmployeesFormDataEnum.SURNAME]}`}</span>
										<span>{employee[EmployeesFormDataEnum.POSITION]}</span>
										{modalIsOpen[contentType][index] && (
											<ModalWindow title="Ви дійсно бажаєте видалити цього працівника">
												<button
													className={`btn cancel`}
													onClick={() => {
														closeModalWindow(index);
													}}
												>
													Скасувати видалення
												</button>
												<button
													onClick={() => deleteValue(index)}
													className={`btn blue lg`}
												>
													Підтвердити
												</button>
											</ModalWindow>
										)}
										<span>
											<button
												onClick={() => {
													dispatch(
														setDepartmentContentModalWindowState({
															index,
															field: contentType,
															value: true,
														}),
													);
												}}
												className={`btn gray sm`}
											>
												Видалити
											</button>
										</span>
									</TableLine>
								);
						}
					})
				)}
			</CommonTable>
		</div>
	);
}
