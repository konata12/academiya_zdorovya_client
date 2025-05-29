import { ReactHookFromComponent } from "@/app/types/ui/form_components/form_basic"
import { Path, RegisterOptions } from "react-hook-form"

export interface DetailsDataRenserElementBasicType {
    order: number
}

export type descriptionImageSize = 'big' | 'small'

// RESPONSE DATA
export interface Paragraph extends DetailsDataRenserElementBasicType {
    text: string
}
export interface Quoute extends DetailsDataRenserElementBasicType {
    text: string
    author: string
}
export interface Image extends DetailsDataRenserElementBasicType {
    description: string
    size: descriptionImageSize
    imgUrl: string
}
export interface Title extends DetailsDataRenserElementBasicType {
    title: string
}
export interface List extends DetailsDataRenserElementBasicType {
    numerable: boolean
    options: string[]
}

export type DetailsRedactorType = Paragraph
    | Quoute
    | Image
    | Title
    | List

// FORM DATA
export interface DetailsFromElementBasicType {
    orderId: string
}

export interface ParagraphFormData extends DetailsFromElementBasicType {
    text: string
}
export interface QuouteFormData extends DetailsFromElementBasicType {
    text: string
    author: string
}
export interface ImageFormData extends DetailsFromElementBasicType {
    description: string
    size: descriptionImageSize
    image: FileList | null
}
export interface TitleFormData extends DetailsFromElementBasicType {
    title: string
}
export interface ListFormData extends DetailsFromElementBasicType {
    numerable: boolean
    options: string[]
}

export interface DetailsFormData {
    paragraphs: ParagraphFormData[]
    quoutes: QuouteFormData[]
    titles: TitleFormData[]
    lists: ListFormData[]
    images: ImageFormData[]
}
export type DetailsFormDataType = ParagraphFormData
    | QuouteFormData
    | ImageFormData
    | TitleFormData
    | ListFormData


export type DetailsFormDataEnumType = `${DetailsFormDataEnum}`

// COMPONENT
interface StyledComponent<T extends Record<string, any>>
    extends ReactHookFromComponent<T> {
    className?: string
}
export interface TitleFormComponentProps<T extends Record<string, any>>
    extends StyledComponent<T> {
    index: number
}

export interface ParagraphFormComponentProps<T extends Record<string, any>>
    extends StyledComponent<T> { }

export interface QuouteFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T> {
    className?: {
        container?: string
        quoute?: string
        author?: string
    }
    authorName: Path<T>
    authorRegisterOptions?: RegisterOptions<T>
}
export interface ListFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T> {
    className?: {
        container?: string
        option?: string
    }
    list: ListFormData
}

export interface ImageFormComponentProps<T extends Record<string, any>>
    extends ReactHookFromComponent<T> {
    className?: {
        container?: string
        image?: string
        description?: string
    }
    image: ImageFormData
    imageName: Path<T>
    imageRegisterOptions?: RegisterOptions<T>
}

export interface DetailsFromProps {
    titles?: boolean
    paragraphs?: boolean
    quoutes?: boolean
    lists?: boolean
    images?: boolean
}


// REDUX ORDER SLICE
export interface OrderComponent {
    componentType: DetailsFormDataEnumType
    componentData: DetailsFromElementBasicType
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