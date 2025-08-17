import { useServiceFormChangeCheck } from "@/app/utils/hooks/admin/serviceForm/useServiceFormChangeCheck";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import { parseOrderComponentArrayToDetailsRedactor } from "@/app/services/details.service";

export function useServiceFormsDataCheckChange() {
	const { errors, ...data } = useAppSelector(
		(state: RootState) => state.serviceUpdateForm,
	);
	const {
		orderId,
		errors: serviceTypeErrors,
		...newServiceTypeData
	} = useAppSelector((state: RootState) => state.serviceTypeUpdateForm);
	const order = useAppSelector(
		(state: RootState) => state.serviceTypeUpdateDetailsOrder.order,
	);
	const { services } = useAppSelector((state: RootState) => state.services);
	const { id, serviceTypeIndex } = useParams<{
		id: string;
		serviceTypeIndex: string;
	}>();
	// console.log("order: ", order);

	const oldService = services.find((service) => `${service.id}` === id);

	// FIRSTLY CHECK IF SERVICE TYPE DETAILS FORM DATA CHANGED
	const oldServiceTypeDetails =
		oldService?.serviceTypes?.[+serviceTypeIndex]?.details;
	const parsedNewServiceTypeDetails =
		parseOrderComponentArrayToDetailsRedactor(order);
	const serviceTypeDetailsIsEqual = _.isEqual(
		parsedNewServiceTypeDetails,
		oldServiceTypeDetails,
	);
	console.log("oldServiceTypeDetails:", oldServiceTypeDetails);
	console.log("parsedNewServiceTypeDetails:", parsedNewServiceTypeDetails);

	// THEN CHECK IF SERVICE TYPE DETAILS FORM DATA CHANGED
	const oldServiceType = oldService?.serviceTypes?.[+serviceTypeIndex];
	const parsedNewServiceType = {
		...newServiceTypeData,
		order: +serviceTypeIndex,
	};
	const serviceTypeIsEqual = _.isEqual(parsedNewServiceType, oldServiceType);

	console.log("serviceTypeIsEqual:", serviceTypeIsEqual);
	console.log("serviceTypeDetailsIsEqual:", serviceTypeDetailsIsEqual);
	if (!serviceTypeDetailsIsEqual) {
		console.log(1);
		useFormChangeCheck(oldServiceTypeDetails, parsedNewServiceTypeDetails);
	} else if (!serviceTypeIsEqual) {
		console.log(2);
		useFormChangeCheck(oldServiceType, parsedNewServiceType);
	} else {
		console.log(3);
		// IF NOT SERVICE TYPE, CHECK IF DATA IN SERVICE FORM CHANGED BEFORE QUITING PAGE
		useServiceFormChangeCheck(oldService, data);
	}
}
