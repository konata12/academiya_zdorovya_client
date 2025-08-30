import { renameFile, uniqFileNameAndKeepExtension } from "@/app/services/admin/files.service";
import { ServiceTypeDetailsOrderSliceNameType } from "@/app/types/data/details.type";
import { ServiceTypesEnum, ServiceTypesEnumType } from "@/app/types/data/services.type";
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type";
import { useDetailsFormSlice } from "@/app/utils/hooks/admin/detailsForm/useDetailsFormSlice";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { del, set } from "idb-keyval";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface ChangeEventProps<T extends FormElements> {
	e: React.ChangeEvent<T>;
	elementType: ServiceTypesEnumType;
	oldValue?: string | null;
}

export function useServiceTypeFormHandleChange(
	indexedDBStoreName: string,
	detailsOrderSliceName: ServiceTypeDetailsOrderSliceNameType,
) {
	const dispatch = useAppDispatch();
	const store = getIndexedDBStoreForImages(indexedDBStoreName);
	const { setFormError, setTitle, setDescription, setBackgroundImage } =
		useDetailsFormSlice(detailsOrderSliceName);

	const handleChange = useCallback(
		<T extends FormElements>({ e, elementType, oldValue = null }: ChangeEventProps<T>) => {
			const newValue = e.target.value;
			const newFile = (e as React.ChangeEvent<HTMLInputElement>).target.files || null;

			switch (elementType) {
				case ServiceTypesEnum.TITLE:
					// REQUIRED ERROR HANDLING
					if (newValue.length > 0)
						dispatch(
							setFormError({
								field: ServiceTypesEnum.TITLE,
								message: "",
							}),
						);

					dispatch(setTitle(newValue));
					break;

				case ServiceTypesEnum.DESCRIPTION:
					// REQUIRED ERROR HANDLING
					if (newValue.length > 0)
						dispatch(
							setFormError({
								field: ServiceTypesEnum.DESCRIPTION,
								message: "",
							}),
						);

					dispatch(setDescription(newValue));
					break;

				case ServiceTypesEnum.BACKGROUNDIMG:
					const uniqName = uuidv4();
					// REQUIRED ERROR HANDLING
					if (newValue.length > 0)
						dispatch(
							setFormError({
								field: ServiceTypesEnum.BACKGROUNDIMG,
								message: "",
							}),
						);

					// Delete old image from IndexedDB if it exists
					if (oldValue) {
						del(oldValue, store);
					}

					if (newFile && newFile[0]) {
						const imageName = uniqFileNameAndKeepExtension(uniqName, newFile[0]);
						const image = renameFile(newFile[0], imageName);

						set(imageName, image, store);
						dispatch(setBackgroundImage(imageName));
					}
					break;
			}
		},
		[indexedDBStoreName, detailsOrderSliceName],
	);

	return handleChange;
}
