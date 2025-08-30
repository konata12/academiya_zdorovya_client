import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	CreateServiceFormData,
	Service,
	ServiceInit,
	ServiceResponseData,
} from "@/app/types/data/services.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import {
	createServiceFormData,
	parseServiceResponse,
	updateServiceFormData,
} from "@/app/services/admin/service.service";

const initialState: ServiceInit = {
	services: [],
	// need for every service to have separate state for ModalWindow of every service
	servicesIsModalOpen: [],
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

const baseUrl = "services";

export const fetchServices = createAsyncThunk(
	"service/getAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<ServiceResponseData[]>(`${baseUrl}`);
			return await parseServiceResponse(response.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const fetchOneService = createAsyncThunk(
	"service/getOne",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<Service[]>(`${baseUrl}/admin/${id}`);
			// console.log(response)
			return response.data;
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
export const createService = createAsyncThunk(
	"service/create",
	async (data: CreateServiceFormData, { rejectWithValue }) => {
		try {
			const formData = await createServiceFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.post<ServiceResponseData[]>(
				`${baseUrl}/admin/create`,
				formData,
			);
			const parsedServices = await parseServiceResponse(response.data);
			console.log(response);
			return parsedServices;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				let message = "Unexpected server error";
				if (error.response?.data.message) message = error.response?.data.message;
				if (Array.isArray(error.response?.data.message))
					message = "Many errors check console";

				const serializableError: ErrorResponse = {
					message,
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const updateService = createAsyncThunk(
	"service/update",
	async (
		{
			oldImageNames,
			newImageNames,
			data,
			id,
		}: {
			oldImageNames: string[];
			newImageNames: string[];
			data: CreateServiceFormData;
			id: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const formData = await updateServiceFormData(data);
			console.log("oldImageNames: ", oldImageNames);
			console.log("formData: ", Array.from(formData));
			// throw new Error("SSSSSSSSSSSSSSSSSSSSSSSSSS");

			const response = await axiosInstance.put(
				`${baseUrl}/admin/update/${id}`,
				formData,
			);

			const parsedServices = await parseServiceResponse(response.data);
			console.log(response);
			return parsedServices;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const deleteService = createAsyncThunk(
	"service/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`);
			console.log(response);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected server error",
					statusCode: error.status || 500,
					id,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		openServiceModal(state, action: { payload: number }) {
			state.servicesIsModalOpen[action.payload] = true;
		},
		closeServiceModal(state, action: { payload: number }) {
			state.servicesIsModalOpen[action.payload] = false;
		},

		setServiceUpdateError(state) {
			state.error.update = {
				message: "Дані ті самі, спочатку змініть значення",
				statusCode: 0,
			};
		},
		resetServiceUpdateError(state) {
			state.error.update = null;
		},
	},
	extraReducers(builder) {
		builder
			// GET ALL SERVICES
			.addCase(fetchServices.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				fetchServices.fulfilled,
				(state, action: PayloadAction<Service[] | undefined>) => {
					state.status.getAll = "succeeded";
					if (action.payload) {
						state.services = action.payload;
						state.servicesIsModalOpen = new Array(state.services.length).fill(
							false,
						);
						state.error.delete = new Array(state.services.length).fill(null);
					}
				},
			)
			.addCase(fetchServices.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.services = [];
				state.error.getAll = action.payload as ErrorResponse;
			})

			// GET ONE SERVICE
			.addCase(fetchOneService.pending, (state) => {
				state.status.getOne = "loading";
				state.error.getOne = null;
			})
			.addCase(
				fetchOneService.fulfilled,
				(state, action: PayloadAction<Service[] | undefined>) => {
					state.status.getOne = "succeeded";
					if (action.payload) {
						state.services = action.payload;
						state.servicesIsModalOpen = new Array(state.services.length).fill(
							false,
						);
					}
				},
			)
			.addCase(fetchOneService.rejected, (state, action) => {
				state.status.getOne = "failed";
				state.error.getOne = action.payload as ErrorResponse;
			})

			// CREATE SERVICE
			.addCase(createService.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(
				createService.fulfilled,
				(state, action: PayloadAction<Service[] | undefined>) => {
					state.status.create = "succeeded";
					if (action.payload) {
						state.services = action.payload;
						state.servicesIsModalOpen = new Array(state.services.length).fill(
							false,
						);
						state.error.delete = new Array(state.services.length).fill(null);
					}
				},
			)
			.addCase(createService.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE SERVICE
			.addCase(updateService.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(
				updateService.fulfilled,
				(state, action: PayloadAction<Service[] | undefined>) => {
					state.status.create = "succeeded";
					if (action.payload) {
						state.services = action.payload;
						state.servicesIsModalOpen = new Array(state.services.length).fill(
							false,
						);
						state.error.delete = new Array(state.services.length).fill(null);
					}
				},
			)
			.addCase(updateService.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE SERVICE
			.addCase(
				deleteService.pending,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "loading";
					const index = state.services.findIndex(
						(services) => services.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deleteService.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "succeeded";
					const index = state.services.findIndex(
						(services) => services.id === action.payload,
					);
					if (index !== -1) {
						state.services.splice(index, 1);
						state.servicesIsModalOpen.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deleteService.rejected, (state, action) => {
				state.status.delete = "failed";
				if (
					action.payload &&
					typeof action.payload === "object" &&
					"id" in action.payload
				) {
					const error = action.payload as ErrorResponse;
					const index = state.services.findIndex(
						(services) => services.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const {
	openServiceModal,
	closeServiceModal,
	setServiceUpdateError,
	resetServiceUpdateError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
