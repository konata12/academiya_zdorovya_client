import React, { ChangeEvent } from "react";
import styles from "./priceFormVariant.module.scss";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import {
	deletePriceVariant,
	triggerPriceVariantsDescriptionCheckbox,
} from "@/app/utils/redux/prices/pricesFormUiSlice";
import {
	PriceFormData,
	PriceFormDataPricesErrorType,
	PriceFormUICheckboxEnum,
	PriceSectionEnum,
	PricesFromSliceNameType,
	PriceVariantOptionsEnum,
	PriceVariantOptionsEnumType,
} from "@/app/types/data/prices.type";
import PriceFormVariantTitleDescriptionInputs from "@/app/admin/(provider)/ui/Forms/pricesForms/priceVariant/PriceFormVariantTitleDescriptionInputs/PriceFormVariantTitleDescriptionInputs";
import { usePricesFormSlice } from "@/app/utils/hooks/admin/pricesForm/usePricesFormSlice";
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type";
import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";

interface PriceFormVariant {
	sliceName: PricesFromSliceNameType;
	tableConfigValues: PriceFormData;
	tableConfigCheckboxes: TableConfigCheckboxes[];
	priceVariantDescriptionIsChecked: boolean;
	priceData: PriceFormData;
	errors: PriceFormDataPricesErrorType;
	index: number;
}
interface TableConfigCheckboxes {
	label: string;
	handleCheckboxToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleChange: (e: ChangeEvent<FormElements>, index: number) => void;
	isChecked: boolean;
	checkboxId: PriceFormUICheckboxEnum;
	id: Exclude<
		PriceVariantOptionsEnumType,
		PriceVariantOptionsEnum.TITLE | PriceVariantOptionsEnum.TITLEDESCRIPTION
	>;
}

export default function PriceFormVariant({
	sliceName,
	tableConfigValues,
	tableConfigCheckboxes,
	priceVariantDescriptionIsChecked,
	priceData,
	errors,
	index,
}: PriceFormVariant) {
	const dispatch = useAppDispatch();
	const { deletePricesPriceValue } = usePricesFormSlice(sliceName);

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerPriceVariantsDescriptionCheckbox({ index, state }));
	};
	const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(deletePricesPriceValue(index));
		dispatch(deletePriceVariant(index));
	};

	return (
		<>
			<div className={`${styles.priceVariantWrap} ${index ? styles.additional : ""}`}>
				<div className={styles.additionalTitle}>
					<span className="title xs">Рядок {index + 1}</span>
					{!!index && (
						<button onClick={deleteHandler} className={`btn blue sm`}>
							Видалити
						</button>
					)}
				</div>

				<PriceFormVariantTitleDescriptionInputs
					isChecked={priceVariantDescriptionIsChecked}
					sliceName={sliceName}
					index={index}
					titleValue={priceData[PriceVariantOptionsEnum.TITLE]}
					descriptionValue={priceData[PriceVariantOptionsEnum.TITLEDESCRIPTION]}
					titleError={errors[PriceVariantOptionsEnum.TITLE]}
					descriptionError={errors[PriceVariantOptionsEnum.TITLEDESCRIPTION]}
				/>

				<div className={styles.variantOptions}>
					{tableConfigCheckboxes.map((input, i) => {
						return (
							input.isChecked && (
								<InputContainer
									key={i}
									label={input.label}
									value={tableConfigValues[input.id] || ""}
									inputId={`${PriceSectionEnum.PRICES}_${input.id}_${index}`}
									error={errors[input.id]}
									className={{
										inputContainer: styles.variant,
										input: styles.input,
									}}
									changeEvent={(e) => input.handleChange(e, index)}
								/>
							)
						);
					})}
				</div>
			</div>
		</>
	);
}
