import { ErrorsResponses, Status } from "@/app/types/data/response.type";

// GENERAL TYPES
export interface Price extends PriceFormData {
	id: number;
}
export interface Titles extends TitlesFormData {
	id: number;
}
export interface PriceSection {
	id: number;
	titles: Titles[];
	optionalService: string | null;
	prices: Price[];
}
export interface PriceSectionInit {
	priceSections: PriceSection[];
	priceSectionsIsModalOpen: boolean[];
	status: Status;
	error: ErrorsResponses;
}

// FORM DATA
interface TitlesFormData {
	text: string;
	priceNearTitle?: string;
}
export interface PriceFormData {
	title: string;
	titleDescription?: string;
	meetingsCount?: string;
	meetingsDuration?: string;
	meetingPrice?: string;
	coursePrice?: string;
}
export interface PriceSectionFormData {
	titles: TitlesFormData[];
	optionalService?: string;
	prices?: PriceFormData[];
}

// PRICE FORM UI TYPES
export interface PriceSectionUI {
	addTitlePriceCheckbox: boolean[];

	optionalServiceCheckbox: boolean;
	optionalServiceInputHeight: number;

	priceVariantsHeight: number;
	addPriceVariantCheckbox: boolean[];
	priceVariantsCheckbox: boolean;
	meetingsCountCheckbox: boolean;
	meetingDurationCheckbox: boolean;
	meetingPriceCheckbox: boolean;
	meetingsTotalPriceCheckbox: boolean;
}
// PRICE TABLE UI TYPES
export type PriceTableColumnData = string | undefined;
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
	COUNT = "meetingsCount",
	DURATION = "meetingsDuration",
	PRICE = "meetingPrice",
	TOTALPRICE = "coursePrice",
}
export enum PriceSectionEnum {
	OPTIONALSERVICE = "optionalService",
}

// export type DepartmentsDefaultFormData = Partial<DepartmentsFormData>