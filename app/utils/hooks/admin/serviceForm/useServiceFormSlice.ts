import { ServiceFormIndexedDBType } from "@/app/types/data/services.type";
import {
	setServiceCreateFormBasicValueError,
	setServiceCreateFormStringValue,
	setServiceCreateTreatmentStagesError,
	setServiceCreateTreatmentStagesValue,
} from "@/app/utils/redux/services/serviceCreateFormSlice";
import {
	setServiceUpdateFormBasicValueError,
	setServiceUpdateFormStringValue,
	setServiceUpdateTreatmentStagesError,
	setServiceUpdateTreatmentStagesValue,
} from "@/app/utils/redux/services/serviceUpdateFormSlice";
import { useMemo } from "react";

export function useServiceFormSlice(indexedDBStoreName: ServiceFormIndexedDBType) {
	return useMemo(() => {
		switch (indexedDBStoreName) {
			case "service_create_images":
				return {
					// FORM SLICE
					setStringValue: setServiceCreateFormStringValue,
					setTreatmentStagesValue: setServiceCreateTreatmentStagesValue,
					setBasicValueError: setServiceCreateFormBasicValueError,
					setTreatmentStagesError: setServiceCreateTreatmentStagesError,
				};

			case "service_update_images":
				return {
					// FORM SLICE
					setStringValue: setServiceUpdateFormStringValue,
					setTreatmentStagesValue: setServiceUpdateTreatmentStagesValue,
					setBasicValueError: setServiceUpdateFormBasicValueError,
					setTreatmentStagesError: setServiceUpdateTreatmentStagesError,
				};
		}
	}, [indexedDBStoreName]);
}
