import { renameFile, renameFileOrBlob } from "@/app/services/admin/files.service";
import { getFileNameFromSignedURLAndSaveBlobInIndexedDB } from "@/app/services/admin/response.service";
import {
	CreateEmployeeFormData,
	Employee,
	EmployeeFormData,
	EmployeesFormDataEnum,
} from "@/app/types/data/employees.type";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { clear, get } from "idb-keyval";

const storeName = "employee_images";
const updateStoreName = "employee_update_images";
const createStoreName = "employee_create_images";

export const createEmployeeFormData = async (data: CreateEmployeeFormData) => {
	const formData = new FormData();

	for (const key in data) {
		const value = data[key as keyof CreateEmployeeFormData];

		// FOR IMAGES
		if (key === EmployeesFormDataEnum.IMAGE) {
			if (typeof value !== "string")
				throw Error("Помилка зображення при створенні варіанту лікування");
			const image = await get<File>(value, getIndexedDBStoreForImages(createStoreName));

			if (!(image instanceof File))
				throw Error("Помилка зображення при створенні варіанту лікування 2");
			const parsedImage = renameFile(image, value + image.name);
			formData.append(key, parsedImage);
		}
		// FOR ARRAY VALUES
		else if (Array.isArray(value) && typeof value !== "string") {
			if (key !== undefined) {
				value.forEach((item) => {
					formData.append(`${key}[]`, item);
				});
			}
		}
		// FOR STRING VALUES
		else if (value !== undefined && value !== null) {
			formData.append(key, value);
		}
	}

	return formData;
};
export const updateEmployeeFormData = async (data: CreateEmployeeFormData) => {
	const formData = new FormData();

	for (const key in data) {
		const value = data[key as keyof CreateEmployeeFormData];

		// FOR IMAGES
		if (key === EmployeesFormDataEnum.IMAGE) {
			if (typeof value !== "string")
				throw Error("Помилка зображення при створенні варіанту лікування");
			const image = await get<File | Blob>(
				value,
				getIndexedDBStoreForImages(updateStoreName),
			);
			console.log(image);

			if (!(image instanceof Blob))
				throw Error("Помилка зображення при створенні варіанту лікування 2");
			const parsedImage = renameFileOrBlob(image, value);
			formData.append(key, parsedImage);
		}
		// FOR ARRAY VALUES
		else if (Array.isArray(value) && typeof value !== "string") {
			if (key !== undefined) {
				value.forEach((item) => {
					formData.append(`${key}[]`, item);
				});
			}
		}
		// FOR STRING VALUES
		else if (value !== undefined && value !== null) {
			formData.append(key, value);
		}
	}

	return formData;
};

export async function parseEmployeesResponse(employees: Employee[]): Promise<Employee[]> {
	const store = getIndexedDBStoreForImages(storeName);
	clear(store);
	try {
		return await Promise.all(
			employees.map(async (employee) => {
				const { image, ...data } = employee;

				let parsedImage = await getFileNameFromSignedURLAndSaveBlobInIndexedDB(
					image,
					store,
				);

				return {
					...data,
					image: parsedImage,
				};
			}),
		);
	} catch (error) {
		console.error(error);
		throw Error("Помилка при парсингу варіантів лікування");
	}
}

export const parseEmployeeFormDataToUpdate = (
	data: EmployeeFormData,
	id: string,
): Employee => {
	return {
		id: +id,
		name: data.name,
		surname: data.surname,
		position: data.position,
		description: data.description,
		degree: data.degree,
		instagram: data.instagram || null,
		facebook: data.facebook || null,
		X: data.X || null,
		youtube: data.youtube || null,
		workSpecialities: data.workSpecialities.map((type) => type),
		achivements: data.achivements ? data.achivements.map((type) => type) : [],
		backgroundImgColor: data.backgroundImgColor,
		image: "string",
	};
};
