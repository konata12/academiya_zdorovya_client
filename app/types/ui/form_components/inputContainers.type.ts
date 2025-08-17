import { CheckboxProps } from "@/app/types/ui/form_components/form_basic";
import {
	FieldErrors,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";
import { FormInputError } from "@/app/types/data/form.type";
import { InputHTMLAttributes } from "react";

export type FormElements =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement;
export type ChangeEvent<T extends FormElements> = (e: React.ChangeEvent<T>) => void;

// CONTAINER PROPS
export interface HookFormInputContainerBasicProps<T extends Record<string, any>> {
	children?: React.ReactNode;
	className?: Styles;
	label: string;
	name: Path<T>; // This ensures the name is a key of T
	errors: FieldErrors<T>;
}

export interface FromElementContainerWithCheckboxProps extends CheckboxProps {
	children: React.ReactNode;
	className?: FormElementWithCheckboxStyles;
	dependency?: any[];
	label: string;
	checkboxId: string;
}

// HOOK FORM CHILDREN
export interface HookFormInputContainerProps<T extends Record<string, any>>
	extends HookFormInputContainerBasicProps<T> {
	register: UseFormRegister<T>;
	registerOptions?: RegisterOptions<T>;

	className?: InputContainerStyles;
	type?: React.HTMLInputTypeAttribute;
}
export interface HookFormTextareaContainerProps<T extends Record<string, any>>
	extends HookFormInputContainerBasicProps<T> {
	register: UseFormRegister<T>;
	registerOptions?: RegisterOptions<T>;

	className?: TextareaContainerStyles;
	minRows?: number;
	maxRows?: number;
}
export interface HookFormInputContainerWithCheckboxProps<
	T extends Record<string, any>,
> extends HookFormInputContainerProps<T>,
		CheckboxProps {
	className?: FormElementWithCheckboxStyles;
}
export interface HookFormInputContainerWithDeleteBtnProps<
	T extends Record<string, any>,
> extends HookFormInputContainerProps<T> {
	fieldKey?: string;
	index?: number;
	handleFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: InputContainerWithDeleteBtnStyles;
}

// DEFAULT
export interface InputContainerWithChangeEventProps<T extends FormElements> {
	changeEvent?: ChangeEvent<T>;
}

export interface InputContainerBasicProps {
	label?: string;
	inputId: string;
	error?: FormInputError;
	children?: React.ReactNode;
	className?: Styles;
}
export interface InputContainer
	extends InputContainerBasicProps,
		InputContainerWithChangeEventProps<HTMLInputElement> {
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	type?: React.HTMLInputTypeAttribute;
	className?: InputContainerStyles;
}
export interface TextareaContainer<T extends FormElements>
	extends InputContainerBasicProps,
		InputContainerWithChangeEventProps<T> {
	value: string;
	minRows?: number;
	maxRows?: number;
	className?: TextareaContainerStyles;
}
export interface InputContainerWithCheckboxProps
	extends InputContainerBasicProps,
		InputContainerWithChangeEventProps<HTMLInputElement> {
	handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	type?: React.HTMLInputTypeAttribute;
	isChecked: boolean;
	className?: FormElementWithCheckboxStyles;
}
export interface TextareaContainerWithCheckboxProps
	extends Omit<InputContainerWithCheckboxProps, "changeEvent" | "value">,
		InputContainerWithChangeEventProps<HTMLTextAreaElement> {
	value: string | undefined | null;
	minRows?: number;
	maxRows?: number;
}
export interface InputContainerWithDeleteBtnProps
	extends InputContainerBasicProps,
		InputContainerWithChangeEventProps<HTMLInputElement> {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	value: InputHTMLAttributes<HTMLInputElement>["value"];
	index?: number;
	type?: React.HTMLInputTypeAttribute;
	className?: InputContainerWithDeleteBtnStyles;
}
export interface InputContainerWithTwoInputsWithDeleteBtnProps {
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
	labelOne: string;
	labelTwo: string;
	inputIdOne: string;
	inputIdTwo: string;
	valueOne: InputHTMLAttributes<HTMLInputElement>["value"];
	valueTwo: InputHTMLAttributes<HTMLInputElement>["value"];
	errorOne?: FormInputError;
	errorTwo?: FormInputError;
	index?: number;
	typeOne?: React.HTMLInputTypeAttribute;
	typeTwo?: React.HTMLInputTypeAttribute;
	className?: InputContainerWithTwoInputsWithDeleteBtnStyles;

	changeEventOne?: ChangeEvent<HTMLInputElement>;
	changeEventTwo?: ChangeEvent<HTMLInputElement>;
}

// DEFAULT IMAGE
export interface ImageInputContainer
	extends InputContainerWithChangeEventProps<HTMLInputElement> {
	label?: string;
	inputId: string;
	children: React.ReactNode;
	className?: ImageInputContainerStyles;
}
export interface ImageInputPreviewFromIndexedDBProps {
	imageName: string | null;
	indexedDBStoreName: string;
	error?: FormInputError;
	className?: ImageInputPreviewFromIndexedDBStyles;
}

// STYLES
export interface Styles {
	inputContainer?: string;
	inputLabel?: string;
	error?: string;
}

// STYLES CHILDREN
interface InputContainerStyles extends Styles {
	input?: string;
}
interface TextareaContainerStyles extends Styles {
	textarea?: string;
}
interface FormElementWithCheckboxStyles extends InputContainerStyles {
	checkboxContainer?: string;
}
interface InputContainerWithDeleteBtnStyles extends InputContainerStyles {
	buttonContainer?: string;
}
interface InputContainerWithTwoInputsWithDeleteBtnStyles {
	buttonContainer?: string;
	firstInput?: InputContainerStyles;
	secondInput?: InputContainerStyles;
}

// STYLES OF DEFAULT INPUT IMAGE CONTAINERS
interface ImageInputContainerStyles {
	input?: string;
	label?: string;
}

interface ImageInputPreviewFromIndexedDBStyles {
	imagePreview?: string;
	image?: string;
	imageContainer?: string;
	actuallyImage?: string;
	errorMessage?: string;
	caption?: string;
}
