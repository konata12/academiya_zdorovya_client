import {
	DetailsOrderSliceNameType,
	DetailsRedactorType,
	OrderComponent,
} from "@/app/types/data/details.type";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import _ from "lodash";
import { parseOrderComponentArrayToDetailsRedactor } from "@/app/services/details.service";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";

export function checkIfDetailsFormDataChanged({
	orderSliceName,
	order,
	id,
	serviceTypeIndex,
}: {
	orderSliceName: DetailsOrderSliceNameType;
	order: OrderComponent[];
	id: string | undefined;
	serviceTypeIndex: string | undefined;
}) {
	let originalSliceData: DetailsRedactorType | undefined;
	const emptyValue = {
		titles: [],
		paragraphs: [],
		quotes: [],
		lists: [],
		images: [],
	};
	const parsedFormData = parseOrderComponentArrayToDetailsRedactor(order);

	// GET ORIGINAL DETAILS DATA
	switch (orderSliceName) {
		// CREATE
		case "newsCreateDetailsOrder":
		case "serviceTypeCreateDetailsOrder":
			originalSliceData = emptyValue;
			break;
		//	UPDATE
		case "newsUpdateDetailsOrder":
			const { news } = useAppSelector((state: RootState) => state.news);
			const newsOneObject = news.find((service) => `${service.id}` === id);
			originalSliceData = newsOneObject?.details;
			break;
		case "serviceTypeUpdateDetailsOrder":
			const { services } = useAppSelector((state: RootState) => state.services);
			if (id === undefined || serviceTypeIndex === undefined) {
				originalSliceData = undefined;
				break;
			}
			const service = services.find((service) => `${service.id}` === id);
			const serviceType = service?.serviceTypes?.[Number(serviceTypeIndex)];
			originalSliceData = serviceType?.details;
			break;
		// LEGAL INFORMATION
		case "privacyPolicyUpdateDetailsOrder":
			const { privacyPolicy } = useAppSelector(
				(state: RootState) => state.legalInformation,
			);
			originalSliceData = privacyPolicy?.data;
			break;
		case "publicOfferUpdateDetailsOrder":
			const { publicOffer } = useAppSelector(
				(state: RootState) => state.legalInformation,
			);
			originalSliceData = publicOffer?.data;
			break;

		default:
			throw new Error(`Unknown order slice name: ${orderSliceName}`);
	}

	// CHANGE NAVIGATION SLICE VALUE, ONLY FOR UPDATE FORMS EXCLUDING SERVICE UPDATE FORM
	switch (orderSliceName) {
		case "newsUpdateDetailsOrder":
		case "privacyPolicyUpdateDetailsOrder":
		case "publicOfferUpdateDetailsOrder":
			useFormChangeCheck(originalSliceData, parsedFormData);
			break;
	}

	return _.isEqual(parsedFormData, originalSliceData);
}
