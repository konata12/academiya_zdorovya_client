import {
	ErrorResponse,
	ErrorsResponses,
	Status,
	StatusType,
} from "@/app/types/data/response.type";
import { ServiceFormDataEnum } from "@/app/types/data/services.type";
import { BookingService } from "@/app/types/data/booking_services.type";
import { EmployeesFormDataEnum } from "@/app/types/data/employees.type";

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
export interface DepartmentsEmployee {
	id: number;
	[EmployeesFormDataEnum.NAME]: string;
	[EmployeesFormDataEnum.SURNAME]: string;
	[EmployeesFormDataEnum.POSITION]: string;
}
export interface DepartmentsService {
	id: number;
	[ServiceFormDataEnum.TITLE]: string;
}
export interface DepartmentsBookingService extends BookingService {}

export type DetailsContentDataType =
	| DepartmentsEmployee
	| DepartmentsService
	| DepartmentsBookingService;

// SLICE
// MAIN SLICE TYPES
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
// CONTENT FORM SLICE TYPES
export interface DepartmentContentFormInit {
	tableData: DepartmentContentTableDataType;
	modalIsOpen: DepartmentContentModalIsOpenType;
	loadedData: DepartmentContentLoadedDataType;
	status: DepartmentContentStatusType;
	error: DepartmentContentErrorsType;
}
export interface DepartmentContentTableDataType {
	bookingServices?: DepartmentsBookingService[];
	employees?: DepartmentsEmployee[];
	services?: DepartmentsService[];
}
export interface DepartmentContentLoadedDataType extends DepartmentContentTableDataType {}
export interface DepartmentContentModalIsOpenType {
	bookingServices: boolean[];
	employees: boolean[];
	services: boolean[];
}
export interface DepartmentContentStatusType {
	bookingServices: StatusType;
	employees: StatusType;
	services: StatusType;
	update: StatusType;
}
export interface DepartmentContentErrorsType {
	bookingServices: ErrorResponse | null;
	employees: ErrorResponse | null;
	services: ErrorResponse | null;
	update: ErrorResponse | null;
}

interface DepartmentContentBase {
	id: number;
}
export interface AddDepartmentContentBookingServiceType extends DepartmentContentBase {
	field: "bookingServices";
	data: DepartmentsBookingService;
}
export interface AddDepartmentContentEmployeeType extends DepartmentContentBase {
	field: "employees";
	data: DepartmentsEmployee;
}
export interface AddDepartmentContentServiceType extends DepartmentContentBase {
	field: "services";
	data: DepartmentsService;
}
export type AddDepartmentContentValueType =
	| AddDepartmentContentBookingServiceType
	| AddDepartmentContentEmployeeType
	| AddDepartmentContentServiceType;

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
export enum DepartmentContentEnum {
	BookingServices = "bookingServices",
	EMPLOYEES = "employees",
	SERVICES = "services",
}

export type DepartmentContentEnumType = `${DepartmentContentEnum}`;

// OTHER
export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>;
