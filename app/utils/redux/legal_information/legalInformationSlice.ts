import {
	LegalInformationEnumType,
	LegalInformationInit,
	LegalInformationResponseType,
	LegalInformationUpdateErrorsEnum,
} from "@/app/types/data/legal_information.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/app/types/data/response.type";
import { DetailsRedactorType } from "@/app/types/data/details.type";
import { getStatusErrorKeyFromLegalInformationField } from "@/app/services/admin/legal_information.service";
import { parseDetailsUpdateRequestFormData } from "@/app/services/admin/details.service";

const initialState: LegalInformationInit = {
	privacyPolicy: null,
	publicOffer: null,
	status: {
		getAll: null,
		privacyPolicyUpdate: null,
		publicOfferUpdate: null,
	},
	errors: {
		getAll: null,
		privacyPolicyUpdate: null,
		publicOfferUpdate: null,
	},
};

const baseUrl = "legal-information";

export const getLegalInformation = createAsyncThunk(
	"legalInformation/getLegalInformation",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseUrl}`);
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
export const updateLegalInformation = createAsyncThunk(
	"legalInformation/updateLegalInformation",
	async (
		{ data, field }: { data: DetailsRedactorType; field: LegalInformationEnumType },
		{ rejectWithValue },
	) => {
		try {
			const formData = new FormData();
			await parseDetailsUpdateRequestFormData(formData, data, "no_images");
			console.log("formData: ", Array.from(formData));

			const response = await axiosInstance.put(`${baseUrl}/admin/${field}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
			return { data, field };
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

const legalInformationSlice = createSlice({
	name: "legalInformation",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// GET LEGAL INFORMATION
			.addCase(getLegalInformation.pending, (state) => {
				state.status.getAll = "loading";
				state.errors.getAll = null;
			})
			.addCase(
				getLegalInformation.fulfilled,
				(
					state,
					action: {
						payload: LegalInformationResponseType | undefined;
					},
				) => {
					if (action.payload) {
						state.status.getAll = "succeeded";
						if (action.payload) {
							for (const key in action.payload) {
								const value = action.payload[key as LegalInformationEnumType];
								state[key as LegalInformationEnumType] = value
									? {
											data: value.details,
											updatedAt: value.updatedAt,
										}
									: null;
							}
						}
					}
				},
			)
			.addCase(getLegalInformation.rejected, (state, action) => {
				state.status.getAll = "failed";
				state.errors.getAll = action.payload as ErrorResponse;
			})

			// UPDATE LEGAL INFORMATION
			.addCase(updateLegalInformation.pending, (state, action) => {
				const { field } = action.meta.arg;
				const resField = getStatusErrorKeyFromLegalInformationField(field);
				state.status[resField] = "loading";
				state.errors[resField] = null;
			})
			.addCase(
				updateLegalInformation.fulfilled,
				(
					state,
					action: {
						payload:
							| { data: DetailsRedactorType; field: LegalInformationEnumType }
							| undefined;
					},
				) => {
					if (action.payload) {
						const { data, field } = action.payload;
						state.status[LegalInformationUpdateErrorsEnum[field]] = "succeeded";

						state[field] = {
							data,
							updatedAt: `${Date.now()}`,
						};
					}
				},
			)
			.addCase(updateLegalInformation.rejected, (state, action) => {
				const { field } = action.meta.arg;
				const resField = getStatusErrorKeyFromLegalInformationField(field);
				state.status[resField] = "failed";
				state.errors[resField] = action.payload as ErrorResponse;
			});
	},
});

export default legalInformationSlice.reducer;
