import {
	createAboutTreatmentFormData,
	parseAboutTreatmentsResponse,
	updateAboutTreatmentFormData,
} from "@/app/services/admin/about_treatment.service";
import { transferAndReplaceImageBetweenIndexDBStores } from "@/app/services/admin/indexedDB.service";
import {
	AboutTreatment,
	AboutTreatmentInit,
	CreateAboutTreatmentFormData,
} from "@/app/types/data/about_treatment.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: AboutTreatmentInit = {
	aboutTreatments: [],
	aboutTreatmentsIsModalOpen: [],
	status: {
		getAll: null,
		create: null,
		delete: null,
		update: null,
	},
	error: {
		getOne: null,
		getAll: null,
		create: null,
		delete: [],
		update: null,
	},
};

const baseUrl = "about-treatment";

export const fetchAboutTreatments = createAsyncThunk(
	"aboutTreatment/get",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<AboutTreatment[]>(`${baseUrl}`);
			const parseAboutTreatments = await parseAboutTreatmentsResponse(response.data);

			return parseAboutTreatments;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
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
export const createAboutTreatment = createAsyncThunk(
	"aboutTreatment/create",
	async (data: CreateAboutTreatmentFormData, { rejectWithValue }) => {
		try {
			const formData = await createAboutTreatmentFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.post<AboutTreatment[]>(
				`${baseUrl}/admin/create`,
				formData,
			);
			const parseAboutTreatments = await parseAboutTreatmentsResponse(response.data);
			console.log(response);
			return parseAboutTreatments;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
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
export const updateAboutTreatment = createAsyncThunk(
	"aboutTreatment/update",
	async (
		{
			oldImageName,
			data,
			id,
		}: {
			oldImageName: string | undefined;
			data: CreateAboutTreatmentFormData;
			id: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const formData = await updateAboutTreatmentFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.put<AboutTreatment[]>(
				`${baseUrl}/admin/update/${id}`,
				formData,
			);
			// IF SET NEW IMAGE REPLACE IT IN MAIN STORE
			if (oldImageName !== data.image)
				await transferAndReplaceImageBetweenIndexDBStores(
					data.image,
					oldImageName,
					"about_treatment_update_images",
					"about_treatment_images",
				);
			console.log("response:", response);
			return { data, id };
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
				};
				return rejectWithValue(serializableError);
			} else if (error instanceof Error) {
				console.log("error: ", error);
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const deleteAboutTreatment = createAsyncThunk(
	"aboutTreatment/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`);
			console.log(response);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
				const serializableError: ErrorResponse = {
					message: error.response?.data.message || "Unexpected client error",
					statusCode: error.status || 500,
					id,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);

const aboutTreatmentSlice = createSlice({
	name: "aboutTreatment",
	initialState,
	reducers: {
		openAboutTreatmentsModal(state, action: { payload: { i: number } }) {
			state.aboutTreatmentsIsModalOpen[action.payload.i] = true;
		},
		closeAboutTreatmentsModal(state, action: { payload: { i: number } }) {
			state.aboutTreatmentsIsModalOpen[action.payload.i] = false;
		},

		setAboutTreatmentUpdateError(state) {
			state.error.update = {
				message: "Дані ті самі, спочатку змініть значення",
				statusCode: 0,
			};
		},
		resetAboutTreatmentUpdateError(state) {
			state.error.update = null;
		},
	},
	extraReducers(builder) {
		builder
			// GET ABOUT TREATMENTS
			.addCase(fetchAboutTreatments.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				fetchAboutTreatments.fulfilled,
				(state, action: PayloadAction<AboutTreatment[] | undefined>) => {
					state.status.getAll = "succeeded";
					if (action.payload) {
						state.aboutTreatments = action.payload;
						state.aboutTreatmentsIsModalOpen = new Array(
							state.aboutTreatments.length,
						).fill(false);
						state.error.delete = new Array(state.aboutTreatments.length).fill(
							null,
						);
					}
				},
			)
			.addCase(fetchAboutTreatments.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.error.getAll = action.payload as ErrorResponse;
			})

			// CREATE ABOUT TREATMENT
			.addCase(createAboutTreatment.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(
				createAboutTreatment.fulfilled,
				(state, action: PayloadAction<AboutTreatment[] | undefined>) => {
					state.status.create = "succeeded";
					console.log(action.payload);
					if (action.payload) {
						state.aboutTreatments = action.payload;
						state.aboutTreatmentsIsModalOpen = new Array(
							state.aboutTreatments.length,
						).fill(false);
					}
				},
			)
			.addCase(createAboutTreatment.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE ABOUT TREATMENT
			.addCase(updateAboutTreatment.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(
				updateAboutTreatment.fulfilled,
				(
					state,
					action: PayloadAction<
						| {
								data: CreateAboutTreatmentFormData;
								id: string;
						  }
						| undefined
					>,
				) => {
					state.status.update = "succeeded";
					if (action.payload) {
						const { data, id } = action.payload;
						const index = state.aboutTreatments.findIndex(
							(aboutTreatment) => `${aboutTreatment.id}` === id,
						);

						state.aboutTreatments[index] = {
							id: +id,
							...data,
						};
					}
				},
			)
			.addCase(updateAboutTreatment.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE ABOUT TREATMENT
			.addCase(
				deleteAboutTreatment.pending,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "loading";
					const index = state.aboutTreatments.findIndex(
						(aboutTreatments) => aboutTreatments.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deleteAboutTreatment.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "succeeded";
					const index = state.aboutTreatments.findIndex(
						(aboutTreatments) => aboutTreatments.id === action.payload,
					);
					if (index !== -1) {
						state.aboutTreatments.splice(index, 1);
						state.aboutTreatmentsIsModalOpen.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deleteAboutTreatment.rejected, (state, action) => {
				state.status.delete = "failed";
				if (
					action.payload &&
					typeof action.payload === "object" &&
					"id" in action.payload
				) {
					const error = action.payload as ErrorResponse;
					const index = state.aboutTreatments.findIndex(
						(aboutTreatments) => aboutTreatments.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const {
	openAboutTreatmentsModal,
	closeAboutTreatmentsModal,
	setAboutTreatmentUpdateError,
	resetAboutTreatmentUpdateError,
} = aboutTreatmentSlice.actions;

export default aboutTreatmentSlice.reducer;
