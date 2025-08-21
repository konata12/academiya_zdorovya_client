import {
	ComponentsFormDataEnumType,
	DetailsFormDataEnum,
	DetailsOrderSliceNameType,
	ImageError,
	ImageFormData,
	ImageFormDataEnum,
	ImageFormDataEnumType,
	ListError,
	ListFormData,
	ListFormDataEnum,
	ListFormDataEnumType,
	OrderComponent,
	ParagraphError,
	ParagraphFormData,
	ParagraphFormDataEnumType,
	QuoteError,
	QuoteFormData,
	QuoteFormDataEnumType,
	TitleError,
	TitleFormDataEnumType,
} from "@/app/types/data/details.type";
import { del, set } from "idb-keyval";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { useCallback } from "react";
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice";
import { useIndexedDBStoreForDetailsImages } from "@/app/utils/hooks/admin/detailsForm/useIndexedDBStoreForDetailsImages";
import { v4 as uuidv4 } from "uuid";
import { renameFile, uniqFileNameAndKeepExtension } from "@/app/services/files.service";

interface HandleChangeProps<
	T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
> {
	e: React.ChangeEvent<T>;
	componentData: OrderComponent;
	index: number;
	keyOfValueToChange: ComponentsFormDataEnumType;
	optionIndex?: number;
}

export function useOrderedFormInput(orderSliceName: DetailsOrderSliceNameType) {
	const { updateDetailsComponent } = useDetailsFormSlice(orderSliceName);

	const store = useIndexedDBStoreForDetailsImages(orderSliceName);
	const dispatch = useAppDispatch();

	const handleChange = useCallback(
		<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>({
			e,
			componentData,
			index,
			keyOfValueToChange,
			optionIndex,
		}: HandleChangeProps<T>) => {
			const newValue = e.target.value;
			const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null;
			const newComponentData = structuredClone(componentData);

			switch (newComponentData.type) {
				case DetailsFormDataEnum.TITLES:
					keyOfValueToChange = keyOfValueToChange as TitleFormDataEnumType;
					newComponentData.data[keyOfValueToChange] = newValue;

					// HANDLE ERROR
					if (newValue.length) {
						(newComponentData.error as TitleError)[keyOfValueToChange].message =
							"";
					}
					break;
				case DetailsFormDataEnum.PARAGRAPHS:
					keyOfValueToChange = keyOfValueToChange as ParagraphFormDataEnumType;
					(newComponentData.data as ParagraphFormData)[keyOfValueToChange] =
						newValue;

					// HANDLE ERROR
					if (newValue.length) {
						(newComponentData.error as ParagraphError)[
							keyOfValueToChange
						].message = "";
					}
					break;
				case DetailsFormDataEnum.QUOTES:
					keyOfValueToChange = keyOfValueToChange as QuoteFormDataEnumType;
					(newComponentData.data as QuoteFormData)[keyOfValueToChange] = newValue;

					// HANDLE ERROR
					if (newValue.length) {
						(newComponentData.error as QuoteError)[keyOfValueToChange].message =
							"";
					}
					break;
				case DetailsFormDataEnum.LISTS:
					keyOfValueToChange = keyOfValueToChange as ListFormDataEnumType;
					if (
						optionIndex !== undefined &&
						keyOfValueToChange === ListFormDataEnum.OPTIONS
					) {
						(newComponentData.data as ListFormData)[keyOfValueToChange][
							optionIndex
						] = newValue;

						// HANDLE ERROR
						if (newValue.length) {
							(newComponentData.error as ListError)[keyOfValueToChange][
								optionIndex
							].message = "";
						}
					}
					break;
				case DetailsFormDataEnum.IMAGES:
					keyOfValueToChange = keyOfValueToChange as ImageFormDataEnumType;
					if (keyOfValueToChange === ImageFormDataEnum.IMAGE) {
						// save image name to redux
						const uniqName = uuidv4();

						// delete old image from indexedDB
						const oldImageName = (componentData.data as ImageFormData)[
							keyOfValueToChange
						];
						if (oldImageName) {
							del(oldImageName, store);
						}

						if (newFile && newFile[0]) {
							const imageName = uniqFileNameAndKeepExtension(
								uniqName,
								newFile[0],
							);
							const image = renameFile(newFile[0], imageName);

							// save image name to redux
							(newComponentData.data as ImageFormData)[keyOfValueToChange] =
								imageName;

							// save image to indexedDB using name as key
							set(imageName, image, store);
						}
					} else if (keyOfValueToChange !== ImageFormDataEnum.SIZE) {
						(newComponentData.data as ImageFormData)[keyOfValueToChange] =
							newValue;
					}

					// HANDLE ERROR
					if (newValue.length && keyOfValueToChange !== ImageFormDataEnum.SIZE) {
						(newComponentData.error as ImageError)[keyOfValueToChange].message =
							"";
					}
					break;
			}

			dispatch(
				updateDetailsComponent({
					index,
					detailsComponent: newComponentData,
				}),
			);
		},
		[],
	);

	return {
		handleChange,
	};
}
