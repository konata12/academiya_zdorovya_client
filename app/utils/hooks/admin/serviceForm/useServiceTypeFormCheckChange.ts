import { useServiceFormChangeCheck } from "@/app/utils/hooks/admin/serviceForm/useServiceFormChangeCheck";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import { ServiceTypeFormData } from "@/app/types/data/services.type";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";

export function useServiceTypeFormCheckChange(
	newServiceType: Omit<ServiceTypeFormData, "errors" | "orderId">,
) {
	const { errors, ...data } = useAppSelector(
		(state: RootState) => state.serviceUpdateForm,
	);
	const { services } = useAppSelector((state: RootState) => state.services);
	const { id, serviceTypeIndex } = useParams<{
		id: string;
		serviceTypeIndex: string;
	}>();
	const oldService = services.find((service) => `${service.id}` === id);

	// FIRSTLY CHECK IF SERVICE TYPE FORM DATA CHANGED
	const oldServiceType = oldService?.serviceTypes?.[+serviceTypeIndex];
	const parsedNewServiceType = {
		...newServiceType,
		order: +serviceTypeIndex,
	};

	const serviceTypeIsEqual = _.isEqual(parsedNewServiceType, oldServiceType);
	if (!serviceTypeIsEqual) {
		useFormChangeCheck(oldServiceType, parsedNewServiceType);
	} else {
		// IF NOT SERVICE TYPE, CHECK IF DATA IN SERVICE FORM CHANGED BEFORE QUITING PAGE
		useServiceFormChangeCheck(oldService, data);
	}
}
