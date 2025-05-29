import { descriptionImageSize, DetailsFormData, DetailsFormDataEnum, DetailsFromProps } from '@/app/types/data/details.type'
import React from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import styles from './DetailsForm.module.scss'
import { v4 as uuidv4 } from 'uuid';
import DetailsTitleInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsTitleInput/DetailsTitleInput'
import CreateDetailsInputBtn from '@/app/admin/(provider)/ui/Forms/details/createDetailsInputBtn/CreateDetailsInputBtn'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import { addDetailsComponent } from '@/app/utils/redux/details/detailsOrderSlice'
import { RootState } from '@/app/utils/redux/store';
import { DndContext, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import DraggableContainer from '@/app/admin/(provider)/ui/Forms/details/inputs/DraggableContainer';
import DetailsParagraphInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsParagraphInput/DetailsParagraphInput';
import DetailsQuouteInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsQuouteInput/DetailsQuouteInput';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import DetailsListInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsListInput/DetailsListInput';
import { useOrderedForm } from '@/app/utils/hooks/admin/useOrderedForm';
import DetailsImageInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsImageInput/DetailsImageInput';


export default function DetailsForm({
    titles,
    paragraphs,
    quoutes,
    lists,
    images,
}: DetailsFromProps) {
    const order = useAppSelector((state: RootState) => state.detailsOrderSlice.order)
    const { setNodeRef } = useDroppable({
        id: 'DetailsForm'
    })
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement to start dragging
            },
        }),
    );
    const {
        handleDragEnd,
        getFieldArrayIdByOrderId,
        getFieldArrayIndexByOrderId,
    } = useOrderedForm()

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<DetailsFormData>()

    const {
        fields: paragraphFields,
        append: appendParagraph,
        remove: removeParagraph
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.PARAGRAPHS,
    });
    const {
        fields: quouteFields,
        append: appendQuoute,
        remove: removeQuoute
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.QUOUTES,
    });
    const {
        fields: titleFields,
        append: appendTitle,
        remove: removeTitle,
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.TITLES,
    });
    const {
        fields: listFields,
        append: appendList,
        remove: removeList
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.LISTS,
    });
    const watchLists = watch(DetailsFormDataEnum.LISTS)
    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.IMAGES,
    });
    const watchImages = watch(DetailsFormDataEnum.IMAGES)


    // FORM SUBMIT
    const createDetailsFormData: SubmitHandler<DetailsFormData> = (data) => {
        console.log('**********************************************************', data)
        const dataElements = [
            ...data.titles,
            ...data.paragraphs,
            ...data.quoutes,
            ...data.lists,
            ...data.images,
        ]
        // const titles = []

        // order.forEach((orderedElement, i) => {
        //     if (orderedElement.id === dataElements[i].orderId) {
        //         switch (orderedElement.type) {
        //             case DetailsFormDataEnum.TITLES:
        //                 titles.push({
        //                     title: (dataElements[i] as TitleFormData).title,
        //                     order: i
        //                 })
        //                 break;

        //             default:
        //                 break;
        //         }
        //     }
        // })

        // console.log(titles)
    }

    // CREATE INPUT METHODS
    const createTitle = () => {
        const orderId = uuidv4()

        // create title
        appendTitle({
            title: '',
            orderId
        });

        // make title ordered
        dispatch(addDetailsComponent({
            componentType: DetailsFormDataEnum.TITLES,
            componentData: {
                orderId,
            }
        }))
    }

    const createParagraph = () => {
        const orderId = uuidv4()

        // create paragraphs
        appendParagraph({
            text: '',
            orderId,
        });

        // make paragraphs ordered
        dispatch(addDetailsComponent({
            componentType: DetailsFormDataEnum.PARAGRAPHS,
            componentData: {
                orderId,
            }
        }))
    }

    const createQuoute = () => {
        const orderId = uuidv4()

        // create quoute
        appendQuoute({
            text: '',
            author: '',
            orderId,
        });

        // make quoute ordered
        dispatch(addDetailsComponent({
            componentType: DetailsFormDataEnum.QUOUTES,
            componentData: {
                orderId,
            }
        }))
    }

    const createList = (numerable: boolean) => {
        const orderId = uuidv4()

        // create list
        appendList({
            options: [''],
            numerable,
            orderId,
        });

        // make list ordered
        dispatch(addDetailsComponent({
            componentType: DetailsFormDataEnum.LISTS,
            componentData: {
                orderId,
            }
        }))
    }

    const createImage = (size: descriptionImageSize) => {
        const orderId = uuidv4()

        // create quoute
        appendImage({
            size,
            image: null,
            description: '',
            orderId,
        });

        // make quoute ordered
        dispatch(addDetailsComponent({
            componentType: DetailsFormDataEnum.IMAGES,
            componentData: {
                orderId,
            }
        }))
    }

    const formInputsToRender = [
        titles && {
            label: 'Заголовок',
            createInputHandler: createTitle
        },
        paragraphs && {
            label: 'Абзац',
            createInputHandler: createParagraph
        },
        quoutes && {
            label: 'Цитата',
            createInputHandler: createQuoute
        },
        lists && {
            label: 'Нумерований список',
            createInputHandler: () => createList(true)
        },
        lists && {
            label: 'Маркований список',
            createInputHandler: () => createList(false)
        },
        images && {
            label: 'Велика картинка',
            createInputHandler: () => createImage('big')
        },
        images && {
            label: 'Мала картинка',
            createInputHandler: () => createImage('small')
        },
    ].filter((input) => !!input)


    return (
        <form onSubmit={handleSubmit(createDetailsFormData)}>
            <div className={styles.addInputsContainer}>
                {formInputsToRender.length && formInputsToRender.map((input, i) => {
                    return <CreateDetailsInputBtn
                        key={i}
                        label={input.label}
                        handleFunction={() => { input.createInputHandler() }}
                    />
                })}
            </div>

            <DndContext
                sensors={sensors}
                onDragEnd={(e) => handleDragEnd(e, order)}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={order.map((element) => element.componentData.orderId)}
                    strategy={horizontalListSortingStrategy}
                >
                    {/* DROPPABLE AREA */}
                    <div
                        ref={setNodeRef}
                        className={styles.mainBody}
                    >
                        {order.map((element, index) => {
                            return <DraggableContainer
                                id={element.componentData.orderId}
                                elementType={element.componentType}
                                index={index}
                                key={index}
                            >
                                {(() => {
                                    switch (element.componentType) {
                                        case DetailsFormDataEnum.TITLES:
                                            const fieldTitleArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.TITLES>(element.componentData.orderId, titleFields)
                                            const fieldTitleArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.TITLES>(element.componentData.orderId, titleFields)

                                            return <DetailsTitleInput<DetailsFormData>
                                                key={fieldTitleArrayId}
                                                name={`${DetailsFormDataEnum.TITLES}.${fieldTitleArrayIndex}.title`}
                                                index={index}
                                                register={register}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.PARAGRAPHS:
                                            const fieldParagraphArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.PARAGRAPHS>(element.componentData.orderId, paragraphFields)
                                            const fieldParagraphArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.PARAGRAPHS>(element.componentData.orderId, paragraphFields)


                                            return <DetailsParagraphInput<DetailsFormData>
                                                key={fieldParagraphArrayId}
                                                name={`${DetailsFormDataEnum.PARAGRAPHS}.${fieldParagraphArrayIndex}.text`}
                                                register={register}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.QUOUTES:
                                            const fieldQuouteArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.QUOUTES>(element.componentData.orderId, quouteFields)
                                            const fieldQuouteArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.QUOUTES>(element.componentData.orderId, quouteFields)

                                            // console.log(fieldQuouteArrayIndex)

                                            return <DetailsQuouteInput<DetailsFormData>
                                                key={fieldQuouteArrayId}
                                                name={`${DetailsFormDataEnum.QUOUTES}.${fieldQuouteArrayIndex}.text`}
                                                authorName={`${DetailsFormDataEnum.QUOUTES}.${fieldQuouteArrayIndex}.author`}
                                                register={register}
                                                className={{
                                                    quoute: styles.orderedComponent,
                                                    author: styles.orderedComponent,
                                                    container: styles.orderedComponent,
                                                }}
                                            />

                                        case DetailsFormDataEnum.LISTS:
                                            const fieldListArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.LISTS>(element.componentData.orderId, listFields)
                                            const fieldListArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.LISTS>(element.componentData.orderId, listFields)

                                            return <DetailsListInput<DetailsFormData>
                                                key={fieldListArrayId}
                                                name={`${DetailsFormDataEnum.LISTS}.${fieldListArrayIndex}.options`}
                                                list={watchLists[fieldListArrayIndex]}
                                                register={register}
                                                setValue={setValue}
                                                className={{
                                                    option: styles.orderedComponent,
                                                    container: styles.orderedComponent,
                                                }}
                                            />

                                        case DetailsFormDataEnum.IMAGES:
                                            const fieldImageArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.IMAGES>(element.componentData.orderId, imageFields)
                                            const fieldImageArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.IMAGES>(element.componentData.orderId, imageFields)

                                            return <DetailsImageInput<DetailsFormData>
                                                key={fieldImageArrayId}
                                                name={`${DetailsFormDataEnum.IMAGES}.${fieldImageArrayIndex}.description`}
                                                imageName={`${DetailsFormDataEnum.IMAGES}.${fieldImageArrayIndex}.image`}
                                                image={watchImages[fieldImageArrayIndex]}
                                                register={register}
                                                className={{
                                                    image: styles.orderedComponent,
                                                    description: styles.orderedComponent,
                                                    container: styles.orderedComponent,
                                                }}
                                            />

                                        default:
                                            break;
                                    }
                                })()}
                            </DraggableContainer>
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            <SubmitButton
                error={null}
                label='Підтвердити зміни'
            />
        </form>
    )
}