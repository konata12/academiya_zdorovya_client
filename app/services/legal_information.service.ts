import {
	LegalInformationEnumType,
	LegalInformationInitStatus,
	LegalInformationUpdateErrorsEnumType,
} from "@/app/types/data/legal_information.type";

export function getStatusErrorKeyFromLegalInformationField(
	field: LegalInformationEnumType,
): LegalInformationUpdateErrorsEnumType {
	switch (field) {
		case "privacyPolicy":
			return "privacyPolicyUpdate";
		case "publicOffer":
			return "publicOfferUpdate";
	}
}
