import { ReactHookFromComponent } from "@/app/types/ui/form_components/form_basic"
import { Path, RegisterOptions } from "react-hook-form"

// MAIN
export type OrderSliceNameType = 'newsDetailsOrderSlice'

export interface DetailsDataRenderElementBasicType {
    order: number
}

export type DescriptionImageSize = 'big' | 'small'

// RESPONSE DATA
export interface DescriptionTitle extends DetailsDataRenderElementBasicType {
    title: string
}
export interface DescriptionParagraph extends DetailsDataRenderElementBasicType {
    text: string
}
export interface DescriptionQuoute extends DetailsDataRenderElementBasicType {
    text: string
    author: string
}
export interface DescriptionList extends DetailsDataRenderElementBasicType {
    numerable: boolean
    options: string[]
}
export interface DescriptionImage extends DetailsDataRenderElementBasicType {
    description: string
    size: DescriptionImageSize
    imgUrl: string
}
export interface DescriptionFormImage extends DetailsDataRenderElementBasicType {
    description: string
    size: DescriptionImageSize
    image: string | null
}

export type DetailsRedactorType = DescriptionParagraph
    | DescriptionQuoute
    | DescriptionImage
    | DescriptionTitle
    | DescriptionList

// FORM DATA
export interface DetailsFromElementBasicType {
    orderId: string
}

export interface TitleFormData extends DetailsFromElementBasicType {
    title: string
}
export interface ParagraphFormData extends DetailsFromElementBasicType {
    text: string
}
export interface QuouteFormData extends DetailsFromElementBasicType {
    text: string
    author: string
}
export interface ListFormData extends DetailsFromElementBasicType {
    numerable: boolean
    options: string[]
}
export interface ImageFormData extends DetailsFromElementBasicType {
    description: string
    size: DescriptionImageSize
    image: string | null
}

export interface DetailsFormData {
    titles: TitleFormData[]
    paragraphs: ParagraphFormData[]
    quoutes: QuouteFormData[]
    lists: ListFormData[]
    images: ImageFormData[]
}
export type DetailsFormDataType = TitleFormData
    | ParagraphFormData
    | QuouteFormData
    | ListFormData
    | ImageFormData

export type DetailsFormDataEnumType = `${DetailsFormDataEnum}`

// COMPONENT
interface StyledComponent<T extends Record<string, any>>
    extends ReactHookFromComponent<T> {
    className?: string
}
interface HandleChangeComponent {
    index: number
    componentData: OrderComponent
    orderSliceName: OrderSliceNameType
}
export interface TitleFormComponentProps<T extends Record<string, any>>
    extends StyledComponent<T>,
    HandleChangeComponent { }
export interface ParagraphFormComponentProps<T extends Record<string, any>>
    extends StyledComponent<T>,
    HandleChangeComponent { }
export interface QuouteFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T>,
    HandleChangeComponent {
    className?: {
        container?: string
        quoute?: string
        author?: string
    }
    authorName: Path<T>
    authorRegisterOptions?: RegisterOptions<T>
}
export interface ListFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T>,
    HandleChangeComponent {
    className?: {
        container?: string
        option?: string
    }
    list: ListFormData
}
export interface ImageFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T>,
    HandleChangeComponent {
    className?: {
        container?: string
        image?: string
        description?: string
    }
    imageName: Path<T>
    imageRegisterOptions?: RegisterOptions<T>
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
}

export interface ComponentOrderState {
    order: OrderComponent[]
}

// ENUMS
export enum DetailsFormDataEnum {
    PARAGRAPHS = 'paragraphs',
    QUOUTES = 'quoutes',
    TITLES = 'titles',
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