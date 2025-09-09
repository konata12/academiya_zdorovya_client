import {
	DescriptionImage,
	DescriptionList,
	DescriptionParagraph,
	DescriptionQuote,
	DescriptionTitle,
	DetailsFormDataEnum,
} from "@/app/types/data/details.type";

export interface UserDetailsTitleComponent extends DescriptionTitle {
	type: DetailsFormDataEnum.TITLES;
}
export interface UserDetailsParagraphComponent extends DescriptionParagraph {
	type: DetailsFormDataEnum.PARAGRAPHS;
}
export interface UserDetailsQuoteComponent extends DescriptionQuote {
	type: DetailsFormDataEnum.QUOTES;
}
export interface UserDetailsListComponent extends DescriptionList {
	type: DetailsFormDataEnum.LISTS;
}
export interface UserDetailsImageComponent extends DescriptionImage {
	type: DetailsFormDataEnum.IMAGES;
}

export type OrderUserDetailsComponent =
	| UserDetailsTitleComponent
	| UserDetailsParagraphComponent
	| UserDetailsQuoteComponent
	| UserDetailsListComponent
	| UserDetailsImageComponent;
