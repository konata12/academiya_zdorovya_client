import { AboutTreatmentFormIndexedDBType } from "@/app/types/data/about_treatment.type";
import {
	setAboutTreatmentCreateBasicValueError,
	setAboutTreatmentCreateImage,
	setAboutTreatmentCreateTitle,
	setAboutTreatmentCreateTreatmentType,
	setAboutTreatmentCreateTreatmentTypesValueError,
} from "@/app/utils/redux/about_treatment/aboutTreatmentCreateFormSlice";
import {
	setAboutTreatmentUpdateBasicValueError,
	setAboutTreatmentUpdateImage,
	setAboutTreatmentUpdateTitle,
	setAboutTreatmentUpdateTreatmentType,
	setAboutTreatmentUpdateTreatmentTypesValueError,
} from "@/app/utils/redux/about_treatment/aboutTreatmentUpdateFormSlice";
import { useMemo } from "react";

export function useAboutTreatmentFormSlice(
	indexedDBStoreName: AboutTreatmentFormIndexedDBType,
) {
	const actions = useMemo(() => {
		switch (indexedDBStoreName) {
			case "about_treatment_create_images":
				return {
					// FORM SLICE
					setTitle: setAboutTreatmentCreateTitle,
					setImage: setAboutTreatmentCreateImage,
					setTreatmentType: setAboutTreatmentCreateTreatmentType,
					setBasicValueError: setAboutTreatmentCreateBasicValueError,
					setTreatmentTypesValueError:
						setAboutTreatmentCreateTreatmentTypesValueError,
				};

			case "about_treatment_update_images":
				return {
					// FORM SLICE
					setTitle: setAboutTreatmentUpdateTitle,
					setImage: setAboutTreatmentUpdateImage,
					setTreatmentType: setAboutTreatmentUpdateTreatmentType,
					setBasicValueError: setAboutTreatmentUpdateBasicValueError,
					setTreatmentTypesValueError:
						setAboutTreatmentUpdateTreatmentTypesValueError,
				};
		}
	}, [indexedDBStoreName]);

	return actions;
}
