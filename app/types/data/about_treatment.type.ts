import { FormInputError } from "@/app/types/data/form.type";
import { ErrorsResponses, Status } from "@/app/types/data/response.type";

// GENERAL TYPES
export type AboutTreatmentFormIndexedDBType =
	| "about_treatment_create_images"
	| "about_treatment_update_images";
export interface AboutTreatment {
	id: number;
	title: string;
	image: string;
	treatmentTypes: string[];
}
export interface AboutTreatmentInit {
	aboutTreatments: AboutTreatment[];
	aboutTreatmentsIsModalOpen: boolean[];
	status: Status;
	error: ErrorsResponses;
}

// FORM DATA
export interface AboutTreatmentFormData {
	title: string;
	treatmentTypes: string[];
	image: string | null;
	errors: {
		title: FormInputError;
		treatmentTypes: FormInputError[];
		image: FormInputError;
	};
}
export interface TreatmentType {
	value: string;
}
// CREATE/UPDATE FORM DATA
export interface CreateAboutTreatmentFormData {
	title: string;
	treatmentTypes: string[];
	image: string;
}
export interface UpdateAboutTreatmentFormData extends CreateAboutTreatmentFormData {}

// FORM UI
export interface AboutTreatmentFormUI {
	treatmentTypesModalIsOpen: boolean[];
}

// ENUMS
export enum AboutTreatmentEnum {
	TITLE = "title",
	IMG = "image",
	TREATMENTTYPES = "treatmentTypes",
}
// ENUM TYPES
export type AboutTreatmentEnumType = `${AboutTreatmentEnum}`;
