import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	CreateNewsFormData,
	News,
	NewsInit,
	UpdateNewsFormData,
} from "@/app/types/data/news.type";
import { ErrorResponse } from "@/app/types/data/response.type";
import {
	createNewsFormData,
	parseNewsResponse,
	updateNewsFormData,
} from "@/app/services/news.service";

const initialState: NewsInit = {
	news: [],
	// need for every new to have seperate state for ModalWindow of every new
	newsIsModalOpen: [],
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

const baseUrl = "news";

export const fetchNews = createAsyncThunk(
	"news/getAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<News[]>(`${baseUrl}`);
			const parsedNews = await parseNewsResponse(response.data);

			return parsedNews;
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
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const fetchOneNews = createAsyncThunk(
	"news/getOne",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<News[]>(
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
export const createNews = createAsyncThunk(
	"news/create",
	async (data: CreateNewsFormData, { rejectWithValue }) => {
		try {
			const formData = await createNewsFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.post<News[]>(
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
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const updateNews = createAsyncThunk(
	"news/update",
	async (
		{
			data,
			id,
		}: {
			data: UpdateNewsFormData;
			id: string;
		},
		{ rejectWithValue },
	) => {
		try {
			const formData = await updateNewsFormData(data);
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.put(
				`${baseUrl}/admin/update/${id}`,
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
				const serializableError: ErrorResponse = {
					message: error.message,
					statusCode: 500,
				};
				return rejectWithValue(serializableError);
			}
		}
	},
);
export const toggleIsBannerNews = createAsyncThunk(
	"news/toggleIsBannerNews",
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch(
				`${baseUrl}/admin/update/${id}`,
			);
			console.log(response);
			return id;
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
export const deleteNews = createAsyncThunk(
	"news/delete",
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

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {
		openNewsModal(state, action: { payload: number }) {
			state.newsIsModalOpen[action.payload] = true;
		},
		closeNewsModal(state, action: { payload: number }) {
			state.newsIsModalOpen[action.payload] = false;
		},

		setNewsUpdateError(state) {
			state.error.update = {
				message: "Дані ті самі, спочатку змініть значення",
				statusCode: 0,
			};
		},
		resetNewsUpdateError(state) {
			state.error.update = null;
		},
	},
	extraReducers(builder) {
		builder
			// GET ALL NEWS
			.addCase(fetchNews.pending, (state) => {
				state.status.getAll = "loading";
				state.error.getAll = null;
			})
			.addCase(
				fetchNews.fulfilled,
				(state, action: PayloadAction<News[] | undefined>) => {
					state.status.getAll = "succeeded";
					if (action.payload) {
						state.news = action.payload;
						state.newsIsModalOpen = new Array(state.news.length).fill(
							false,
						);
						state.error.delete = new Array(state.news.length).fill(null);
					}
				},
			)
			.addCase(fetchNews.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.news = [];
				state.error.getAll = action.payload as ErrorResponse;
			})

			// GET ONE NEWS
			.addCase(fetchOneNews.pending, (state) => {
				state.status.getOne = "loading";
				state.error.getOne = null;
			})
			.addCase(
				fetchOneNews.fulfilled,
				(state, action: PayloadAction<News[] | undefined>) => {
					state.status.getOne = "succeeded";
					if (action.payload) {
						state.news = action.payload;
						state.newsIsModalOpen = new Array(state.news.length).fill(
							false,
						);
					}
				},
			)
			.addCase(fetchOneNews.rejected, (state, action) => {
				state.status.getOne = "failed";
				state.error.getOne = action.payload as ErrorResponse;
			})

			// CREATE NEW
			.addCase(createNews.pending, (state) => {
				state.status.create = "loading";
				state.error.create = null;
			})
			.addCase(createNews.fulfilled, (state) => {
				state.status.create = "succeeded";
			})
			.addCase(createNews.rejected, (state, action) => {
				state.status.create = "failed";
				state.error.create = action.payload as ErrorResponse;
			})

			// UPDATE NEW
			.addCase(updateNews.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(updateNews.fulfilled, (state) => {
				state.status.update = "succeeded";
			})
			.addCase(updateNews.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// UPDATE NEW
			.addCase(toggleIsBannerNews.pending, (state) => {
				state.status.update = "loading";
				state.error.update = null;
			})
			.addCase(
				toggleIsBannerNews.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.update = "succeeded";
					const index = state.news.findIndex(
						(news) => news.id === action.payload,
					);
					if (index !== -1) {
						state.news[index].isBannerNews =
							!state.news[index].isBannerNews;
					}
				},
			)
			.addCase(toggleIsBannerNews.rejected, (state, action) => {
				state.status.update = "failed";
				state.error.update = action.payload as ErrorResponse;
			})

			// DELETE NEWS
			.addCase(
				deleteNews.pending,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "loading";
					const index = state.news.findIndex(
						(news) => news.id === action.payload,
					);
					if (index !== -1) {
						state.error.delete[index] = null;
					}
				},
			)
			.addCase(
				deleteNews.fulfilled,
				(state, action: PayloadAction<number | undefined>) => {
					state.status.delete = "succeeded";
					const index = state.news.findIndex(
						(news) => news.id === action.payload,
					);
					if (index !== -1) {
						state.news.splice(index, 1);
						state.newsIsModalOpen.splice(index, 1);
						state.error.delete.splice(index, 1);
					}
				},
			)
			.addCase(deleteNews.rejected, (state, action) => {
				state.status.delete = "failed";
				if (
					action.payload &&
					typeof action.payload === "object" &&
					"id" in action.payload
				) {
					const error = action.payload as ErrorResponse;
					const index = state.news.findIndex(
						(news) => news.id === error.id,
					);
					if (index !== -1) {
						state.error.delete[index] = error;
					}
				}
			});
	},
});

export const {
	openNewsModal,
	closeNewsModal,
	setNewsUpdateError,
	resetNewsUpdateError,
} = newsSlice.actions;

export default newsSlice.reducer;
