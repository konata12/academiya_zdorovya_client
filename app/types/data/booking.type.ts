import { ErrorResponse, StatusType } from "@/app/types/data/response.type";

export interface BookingInit {
	allNotRepliedCount: number | null;
	departments: BookingDepartmentsType[] | null;
	status: BookingStatus;
	errors: BookingError;
}
// SLICE TYPES
export interface BookingDepartmentsType {
	id: number;
	city: number;
	address: number;
	notRepliedCount: number;
	bookings: BookingType[] | undefined;
}
export interface BookingType {
	id: number;
	name: string;
	surname: string;
	phoneNumber: string;
	createdAt: string;
	replied: boolean;
	bookingService: string;
}
interface BookingStatus {
	getAllNotRepliedCount: StatusType;
	getAllNotRepliedCountForEveryDepartment: StatusType;
	getDepartmentBookings: StatusType;
	updateRepliedStatus: StatusType;
}
interface BookingError {
	getAllNotRepliedCount: ErrorResponse | null;
	getAllNotRepliedCountForEveryDepartment: ErrorResponse | null;
	getDepartmentBookings: ErrorResponse | null;
	updateRepliedStatus: ErrorResponse | null;
}
