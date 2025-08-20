// noinspection SpellCheckingInspection

import { ErrorsResponses, Status } from "@/app/types/data/response.type";
import { FormInputError } from "@/app/types/data/form.type";

export type PricesFromSliceNameType = "pricesCreateForm" | "pricesUpdateForm";

// GENERAL TYPES
export interface Price extends PriceFormData {}
export interface Titles extends TitlesFormData {}
export interface PriceSection {
	id: number;
	titles: Titles[];
	optionalService: string | null;
	prices: Price[] | null;
}
export interface PriceSectionInit {
	priceSections: PriceSection[];
	priceSectionsIsModalOpen: boolean[];
	status: Status;
	error: ErrorsResponses;
}

// FORM DATA
export interface TitlesFormData {
	text: string;
	priceNearTitle: string | null;
}
export interface PriceFormData {
	title: string;
	titleDescription: string | null;
	meetingCount: string | null;
	meetingDuration: string | null;
	meetingPrice: string | null;
	coursePrice: string | null;
}
export interface PriceSectionFormData {
	titles: TitlesFormData[];
	optionalService: string | null;
	prices: PriceFormData[] | null;
	errors: PriceSectionErrorType;
}

export interface PriceFormDataWithoutError extends Omit<PriceSectionFormData, "errors"> {}
// FORM DATA ERROR TYPES
export interface PriceFormDataTitlesErrorType {
	text: FormInputError;
	priceNearTitle: FormInputError;
}
export interface PriceFormDataPricesErrorType {
	title: FormInputError;
	titleDescription: FormInputError;
	meetingCount: FormInputError;
	meetingDuration: FormInputError;
	meetingPrice: FormInputError;
	coursePrice: FormInputError;
}
export interface PriceSectionErrorType {
	titles: PriceFormDataTitlesErrorType[];
	optionalService: FormInputError;
	prices: PriceFormDataPricesErrorType[];
	pricesEmpty: FormInputError;
}

export type PricesFromErrorBasicValueType = PriceSectionEnum.OPTIONALSERVICE | "pricesEmpty";
export type PriceHandleSubmitErrorIdType =
	| PriceSectionEnum.OPTIONALSERVICE
	| `${PriceSectionEnum.TITLES}_${PriceTitleEnumType}_${number}`
	| `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnumType}_${number}`
	| PriceSectionEnum.PRICES;

// PRICE FORM UI TYPES
export interface PriceSectionUI {
	addTitlePriceCheckbox: boolean[];

	optionalServiceCheckbox: boolean;

	meetingCountCheckbox: boolean;
	meetingDurationCheckbox: boolean;
	meetingPriceCheckbox: boolean;
	meetingTotalPriceCheckbox: boolean;

	addPriceVariantDescriptionCheckbox: boolean[];
	priceVariantsCheckbox: boolean;
}
// PRICE TABLE UI TYPES
export type PriceTableColumnData = string | null;
export interface PriceTableData {
	[PriceVariantOptionsEnum.COUNT]: PriceTableColumnData[];
	[PriceVariantOptionsEnum.DURATION]: PriceTableColumnData[];
	[PriceVariantOptionsEnum.PRICE]: PriceTableColumnData[];
	[PriceVariantOptionsEnum.TOTALPRICE]: PriceTableColumnData[];
}
export interface PriceTableColumnsData {
	columnsData: PriceTableData;
	columnsNumber: number;
}

// ENUMS
export enum PriceTitleEnum {
	TEXT = "text",
	PRICENEARTITLE = "priceNearTitle",
}
export enum PriceVariantOptionsEnum {
	TITLE = "title",
	TITLEDESCRIPTION = "titleDescription",
	COUNT = "meetingCount",
	DURATION = "meetingDuration",
	PRICE = "meetingPrice",
	TOTALPRICE = "coursePrice",
}
export enum PriceSectionEnum {
	TITLES = "titles",
	OPTIONALSERVICE = "optionalService",
	PRICES = "prices",
}

export enum PriceFormUICheckboxEnum {
	ADDTITLEPRICECHECKBOX = "addTitlePriceCheckbox",

	OPTIONALSERVICECHECKBOX = "optionalServiceCheckbox",

	MEETINGCOUNTCHECKBOX = "meetingCountCheckbox",
	MEETINGDURATIONCHECKBOX = "meetingDurationCheckbox",
	MEETINGPRICECHECKBOX = "meetingPriceCheckbox",
	MEETINGTOTALPRICECHECKBOX = "meetingTotalPriceCheckbox",

	ADDPRICEVARIANTDESCRIPTIONCHECKBOX = "addPriceVariantDescriptionCheckbox",
	PRICEVARIANTSCHECKBOX = "priceVariantsCheckbox",
}

// ENUM TYPES
export type PriceTitleEnumType = `${PriceTitleEnum}`;
export type PriceVariantOptionsEnumType = `${PriceVariantOptionsEnum}`;
export type PriceSectionEnumType = `${PriceSectionEnum}`;
