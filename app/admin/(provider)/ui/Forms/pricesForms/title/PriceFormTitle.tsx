import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import React, { useEffect, useRef, useState } from 'react'
import styles from './PriceFormTitle.module.scss'
import { useAppDispatch } from '@/app/utils/redux/hooks'
import { deletePriceSectionTitle, triggerTitleCheckbox } from '@/app/utils/redux/prices/pricesCreateFormUiSlice'
import { FieldErrors, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import { PriceSectionFormData, PriceTitleEnum } from '@/app/types/data/prices'
import { motion } from 'framer-motion';
import { componentVisibleAnimationVariants, errorAnimationVariants, priceSectionTitleVariants } from '@/app/utils/animations/animations'
import { basicAnimation } from '@/app/utils/animations/variables'

interface propsTypes {
    titleWithPrice: boolean
    index: number
    register: UseFormRegister<PriceSectionFormData>
    errors: FieldErrors<PriceSectionFormData>
    removeTitleFromForm: UseFieldArrayRemove
}

export default function PriceFormTitle({
    titleWithPrice,
    index,
    register,
    errors,
    removeTitleFromForm
}: propsTypes) {
    const [height, setHeight] = useState(0)
    const dispatch = useAppDispatch()
    const titleRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setHeight(titleRef.current?.scrollHeight || 0)
    })

    const handlePriceNearTitleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerTitleCheckbox({ index, state }))
    }
    const deleteTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeTitleFromForm(index)
        dispatch(deletePriceSectionTitle(index))
    }
    console.dir(titleRef.current)

    return (
        <motion.div
            className={styles.titleShape}
            variants={priceSectionTitleVariants(height)}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={basicAnimation}
        >
            <motion.div
                className={`${styles.titleWrap} ${index ? styles.additional : ''}`}
                ref={titleRef}
                variants={componentVisibleAnimationVariants}
                initial="hidden"
                animate="visible"
                exit='exit'
                transition={basicAnimation}
            >
                {index ? <div className={styles.additionalTitle}>
                    <span className='title xs'>
                        Додаткова назва послуги {index}
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
                        className={`inputLabel ${styles.label}`}
                        htmlFor={`price_title_${index}`}
                    >
                        {index ?
                            'Назва послуги' :
                            'Повна назва послуги'}
                    </label>
                    <input
                        className={`input`}
                        type="text"
                        id={`price_title_${index}`}
                        {...register(`titles.${index}.${PriceTitleEnum.TEXT}`, {
                            required: "Якщо вибрали, додатку послугу, то введіть її назву",
                        })}
                    />
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
                </div>

                <div className={styles.priceNearTitle}>
                    <div className={styles.top}>
                        <label
                            className={`inputLabel`}
                            htmlFor={`price_near_title_${index}`}
                        >
                            {`Ціна біля назви (опціонально*)`}
                        </label>
                        <Checkbox
                            handleFunction={handlePriceNearTitleCheckbox}
                            isChecked={titleWithPrice}
                            elemId={`price_near_title_${index}`}
                        />
                    </div>
                    <input
                        className={`input ${styles.input} ${titleWithPrice ? styles.active : ''}`}
                        type="text"
                        {...register(`titles.${index}.${PriceTitleEnum.PRICENEARTITLE}`, {
                            required: titleWithPrice ? "Введіть ціну біля назви або відключіть її" : false,
                        })}
                    />
                    {errors.titles?.[index]?.[PriceTitleEnum.PRICENEARTITLE] 
                        && titleWithPrice
                        && (
                            <motion.p
                                className={`error ${styles.error}`}
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
                </div>
            </motion.div>
        </motion.div>
    )
}