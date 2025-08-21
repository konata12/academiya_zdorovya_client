import { DetailsRedactorType } from "@/app/types/data/details.type";
import { ErrorResponse, StatusType } from "@/app/types/data/response.type";

export interface LegalInformationBasicType {
	data: DetailsRedactorType | undefined;
	updatedAt: string;
}

// RESPONSE
export interface LegalInformationResponseBasicType {
	details: DetailsRedactorType | undefined;
	updatedAt: string;
}
export interface LegalInformationResponseType {
	privacyPolicy: LegalInformationResponseBasicType | undefined;
	publicOffer: LegalInformationResponseBasicType | undefined;
}
// MAIN REDUX SLICE
export interface LegalInformationInit {
	privacyPolicy: LegalInformationBasicType | null;
	publicOffer: LegalInformationBasicType | null;
	status: LegalInformationInitStatus;
	errors: LegalInformationInitErrors;
}
export interface LegalInformationInitStatus {
	getAll: StatusType;
	privacyPolicyUpdate: StatusType;
	publicOfferUpdate: StatusType;
}
export interface LegalInformationInitErrors {
	getAll: ErrorResponse | null;
	privacyPolicyUpdate: ErrorResponse | null;
	publicOfferUpdate: ErrorResponse | null;
}

// FORM REDUX SLICE

// ENUMS
export enum LegalInformationEnum {
	PrivacyPolicy = "privacyPolicy",
	PublicOffer = "publicOffer",
}
export enum LegalInformationUpdateErrorsEnum {
	privacyPolicy = "privacyPolicyUpdate",
	publicOffer = "publicOfferUpdate",
}

// ENUM TYPES
export type LegalInformationEnumType = `${LegalInformationEnum}`;
export type LegalInformationUpdateErrorsEnumType = `${LegalInformationUpdateErrorsEnum}`;
