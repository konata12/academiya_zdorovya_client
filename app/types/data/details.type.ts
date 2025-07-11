import { StoreName } from "@/app/services/details.service"
import { FormInputError } from "@/app/types/data/form.type"

// MAIN
export type OrderSliceNameType = 'newsDetailsOrder'

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
    componentData: OrderComponent
    orderSliceName: OrderSliceNameType
}


export interface DetailsTitleFormComponentProps
    extends StyledComponent, HandleChangeComponent { }

export interface ParagraphFormComponentProps
    extends StyledComponent, HandleChangeComponent { }

export interface QuouteFormComponentProps
    extends HandleChangeComponent {
    className?: {
        container?: string
        quoute?: string
        author?: string
    }
}

export interface ListFormComponentProps
    extends HandleChangeComponent {
    className?: {
        container?: string
        option?: string
    }
}

export interface ImageFormComponentProps
    extends HandleChangeComponent {
    indexedDBStoreName: StoreName
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
    orderSliceName?: OrderSliceNameType
}

// REDUX ORDER SLICE
export interface OrderComponent {
    componentType: DetailsFormDataEnumType
    componentData: DetailsFormDataType
    componentError: DetailsFormDataErrorType
}

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