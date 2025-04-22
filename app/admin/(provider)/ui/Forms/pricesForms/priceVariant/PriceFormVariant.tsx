import React, { useEffect, useRef, useState } from 'react'
import styles from './priceFormVariant.module.scss'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { motion } from 'framer-motion';
import { deletePriceVariant as deletePriceVariantAction, triggerPriceVariantsDescriptionCheckbox } from '@/app/utils/redux/prices/pricesCreateFormUiSlice'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import { PriceSectionFormData, PriceVariantOptionsEnum } from '@/app/types/data/prices'
import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import { basicAnimation } from '@/app/utils/animations/variables';
import { componentVisibleAnimationVariants, priceSectionPriceVariantVariants } from '@/app/utils/animations/animations';

interface PriceFormVariant {
    showOptions: boolean[]
    includePriceVariants: boolean
    priceVariantDescription: boolean
    index: number
    register: UseFormRegister<PriceSectionFormData>
    errors: FieldErrors<PriceSectionFormData>
    removePriceVariantFromForm: UseFieldArrayRemove
}

export default function PriceFormVariant({
    showOptions,
    includePriceVariants,
    priceVariantDescription,
    index,
    register,
    errors,
    removePriceVariantFromForm
}: PriceFormVariant) {
    // const [height, setHeight] = useState(0)
    const dispatch = useAppDispatch()
    // const priceVariantRef = useRef<HTMLDivElement | null>(null)

    // useEffect(() => {
    //     setHeight(priceVariantRef.current?.scrollHeight || 0)
    // })

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerPriceVariantsDescriptionCheckbox({ index, state }))
    }
    const deletePriceVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removePriceVariantFromForm(index)
        dispatch(deletePriceVariantAction(index))
    }

    // console.log(height)

    return (
        <>
            {/* {!index ? (<div
                className={`${styles.priceVariantWrap} ${index ? styles.additional : ''}`}
            >
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
                            htmlFor={`optionName_${index}`}
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
                                htmlFor={`optional_description_${index}`}
                            >
                                {`Опис, пишіть в душках (опціонально*)`}
                            </label>
                            <Checkbox
                                handleFunction={handleCheckbox}
                                isChecked={priceVariantDescription}
                                elemId={`optional_description_${index}`}
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
                            htmlFor={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                        >
                            Кількість занять
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.COUNT}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                        >
                            Тривалість заняття
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.DURATION}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                        >
                            Ціна за 1 заняття
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.PRICE}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                        >
                            Ціна за весь курс
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.TOTALPRICE}`)}
                        />
                        {errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]
                            && includePriceVariants
                            && (
                                <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]?.message}</p>
                            )}
                    </div>}
                </div>
            </div>) : (<motion.div
                className={styles.priceVariantShape}
                variants={priceSectionPriceVariantVariants(height)}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={basicAnimation}
            >
                <motion.div
                    className={`${styles.priceVariantWrap} ${index ? styles.additional : ''}`}
                    ref={priceVariantRef}
                    variants={componentVisibleAnimationVariants}
                    initial="hidden"
                    animate="visible"
                    exit='exit'
                    transition={basicAnimation}
                >
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
                                htmlFor={`optionName_${index}`}
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
                                    htmlFor={`optional_description_${index}`}
                                >
                                    {`Опис, пишіть в душках (опціонально*)`}
                                </label>
                                <Checkbox
                                    handleFunction={handleCheckbox}
                                    isChecked={priceVariantDescription}
                                    elemId={`optional_description_${index}`}
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
                                htmlFor={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                            >
                                Кількість занять
                            </label>
                            <input
                                className={`input ${styles.input}`}
                                type="text"
                                id={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                                {...register(`prices.${index}.${PriceVariantOptionsEnum.COUNT}`)}
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
                                htmlFor={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                            >
                                Тривалість заняття
                            </label>
                            <input
                                className={`input ${styles.input}`}
                                type="text"
                                id={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                                {...register(`prices.${index}.${PriceVariantOptionsEnum.DURATION}`)}
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
                                htmlFor={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                            >
                                Ціна за 1 заняття
                            </label>
                            <input
                                className={`input ${styles.input}`}
                                type="text"
                                id={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                                {...register(`prices.${index}.${PriceVariantOptionsEnum.PRICE}`)}
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
                                htmlFor={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                            >
                                Ціна за весь курс
                            </label>
                            <input
                                className={`input ${styles.input}`}
                                type="text"
                                id={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                                {...register(`prices.${index}.${PriceVariantOptionsEnum.TOTALPRICE}`)}
                            />
                            {errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]
                                && includePriceVariants
                                && (
                                    <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]?.message}</p>
                                )}
                        </div>}
                    </div>
                </motion.div>
            </motion.div>)} */}
            <div
                className={`${styles.priceVariantWrap} ${index ? styles.additional : ''}`}
                // ref={priceVariantRef}
            >
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
                            htmlFor={`optionName_${index}`}
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
                                htmlFor={`optional_description_${index}`}
                            >
                                {`Опис, пишіть в душках (опціонально*)`}
                            </label>
                            <Checkbox
                                handleFunction={handleCheckbox}
                                isChecked={priceVariantDescription}
                                elemId={`optional_description_${index}`}
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
                            htmlFor={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                        >
                            Кількість занять
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.COUNT}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.COUNT}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                        >
                            Тривалість заняття
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.DURATION}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.DURATION}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                        >
                            Ціна за 1 заняття
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.PRICE}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.PRICE}`)}
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
                            htmlFor={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                        >
                            Ціна за весь курс
                        </label>
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            id={`${PriceVariantOptionsEnum.TOTALPRICE}_${index}`}
                            {...register(`prices.${index}.${PriceVariantOptionsEnum.TOTALPRICE}`)}
                        />
                        {errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]
                            && includePriceVariants
                            && (
                                <p className="error">{errors.prices?.[index]?.[PriceVariantOptionsEnum.TOTALPRICE]?.message}</p>
                            )}
                    </div>}
                </div>
            </div>
        </>
    )
}