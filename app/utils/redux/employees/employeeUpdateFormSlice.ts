import { createSlice } from "@reduxjs/toolkit";
import {
	Employee,
	EmployeeFormData,
	EmployeesBackgroundImgColorType,
	EmployeesFormDataEnum,
	EmployeeSocialMediaKeysType,
	EmployeeStringArrayKeysType,
	EmployeeStringKeysType,
} from "@/app/types/data/employees.type";

const initState: EmployeeFormData = {
	name: "",
	surname: "",
	position: "",
	description: "",
	degree: "",
	instagram: "",
	facebook: "",
	X: "",
	youtube: "",
	workSpecialities: [""],
	achivements: undefined,
	backgroundImgColor: "blue",
	image: null,
	errors: {
		name: { message: "" },
		surname: { message: "" },
		position: { message: "" },
		description: { message: "" },
		degree: { message: "" },
		instagram: { message: "" },
		facebook: { message: "" },
		X: { message: "" },
		youtube: { message: "" },
		workSpecialities: [],
		achivements: [],
		backgroundImgColor: { message: "" },
		image: { message: "" },
	},
};

const employeeUpdateFormSlice = createSlice({
	name: "employeeUpdateForm",
	initialState: initState,
	reducers: {
		// SET VALUES
		setAllEmployeeUpdateDataOnLink(state, action: { payload: Employee }) {
			const { id, instagram, facebook, X, youtube, achivements, ...data } =
				action.payload;
			const {
				workSpecialities: workSpecialitiesErrors,
				achivements: achivementsErrors,
				...errors
			} = state.errors;

			return {
				...data,
				instagram: instagram || undefined,
				facebook: facebook || undefined,
				X: X || undefined,
				youtube: youtube || undefined,
				achivements: achivements || undefined,
				errors: {
					...errors,
					workSpecialities: new Array(data.workSpecialities.length).fill({
						message: "",
					}),
					achivements: achivements
						? new Array(achivements.length).fill({ message: "" })
						: [],
				},
			};
		},
		setEmployeeUpdateStringValue(
			state,
			action: {
				payload: {
					field: EmployeeStringKeysType;
					value: string;
				};
			},
		) {
			const { field, value } = action.payload;
			state[field] = value;
		},
		setEmployeeUpdateSocialMediaValue(
			state,
			action: {
				payload: {
					field: EmployeeSocialMediaKeysType;
					value: string | undefined;
				};
			},
		) {
			const { field, value } = action.payload;
			state[field] = value;
		},
		addEmployeeUpdateStringArrayValue(
			state,
			action: {
				payload: EmployeeStringArrayKeysType;
			},
		) {
			const field = action.payload;
			// ACHIVEMENTS CAN BE UNDEFINED
			if (!state[field]) {
				// IF PARAMETER IS UNDEFINED MAKE IT ARRAY
				state[field] = [""];
			}
			const length = state[field].length;
			state[field][length] = "";
			if (!state.errors[field]) {
				state.errors[field] = [{ message: "" }];
			}
		},
		setEmployeeUpdateStringArrayValue(
			state,
			action: {
				payload: {
					index: number;
					value: string;
					field: EmployeeStringArrayKeysType;
				};
			},
		) {
			const { field, index, value } = action.payload;
			if (state[field]) {
				state[field][index] = value;
			} else {
				state[field] = [value];
			}
		},
		deleteEmployeeUpdateStringArrayValue(
			state,
			action: {
				payload: {
					index: number;
					field: EmployeeStringArrayKeysType;
				};
			},
		) {
			const { index, field } = action.payload;
			if (state[field] && state.errors[field]) {
				state[field].splice(index, 1);
				state.errors[field].splice(index, 1);
			}
		},
		setAchivementsFirstValue(state) {
			state.achivements = [""];
			state.errors.achivements = [{ message: "" }];
		},
		setEmployeeUpdateBackgroundImgColor(
			state,
			action: { payload: EmployeesBackgroundImgColorType },
		) {
			const value = action.payload;
			state[EmployeesFormDataEnum.BACKGROUNDIMGCOLOR] = value;
		},
		// SET ERRORS
		setEmployeeUpdateBasicValueError(
			state,
			action: {
				payload: {
					field: Exclude<
						EmployeesFormDataEnum,
						EmployeeStringArrayKeysType
					>;
					message: string;
				};
			},
		) {
			const { field, message } = action.payload;
			state.errors[field] = { message };
		},
		setEmployeeUpdateStringArrayError(
			state,
			action: {
				payload: {
					field: EmployeeStringArrayKeysType;
					index: number;
					message: string;
				};
			},
		) {
			const { field, index, message } = action.payload;
			state.errors[field][index] = { message };
		},

		// RESET FORM
		resetEmployeeUpdateForm: () => initState,
	},
});

export const {
	setAllEmployeeUpdateDataOnLink,
	setEmployeeUpdateStringValue,
	setEmployeeUpdateSocialMediaValue,
	addEmployeeUpdateStringArrayValue,
	setEmployeeUpdateStringArrayValue,
	deleteEmployeeUpdateStringArrayValue,
	setAchivementsFirstValue,
	setEmployeeUpdateBackgroundImgColor,

	setEmployeeUpdateBasicValueError,
	setEmployeeUpdateStringArrayError,

	resetEmployeeUpdateForm,
} = employeeUpdateFormSlice.actions;

export default employeeUpdateFormSlice.reducer;
