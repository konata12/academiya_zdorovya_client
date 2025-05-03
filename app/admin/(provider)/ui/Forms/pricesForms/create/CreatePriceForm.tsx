'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import styles from './CreatePriceForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import PriceFormTitle from '@/app/admin/(provider)/ui/Forms/pricesForms/title/PriceFormTitle'
import {
    createPriceSectionTitle,
    createPriceVariant,
    setOptionalServiceInputHeight,
    setPriceVariantsHeight,
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
import { PriceSectionEnum, PriceSectionFormData } from '@/app/types/data/prices'
import { usePathname, useRouter } from 'next/navigation'
import { getUrlOrderElement } from '@/app/services/navigation'
import { basicAnimationTransition } from '@/app/utils/animations/variables'
import { optionalServiceVariants, priceFieldsVariants } from '@/app/utils/animations/animations'
import PricesTable from '@/app/admin/(provider)/ui/Tables/PricesTable/PricesTable'
import { fullfilled } from '@/app/services/response'


export default function CreatePriceForm() {
    const {
        // TITLES
        addTitlePriceCheckbox,

        // OPTIONAL SERVICE
        optionalServiceCheckbox,
        optionalServiceInputHeight,

        // PRICE VARIANTS
        priceVariantsHeight,
        addPriceVariantCheckbox,
        priceVariantsCheckbox,
        meetingsCountCheckbox,
        meetingDurationCheckbox,
        meetingPriceCheckbox,
        meetingsTotalPriceCheckbox
    } = useAppSelector((state: RootState) => state.pricesCreateFormUI)
    const { error } = useAppSelector((state: RootState) => state.prices)

    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const router = useRouter()
    const optionalServiceRef = useRef<HTMLDivElement | null>(null)
    const priceVariantsWrapRef = useRef<HTMLDivElement | null>(null)

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
                priceNearTitle: undefined
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
    const titleFieldsId = titleFields.map((titleField) => {
        return titleField.id
    })

    // USE EFFECTS
    // SET OPTIONAL SERVICE HEIGHT
    useEffect(() => {
        if (optionalServiceRef.current) {
            dispatch(setOptionalServiceInputHeight(optionalServiceRef.current.scrollHeight))
        }
    })
    // SET PRICE VARIANTS HEIGHT
    useEffect(() => {
        if (priceVariantsWrapRef.current) {
            dispatch(setPriceVariantsHeight(priceVariantsWrapRef.current.scrollHeight))
        }
    })

    // FORM SUBMIT
    const createPriceSection: SubmitHandler<PriceSectionFormData> = async (data) => {
        // VALIDATE DATA BEFORE CREATING PRICE SECTION
        data.titles = data.titles.map((title, i) => {
            let priceNearTitle = title.priceNearTitle
            if (title.priceNearTitle === '' || !addTitlePriceCheckbox[i]) {
                priceNearTitle = undefined
            }
            return {
                text: title.text,
                priceNearTitle
            }
        })
        if (!optionalServiceCheckbox) data.optionalService = undefined
        if (!priceVariantsCheckbox) data.prices = undefined
        if (data.prices) {
            data.prices = data.prices.map((price, i) => {
                let titleDescription = price.titleDescription
                let meetingsCount = price.meetingsCount
                let meetingsDuration = price.meetingsDuration
                let meetingPrice = price.meetingPrice
                let coursePrice = price.coursePrice
                if (price.titleDescription === '' || !addPriceVariantCheckbox[i]) {
                    titleDescription = undefined
                }
                if (price.meetingsCount === '') {
                    meetingsCount = undefined
                }
                if (price.meetingsDuration === '') {
                    meetingsDuration = undefined
                }
                if (price.meetingPrice === '') {
                    meetingPrice = undefined
                }
                if (price.coursePrice === '') {
                    coursePrice = undefined
                }

                return {
                    title: price.title,
                    titleDescription,
                    meetingsCount,
                    meetingsDuration,
                    meetingPrice,
                    coursePrice
                }
            })
        }
        console.log('submit data:', data)

        const response = await dispatch(createPriceSectionAction({ data, departmentId }))
        const isFulfilled = fullfilled(response.meta.requestStatus)
        const pathArr = pathname.split('/')
        const path = pathArr.slice(0, pathArr.length - 1).join('/')
        if (isFulfilled) router.push(path)
    }

    // WORK WITH TITLES FORM UI
    const addTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        appendTitle({ text: '', priceNearTitle: undefined }); // Append a new title object
        dispatch(createPriceSectionTitle())
    }
    const addPriceVariant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        appendPrice({
            title: '',
            titleDescription: undefined,
            meetingsCount: undefined,
            meetingsDuration: undefined,
            meetingPrice: undefined,
            coursePrice: undefined,
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
                titleDescription: undefined,
                meetingsCount: undefined,
                meetingsDuration: undefined,
                meetingPrice: undefined,
                coursePrice: undefined,
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

    console.log(priceVariantsHeight)
    console.dir(priceVariantsWrapRef.current)
    return (
        <form
            onSubmit={handleSubmit(createPriceSection)}
            className={styles.form}
        >
            <AnimatePresence>
                {titleFields.map((titleField, i) => {
                    return <PriceFormTitle
                        titleWithPrice={addTitlePriceCheckbox[i]}
                        index={i}
                        register={register}
                        errors={errors}
                        removeTitleFromForm={removeTitle}
                        key={titleField.id}
                    />
                })}
            </AnimatePresence>
            <button
                onClick={addTitle}
                className={`btn blue xl ${styles.addTitleBtn}`}
                type='button'
            >
                {`Додати назву (для консультацій)`}
            </button>

            <div
                className={styles.optionalService}
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
                    transition={basicAnimationTransition}
                >
                    <AnimatePresence>
                        {optionalServiceCheckbox && <motion.div
                            className={styles.bottom}
                            ref={optionalServiceRef}
                            variants={optionalServiceVariants}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            transition={basicAnimationTransition}
                        >
                            <input
                                className={`input ${styles.input}`}
                                type="text"
                                {...register(PriceSectionEnum.OPTIONALSERVICE, {
                                    required: optionalServiceCheckbox ? "Якщо вибрали, додаткову послугу, то введіть її назву" : false,
                                })}
                                disabled={!optionalServiceCheckbox}
                            />
                            {errors?.[PriceSectionEnum.OPTIONALSERVICE]
                                && (
                                    <p className={`error ${styles.error}`}>{errors?.[PriceSectionEnum.OPTIONALSERVICE]?.message}</p>
                                )}
                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
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
                        className={`title md`}
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

                <motion.div
                    className={styles.priceVariants}
                    animate={priceVariantsCheckbox
                        ? { height: priceVariantsHeight }
                        : { height: 0 }
                    }
                    transition={basicAnimationTransition}
                >
                    <AnimatePresence>
                        {priceVariantsCheckbox && <motion.div
                            className={styles.priceVariantsShape}
                            ref={priceVariantsWrapRef}
                            variants={priceFieldsVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            transition={basicAnimationTransition}
                        >
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
                                className={`btn blue xl ${styles.addPriceVariantBtn}`}
                                type='button'
                            >
                                Додати рядок
                            </button>
                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className={styles.resultLayout}>
                <p className={`title md left`}>
                    Попередній перегляд
                </p>
                <PricesTable
                    data={AllFormFields}
                    includePrices={priceVariantsCheckbox}
                    includesPricesDescription={addPriceVariantCheckbox}
                    priceVariantOptions={priceVariantOptions}
                    titleFieldsId={titleFieldsId}
                    className={styles.priceTable}
                />
            </div>

            <div className={styles.formErrorWrap}>
                {error.create && <p className={`error ${styles.formError}`}>{error.create.message}</p>}
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