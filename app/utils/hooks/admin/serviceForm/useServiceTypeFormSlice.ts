import { ServiceTypesDetailsSliceNameType } from "@/app/types/data/services.type";
import { setServiceTypeCreateDetailsInitialDataOnLink } from "@/app/utils/redux/details/services/serviceTypeCreateDetailsOrderSlice";
import { useMemo } from "react";
import { setServiceTypeUpdateDetailsInitialDataOnLink } from "@/app/utils/redux/details/services/serviceTypeUpdateDetailsOrderSlice";
import { setServiceCreateTypesValue } from "@/app/utils/redux/services/serviceCreateFormSlice";
import { setServiceUpdateTypesValue } from "@/app/utils/redux/services/serviceUpdateFormSlice";

export function useServiceTypeFormSlice(
	sliceName: ServiceTypesDetailsSliceNameType,
) {
	return useMemo(() => {
		switch (sliceName) {
			case "serviceTypeCreateDetailsOrder":
				return {
					// FORM SLICE
					setServiceTypesValue: setServiceCreateTypesValue,
					setServiceTypeDetailsInitialDataOnLink:
						setServiceTypeCreateDetailsInitialDataOnLink,
				};

			case "serviceTypeUpdateDetailsOrder":
				return {
					// FORM SLICE
					setServiceTypesValue: setServiceUpdateTypesValue,
					setServiceTypeDetailsInitialDataOnLink:
						setServiceTypeUpdateDetailsInitialDataOnLink,
				};
		}
	}, [sliceName]);
}
