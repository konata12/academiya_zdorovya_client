import React from "react";
import styles from "./PriceFormVariantTitleDescriptionInputs.module.scss";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import { triggerPriceVariantsDescriptionCheckbox } from "@/app/utils/redux/prices/pricesFormUiSlice";
import {
	PriceSectionEnum,
	PricesFromSliceNameType,
	PriceVariantOptionsEnum,
} from "@/app/types/data/prices.type";
import { FormInputError } from "@/app/types/data/form.type";
import { usePricesFormHandleChange } from "@/app/utils/hooks/admin/pricesForm/usePricesFormHandleChange";
import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithCheckbox/InputContainerWithCheckbox";

interface propsTypes {
	isChecked: boolean;
	sliceName: PricesFromSliceNameType;
	index: number;
	titleValue: string;
	descriptionValue: string | null;
	titleError?: FormInputError;
	descriptionError?: FormInputError;
}

export default function PriceFormVariantTitleDescriptionInputs({
	isChecked,
	sliceName,
	index,
	titleValue,
	descriptionValue,
	titleError,
	descriptionError,
}: propsTypes) {
	const dispatch = useAppDispatch();
	const handleChange = usePricesFormHandleChange(sliceName);

	const handleDescriptionNearTitleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerPriceVariantsDescriptionCheckbox({ index, state }));
	};

	const titleId = `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.TITLE}_${index}`;
	const priceId = `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.TITLEDESCRIPTION}_${index}`;

	return (
		<div className={styles.inputs}>
			<InputContainer
				label="Назва опції"
				inputId={titleId}
				value={titleValue}
				error={titleError}
				className={{
					inputContainer: styles.title,
				}}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: PriceSectionEnum.PRICES,
						field: PriceVariantOptionsEnum.TITLE,
						arrIndex: index,
					})
				}
			/>

			<InputContainerWithCheckbox
				label="Опис, пишіть в дужках (опціонально*)"
				isChecked={isChecked}
				inputId={priceId}
				value={descriptionValue || ""}
				error={descriptionError}
				className={{
					inputContainer: styles.description,
					error: styles.error,
				}}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: PriceSectionEnum.PRICES,
						field: PriceVariantOptionsEnum.TITLEDESCRIPTION,
						arrIndex: index,
					})
				}
				handleCheckbox={(e) => handleDescriptionNearTitleCheckbox(e)}
			/>
		</div>
	);
}
