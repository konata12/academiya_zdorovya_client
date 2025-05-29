'use client'

import InputContainer from '@/app/common_ui/form_components/BasicInputContainer/children/InputContainer/InputContainer'
import TextareaContainer from '@/app/common_ui/form_components/BasicInputContainer/children/TextareaContainer/TextareaContainer'
import { NewsFormData, NewsFormDataEnum } from '@/app/types/data/news.type'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './CreateNewsForm.module.scss'
import CommonTable from '@/app/admin/(provider)/ui/Tables/Common/CommonTable'
import TableLine from '@/app/admin/(provider)/ui/Tables/ListOption/TableLine'
import SafeLink from '@/app/admin/(provider)/ui/Links/SafeLink/SafeLink'

const titles = ['Стан вмісту', 'Опції']

export default function CreateNewsForm() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<NewsFormData>()

    const image = watch(NewsFormDataEnum.BACKGROUNDIMG)?.[0] // Watch the image input

    return (
        <form>
            <InputContainer<NewsFormData>
                label="Повна назва новини"
                name={NewsFormDataEnum.TITLE}
                className={{
                    inputContainer: styles.titleInputContainer
                }}
                register={register}
                errors={errors}
                registerOptions={{
                    required: "Повна назва обов'язкова"
                }}
            />
            <TextareaContainer<NewsFormData>
                label="Короткий опис новини "
                value={watch(NewsFormDataEnum.DESCRIPTION)}
                name={NewsFormDataEnum.DESCRIPTION}
                className={{
                    inputContainer: styles.descriptionInputContainer
                }}
                minRows={3}
                register={register}
                errors={errors}
                registerOptions={{
                    required: "Короткий опис обов'язковий"
                }}
            />

            <div className={styles.imageSection}>
                <p className={`title sm left`}>
                    Обготка новини
                </p>
                <p className={`inputLabel`}>
                    Завантажте фото
                </p>

                <input
                    id='upload_image'
                    type="file"
                    hidden
                    {...register(NewsFormDataEnum.BACKGROUNDIMG, {
                        required: "Завантажте фото",
                    })}
                />
                <label
                    className={`btn blue sm`}
                    htmlFor="upload_image"
                >
                    Завантажити
                </label>

                <div className={styles.imagePreview}>
                    {errors[NewsFormDataEnum.BACKGROUNDIMG] && <p className={`error ${styles.errorMessage}`}>
                        {errors[NewsFormDataEnum.BACKGROUNDIMG].message}
                    </p>}

                    <div className={styles.image}>
                        <div
                            className={`
                                ${styles.imageContainer} 
                                ${styles.big} 
                                ${errors[NewsFormDataEnum.BACKGROUNDIMG] ? styles.error : ''} 
                            `}
                        >
                            {image && <img
                                // className={styles.image}
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                            />}
                        </div>

                        <p className={styles.caption}>
                            Попередній перегляд
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.detailsSection}>
                <CommonTable
                    titles={titles}
                >
                    <TableLine>
                        <span>
                            Не створений
                        </span>

                        <SafeLink
                            className={`btn blue sm`}
                            href={`/admin/news/create/details`}
                        >
                            Створити вміст
                        </SafeLink>
                    </TableLine>
                </CommonTable>
            </div>
        </form >
    )
}
