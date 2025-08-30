import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DepartmentContentSelectButtons from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentSelectButtons/DepartmentContentSelectButtons";
import { DepartmentContentTable } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DetailsContentTable/DepartmentContentTable";
import { DepartmentContentSearchBar } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DetailsContentSearchBar/DepartmentContentSearchBar";
import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import styles from "./DepartmentContentForm.module.scss";
import { useCheckIfDepartmentContentFormDataChanged } from "@/app/utils/hooks/admin/departmentForm/useCheckIfDepartmentContentFormDataChanged";
import {
	setDepartmentContentInitData,
	setDepartmentsContentUpdateError,
	setDetailsContent,
} from "@/app/utils/redux/departments/departmentsContentFormSlice";
import SubmitButton from "@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton";
import { fulfilled } from "@/app/services/admin/response.service";
import { updateDepartmentInStateContent } from "@/app/utils/redux/departments/departmentsSlice";

export type DepartmentContentSelectButtonsType = "bookingServices" | "employees" | "services";
export interface DetailsContentFormBasicProps {
	contentType: DepartmentContentSelectButtonsType;
}

export function DepartmentContentForm() {
	const [contentType, setContentType] =
		useState<DepartmentContentSelectButtonsType>("services");
	const { departments } = useAppSelector((state: RootState) => state.departments);
	const { tableData, error } = useAppSelector(
		(state: RootState) => state.departmentsContentForm,
	);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const { id } = useParams<{
		id: string;
	}>();
	const department = departments.find((department) => `${department.id}` === id);

	useEffect(() => {
		if (department) {
			dispatch(setDepartmentContentInitData(department));
		}
	}, [department]);
	const formDataIsEqualToOldData = useCheckIfDepartmentContentFormDataChanged();

	let createHref: string;
	let createLabel: string;

	switch (contentType) {
		case "bookingServices":
			createHref = "booking_services";
			createLabel = "Створити послугу для запису";
			break;
		case "employees":
			createHref = "employees";
			createLabel = "Створити лікаря";
			break;
		case "services":
			createHref = "services";
			createLabel = "Створити послугу";
			break;
	}

	const submitRequest = async () => {
		// IF SAME DATA, SET ERROR
		if (formDataIsEqualToOldData) {
			dispatch(setDepartmentsContentUpdateError());
			return;
		}

		const response = await dispatch(setDetailsContent({ id, data: tableData }));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			// CLEAR DATA
			dispatch(updateDepartmentInStateContent({ id, data: tableData }));
			router.push("./");
		}
	};

	return (
		<div>
			<DepartmentContentSelectButtons
				contentType={contentType}
				setContentType={setContentType}
			/>
			<DepartmentContentTable contentType={contentType} />
			<DepartmentContentSearchBar contentType={contentType} />
			<SafeLink
				className={`btn blue xl ${styles.addButton}`}
				href={`/admin/${createHref}/create`}
			>
				{createLabel}
			</SafeLink>
			<SubmitButton
				error={error.update}
				label={"Підтвердити зміни"}
				type="button"
				onClick={submitRequest}
				className={{
					error: styles.submitBtnError,
					button: styles.submitBtn,
				}}
			/>
		</div>
	);
}
