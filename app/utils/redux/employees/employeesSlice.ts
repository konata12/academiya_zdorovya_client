import {
	createEmployeeFormData,
	parseEmployeeFormDataToUpdate,
	parseEmployeesResponse,
	updateEmployeeFormData,
} from "@/app/services/employee.service";
import { transferAndReplaceImageBetweenIndexDBStores } from "@/app/services/indexedDB.service";
import {
	CreateEmployeeFormData,
	Employee,
	EmployeeFormData,
	EmployeesInit,
} from "@/app/types/data/employees.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: EmployeesInit = {
	employees: [],
	// need for every employee to have seperate state for ModalWindow of every employee
	employeesIsModalOpen: [],
	status: {
		getAll: null,
		getOne: null,
		create: null,
		delete: null,
		update: null,
	},
	error: {
		getAll: null,
		getOne: null,
		create: null,
		delete: [],
		update: null,
	},
};

const baseUrl = "employees";

export const fetchEmployees = createAsyncThunk(
	"employees/getAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<Employee[]>(`${baseUrl}`);
			const parsedEmployees = await parseEmployeesResponse(response.data);

			return parsedEmployees;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message:
						error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const fetchOneEmployee = createAsyncThunk(
	"employees/getOne",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<Employee[]>(
				`${baseUrl}/admin/${id}`,
			);
			// console.log(response)
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message:
						error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const createEmployee = createAsyncThunk(
	"employees/create",
	async (data: CreateEmployeeFormData, { rejectWithValue }) => {
		try {
			const formData = await createEmployeeFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.post<Employee[]>(
				`${baseUrl}/admin/create`,
				formData,
			);
			console.log(response);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message:
						error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				console.error("error: ", error);
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const updateEmployee = createAsyncThunk(
	"employees/update",
	async (
		{
			oldImageName,
			data,
			id,
		}: {
			oldImageName: string | undefined;
			data: CreateEmployeeFormData;
			id: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const formData = await updateEmployeeFormData(data);
			const response = await axiosInstance.put(
				`${baseUrl}/admin/update/${id}`,
				formData,
			);
			// IF SET NEW IMAGE REPLACE IT IN MAIN STORE
			if (oldImageName !== data.image)
				await transferAndReplaceImageBetweenIndexDBStores(
					data.image,
					oldImageName,
					"employee_update_images",
					"employee_images",
				);
			console.log("response:", response);
			return { data, id };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message:
						error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				console.error("error: ", error);
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const deleteEmployee = createAsyncThunk(
	"employees/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`);
			console.log(response);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message:
						error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
					id,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		openEmployeesModal(state, action: { payload: { i: number } }) {
			state.employeesIsModalOpen[action.payload.i] = true;
		},
		closeEmployeesModal(state, action: { payload: { i: number } }) {
			state.employeesIsModalOpen[action.payload.i] = false;
		},

		deleteEmployeeFromState(state, action: { payload: number }) {
			if (state.employees) {
				const index = state.employees.findIndex((employee) => {
					return employee.id === action.payload;
				});
				state.employees.splice(index, 1);
			}
		},
		updateEmployeeInState(
			state,
			action: {
				payload: {
					data: EmployeeFormData;
					id: string;
				};
			},
		) {
			const index = state.employees.findIndex((employee) => {
				return employee.id === +action.payload.id;
			});
			state.employees[index] = parseEmployeeFormDataToUpdate(
				action.payload.data,
				action.payload.id,
			);
		},

		setEmployeeUpdateError(state) {
			state.error.update = {
				message: "Дані ті самі, спочатку змініть значення",
				statusCode: 0,
			};
		},
		resetEmployeeUpdateError(state) {
			state.error.update = null;
		},
	},
	extraReducers(builder) {
		builder
			// GET ALL EMPLOYEES
			.addCase(fetchEmployees.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				fetchEmployees.fulfilled,
				(state, action: PayloadAction<Employee[] | undefined>) => {
					state.status.getAll = "succeeded";
					if (action.payload) {
						state.employees = action.payload;
						state.employeesIsModalOpen = new Array(
							state.employees.length,
						).fill(false);
					}
				},
			)
			.addCase(fetchEmployees.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.error.getAll = action.payload as ErrorResponse;
			})

			// GET ONE EMPLOYEES
			.addCase(fetchOneEmployee.pending, (state) => {
				state.status.getOne = "loading";
				state.error.getOne = null;
			})
			.addCase(
				fetchOneEmployee.fulfilled,
				(state, action: PayloadAction<Employee[] | undefined>) => {
					state.status.getOne = "succeeded";
					if (action.payload) {
						state.employees = action.payload;
						state.employeesIsModalOpen = new Array(
							state.employees.length,
						).fill(false);
					}
				},
			)
			.addCase(fetchOneEmployee.rejected, (state, action) => {
				state.status.getOne = "failed";
				state.error.getOne = action.payload as ErrorResponse;
			})

			// CREATE EMPLOYEES
			.addCase(createEmployee.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(
				createEmployee.fulfilled,
				(state, action: PayloadAction<Employee[] | undefined>) => {
					state.status.create = "succeeded";
					if (action.payload) {
						state.employees = action.payload;
						state.employeesIsModalOpen = new Array(
							state.employees.length,
						).fill(false);
					}
				},
			)
			.addCase(createEmployee.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE EMPLOYEES
			.addCase(updateEmployee.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(
				updateEmployee.fulfilled,
				(
					state,
					action: PayloadAction<
						| {
								data: CreateEmployeeFormData;
								id: string;
						  }
						| undefined
					>,
				) => {
					state.status.update = "succeeded";
					if (action.payload) {
						const { data, id } = action.payload;
						const {
							instagram,
							facebook,
							X,
							youtube,
							achivements,
							...parsedData
						} = data;
						const index = state.employees.findIndex(
							(employee) => `${employee.id}` === id,
						);

						state.employees[index] = {
							...parsedData,
							id: +id,
							instagram: instagram || null,
							facebook: facebook || null,
							X: X || null,
							youtube: youtube || null,
							achivements: achivements || null,
						};
					}
				},
			)
			.addCase(updateEmployee.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE EMPLOYEES
			.addCase(
				deleteEmployee.pending,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "loading";
					const index = state.employees.findIndex(
						(employees) => employees.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deleteEmployee.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "succeeded";
					const index = state.employees.findIndex(
						(employees) => employees.id === action.payload,
					);
					if (index !== -1) {
						state.employees.splice(index, 1);
						state.employeesIsModalOpen.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deleteEmployee.rejected, (state, action) => {
				state.status.delete = "failed";
				if (
					action.payload &&
					typeof action.payload === "object" &&
					"id" in action.payload
				) {
					const error = action.payload as ErrorResponse;
					const index = state.employees.findIndex(
						(employees) => employees.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const {
	openEmployeesModal,
	closeEmployeesModal,
	deleteEmployeeFromState,
	setEmployeeUpdateError,
	updateEmployeeInState,
	resetEmployeeUpdateError,
} = employeesSlice.actions;

export default employeesSlice.reducer;
