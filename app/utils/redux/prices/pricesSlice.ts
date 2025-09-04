import {
	PriceFormDataWithoutError,
	PriceSection,
	PriceSectionInit,
} from "@/app/types/data/prices.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import axiosInstance from "@/app/utils/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const initialState: PriceSectionInit = {
	priceSections: [],
	priceSectionsIsModalOpen: [],
	status: {
		getAll: null,
		getOne: null,
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

const baseUrl = "prices";

export const fetchPriceSections = createAsyncThunk(
	"prices/get",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<PriceSection[]>(`${baseUrl}/admin/all`, {
				params: {
					departmentId: id,
				},
			});
			console.log(response);
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

export const createPriceSection = createAsyncThunk(
	"prices/create",
	async (
		{
			data,
			departmentId,
		}: {
			data: PriceFormDataWithoutError;
			departmentId: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.post<PriceSection[]>(
				`${baseUrl}/admin/create`,
				{
					...data,
					departmentId: +departmentId,
				},
			);
			console.log(response);
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

export const updatePriceSection = createAsyncThunk(
	"prices/update",
	async (
		{
			data,
			id,
		}: {
			data: PriceFormDataWithoutError;
			id: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const response = await axiosInstance.put<PriceSection[]>(
				`${baseUrl}/admin/update/${id}`,
				data,
			);
			console.log(response);
			return { data, id };
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

export const deletePriceSection = createAsyncThunk(
	"prices/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`${baseUrl}/admin/${id}`);
			console.log(response);
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

const pricesSlice = createSlice({
	name: "prices",
	initialState,
	reducers: {
		openPriceSectionsModal(state, action: { payload: { i: number } }) {
			state.priceSectionsIsModalOpen[action.payload.i] = true;
		},
		closePriceSectionsModal(state, action: { payload: { i: number } }) {
			state.priceSectionsIsModalOpen[action.payload.i] = false;
		},

		deletePriceSectionFromState(state, action: { payload: number }) {
			if (state.priceSections) {
				const index = state.priceSections.findIndex((priceSection) => {
					return priceSection.id === action.payload;
				});
				state.priceSections.splice(index, 1);
			}
		},
	},
	extraReducers(builder) {
		builder
			// GET ALL PRICE SECTIONS
			.addCase(fetchPriceSections.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				fetchPriceSections.fulfilled,
				(state, action: PayloadAction<PriceSection[] | undefined>) => {
					state.status.getAll = "succeeded";
					if (action.payload) {
						state.priceSections = action.payload;
						state.priceSectionsIsModalOpen = new Array(
							state.priceSections.length,
						).fill(false);
						state.error.delete = new Array(state.priceSections.length).fill(null);
					}
				},
			)
			.addCase(fetchPriceSections.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.priceSections = [];
				state.error.getAll = action.payload as ErrorResponse;
			})

			// CREATE PRICE SECTION
			.addCase(createPriceSection.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(
				createPriceSection.fulfilled,
				(state, action: PayloadAction<PriceSection[] | undefined>) => {
					state.status.create = "succeeded";
					if (action.payload) {
						state.priceSections = action.payload;
						state.priceSectionsIsModalOpen = new Array(
							state.priceSections.length,
						).fill(false);
						state.error.delete = new Array(state.priceSections.length).fill(null);
					}
				},
			)
			.addCase(createPriceSection.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE PRICE SECTION
			.addCase(updatePriceSection.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(
				updatePriceSection.fulfilled,
				(
					state,
					action: {
						payload:
							| {
									data: PriceFormDataWithoutError;
									id: string;
							  }
							| undefined;
					},
				) => {
					state.status.update = "succeeded";
					if (action.payload) {
						const { id, data } = action.payload;
						const index = state.priceSections.findIndex((priceSection) => {
							return `${priceSection.id}` === id;
						});
						state.priceSections[index] = {
							...data,
							id: +id,
						};
					}
				},
			)
			.addCase(updatePriceSection.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE PRICE SECTIONS
			.addCase(
				deletePriceSection.pending,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "loading";
					const index = state.priceSections.findIndex(
						(priceSections) => priceSections.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deletePriceSection.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "succeeded";
					const index = state.priceSections.findIndex(
						(priceSections) => priceSections.id === action.payload,
					);
					if (index !== -1) {
						state.priceSections.splice(index, 1);
						state.priceSectionsIsModalOpen.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deletePriceSection.rejected, (state, action) => {
				state.status.delete = "failed";
				if (
					action.payload &&
					typeof action.payload === "object" &&
					"id" in action.payload
				) {
					const error = action.payload as ErrorResponse;
					const index = state.priceSections.findIndex(
						(priceSections) => priceSections.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const { openPriceSectionsModal, closePriceSectionsModal, deletePriceSectionFromState } =
	pricesSlice.actions;

export default pricesSlice.reducer;
