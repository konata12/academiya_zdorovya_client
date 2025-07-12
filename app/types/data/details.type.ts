import { FormInputError } from "@/app/types/data/form.type"

// MAIN
export type DetailsOrderSliceNameType = 'newsDetailsOrder'
export type DetailsOrderIndexedDBStoreNameType = 'news_images'

export interface DetailsDataRenderElementBasicType {
    order: number
}

export type DescriptionImageSize = 'big' | 'small'

// ENUMS
export enum DetailsFormDataEnum {
    TITLES = 'titles',
    PARAGRAPHS = 'paragraphs',
    QUOUTES = 'quoutes',
    LISTS = 'lists',
    IMAGES = 'images',
}

export enum TitleFormDataEnum {
    TITLE = 'title',
}
export enum ParagraphFormDataEnum {
    TEXT = 'text',
}
export enum QuouteFormDataEnum {
    TEXT = 'text',
    AUTHOR = 'author',
}
export enum ListFormDataEnum {
    NUMERABLE = 'numerable',
    OPTIONS = 'options',
}
export enum ImageFormDataEnum {
    DESCRIPTION = 'description',
    SIZE = 'size',
    IMAGE = 'image',
}

export type TitleFormDataEnumType = `${TitleFormDataEnum}`
export type ParagraphFormDataEnumType = `${ParagraphFormDataEnum}`
export type QuouteFormDataEnumType = `${QuouteFormDataEnum}`
export type ListFormDataEnumType = `${ListFormDataEnum}`
export type ImageFormDataEnumType = `${ImageFormDataEnum}`

export type ComponentsFormDataEnum = TitleFormDataEnumType
    | ParagraphFormDataEnumType
    | QuouteFormDataEnumType
    | ListFormDataEnumType
    | ImageFormDataEnumType


// FORM DATA
export interface DetailsFromElementBasicType {
    orderId: string
}

export interface TitleFormData extends DetailsFromElementBasicType {
    [TitleFormDataEnum.TITLE]: string
}
export interface ParagraphFormData extends DetailsFromElementBasicType {
    [ParagraphFormDataEnum.TEXT]: string
}
export interface QuouteFormData extends DetailsFromElementBasicType {
    [QuouteFormDataEnum.TEXT]: string
    [QuouteFormDataEnum.AUTHOR]: string
}
export interface ListFormData extends DetailsFromElementBasicType {
    [ListFormDataEnum.NUMERABLE]: boolean
    [ListFormDataEnum.OPTIONS]: string[]
}
export interface ImageFormData extends DetailsFromElementBasicType {
    [ImageFormDataEnum.SIZE]: DescriptionImageSize
    [ImageFormDataEnum.DESCRIPTION]: string
    [ImageFormDataEnum.IMAGE]: string | null
}

export interface DetailsFormData {
    [DetailsFormDataEnum.TITLES]: TitleFormData[]
    [DetailsFormDataEnum.PARAGRAPHS]: ParagraphFormData[]
    [DetailsFormDataEnum.QUOUTES]: QuouteFormData[]
    [DetailsFormDataEnum.LISTS]: ListFormData[]
    [DetailsFormDataEnum.IMAGES]: ImageFormData[]
}
export type DetailsFormDataType = TitleFormData
    | ParagraphFormData
    | QuouteFormData
    | ListFormData
    | ImageFormData

export type DetailsFormDataEnumType = `${DetailsFormDataEnum}`

// ERROR TYPES
export interface TitleError {
    [TitleFormDataEnum.TITLE]: FormInputError
}
export interface ParagraphError {
    [ParagraphFormDataEnum.TEXT]: FormInputError
}
export interface QuouteError {
    [QuouteFormDataEnum.TEXT]: FormInputError
    [QuouteFormDataEnum.AUTHOR]: FormInputError
}
export interface ListError {
    [ListFormDataEnum.OPTIONS]: FormInputError[]
}
export interface ImageError {
    [ImageFormDataEnum.DESCRIPTION]: FormInputError
    [ImageFormDataEnum.IMAGE]: FormInputError
}

export type DetailsFormDataErrorType = TitleError
    | ParagraphError
    | QuouteError
    | ListError
    | ImageError

// COMPONENT
interface StyledComponent {
    className?: string
}
interface HandleChangeComponent {
    index: number
    orderSliceName: DetailsOrderSliceNameType
}


export interface DetailsTitleFormComponentProps
    extends StyledComponent, HandleChangeComponent {
    componentData: TitleOrderComponent
}

export interface ParagraphFormComponentProps
    extends StyledComponent, HandleChangeComponent {
    componentData: ParagraphOrderComponent
}

export interface QuouteFormComponentProps
    extends HandleChangeComponent {
    componentData: QuouteOrderComponent
    className?: {
        container?: string
        quoute?: string
        author?: string
    }
}

export interface ListFormComponentProps
    extends HandleChangeComponent {
    componentData: ListOrderComponent
    className?: {
        container?: string
        option?: string
    }
}

export interface ImageFormComponentProps
    extends HandleChangeComponent {
    indexedDBStoreName: DetailsOrderIndexedDBStoreNameType
    componentData: ImageOrderComponent
    className?: {
        container?: string
        image?: string
        description?: string
    }
}

export interface DetailsFromProps {
    titles?: boolean
    paragraphs?: boolean
    quoutes?: boolean
    lists?: boolean
    images?: boolean
    orderSliceName?: DetailsOrderSliceNameType
}

// REDUX ORDER SLICE
export interface TitleOrderComponent {
    type: 'titles'
    data: TitleFormData
    error: TitleError
}
export interface ParagraphOrderComponent {
    type: 'paragraphs'
    data: ParagraphFormData
    error: ParagraphError
}
export interface QuouteOrderComponent {
    type: 'quoutes'
    data: QuouteFormData
    error: QuouteError
}
export interface ListOrderComponent {
    type: 'lists'
    data: ListFormData
    error: ListError
}
export interface ImageOrderComponent {
    type: 'images'
    data: ImageFormData
    error: ImageError
}

export type OrderComponent = TitleOrderComponent
    | ParagraphOrderComponent
    | QuouteOrderComponent
    | ListOrderComponent
    | ImageOrderComponent

export interface ComponentOrderState {
    order: OrderComponent[]
}


// RESPONSE DATA
export interface DescriptionTitle extends DetailsDataRenderElementBasicType {
    [TitleFormDataEnum.TITLE]: string
}
export interface DescriptionParagraph extends DetailsDataRenderElementBasicType {
    [ParagraphFormDataEnum.TEXT]: string
}
export interface DescriptionQuoute extends DetailsDataRenderElementBasicType {
    [QuouteFormDataEnum.TEXT]: string
    [QuouteFormDataEnum.AUTHOR]: string
}
export interface DescriptionList extends DetailsDataRenderElementBasicType {
    [ListFormDataEnum.NUMERABLE]: boolean
    [ListFormDataEnum.OPTIONS]: string[]
}
export interface DescriptionImage extends DetailsDataRenderElementBasicType {
    [ImageFormDataEnum.SIZE]: DescriptionImageSize
    [ImageFormDataEnum.DESCRIPTION]: string
    [ImageFormDataEnum.IMAGE]: string
}

export type DetailsRedactorType = {
    titles: DescriptionTitle[]
    paragraphs: DescriptionParagraph[]
    quoutes: DescriptionQuoute[]
    lists: DescriptionList[]
    images: DescriptionImage[]
}