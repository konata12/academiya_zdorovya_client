"use client";

import React, { ChangeEvent, useEffect } from "react";
import styles from "./UpdatePriceForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import PriceFormTitleInput from "@/app/admin/(provider)/ui/Forms/pricesForms/title/PriceFormTitleInput";
import {
	createPriceSectionTitle,
	createPriceVariant,
	setPricesUIFromData,
	triggerMeetingDurationCheckbox,
	triggerMeetingPriceCheckbox,
	triggerMeetingsCountCheckbox,
	triggerMeetingsTotalPriceCheckbox,
	triggerOptionalServiceCheckbox,
	triggerPriceVariantsCheckbox,
} from "@/app/utils/redux/prices/pricesFormUiSlice";
import {
	PriceFormData,
	PriceFormUICheckboxEnum,
	PriceHandleSubmitErrorIdType,
	PriceSectionEnum,
	PriceTitleEnum,
	PriceVariantOptionsEnum,
	TitlesFormData,
} from "@/app/types/data/prices.type";
import { useParams, usePathname, useRouter } from "next/navigation";
import AnimatePresenceWithDynamicHeight from "@/app/common_ui/animated_components/AnimatePresenseWrapper/AnimatePresenseWithDynamicHeight/AnimatePresenseWithDynamicHeight";
import { usePricesFormHandleChange } from "@/app/utils/hooks/admin/pricesForm/usePricesFormHandleChange";
import { usePricesFormSlice } from "@/app/utils/hooks/admin/pricesForm/usePricesFormSlice";
import InputContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/BasicInputContainer/children/InputContainerWithCheckbox/InputContainerWithCheckbox";
import Checkbox from "@/app/admin/(provider)/ui/Checkbox/Checkbox";
import FormElementContainerWithCheckbox from "@/app/common_ui/form_components/InputContainers/HookForm/children/FormElementContainerWithCheckbox/FormElementContainerWithCheckbox";
import PriceFormVariant from "@/app/admin/(provider)/ui/Forms/pricesForms/priceVariant/PriceFormVariant";
import { FormElements } from "@/app/types/ui/form_components/inputContainers.type";
import PricesTable from "@/app/admin/(provider)/ui/Tables/PricesTable/PricesTable";
import { FormInputError } from "@/app/types/data/form.type";
import { parsePriceSectionFormDataToPriceSectionCreateFormData } from "@/app/services/prices.service";
import { setPricesUpdateFromInitData } from "@/app/utils/redux/prices/pricesUpdateFormSlice";
import { usePriceFormChangeCheck } from "@/app/utils/hooks/admin/pricesForm/usePriceFormChangeCheck";
import { fulfilled } from "@/app/services/response.service";
import { updatePriceSection } from "@/app/utils/redux/prices/pricesSlice";

const sliceName = "pricesUpdateForm";

export default function UpdatePriceForm() {
	const { errors, ...data } = useAppSelector((state: RootState) => state[sliceName]);
	const uiData = useAppSelector((state: RootState) => state.pricesFormUI);
	const { priceSections, error } = useAppSelector((state: RootState) => state.prices);
	console.log("data:", data);

	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const router = useRouter();
	const handleChange = usePricesFormHandleChange(sliceName);
	const {
		addPricesTitleValue,
		addPricesPriceValue,
		setPricesBasicValueError,
		setPricesTitleFieldValueError,
		setPricesPricesFieldValueError,
		resetPricesFromData,
	} = usePricesFormSlice(sliceName);

	const { departmentId, id } = useParams<{ departmentId: string; id: string }>();
	const oldPriceSection = priceSections.find((priceSection) => `${priceSection.id}` === id);

	const { titles, optionalService, prices } = data;
	const {
		// TITLES
		addTitlePriceCheckbox,

		// OPTIONAL SERVICE
		optionalServiceCheckbox,

		// PRICE VARIANTS
		addPriceVariantDescriptionCheckbox,
		priceVariantsCheckbox,
		meetingCountCheckbox,
		meetingDurationCheckbox,
		meetingPriceCheckbox,
		meetingTotalPriceCheckbox,
	} = uiData;
	const priceVariantOptions = [
		meetingCountCheckbox,
		meetingDurationCheckbox,
		meetingPriceCheckbox,
		meetingTotalPriceCheckbox,
	];

	useEffect(() => {
		if (oldPriceSection) {
			const { id, ...oldData } = oldPriceSection;
			dispatch(setPricesUpdateFromInitData(oldData));
			dispatch(setPricesUIFromData(oldData));
		}
	}, [priceSections]);
	usePriceFormChangeCheck(oldPriceSection, data);

	// FORM SUBMIT
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// SET ERROR ARRAY
		const errorsData: {
			error: FormInputError;
			id: PriceHandleSubmitErrorIdType;
		}[] = [];
		// GET ARRAY OF DATA ENTRIES
		const entries = Object.entries(data);

		// FORM VALIDATION
		entries.forEach((entry) => {
			const entryKey = entry[0];

			// VALIDATION FOR TITLES
			if (entryKey === PriceSectionEnum.TITLES) {
				const values = entry[1] as TitlesFormData[];

				values.forEach((value, index) => {
					if (!value.text) {
						const message = "Введіть назву послуги";
						dispatch(
							setPricesTitleFieldValueError({
								index,
								field: PriceTitleEnum.TEXT,
								message,
							}),
						);
						errorsData.push({
							id: `${PriceSectionEnum.TITLES}_${PriceTitleEnum.TEXT}_${index}`,
							error: { message },
						});
					}
					if (addTitlePriceCheckbox[index] && !value.priceNearTitle) {
						const message = "Введіть ціну послуги";
						dispatch(
							setPricesTitleFieldValueError({
								index,
								field: PriceTitleEnum.PRICENEARTITLE,
								message,
							}),
						);
						errorsData.push({
							id: `${PriceSectionEnum.TITLES}_${PriceTitleEnum.PRICENEARTITLE}_${index}`,
							error: { message },
						});
					}
				});
			}
			// VALIDATION FOR OPTIONAL SERVICE VALUE
			if (entryKey === PriceSectionEnum.OPTIONALSERVICE && optionalServiceCheckbox) {
				const value = entry[1] as string;

				if (!value) {
					const message = "Введіть опціональний вміст послуги";
					dispatch(
						setPricesBasicValueError({
							field: PriceSectionEnum.OPTIONALSERVICE,
							message,
						}),
					);

					errorsData.push({
						id: entryKey,
						error: { message },
					});
				}
			}
			// VALIDATION FOR TITLES
			if (entryKey === PriceSectionEnum.PRICES) {
				const values = entry[1] as PriceFormData[] | null;

				if (!values && priceVariantsCheckbox) {
					const message = "Введіть опціональний вміст послуги";
					dispatch(
						setPricesBasicValueError({
							field: "pricesEmpty",
							message,
						}),
					);

					errorsData.push({
						id: PriceSectionEnum.PRICES,
						error: { message },
					});
				} else {
					if (!values) return;
					values.forEach((value, index) => {
						if (!value.title) {
							const message = "Введіть назву опції";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.TITLE,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.TITLE}_${index}`,
								error: { message },
							});
						}
						if (
							!value.titleDescription &&
							addPriceVariantDescriptionCheckbox[index]
						) {
							const message = "Введіть опис опції";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.TITLEDESCRIPTION,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.TITLEDESCRIPTION}_${index}`,
								error: { message },
							});
						}
						if (!value.meetingCount && meetingCountCheckbox) {
							const message = "Введіть кількість занять";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.COUNT,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.COUNT}_${index}`,
								error: { message },
							});
						}
						if (!value.meetingDuration && meetingDurationCheckbox) {
							const message = "Введіть тривалість";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.DURATION,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.DURATION}_${index}`,
								error: { message },
							});
						}
						if (!value.meetingPrice && meetingPriceCheckbox) {
							const message = "Введіть ціну заняття";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.PRICE,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.PRICE}_${index}`,
								error: { message },
							});
						}
						if (!value.coursePrice && meetingTotalPriceCheckbox) {
							const message = "Введіть загальну ціну";
							dispatch(
								setPricesPricesFieldValueError({
									index,
									field: PriceVariantOptionsEnum.TOTALPRICE,
									message,
								}),
							);
							errorsData.push({
								id: `${PriceSectionEnum.PRICES}_${PriceVariantOptionsEnum.TOTALPRICE}_${index}`,
								error: { message },
							});
						}
					});
				}
			}
		});

		// SCROLL TO ERROR INPUT
		console.log("errorsData", errorsData);
		if (errorsData.length) {
			// SCROLL TO INPUT
			(
				document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement
			).scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
			return;
		}

		const requestData = parsePriceSectionFormDataToPriceSectionCreateFormData(
			data,
			uiData,
		);
		console.log("submit data:", requestData);

		const response = await dispatch(updatePriceSection({ data: requestData, id }));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) {
			dispatch(resetPricesFromData());
			router.push("../");
		}
	};

	// WORK WITH TITLES FORM UI
	const addTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(createPriceSectionTitle());
		dispatch(addPricesTitleValue());
	};
	const addPriceVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(createPriceVariant());
		dispatch(addPricesPriceValue());
	};
	// WORK WITH OPTIONAL SERVICES UI
	const handleOptionalServiceCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerOptionalServiceCheckbox(state));
	};
	// WORK WITH PRICE VARIANTS FORM UI
	const handlePriceVariantsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		// IF PRICE VARIANTS IS TURNS ON AND THERE ARE NO PRICE VARIANTS THEN CREATE ONE
		// ELSE THERE IS ONLY 1 PRICE VARIANT THEN ON TURNING OFF DELETE IT
		if (!priceVariantsCheckbox && !prices) {
			dispatch(addPricesPriceValue());
			dispatch(createPriceVariant());
		}
		dispatch(triggerPriceVariantsCheckbox(state));
	};
	const handlePriceMeetingsCountOptionCheckbox = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const state = e.target.checked;
		dispatch(triggerMeetingsCountCheckbox(state));
	};
	const handlePriceDurationOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerMeetingDurationCheckbox(state));
	};
	const handlePriceMeetingPriceOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerMeetingPriceCheckbox(state));
	};
	const handlePriceTotalPriceOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const state = e.target.checked;
		dispatch(triggerMeetingsTotalPriceCheckbox(state));
	};

	const tableConfigCheckboxes = [
		{
			label: "Кількість занять",
			isChecked: meetingCountCheckbox,
			id: PriceVariantOptionsEnum.COUNT,
			checkboxId: PriceFormUICheckboxEnum.MEETINGCOUNTCHECKBOX,
			handleCheckboxToggle: handlePriceMeetingsCountOptionCheckbox,
			handleChange: (e: ChangeEvent<FormElements>, index: number) =>
				handleChange({
					e,
					elementType: PriceSectionEnum.PRICES,
					field: PriceVariantOptionsEnum.COUNT,
					arrIndex: index,
				}),
		},
		{
			label: "Тривалість заняття",
			isChecked: meetingDurationCheckbox,
			id: PriceVariantOptionsEnum.DURATION,
			checkboxId: PriceFormUICheckboxEnum.MEETINGDURATIONCHECKBOX,
			handleCheckboxToggle: handlePriceDurationOptionCheckbox,
			handleChange: (e: ChangeEvent<FormElements>, index: number) =>
				handleChange({
					e,
					elementType: PriceSectionEnum.PRICES,
					field: PriceVariantOptionsEnum.DURATION,
					arrIndex: index,
				}),
		},
		{
			label: "Ціна за 1 заняття",
			isChecked: meetingPriceCheckbox,
			id: PriceVariantOptionsEnum.PRICE,
			checkboxId: PriceFormUICheckboxEnum.MEETINGPRICECHECKBOX,
			handleCheckboxToggle: handlePriceMeetingPriceOptionCheckbox,
			handleChange: (e: ChangeEvent<FormElements>, index: number) =>
				handleChange({
					e,
					elementType: PriceSectionEnum.PRICES,
					field: PriceVariantOptionsEnum.PRICE,
					arrIndex: index,
				}),
		},
		{
			label: "Ціна за весь курс",
			isChecked: meetingTotalPriceCheckbox,
			id: PriceVariantOptionsEnum.TOTALPRICE,
			checkboxId: PriceFormUICheckboxEnum.MEETINGTOTALPRICECHECKBOX,
			handleCheckboxToggle: handlePriceTotalPriceOptionCheckbox,
			handleChange: (e: ChangeEvent<FormElements>, index: number) =>
				handleChange({
					e,
					elementType: PriceSectionEnum.PRICES,
					field: PriceVariantOptionsEnum.TOTALPRICE,
					arrIndex: index,
				}),
		},
	];

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.titles}>
				<AnimatePresenceWithDynamicHeight childrenIsrendered={true}>
					{titles.map((title, i) => {
						return (
							<PriceFormTitleInput
								key={i}
								isChecked={addTitlePriceCheckbox[i]}
								sliceName={sliceName}
								index={i}
								titleValue={title[PriceTitleEnum.TEXT]}
								priceValue={title[PriceTitleEnum.PRICENEARTITLE]}
								titleError={errors.titles[i][PriceTitleEnum.TEXT]}
								priceError={errors.titles[i][PriceTitleEnum.PRICENEARTITLE]}
							/>
						);
					})}
				</AnimatePresenceWithDynamicHeight>
				<button
					onClick={addTitle}
					className={`btn blue xl ${styles.addTitleBtn}`}
					type="button"
				>
					{`Додати назву (для консультацій)`}
				</button>
			</div>

			<InputContainerWithCheckbox
				label="Що може включати послуга (опціонально*)"
				inputId={PriceSectionEnum.OPTIONALSERVICE}
				value={optionalService || undefined}
				isChecked={optionalServiceCheckbox}
				className={{
					inputContainer: styles.optionalService,
				}}
				error={errors[PriceSectionEnum.OPTIONALSERVICE]}
				changeEvent={(e) =>
					handleChange({
						e,
						elementType: PriceSectionEnum.OPTIONALSERVICE,
					})
				}
				handleCheckbox={(e) => handleOptionalServiceCheckbox(e)}
			/>

			<div
				className={`${styles.tableConfig} ${optionalServiceCheckbox ? styles.move : ""}`}
			>
				<p className="title sm">Варіанти стовпців для опцій ціни послуги</p>
				<div className={styles.checkboxes}>
					{tableConfigCheckboxes.map((checkbox, i) => {
						return (
							<div className={styles.checkbox} key={i}>
								<label className={`inputLabel`} htmlFor={checkbox.checkboxId}>
									{checkbox.label}
								</label>
								<Checkbox
									handleFunction={checkbox.handleCheckboxToggle}
									isChecked={checkbox.isChecked}
									elemId={checkbox.checkboxId}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.priceVariantsWrap}>
				<FormElementContainerWithCheckbox
					label="Варіації послуги"
					checkboxId={PriceFormUICheckboxEnum.PRICEVARIANTSCHECKBOX}
					isChecked={priceVariantsCheckbox}
					handleFunction={(e) => handlePriceVariantsCheckbox(e)}
					className={{
						inputLabel: `title sm left ${styles.label}`,
					}}
				>
					{prices &&
						prices.map((price, i) => {
							return (
								<PriceFormVariant
									key={i}
									sliceName={sliceName}
									tableConfigValues={price}
									tableConfigCheckboxes={tableConfigCheckboxes}
									priceVariantDescriptionIsChecked={
										addPriceVariantDescriptionCheckbox[i]
									}
									priceData={price}
									errors={errors[PriceSectionEnum.PRICES][i]}
									index={i}
								/>
							);
						})}
					<button
						onClick={addPriceVariant}
						className={`btn blue xl ${styles.addPriceVariantBtn}`}
						type="button"
					>
						Додати рядок
					</button>
				</FormElementContainerWithCheckbox>
			</div>

			<div className={styles.resultLayout}>
				<p className={`title md left`}>Попередній перегляд</p>
				<PricesTable
					data={data}
					includeOptionalService={optionalServiceCheckbox}
					includePrices={priceVariantsCheckbox}
					includesPricesDescription={addPriceVariantDescriptionCheckbox}
					priceVariantOptions={priceVariantOptions}
					className={styles.priceTable}
				/>
			</div>

			<div className={styles.formErrorWrap}>
				{error.update && (
					<p className={`error ${styles.formError}`}>{error.update.message}</p>
				)}
				<button className={`btn blue xl ${styles.submit}`} type="submit">
					Підтвердити зміни
				</button>
			</div>
		</form>
	);
}
