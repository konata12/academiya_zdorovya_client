import { useCallback } from "react";
import {
	LegalInformationEnum,
	LegalInformationEnumType,
} from "@/app/types/data/legal_information.type";
import { DetailsRedactorType } from "@/app/types/data/details.type";
import { parseDetailsResponseToOrderComponentArray } from "@/app/services/details.service";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { setPrivacyPolicyDetailsStateOrder } from "@/app/utils/redux/details/legal_information/privacyPolicyUpdateDetailsOrderSlice";
import { setPublicOfferDetailsStateOrder } from "@/app/utils/redux/details/legal_information/publicOfferUpdateDetailsOrderSlice";
import { useRouter } from "next/navigation";

export function useLegalInformationLinkToUpdatePage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	return useCallback(
		(dataType: LegalInformationEnumType, data: DetailsRedactorType | undefined) => {
			const parsedData = data ? parseDetailsResponseToOrderComponentArray(data) : [];
			switch (dataType) {
				case LegalInformationEnum.PrivacyPolicy:
					dispatch(setPrivacyPolicyDetailsStateOrder(parsedData));
					break;
				case LegalInformationEnum.PublicOffer:
					dispatch(setPublicOfferDetailsStateOrder(parsedData));
					break;
			}
			router.push(`/admin/legal_information/${dataType}`);
		},
		[],
	);
}
