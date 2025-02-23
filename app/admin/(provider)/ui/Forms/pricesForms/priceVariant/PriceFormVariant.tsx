import React from 'react'
import styles from './priceFormVariant.module.scss'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { deletePriceVariant as deletePriceVariantAction, triggerPriceVariantsDescriptionCheckbox } from '@/app/utils/redux/prices/pricesCreateFormUiSlice'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import { PriceSectionFormData, PriceVariantOptionsEnum } from '@/app/types/prices'
import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'

export default function PriceFormVariant({
    showOptions,
    includePriceVariants,
    priceVariantDescription,
    index,
    register,
    errors,
    removePriceVariantFromForm
}: {
    showOptions: boolean[]
    includePriceVariants: boolean
    priceVariantDescription: boolean
    index: number
    register: UseFormRegister<PriceSectionFormData>
    errors: FieldErrors<PriceSectionFormData>
    removePriceVariantFromForm: UseFieldArrayRemove
}) {
    const dispatch = useAppDispatch()

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerPriceVariantsDescriptionCheckbox({ index, state }))
    }
    const deletePriceVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removePriceVariantFromForm(index)
        dispatch(deletePriceVariantAction(index))
    }

    return (
        <div className={`${styles.priceVariantWrap} ${index ? styles.additional : ''}`}>
            <div className={styles.additionalTitle}>
                <span className='title xs'>
                    Рядок {index + 1}
                </span>
                {!!index && <button
                    onClick={deletePriceVariant}
                    className={`btn blue sm`}
                >
                    Видалити
                </button>}
            </div>

            <div className={styles.titleWrap}>
                <div className={styles.title}>
                    <label
                        className={`inputLabel`}
                        htmlFor={`optionName${index}`}
                    >
                        Назва опції
                    </label>
                    <input
                        className={`input`}
                        type="text"
                        id={`optionName_${index}`}
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.TITLE}`, {
                            required: "Якщо вибрали рядок ціни, то введіть назву",
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.TITLE]
                        && includePriceVariants
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TITLE]?.message}</p>
                        )}
                </div>

                <div className={styles.descriptionNearTitle}>
                    <div className={styles.top}>
                        <label
                            className={`inputLabel`}
                            htmlFor={`price${index}`}
                        >
                            {`Опис, пишіть в душках (опціонально*)`}
                        </label>
                        <Checkbox
                            handleFunction={handleCheckbox}
                            isChecked={priceVariantDescription}
                            elemId={`price${index}`}
                        />
                    </div>
                    <input
                        className={`input ${styles.input} ${priceVariantDescription ? styles.active : ''}`}
                        type="text"
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.TITLEDESCRIPTION}`, {
                            required: priceVariantDescription ? "Якщо добавили опис, то введіть його" : false,
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.TITLEDESCRIPTION]
                        && includePriceVariants
                        && priceVariantDescription
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TITLEDESCRIPTION]?.message}</p>
                        )}
                </div>
            </div>

            <div className={styles.variantOptions}>
                {showOptions[0] && <div className={styles.variant}>
                    <label
                        className={`inputLabel`}
                        htmlFor={PriceVariantOptionsEnum.COUNT}
                    >
                        Кількість занять
                    </label>
                    <input
                        className={`input ${styles.input}`}
                        type="text"
                        id={PriceVariantOptionsEnum.COUNT}
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.COUNT}`, {
                            required: "Введіть кількість занять",
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.COUNT]
                        && includePriceVariants
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.COUNT]?.message}</p>
                        )}
                </div>}
                {showOptions[1] && <div className={styles.variant}>
                    <label
                        className={`inputLabel`}
                        htmlFor={PriceVariantOptionsEnum.DURATION}
                    >
                        Тривалість заняття
                    </label>
                    <input
                        className={`input ${styles.input}`}
                        type="text"
                        id={PriceVariantOptionsEnum.DURATION}
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.DURATION}`, {
                            required: "Введіть тривалість заняття",
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.DURATION]
                        && includePriceVariants
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.DURATION]?.message}</p>
                        )}
                </div>}
                {showOptions[2] && <div className={styles.variant}>
                    <label
                        className={`inputLabel`}
                        htmlFor={PriceVariantOptionsEnum.PRICE}
                    >
                        Ціна за 1 заняття
                    </label>
                    <input
                        className={`input ${styles.input}`}
                        type="text"
                        id={PriceVariantOptionsEnum.PRICE}
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.PRICE}`, {
                            required: "Введіть ціну за заняття",
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.PRICE]
                        && includePriceVariants
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.PRICE]?.message}</p>
                        )}
                </div>}
                {showOptions[3] && <div className={styles.variant}>
                    <label
                        className={`inputLabel`}
                        htmlFor={PriceVariantOptionsEnum.TOTALPRICE}
                    >
                        Кількість занять
                    </label>
                    <input
                        className={`input ${styles.input}`}
                        type="text"
                        id={PriceVariantOptionsEnum.TOTALPRICE}
                        {...register(`prices.${index}.${PriceVariantOptionsEnum.TOTALPRICE}`, {
                            required: "Введіть ціну за за весь курс",
                        })}
                    />
                    {errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]
                        && includePriceVariants
                        && (
                            <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]?.message}</p>
                        )}
                </div>}
            </div>
        </div>
    )
}
