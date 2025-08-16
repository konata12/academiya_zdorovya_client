import { DraggableComponent } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer";
import { FormInputError } from "@/app/types/data/form.type";
import { OrderElementBasicType } from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";

// MAIN
export type NewsDetailsOrderSliceNameType =
  | "newsCreateDetailsOrder"
  | "newsUpdateDetailsOrder";
export type ServiceTypeDetailsOrderSliceNameType =
  | "serviceTypeCreateDetailsOrder"
  | "serviceTypeUpdateDetailsOrder";
export type DetailsOrderSliceNameType =
  | NewsDetailsOrderSliceNameType
  | ServiceTypeDetailsOrderSliceNameType;

export type ServiceDetailsOrderIndexedDBStoreNameType =
  | "service_create_images"
  | "service_update_images";
export type NewsDetailsOrderIndexedDBStoreNameType =
  | "news_create_images"
  | "news_update_images";
export type DetailsOrderIndexedDBStoreNameType =
  | NewsDetailsOrderIndexedDBStoreNameType
  | ServiceDetailsOrderIndexedDBStoreNameType;

export interface DetailsDataRenderElementBasicType
  extends OrderElementBasicType {}

export type DescriptionImageSize = "big" | "small";

// ENUMS
export enum DetailsFormDataEnum {
  TITLES = "titles",
  PARAGRAPHS = "paragraphs",
  QUOTES = "quotes",
  LISTS = "lists",
  IMAGES = "images",
}

export enum TitleFormDataEnum {
  TITLE = "title",
}
export enum ParagraphFormDataEnum {
  TEXT = "text",
}
export enum QuoteFormDataEnum {
  TEXT = "text",
  AUTHOR = "author",
}
export enum ListFormDataEnum {
  NUMERABLE = "numerable",
  OPTIONS = "options",
}
export enum ImageFormDataEnum {
  DESCRIPTION = "description",
  SIZE = "size",
  IMAGE = "image",
}

export type TitleFormDataEnumType = `${TitleFormDataEnum}`;
export type ParagraphFormDataEnumType = `${ParagraphFormDataEnum}`;
export type QuoteFormDataEnumType = `${QuoteFormDataEnum}`;
export type ListFormDataEnumType = `${ListFormDataEnum}`;
export type ImageFormDataEnumType = `${ImageFormDataEnum}`;

export type ComponentsFormDataEnum =
  | TitleFormDataEnumType
  | ParagraphFormDataEnumType
  | QuoteFormDataEnumType
  | ListFormDataEnumType
  | ImageFormDataEnumType;

// FORM DATA
export interface DetailsFromElementBasicType extends DraggableComponent {}

export interface TitleFormData extends DetailsFromElementBasicType {
  [TitleFormDataEnum.TITLE]: string;
}
export interface ParagraphFormData extends DetailsFromElementBasicType {
  [ParagraphFormDataEnum.TEXT]: string;
}
export interface QuoteFormData extends DetailsFromElementBasicType {
  [QuoteFormDataEnum.TEXT]: string;
  [QuoteFormDataEnum.AUTHOR]: string;
}
export interface ListFormData extends DetailsFromElementBasicType {
  [ListFormDataEnum.NUMERABLE]: boolean;
  [ListFormDataEnum.OPTIONS]: string[];
}
export interface ImageFormData extends DetailsFromElementBasicType {
  [ImageFormDataEnum.SIZE]: DescriptionImageSize;
  [ImageFormDataEnum.DESCRIPTION]: string;
  [ImageFormDataEnum.IMAGE]: string | null;
}

export interface DetailsFormData {
  [DetailsFormDataEnum.TITLES]: TitleFormData[];
  [DetailsFormDataEnum.PARAGRAPHS]: ParagraphFormData[];
  [DetailsFormDataEnum.QUOTES]: QuoteFormData[];
  [DetailsFormDataEnum.LISTS]: ListFormData[];
  [DetailsFormDataEnum.IMAGES]: ImageFormData[];
}
export type DetailsFormDataType =
  | TitleFormData
  | ParagraphFormData
  | QuoteFormData
  | ListFormData
  | ImageFormData;

export type DetailsFormDataEnumType = `${DetailsFormDataEnum}`;

// ERROR TYPES
export interface TitleError {
  [TitleFormDataEnum.TITLE]: FormInputError;
}
export interface ParagraphError {
  [ParagraphFormDataEnum.TEXT]: FormInputError;
}
export interface QuoteError {
  [QuoteFormDataEnum.TEXT]: FormInputError;
  [QuoteFormDataEnum.AUTHOR]: FormInputError;
}
export interface ListError {
  [ListFormDataEnum.OPTIONS]: FormInputError[];
}
export interface ImageError {
  [ImageFormDataEnum.DESCRIPTION]: FormInputError;
  [ImageFormDataEnum.IMAGE]: FormInputError;
}

export type DetailsFormDataErrorType =
  | TitleError
  | ParagraphError
  | QuoteError
  | ListError
  | ImageError;

// COMPONENT
interface StyledComponent {
  className?: string;
}
interface HandleChangeComponent {
  index: number;
  orderSliceName: DetailsOrderSliceNameType;
}

export interface DetailsTitleFormComponentProps
  extends StyledComponent,
    HandleChangeComponent {
  componentData: TitleOrderComponent;
}

export interface ParagraphFormComponentProps
  extends StyledComponent,
    HandleChangeComponent {
  componentData: ParagraphOrderComponent;
}

export interface QuoteFormComponentProps extends HandleChangeComponent {
  componentData: QuoteOrderComponent;
  className?: {
    container?: string;
    quote?: string;
    author?: string;
  };
}

export interface ListFormComponentProps extends HandleChangeComponent {
  componentData: ListOrderComponent;
  className?: {
    container?: string;
    option?: string;
  };
}

export interface ImageFormComponentProps extends HandleChangeComponent {
  indexedDBStoreName: DetailsOrderIndexedDBStoreNameType;
  componentData: ImageOrderComponent;
  className?: {
    container?: string;
    image?: string;
    description?: string;
  };
}

export interface DetailsFromProps {
  titles?: boolean;
  paragraphs?: boolean;
  quotes?: boolean;
  lists?: boolean;
  images?: boolean;
  orderSliceName: DetailsOrderSliceNameType;
}

// REDUX ORDER SLICE
export interface TitleOrderComponent {
  type: "titles";
  data: TitleFormData;
  error: TitleError;
}
export interface ParagraphOrderComponent {
  type: "paragraphs";
  data: ParagraphFormData;
  error: ParagraphError;
}
export interface QuoteOrderComponent {
  type: "quotes";
  data: QuoteFormData;
  error: QuoteError;
}
export interface ListOrderComponent {
  type: "lists";
  data: ListFormData;
  error: ListError;
}
export interface ImageOrderComponent {
  type: "images";
  data: ImageFormData;
  error: ImageError;
}

export type OrderComponent =
  | TitleOrderComponent
  | ParagraphOrderComponent
  | QuoteOrderComponent
  | ListOrderComponent
  | ImageOrderComponent;

export interface ComponentOrderState {
  order: OrderComponent[];
}

// RESPONSE DATA
export interface DescriptionTitle extends DetailsDataRenderElementBasicType {
  [TitleFormDataEnum.TITLE]: string;
}
export interface DescriptionParagraph
  extends DetailsDataRenderElementBasicType {
  [ParagraphFormDataEnum.TEXT]: string;
}
export interface DescriptionQuote extends DetailsDataRenderElementBasicType {
  [QuoteFormDataEnum.TEXT]: string;
  [QuoteFormDataEnum.AUTHOR]: string;
}
export interface DescriptionList extends DetailsDataRenderElementBasicType {
  [ListFormDataEnum.NUMERABLE]: boolean;
  [ListFormDataEnum.OPTIONS]: string[];
}
export interface DescriptionImage extends DetailsDataRenderElementBasicType {
  [ImageFormDataEnum.SIZE]: DescriptionImageSize;
  [ImageFormDataEnum.DESCRIPTION]: string;
  [ImageFormDataEnum.IMAGE]: string;
}

export type DetailsRedactorType = {
  titles: DescriptionTitle[];
  paragraphs: DescriptionParagraph[];
  quotes: DescriptionQuote[];
  lists: DescriptionList[];
  images: DescriptionImage[];
};
