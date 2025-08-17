import { del, set } from "idb-keyval";
import {
	EmployeeFormIndexedDBType,
	EmployeesFormDataEnum,
	EmployeesFormDataEnumType,
	EmployeeSocialMediaKeysType,
	EmployeeStringArrayKeysType,
	EmployeeStringKeysType,
} from "@/app/types/data/employees.type";
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";
import { useEmployeeFormSlice } from "@/app/utils/hooks/admin/employeeForm/useEmployeeFormSlice";
import { v4 as uuidv4 } from "uuid";

interface ChangeEventProps<T extends FormElements> {
	e: React.ChangeEvent<T>;
	elementType: EmployeesFormDataEnumType;
	oldValue?: string | null;
	arrIndex?: number;
}

export function useEmployeeFormHandleChange(
	indexedDBStoreName: EmployeeFormIndexedDBType,
) {
	const dispatch = useAppDispatch();
	const store = getIndexedDBStoreForImages(indexedDBStoreName);
	const {
		setStringValue,
		setSocialMediaValue,
		setStringArrayValue,
		setBasicValueError,
		setStringArrayValueError,
	} = useEmployeeFormSlice(indexedDBStoreName);

	// SET ARRAYS FOR GROUPING FIELDS BY VALUE TYPES
	const stringFields: EmployeeStringKeysType[] = [
		EmployeesFormDataEnum.NAME,
		EmployeesFormDataEnum.SURNAME,
		EmployeesFormDataEnum.POSITION,
		EmployeesFormDataEnum.DESCRIPTION,
		EmployeesFormDataEnum.DEGREE,
		EmployeesFormDataEnum.IMAGE,
	];
	const socialMediaFields: EmployeeSocialMediaKeysType[] = [
		EmployeesFormDataEnum.INSTAGRAM,
		EmployeesFormDataEnum.FACEBOOK,
		EmployeesFormDataEnum.X,
		EmployeesFormDataEnum.YOUTUBE,
	];
	const stringArrayFields: EmployeeStringArrayKeysType[] = [
		EmployeesFormDataEnum.WORKSPECIALITIES,
		EmployeesFormDataEnum.ACHIVEMENTS,
	];

	const handleChange = useCallback(
		<T extends FormElements>({
			e,
			elementType,
			oldValue = null,
			arrIndex,
		}: ChangeEventProps<T>) => {
			const newValue = e.target.value;
			const newFile =
				(e as React.ChangeEvent<HTMLInputElement>).target.files || null;

			if (stringFields.includes(elementType as EmployeeStringKeysType)) {
				// REQUIRED ERROR HANDLING
				if (newValue.length > 0)
					dispatch(
						setBasicValueError({
							field: elementType as EmployeeStringKeysType,
							message: "",
						}),
					);

				dispatch(
					setStringValue({
						field: elementType as EmployeeStringKeysType,
						value: newValue,
					}),
				);
			}
			if (
				socialMediaFields.includes(
					elementType as EmployeeSocialMediaKeysType,
				)
			) {
				// REQUIRED ERROR HANDLING
				if (newValue.length > 0)
					dispatch(
						setBasicValueError({
							field: elementType as EmployeeSocialMediaKeysType,
							message: "",
						}),
					);

				dispatch(
					setSocialMediaValue({
						field: elementType as EmployeeSocialMediaKeysType,
						value: newValue,
					}),
				);
			}
			if (
				stringArrayFields.includes(
					elementType as EmployeeStringArrayKeysType,
				)
			) {
				// REQUIRED ERROR HANDLING
				if (arrIndex !== undefined) {
					if (newValue.length > 0)
						dispatch(
							setStringArrayValueError({
								field: elementType as EmployeeStringArrayKeysType,
								index: arrIndex,
								message: "",
							}),
						);

					dispatch(
						setStringArrayValue({
							field: elementType as EmployeeStringArrayKeysType,
							index: arrIndex,
							value: newValue,
						}),
					);
				}
			}
			if (elementType === EmployeesFormDataEnum.IMAGE) {
				const imageName = uuidv4();
				// Delete old image from IndexedDB if it exists
				if (oldValue) {
					del(oldValue, store);
				}
				// SET REDUX ERROR
				if (newFile && newFile[0]) {
					// IF IMAGE IS NOT PNG SHOW ERROR
					if (newFile[0].type !== "image/png") {
						dispatch(
							setBasicValueError({
								field: EmployeesFormDataEnum.IMAGE,
								message: "Зображення повинно бути в форматі PNG",
							}),
						);
					} else {
						dispatch(
							setBasicValueError({
								field: EmployeesFormDataEnum.IMAGE,
								message: "",
							}),
						);
					}
					set(imageName, newFile[0], store);
				}

				// SET REDUX VALUE
				dispatch(
					setStringValue({
						field: EmployeesFormDataEnum.IMAGE,
						value: imageName,
					}),
				);
			}
		},
		[indexedDBStoreName],
	);

	return handleChange;
}
