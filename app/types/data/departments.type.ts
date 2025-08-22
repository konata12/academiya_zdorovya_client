import {
	ErrorResponse,
	ErrorsResponses,
	Status,
	StatusType,
} from "@/app/types/data/response.type";
import {
	Employee,
	EmployeesDataNotIncludedInDepartmentSelectionType,
} from "@/app/types/data/employees.type";
import {
	Service,
	ServicesDataNotIncludedInDepartmentSelectionType,
} from "@/app/types/data/services.type";
import { BookingService } from "@/app/types/data/booking_services.type";

export interface Department {
	id: number;
	city: string;
	hotline: string;
	address: string;
	googleMapUrl: string;
	googleMapReviewsUrl: string;
	bookingServices?: DepartmentsBookingService[];
	employees?: DepartmentsEmployee[];
	services?: DepartmentsService[];
}

// DETAILS RELATION PARAMETERS
export interface DepartmentsEmployee
	extends Omit<Employee, EmployeesDataNotIncludedInDepartmentSelectionType> {}
export interface DepartmentsService
	extends Omit<Service, ServicesDataNotIncludedInDepartmentSelectionType> {}
export interface DepartmentsBookingService extends BookingService {}

// SLICE
export interface DepartmentsInit {
	departments: Department[];
	departmentsIsModalOpen: boolean[];
	status: DepartmentsStatus;
	error: DepartmentsError;
}
export interface DepartmentsStatus extends Status {
	getAllWithRelations: StatusType;
}
export interface DepartmentsError extends ErrorsResponses {
	getAllWithRelations: ErrorResponse | null;
}

// FORM DATA
export interface DepartmentsFormData {
	city: string;
	hotline: string;
	address: string;
	googleMapUrl: string;
	googleMapReviewsUrl: string;
}

// ENUMS
export enum DepartmentsFormDataEnum {
	CITY = "city",
	HOTLINE = "hotline",
	ADDRESS = "address",
	GOOGLEMAPURL = "googleMapUrl",
	GOOGLEMAPREVIEWSURL = "googleMapReviewsUrl",
}

export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>;
