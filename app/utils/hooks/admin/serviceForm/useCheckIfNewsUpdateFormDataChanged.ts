import { useServiceFormChangeCheck } from "@/app/utils/hooks/admin/serviceForm/useServiceFormChangeCheck";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import _ from "lodash";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import { parseOrderComponentArrayToDetailsRedactor } from "@/app/services/admin/details.service";
import { CreateNewsFormData } from "@/app/types/data/news.type";

export function useCheckIfNewsUpdateFormDataChanged() {
	const { news } = useAppSelector((state: RootState) => state.news);
	const { errors, ...data } = useAppSelector((state: RootState) => state.newsUpdateForm);
	const order = useAppSelector((state: RootState) => state.newsUpdateDetailsOrder.order);

	const { id } = useParams<{
		id: string;
	}>();

	const oldNewsObject = news.find((newsData) => `${newsData.id}` === id);
	let parsedOldNewsObject: CreateNewsFormData | undefined = undefined;
	if (oldNewsObject) {
		const { id, createdAt, isBannerNews, ...oldNewsObjectOtherData } = oldNewsObject;
		parsedOldNewsObject = oldNewsObjectOtherData;
	}
	// FIRSTLY CHECK IF SERVICE TYPE DETAILS FORM DATA CHANGED
	const oldNewsDetails = parsedOldNewsObject?.details;
	const parsedNewNewsDetails = parseOrderComponentArrayToDetailsRedactor(order);
	const newsDetailsIsEqual = _.isEqual(oldNewsDetails, parsedNewNewsDetails);

	// THEN CHECK IF SERVICE TYPE DETAILS FORM DATA CHANGED
	const parsedNewNewsFormData = {
		...data,
		details: parsedNewNewsDetails,
	};
	const newsFormDataIsEqual = _.isEqual(parsedOldNewsObject, parsedNewNewsFormData);

	useFormChangeCheck(
		!newsDetailsIsEqual
			? oldNewsDetails
			: !newsFormDataIsEqual
				? parsedOldNewsObject
				: undefined,
		!newsDetailsIsEqual
			? parsedNewNewsDetails
			: !newsFormDataIsEqual
				? parsedNewNewsFormData
				: undefined,
	);
}
