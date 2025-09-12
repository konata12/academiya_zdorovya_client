import {
	BookingDepartmentsType,
	BookingInit,
	BookingType,
	DepartmentBookingRequest,
} from "@/app/types/data/booking.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: BookingInit = {
	allNotRepliedCount: null,
	departments: null,
	status: {
		getAllNotRepliedCount: null,
		getAllNotRepliedCountForEveryDepartment: null,
		getDepartmentBookings: null,
		updateRepliedStatus: null,
	},
	errors: {
		getAllNotRepliedCount: null,
		getAllNotRepliedCountForEveryDepartment: null,
		getDepartmentBookings: null,
		updateRepliedStatus: null,
	},
};

const baseUrl = "booking";

export const getAllNotRepliedCount = createAsyncThunk(
	"booking/getLegalInformation",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<number>(
				`${baseUrl}/admin/notRepliedCount`,
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const getAllNotRepliedCountForEveryDepartment = createAsyncThunk(
	"booking/getAllNotRepliedCountForEveryDepartment",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<BookingDepartmentsType[]>(
				`${baseUrl}/admin/notRepliedCountForEveryDepartment`,
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const getDepartmentBookings = createAsyncThunk(
	"booking/getAllForDepartment",
	async ({ id, page }: { id: string; page: string | null }, { rejectWithValue }) => {
		try {
			const url =
				page && page.length > 0
					? `${baseUrl}/admin/${id}?page=${page}`
					: `${baseUrl}/admin/${id}?page=1`;
			const response = await axiosInstance.get<DepartmentBookingRequest>(url);
			console.log(response);
			return { id, data: response.data };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const updateRepliedStatus = createAsyncThunk(
	"booking/updateRepliedStatus",
	async (
		{ id, departmentId }: { id: number; departmentId: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.patch<BookingType[]>(
				`${baseUrl}/admin/${id}`,
			);
			console.log(response);
			return { id, departmentId };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

export const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// GET COUNT
			.addCase(getAllNotRepliedCount.pending, (state) => {
				state.status.getAllNotRepliedCount = "loading";
				state.errors.getAllNotRepliedCount = null;
			})
			.addCase(
				getAllNotRepliedCount.fulfilled,
				(
					state,
					action: {
						payload: number | undefined;
					},
				) => {
					if (action.payload !== undefined) {
						state.status.getAllNotRepliedCount = "succeeded";
						state.allNotRepliedCount = action.payload;
					}
				},
			)
			.addCase(getAllNotRepliedCount.rejected, (state, action) => {
				state.status.getAllNotRepliedCount = "failed";
				state.errors.getAllNotRepliedCount = action.payload as ErrorResponse;
			})

			// GET DEPARTMENTS WITH COUNT
			.addCase(getAllNotRepliedCountForEveryDepartment.pending, (state) => {
				state.status.getAllNotRepliedCountForEveryDepartment = "loading";
				state.errors.getAllNotRepliedCountForEveryDepartment = null;
			})
			.addCase(
				getAllNotRepliedCountForEveryDepartment.fulfilled,
				(
					state,
					action: {
						payload: BookingDepartmentsType[] | undefined;
					},
				) => {
					if (action.payload !== undefined) {
						state.status.getAllNotRepliedCountForEveryDepartment = "succeeded";
						state.departments = action.payload;
					}
				},
			)
			.addCase(getAllNotRepliedCountForEveryDepartment.rejected, (state, action) => {
				state.status.getAllNotRepliedCountForEveryDepartment = "failed";
				state.errors.getAllNotRepliedCountForEveryDepartment =
					action.payload as ErrorResponse;
			})

			// GET DEPARTMENT BOOKINGS
			.addCase(getDepartmentBookings.pending, (state) => {
				state.status.getDepartmentBookings = "loading";
				state.errors.getDepartmentBookings = null;
			})
			.addCase(
				getDepartmentBookings.fulfilled,
				(
					state,
					action: {
						payload: { id: string; data: DepartmentBookingRequest } | undefined;
					},
				) => {
					if (action.payload !== undefined) {
						const { id, data } = action.payload;

						state.status.getDepartmentBookings = "succeeded";
						const index =
							state.departments &&
							state.departments.findIndex((department) => {
								return `${department.id}` === id;
							});

						if (index !== null && state.departments) {
							state.departments[index].bookings = data.bookings;
							state.departments[index].countAllBookings = data.countAllBookings;
						}
					}
				},
			)
			.addCase(getDepartmentBookings.rejected, (state, action) => {
				state.status.getDepartmentBookings = "failed";
				state.errors.getDepartmentBookings = action.payload as ErrorResponse;
			})

			// UPDATE REPLIED STATUS
			.addCase(updateRepliedStatus.pending, (state) => {
				state.status.updateRepliedStatus = "loading";
				state.errors.updateRepliedStatus = null;
			})
			.addCase(
				updateRepliedStatus.fulfilled,
				(
					state,
					action: {
						payload: { id: number; departmentId: string } | undefined;
					},
				) => {
					if (action.payload !== undefined) {
						const { id, departmentId } = action.payload;

						state.status.updateRepliedStatus = "succeeded";
						const index =
							state.departments &&
							state.departments.findIndex((department) => {
								return `${department.id}` === departmentId;
							});

						if (index !== null && state.departments?.[index].bookings) {
							const bookingIndex = state.departments[index].bookings.findIndex(
								(booking) => {
									return booking.id === id;
								},
							);

							if (!Number.isNaN(bookingIndex)) {
								state.departments[index].bookings[bookingIndex].replied =
									!state.departments[index].bookings[bookingIndex].replied;
							}
						}
					}
				},
			)
			.addCase(updateRepliedStatus.rejected, (state, action) => {
				state.status.updateRepliedStatus = "failed";
				state.errors.updateRepliedStatus = action.payload as ErrorResponse;
			});
	},
});

export default bookingSlice.reducer;
