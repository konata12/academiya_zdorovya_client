import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import React from 'react'
import styles from './PriceFormTitle.module.scss'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { deletePriceSectionTitle, triggerTitleCheckbox } from '@/app/utils/redux/prices/pricesCreateFormUiSlice'
import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import { PriceSectionFormData, PriceTitleEnum } from '@/app/types/prices'
import { AnimatePresence, motion } from 'framer-motion';
import { componentVisibleAnimationVariants, errorAnimationVariants } from '@/app/utils/animations/animations'
import { basicAnimation } from '@/app/utils/animations/variables'


export default function PriceFormTitle({
    titleWithPrice,
    // ref,
    index,
    register,
    errors,
    removeTitleFromForm
}: {
    titleWithPrice: boolean
    // ref: React.RefObject<HTMLDivElement>
    index: number
    register: UseFormRegister<PriceSectionFormData>
    errors: FieldErrors<PriceSectionFormData>
    removeTitleFromForm: UseFieldArrayRemove
}) {
    const dispatch = useAppDispatch()

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerTitleCheckbox({ index, state }))
    }
    const deleteTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeTitleFromForm(index)
        dispatch(deletePriceSectionTitle(index))
    }

    return (
        <AnimatePresence>
            <motion.div
                className={`${styles.titleWrap} ${index ? styles.additional : ''}`}
                // ref={ref}
                variants={componentVisibleAnimationVariants}
                initial="hidden"
                animate="visible"
                exit='exit'
                transition={basicAnimation}
            >
                {index ? <div className={styles.additionalTitle}>
                    <span className='title xs'>
                        Додаткова назва послуги
                    </span>
                    <button
                        onClick={deleteTitle}
                        className={`btn blue sm`}
                    >
                        Видалити
                    </button>
                </div> : null}

                <div className={styles.title}>
                    <label
                        className={`inputLabel`}
                        htmlFor={`name_${index}`}
                    >
                        {index ?
                            'Назва послуги' :
                            'Повна назва послуги'}
                    </label>
                    <input
                        className={`input`}
                        type="text"
                        id={`name_${index}`}
                        {...register(`titles.${index}.${PriceTitleEnum.TEXT}`, {
                            required: "Якщо вибрали, додатку послугу, то введіть її назву",
                        })}
                    />
                    <AnimatePresence>
                        {errors.titles?.[index]?.[PriceTitleEnum.TEXT]
                            && (
                                <motion.p
                                    className={`error ${styles.error}`}
                                    variants={errorAnimationVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit='exit'
                                    transition={basicAnimation}
                                >
                                    {errors.titles[index]?.[PriceTitleEnum.TEXT]?.message}
                                </motion.p>
                            )
                        }
                    </AnimatePresence>
                </div>

                <div className={styles.priceNearTitle}>
                    <div className={styles.top}>
                        <label
                            className={`inputLabel`}
                            htmlFor={`price_${index}`}
                        >
                            {`Ціна біля назви (опціонально*)`}
                        </label>
                        <Checkbox
                            handleFunction={handleCheckbox}
                            isChecked={titleWithPrice}
                            elemId={`price_${index}`}
                        />
                    </div>
                    <input
                        className={`input ${styles.input} ${titleWithPrice ? styles.active : ''}`}
                        type="text"
                        {...register(`titles.${index}.${PriceTitleEnum.PRICENEARTITLE}`, {
                            required: titleWithPrice ? "Введіть ціну біля назви або відключіть її" : false,
                        })}
                    />
                    <AnimatePresence>
                        {errors.titles?.[index]?.[PriceTitleEnum.PRICENEARTITLE]
                            && titleWithPrice
                            && (
                                <motion.p
                                    className={`error ${styles.error} ${titleWithPrice ? styles.active : ''}`}
                                    variants={errorAnimationVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit='exit'
                                    transition={basicAnimation}
                                >
                                    {errors.titles[index]?.[PriceTitleEnum.PRICENEARTITLE]?.message}
                                </motion.p>
                            )
                        }
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
