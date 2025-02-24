'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import styles from './CreatePriceForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import PriceFormTitle from '@/app/admin/(provider)/ui/Forms/pricesForms/title/PriceFormTitle'
import {
    createPriceSectionTitle,
    createPriceVariant,
    setOptionalServiceCheckboxHeight,
    setOptionalServiceInputHeight,
    triggerMeetingDurationCheckbox,
    triggerMeetingPriceCheckbox,
    triggerMeetingsCountCheckbox,
    triggerMeetingsTotalPriceCheckbox,
    triggerOptionalServiceCheckbox,
    triggerPriceVariantsCheckbox,
} from '@/app/utils/redux/prices/pricesCreateFormUiSlice'
import { createPriceSection as createPriceSectionAction } from '@/app/utils/redux/prices/pricesSlice'
import Checkbox from '@/app/admin/(provider)/ui/Checkbox/Checkbox'
import PriceFormVariant from '@/app/admin/(provider)/ui/Forms/pricesForms/priceVariant/PriceFormVariant'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion';
import { PriceSectionEnum, PriceSectionFormData } from '@/app/types/prices'
import { usePathname } from 'next/navigation'
import { getUrlOrderElement } from '@/app/services/navigation'
import { basicAnimation } from '@/app/utils/animations/variables'
import { optionalServiceVariants } from '@/app/utils/animations/animations'


export default function CreatePriceForm() {
    const {
        // TITLES
        addTitlePriceCheckbox,

        // OPTIONAL SERVICE
        optionalServiceCheckbox,
        optionalServiceCheckboxHeight,
        optionalServiceInputHeight,

        // PRICE VARIANTS
        addPriceVariantCheckbox,
        priceVariantsCheckbox,
        meetingsCountCheckbox,
        meetingDurationCheckbox,
        meetingPriceCheckbox,
        meetingsTotalPriceCheckbox
    } = useAppSelector((state: RootState) => state.pricesCreateFormUI)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const titlesRef = useRef<(HTMLDivElement | null)[]>([])
    const optionalServiceRef = useRef<HTMLDivElement | null>(null)

    const departmentId = +getUrlOrderElement(pathname, 3)
    const priceVariantOptions = [
        meetingsCountCheckbox,
        meetingDurationCheckbox,
        meetingPriceCheckbox,
        meetingsTotalPriceCheckbox
    ]

    // FORM LOGIC
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm<PriceSectionFormData>({
        defaultValues: {
            titles: [{
                text: '',
                priceNearTitle: null
            }],
            prices: []
        }
    })
    const {
        fields: titleFields,
        append: appendTitle,
        remove: removeTitle
    } = useFieldArray({
        control,
        name: 'titles', // Name of the array in the form data
    });
    const {
        fields: priceFields,
        append: appendPrice,
        remove: removePrice
    } = useFieldArray({
        control,
        name: 'prices', // Name of the array in the form data
    });
    const AllFormFields = watch()

    // USE EFFECTS
    // SET OPTIONAL SERVICE HEIGHT
    useEffect(() => {
        if (optionalServiceRef.current?.children) {
            const optionalServiceHeight = optionalServiceRef.current?.children[0]?.scrollHeight
            const optionalServiceInputHeight = optionalServiceCheckbox
                ? optionalServiceRef.current?.children[2]?.scrollHeight
                : 0

            dispatch(setOptionalServiceCheckboxHeight(optionalServiceHeight))
            dispatch(setOptionalServiceInputHeight(optionalServiceInputHeight))
        }
    }, [errors?.[PriceSectionEnum.OPTIONALSERVICE], optionalServiceCheckbox])

    const createPriceSection: SubmitHandler<PriceSectionFormData> = async (data) => {
        console.log('submit data:', data)
        const response = await dispatch(createPriceSectionAction({ data, departmentId }))
    }

    // WORK WITH TITLES FORM UI
    const addTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        appendTitle({ text: '', priceNearTitle: null }); // Append a new title object
        dispatch(createPriceSectionTitle())
    }
    const addPriceVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        appendPrice({
            title: '',
            titleDescription: null,
            meetingsCount: null,
            meetingsDuration: null,
            meetingPrice: null,
            coursePrice: null,
        })
        dispatch(createPriceVariant())
    }
    // WORK WITH OPTIONAL SERVICES UI
    const handleOptionalServiceCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerOptionalServiceCheckbox(state))
    }
    // WORK WITH PRICE VARIANTS FORM UI
    const handlePriceVariantsCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        // IF PRICE VARIANTS IS TURNS ON AND THERE ARE NO PRICE VARIANTS THEN CREATE ONE
        // ELSE THERE IS ONLY 1 PRICE VARIANT THEN ON TURNING OFF DELETE IT
        if (!priceVariantsCheckbox && !priceFields.length) {
            appendPrice({
                title: '',
                titleDescription: null,
                meetingsCount: null,
                meetingsDuration: null,
                meetingPrice: null,
                coursePrice: null,
            })
        } else if (priceFields.length === 1) {
            removePrice(0)
        }
        dispatch(triggerPriceVariantsCheckbox(state))
    }
    const handlePriceCountOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerMeetingsCountCheckbox(state))
    }
    const handlePriceDurationOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerMeetingDurationCheckbox(state))
    }
    const handlePriceMeetingPriceOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerMeetingPriceCheckbox(state))
    }
    const handlePriceTotalPriceOptionCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = e.target.checked
        dispatch(triggerMeetingsTotalPriceCheckbox(state))
    }

    // REFERENCES
    const setTitleRef = useCallback((elem: HTMLDivElement | null, index: number) => {
        titlesRef.current[index] = elem;
    }, []);

    return (
        <form
            onSubmit={handleSubmit(createPriceSection)}
            className={styles.form}
        >
            {titleFields.map((titleField, i) => {
                return <PriceFormTitle
                    // ref={titlesRef.current[i] } // Store ref for each child
                    titleWithPrice={addTitlePriceCheckbox[i]}
                    index={i}
                    register={register}
                    errors={errors}
                    removeTitleFromForm={removeTitle}
                    key={titleField.id}
                />
            })}
            <button
                onClick={addTitle}
                className={`btn blue xl ${styles.addTitleBtn}`}
                type='button'
            >
                {`Додати назву (для консультацій)`}
            </button>

            <div
                className={styles.optionalService}
                ref={optionalServiceRef}
            >
                <div className={`${styles.top} ${optionalServiceCheckbox ? styles.active : ''}`}>
                    <label
                        className={`inputLabel`}
                        htmlFor="optionalService"
                    >
                        {`Що може включати послуга (опціонально*)`}
                    </label>
                    <Checkbox
                        handleFunction={handleOptionalServiceCheckbox}
                        isChecked={optionalServiceCheckbox}
                        elemId='optionalService'
                    />
                </div>
                <motion.div
                    className={styles.bottomShape}
                    animate={optionalServiceCheckbox
                        ? { height: optionalServiceInputHeight }
                        : { height: 0 }}
                    transition={basicAnimation}
                ></motion.div>
                <AnimatePresence>
                    {optionalServiceCheckbox && <motion.div
                        className={styles.bottom}
                        style={{ top: `${optionalServiceCheckboxHeight}px` }}
                        variants={optionalServiceVariants}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        transition={basicAnimation}
                    >
                        <input
                            className={`input ${styles.input}`}
                            type="text"
                            {...register(PriceSectionEnum.OPTIONALSERVICE, {
                                required: optionalServiceCheckbox ? "Якщо вибрали, додаткову послугу, то введіть її назву" : false,
                                setValueAs: (value: string) => {
                                    if (value === null || !value.length) return null
                                    return value
                                }
                            })}
                            disabled={!optionalServiceCheckbox}
                        />
                        {errors?.[PriceSectionEnum.OPTIONALSERVICE]
                            && (
                                <p className={`error ${styles.error}`}>{errors?.[PriceSectionEnum.OPTIONALSERVICE]?.message}</p>
                            )}
                    </motion.div>}
                </AnimatePresence>
            </div>

            <div className={`${styles.tableConfig} ${optionalServiceCheckbox ? styles.move : ''}`}>
                <p className='title sm'>
                    Варіанти стовпців для опцій ціни послуги
                </p>
                <div className={styles.checkboxes}>
                    <div className={styles.checkbox}>
                        <label
                            className={`inputLabel`}
                            htmlFor="meetingsCountCheckbox"
                        >
                            Кількість занять
                        </label>
                        <Checkbox
                            handleFunction={handlePriceCountOptionCheckbox}
                            isChecked={meetingsCountCheckbox}
                            elemId='meetingsCountCheckbox'
                        />
                    </div>
                    <div className={styles.checkbox}>
                        <label
                            className={`inputLabel`}
                            htmlFor="durationCheckbox"
                        >
                            Тривалість заняття
                        </label>
                        <Checkbox
                            handleFunction={handlePriceDurationOptionCheckbox}
                            isChecked={meetingDurationCheckbox}
                            elemId='durationCheckbox'
                        />
                    </div>
                    <div className={styles.checkbox}>
                        <label
                            className={`inputLabel`}
                            htmlFor="priceCheckbox"
                        >
                            Ціна за 1 заняття
                        </label>
                        <Checkbox
                            handleFunction={handlePriceMeetingPriceOptionCheckbox}
                            isChecked={meetingPriceCheckbox}
                            elemId='priceCheckbox'
                        />
                    </div>
                    <div className={styles.checkbox}>
                        <label
                            className={`inputLabel`}
                            htmlFor="totalPriceCheckbox"
                        >
                            Ціна за весь курс
                        </label>
                        <Checkbox
                            handleFunction={handlePriceTotalPriceOptionCheckbox}
                            isChecked={meetingsTotalPriceCheckbox}
                            elemId='totalPriceCheckbox'
                        />
                    </div>
                </div>
            </div>

            <div className={styles.priceVariantsWrap}>
                <div className={styles.top}>
                    <label
                        className='title md'
                        htmlFor="priceVariants"
                    >
                        Варіації послуги
                    </label>

                    <Checkbox
                        handleFunction={handlePriceVariantsCheckbox}
                        isChecked={priceVariantsCheckbox}
                        elemId='priceVariants'
                    />
                </div>
                {priceVariantsCheckbox ? <div>
                    {priceFields.map((priceField, i) => {
                        return <PriceFormVariant
                            showOptions={priceVariantOptions}
                            includePriceVariants={priceVariantsCheckbox}
                            priceVariantDescription={addPriceVariantCheckbox[i]}
                            index={i}
                            register={register}
                            errors={errors}
                            removePriceVariantFromForm={removePrice}
                            key={priceField.id}
                        />
                    })}
                    <button
                        onClick={addPriceVariant}
                        className={`btn blue xl ${styles.addPriceTitleBtn}`}
                        type='button'
                    >
                        Додати рядок
                    </button>
                </div> : null}
            </div>

            <div>
                <button
                    className={`btn blue xl ${styles.submit}`}
                    type='submit'
                >
                    Створити
                </button>
            </div>
        </form>
    )
}