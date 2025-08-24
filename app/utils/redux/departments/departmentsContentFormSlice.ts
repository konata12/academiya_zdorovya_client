import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	AddDepartmentContentValueType,
	Department,
	DepartmentContentEnum,
	DepartmentContentEnumType,
	DepartmentContentFormInit,
	DepartmentContentTableDataType,
	DepartmentsBookingService,
	DepartmentsEmployee,
	DepartmentsService,
	DetailsContentDataType,
} from "@/app/types/data/departments.type";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/app/types/data/response.type";
import { DepartmentContentSelectButtonsType } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";

const initialState: DepartmentContentFormInit = {
	tableData: {
		bookingServices: undefined,
		employees: undefined,
		services: undefined,
	},
	modalIsOpen: {
		bookingServices: [],
		employees: [],
		services: [],
	},
	loadedData: {
		bookingServices: undefined,
		employees: undefined,
		services: undefined,
	},
	status: {
		bookingServices: null,
		employees: null,
		services: null,
		update: null,
	},
	error: {
		bookingServices: null,
		employees: null,
		services: null,
		update: null,
	},
};

export const fetchDetailsContentSearchBarData = createAsyncThunk(
	"departmentsContentForm/fetchDetailsContentSearchBarData",
	async (contentType: DepartmentContentSelectButtonsType, { rejectWithValue }) => {
		try {
			let url: string;
			switch (contentType) {
				case "bookingServices":
					url = "/booking-services";
					break;
				case "employees":
					url = "/employees";
					break;
				case "services":
					url = "/services";
					break;
			}

			const response = await axiosInstance.get<DetailsContentDataType[]>(
				`${url}/admin/getBasicData`,
			);
			console.log(response);
			return { field: contentType, data: response.data };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const setDetailsContent = createAsyncThunk(
	"departmentsContentForm/setDetailsContent",
	async (
		{ id, data }: { id: string; data: DepartmentContentTableDataType },
		{ rejectWithValue },
	) => {
		try {
			const parsedRequestData = {
				bookingServices: data.bookingServices?.map((service) => service.id) || [],
				employees: data.employees?.map((employee) => employee.id) || [],
				services: data.services?.map((service) => service.id) || [],
			};
			console.log("parsedRequestData", parsedRequestData);
			const response = await axiosInstance.patch<DetailsContentDataType[]>(
				`departments/admin/${id}/setContent`,
				parsedRequestData,
			);
			console.log(response);
			return { id, data };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

const departmentsContentFormSlice = createSlice({
	name: "departmentsContentForm",
	initialState,
	reducers: {
		setDepartmentContentInitData: (state, action: PayloadAction<Department>) => {
			const { bookingServices, employees, services } = action.payload;
			return {
				tableData: {
					bookingServices: bookingServices?.length ? bookingServices : undefined,
					employees: employees?.length ? employees : undefined,
					services: services?.length ? services : undefined,
				},
				modalIsOpen: {
					bookingServices: new Array(bookingServices?.length || 0).fill(false),
					employees: new Array(employees?.length || 0).fill(false),
					services: new Array(services?.length || 0).fill(false),
				},
				loadedData: {
					bookingServices: undefined,
					employees: undefined,
					services: undefined,
				},
				status: {
					bookingServices: null,
					employees: null,
					services: null,
					update: null,
				},
				error: {
					bookingServices: null,
					employees: null,
					services: null,
					update: null,
				},
			};
		},
		// 	WORK WITH CONTENT VALUES
		addDepartmentContentValue: (
			state,
			action: PayloadAction<AddDepartmentContentValueType>,
		) => {
			const { field, data, id } = action.payload;
			const contains =
				state.tableData[field] &&
				state.tableData[field].some((employee) => employee.id === id);
			if (contains) return;

			switch (field) {
				case DepartmentContentEnum.BookingServices: {
					const index = state.tableData.bookingServices?.length || 0;
					if (!state.tableData.bookingServices) {
						state.tableData.bookingServices = [data];
					} else {
						state.tableData.bookingServices[index] = data;
					}
					state.modalIsOpen.bookingServices[index] = false;
					break;
				}
				case DepartmentContentEnum.EMPLOYEES: {
					const index = state.tableData.employees?.length || 0;
					if (!state.tableData.employees) {
						state.tableData.employees = [data];
					} else {
						state.tableData.employees[index] = data;
					}
					state.modalIsOpen.employees[index] = false;
					break;
				}
				case DepartmentContentEnum.SERVICES: {
					const index = state.tableData.services?.length || 0;
					if (!state.tableData.services) {
						state.tableData.services = [data];
					} else {
						state.tableData.services[index] = data;
					}
					state.modalIsOpen.services[index] = false;
					break;
				}
			}
		},
		deleteDepartmentContentValue: (
			state,
			action: {
				payload: {
					index: number;
					field: DepartmentContentEnumType;
				};
			},
		) => {
			const { field, index } = action.payload;

			if (state.tableData[field]) {
				if (state.tableData[field].length === 1) {
					state.tableData[field] = undefined;
				} else {
					state.tableData[field].splice(index, 1);
				}
				state.modalIsOpen[field].splice(index, 1);
			}
		},
		// MODAL WINDOW
		setDepartmentContentModalWindowState: (
			state,
			action: {
				payload: {
					index: number;
					value: boolean;
					field: DepartmentContentEnumType;
				};
			},
		) => {
			const { field, value, index } = action.payload;
			state.modalIsOpen[field][index] = value;
		},
		// ERROR
		setDepartmentsContentUpdateError(state) {
			state.error.update = {
				message: "Дані ті самі, спочатку змініть значення",
				statusCode: 0,
			};
		},
	},
	extraReducers(builder) {
		builder
			// GET DATA
			.addCase(fetchDetailsContentSearchBarData.pending, (state, action) => {
				const contentType = action.meta.arg;

				state.status[contentType] = "loading";
				state.error[contentType] = null;
			})
			.addCase(
				fetchDetailsContentSearchBarData.fulfilled,
				(
					state,
					action: {
						payload:
							| {
									field: DepartmentContentEnumType;
									data: DetailsContentDataType[];
							  }
							| undefined;
					},
				) => {
					if (action.payload) {
						const { field, data } = action.payload;

						state.status[field] = "succeeded";
						switch (field) {
							case DepartmentContentEnum.BookingServices: {
								state.loadedData[field] = data as DepartmentsBookingService[];
								break;
							}
							case DepartmentContentEnum.EMPLOYEES: {
								state.loadedData[field] = data as DepartmentsEmployee[];
								break;
							}
							case DepartmentContentEnum.SERVICES: {
								state.loadedData[field] = data as DepartmentsService[];
								break;
							}
						}
					}
				},
			)
			.addCase(fetchDetailsContentSearchBarData.rejected, (state, action) => {
				const contentType = action.meta.arg;

				state.status[contentType] = "failed";
				state.error[contentType] = action.payload as ErrorResponse;
			});
	},
});

export const {
	setDepartmentContentInitData,
	addDepartmentContentValue,
	deleteDepartmentContentValue,
	setDepartmentContentModalWindowState,
	setDepartmentsContentUpdateError,
} = departmentsContentFormSlice.actions;

export default departmentsContentFormSlice.reducer;
