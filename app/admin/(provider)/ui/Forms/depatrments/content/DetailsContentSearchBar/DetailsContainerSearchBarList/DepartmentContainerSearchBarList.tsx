import { DepartmentContentSelectButtonsType } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import {
	addDepartmentContentValue,
	fetchDetailsContentSearchBarData,
} from "@/app/utils/redux/departments/departmentsContentFormSlice";
import { RootState } from "@/app/utils/redux/store";
import AnimatePresenseWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenseWithDynamicHeight";
import styles from "@/app/admin/(provider)/ui/Forms/services/EmployeeSearchbarWithTable/EmployeeSearchbarList/EmployeeSearchbarList.module.scss";
import {
	AddDepartmentContentValueType,
	DepartmentContentEnum,
	DepartmentsBookingService,
	DepartmentsEmployee,
	DepartmentsService,
	DetailsContentDataType,
} from "@/app/types/data/departments.type";
import { ServiceFormDataEnum } from "@/app/types/data/services.type";
import { EmployeesFormDataEnum } from "@/app/types/data/employees.type";

interface SearchbarListProps {
	showList: boolean;
	query: string;
	contentType: DepartmentContentSelectButtonsType;
}

export function DepartmentContainerSearchBarList({
	showList,
	query,
	contentType,
}: SearchbarListProps) {
	const { tableData, loadedData, status, error } = useAppSelector(
		(state: RootState) => state.departmentsContentForm,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status[contentType] !== "succeeded") {
			dispatch(fetchDetailsContentSearchBarData(contentType));
		}
	}, [contentType]);

	// FILTER DATA BY QUERY
	let filteredData: DetailsContentDataType[] | undefined = undefined;
	switch (contentType) {
		case DepartmentContentEnum.BookingServices: {
			filteredData = loadedData[contentType]
				? (loadedData[contentType] as DepartmentsBookingService[]).filter((service) =>
						service.name.includes(query),
					)
				: undefined;
			break;
		}
		case DepartmentContentEnum.EMPLOYEES: {
			filteredData = loadedData[contentType]
				? (loadedData[contentType] as DepartmentsEmployee[]).filter(
						(employee) =>
							employee[EmployeesFormDataEnum.NAME].includes(query) ||
							employee[EmployeesFormDataEnum.SURNAME].includes(query),
					)
				: undefined;
			break;
		}
		case DepartmentContentEnum.SERVICES: {
			filteredData = loadedData[contentType]
				? (loadedData[contentType] as DepartmentsService[]).filter((service) =>
						service[ServiceFormDataEnum.TITLE].includes(query),
					)
				: undefined;
			break;
		}
	}

	const addData = (data: DetailsContentDataType, id: number) => {
		let props: AddDepartmentContentValueType = {
			id,
			field: DepartmentContentEnum.BookingServices,
			data: data as DepartmentsBookingService,
		};
		switch (contentType) {
			case DepartmentContentEnum.BookingServices: {
				props = {
					id,
					field: contentType,
					data: data as DepartmentsBookingService,
				};
				break;
			}
			case DepartmentContentEnum.EMPLOYEES: {
				props = {
					id,
					field: contentType,
					data: data as DepartmentsEmployee,
				};
				break;
			}
			case DepartmentContentEnum.SERVICES: {
				props = {
					id,
					field: contentType,
					data: data as DepartmentsService,
				};
				break;
			}
		}

		dispatch(addDepartmentContentValue(props));
	};
	const errorUIMessage = (): string => {
		let name: string = "даних";
		switch (contentType) {
			case DepartmentContentEnum.BookingServices: {
				name = "послуг для запису";
				break;
			}
			case DepartmentContentEnum.EMPLOYEES: {
				name = " працівників";
				break;
			}
			case DepartmentContentEnum.SERVICES: {
				name = "послуг";
				break;
			}
		}

		if (error[contentType]?.statusCode === 500) return `Помилка при отриманні ${name}`;
		if (error[contentType]?.statusCode === 404) return `Немає ${name}`;
		return error[contentType]?.message || `Помилка при отриманні ${name}`;
	};
	const setListLineValue = (data: DetailsContentDataType) => {
		switch (contentType) {
			case DepartmentContentEnum.BookingServices: {
				data = data as DepartmentsBookingService;
				return `${data.name}`;
			}
			case DepartmentContentEnum.EMPLOYEES: {
				data = data as DepartmentsEmployee;
				return `${data[EmployeesFormDataEnum.NAME]} ${data[EmployeesFormDataEnum.SURNAME]} — ${data[EmployeesFormDataEnum.POSITION]}`;
			}
			case DepartmentContentEnum.SERVICES: {
				data = data as DepartmentsService;
				return `${data[ServiceFormDataEnum.TITLE]}`;
			}
		}
	};

	return (
		<AnimatePresenseWithDynamicHeight
			childrenIsrendered={showList}
			className={{
				absoluteContainer: styles.container,
			}}
		>
			{status[contentType] === "loading" && (
				<div className={`${styles.line} ${styles.center}`}>Загрузка...</div>
			)}

			{error[contentType] ? (
				<div className={`${styles.line} ${styles.center} ${styles.error}`}>
					{errorUIMessage()}
				</div>
			) : (
				filteredData &&
				filteredData.map((data, i) => {
					return (
						<button
							key={data.id}
							type="button"
							onClick={() => addData(data, data.id)}
							className={`${styles.line} ${i >= 1 ? styles.lineBorder : ""}`}
						>
							{setListLineValue(data)}
						</button>
					);
				})
			)}
		</AnimatePresenseWithDynamicHeight>
	);
}
