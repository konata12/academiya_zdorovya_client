import React from "react";
import styles from "./PriceFormTitle.module.scss";
import { useAppDispatch } from "@/app/utils/redux/hooks";
import {
	deletePriceSectionTitle,
	triggerTitleCheckbox,
} from "@/app/utils/redux/prices/pricesFormUiSlice";
import {
	PriceSectionEnum,
	PricesFromSliceNameType,
	PriceTitleEnum,
} from "@/app/types/data/prices.type";
import { FormInputError } from "@/app/types/data/form.type";
import { usePricesFormHandleChange } from "@/app/utils/hooks/admin/pricesForm/usePricesFormHandleChange";
import InputContainer from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainer/InputContainer";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithCheckbox/InputContainerWithCheckbox";
import { usePricesFormSlice } from "@/app/utils/hooks/admin/pricesForm/usePricesFormSlice";

interface propsTypes {
	isChecked: boolean;
	sliceName: PricesFromSliceNameType;
	index: number;
	titleValue: string;
	priceValue: string | null;
	titleError?: FormInputError;
	priceError?: FormInputError;
}

export default function PriceFormTitleInput({
	isChecked,
	sliceName,
	index,
	titleValue,
	priceValue,
	titleError,
	priceError,
}: propsTypes) {
	const dispatch = useAppDispatch();
	const handleChange = usePricesFormHandleChange(sliceName);
	const { deletePricesTitleValue } = usePricesFormSlice(sliceName);

	const handlePriceNearTitleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerTitleCheckbox({ index, state }));
	};
	const deleteTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(deletePricesTitleValue(index));
		dispatch(deletePriceSectionTitle(index));
	};

	const titleId = `${PriceSectionEnum.TITLES}_${PriceTitleEnum.TEXT}_${index}`;
	const priceId = `${PriceSectionEnum.TITLES}_${PriceTitleEnum.PRICENEARTITLE}_${index}`;

	return (
		<div>
			{index ? (
				<div className={styles.additionalTitle}>
					<span className="title xs">Додаткова назва послуги {index}</span>
					<button onClick={deleteTitle} className={`btn blue sm`}>
						Видалити
					</button>
				</div>
			) : null}

			<div className={styles.inputs}>
				<InputContainer
					label={index ? "Назва послуги" : "Повна назва послуги"}
					inputId={titleId}
					value={titleValue}
					error={titleError}
					className={{
						inputContainer: styles.title,
					}}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: PriceSectionEnum.TITLES,
							field: PriceTitleEnum.TEXT,
							arrIndex: index,
						})
					}
				/>

				<InputContainerWithCheckbox
					label="Ціна біля назви (опціонально*)"
					isChecked={isChecked}
					inputId={priceId}
					value={priceValue || ""}
					error={priceError}
					className={{
						inputContainer: styles.price,
						error: styles.error,
					}}
					changeEvent={(e) =>
						handleChange({
							e,
							elementType: PriceSectionEnum.TITLES,
							field: PriceTitleEnum.PRICENEARTITLE,
							arrIndex: index,
						})
					}
					handleCheckbox={(e) => handlePriceNearTitleCheckbox(e)}
				/>
			</div>
		</div>
	);
}
