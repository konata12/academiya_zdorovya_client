import { ErrorsResponses, Status } from "@/app/types/data/response.type";

export interface Department {
	id: number;
	city: string;
	hotline: string;
	address: string;
	googleMapUrl: string;
	googleMapReviewsUrl: string;
}

export interface DepartmentsInit {
	departments: Department[];
	departmentsIsModalOpen: boolean[];
	status: Status;
	error: ErrorsResponses;
}

export interface DepartmentsFormData {
	city: string;
	hotline: string;
	address: string;
	googleMapUrl: string;
	googleMapReviewsUrl: string;
}

export enum DepartmentsFormDataEnum {
	CITY = "city",
	HOTLINE = "hotline",
	ADDRESS = "address",
	GOOGLEMAPURL = "googleMapUrl",
	GOOGLEMAPREVIEWSURL = "googleMapReviewsUrl",
}

export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>;
