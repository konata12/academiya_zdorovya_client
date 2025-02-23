'use client'

import React, { useCallback, useRef } from 'react'
import styles from './CreatePriceForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { RootState } from '@/app/utils/redux/store'
import PriceFormTitle from '@/app/admin/(provider)/ui/Forms/pricesForms/title/PriceFormTitle'
import {
    createPriceSectionTitle,
    createPriceVariant,
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
import { PriceSectionEnum, PriceSectionFormData } from '@/app/types/prices'
import { usePathname } from 'next/navigation'
import { getUrlOrderElement } from '@/app/services/navigation'


export default function CreatePriceForm() {
    const {
        addTitlePriceCheckbox,
        optionalService,

        addPriceVariantCheckbox,
        priceVariantsCheckbox,
        meetingsCount,
        meetingDuration,
        meetingPrice,
        meetingsTotalPrice
    } = useAppSelector((state: RootState) => state.pricesCreateFormUI)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const titlesRef = useRef<(HTMLDivElement | null)[]>([])
    const optionalServiceRef = useRef(null)

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
    const priceVariantOptions = [
        meetingsCount,
        meetingDuration,
        meetingPrice,
        meetingsTotalPrice
    ]
    const departmentId = +getUrlOrderElement(pathname, 3)

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

    console.dir(optionalServiceRef.current)

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
                <div className={styles.top}>
                    <label
                        className={`inputLabel`}
                        htmlFor="optionalService"
                    >
                        {`Що може включати послуга (опціонально*)`}
                    </label>
                    <Checkbox
                        handleFunction={handleOptionalServiceCheckbox}
                        isChecked={optionalService}
                        elemId='optionalService'
                    />
                </div>
                <input
                    className={`input ${styles.input} ${optionalService ? styles.active : ''}`}
                    type="text"
                    {...register(PriceSectionEnum.OPTIONALSERVICE, {
                        required: optionalService ? "Якщо вибрали, додатку послугу, то введіть її назву" : false,
                        setValueAs: (value: string) => {
                            console.log(value.length)
                            if (!value.length) return null
                            return value
                        }
                    })}
                    disabled={!optionalService}
                />
                {errors?.[PriceSectionEnum.OPTIONALSERVICE]
                    && optionalService
                    && (
                        <p className={`error ${styles.error}`}>{errors?.[PriceSectionEnum.OPTIONALSERVICE]?.message}</p>
                    )}
            </div>

            <div className={styles.tableConfig}>
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
                            isChecked={meetingsCount}
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
                            isChecked={meetingDuration}
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
                            isChecked={meetingPrice}
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
                            isChecked={meetingsTotalPrice}
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