import { useServiceFormChangeCheck } from "@/app/utils/hooks/admin/serviceForm/useServiceFormChangeCheck";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import {
	parseDetailsResponseToOrderComponentArray,
	parseOrderComponentArrayToDetailsRedactor,
} from "@/app/services/details.service";
import { useEffect } from "react";
import { useServiceTypeFormSlice } from "@/app/utils/hooks/admin/serviceForm/useServiceTypeFormSlice";
import { ServiceTypesDetailsSliceNameType } from "@/app/types/data/services.type";

export function useServiceTypeSetDetailsInitValue(
	detailsSliceName: ServiceTypesDetailsSliceNameType,
) {
	const { details } = useAppSelector(
		(state: RootState) => state.serviceTypeUpdateForm,
	);
	const order = useAppSelector(
		(state: RootState) => state.serviceTypeUpdateDetailsOrder.order,
	);

	const { setServiceTypesValue, setServiceTypeDetailsInitialDataOnLink } =
		useServiceTypeFormSlice(detailsSliceName);
	const dispatch = useAppDispatch();

	// CHECK IF SERVICE TYPE DETAILS FORM DATA CHANGED
	const oldServiceTypeDetails = details;
	const parsedNewServiceTypeDetails =
		parseOrderComponentArrayToDetailsRedactor(order);
	const serviceTypeDetailsIsEqual = _.isEqual(
		parsedNewServiceTypeDetails,
		oldServiceTypeDetails,
	);

	useEffect(() => {
		if (serviceTypeDetailsIsEqual) {
			const parsedDetails = details
				? parseDetailsResponseToOrderComponentArray(details)
				: [];
			dispatch(setServiceTypeDetailsInitialDataOnLink(parsedDetails));
		}
	}, []);
}
