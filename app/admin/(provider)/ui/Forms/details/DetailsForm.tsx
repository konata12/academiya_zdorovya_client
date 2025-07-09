import { DescriptionFormImage, DescriptionImage, DescriptionImageSize, DescriptionList, DescriptionParagraph, DescriptionQuoute, DescriptionTitle, DetailsFormData, DetailsFormDataEnum, DetailsFormDataEnumType, DetailsFormDataType, DetailsFromProps, ImageFormData, ListFormData, OrderComponent, ParagraphFormData, QuouteFormData, TitleFormData } from '@/app/types/data/details.type'
import React, { useCallback } from 'react'
import { SubmitHandler, useFieldArray, UseFieldArrayRemove, useForm } from 'react-hook-form'
import styles from './DetailsForm.module.scss'
import { v4 as uuidv4 } from 'uuid';
import DetailsTitleInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsTitleInput/DetailsTitleInput'
import CreateDetailsInputBtn from '@/app/admin/(provider)/ui/Forms/details/createDetailsInputBtn/CreateDetailsInputBtn'
import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import { RootState } from '@/app/utils/redux/store';
import { DndContext, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import DraggableContainer from '@/app/admin/(provider)/ui/Forms/details/inputs/DraggableContainer';
import DetailsParagraphInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsParagraphInput/DetailsParagraphInput';
import DetailsQuouteInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsQuouteInput/DetailsQuouteInput';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import DetailsListInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsListInput/DetailsListInput';
import { useOrderedForm } from '@/app/utils/hooks/admin/detailsForm/useOrderedForm';
import DetailsImageInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsImageInput/DetailsImageInput';
import { useDetailsFormSelectSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice';
import { useIndexedDBStoreForDetailsImages } from '@/app/utils/hooks/admin/detailsForm/useIndexedDBStoreForDetailsImages';
import { del } from 'idb-keyval';


export default function DetailsForm({
    titles,
    paragraphs,
    quoutes,
    lists,
    images,

    // need for determining which order slice to use
    orderSliceName = 'newsDetailsOrderSlice',
}: DetailsFromProps) {
    const order = useAppSelector((state: RootState) => state[orderSliceName].order)
    const store = useIndexedDBStoreForDetailsImages(orderSliceName)
    const dispatch = useAppDispatch()

    const {
        renderOrderedComponents,

        handleDragEnd,
        getFieldArrayIdByOrderId,
        getFieldArrayIndexByOrderId,
    } = useOrderedForm(orderSliceName)

    const {
        addDetailsComponent,
        removeDetailsComponent,
    } = useDetailsFormSelectSlice(orderSliceName)

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
        register,
        handleSubmit,
        control,
        setValue,
        watch,
    } = useForm<DetailsFormData>({
        defaultValues: renderOrderedComponents(order)
    })

    // FIELD ARRAYS
    const {
        fields: titleFields,
        append: appendTitle,
        remove: removeTitle,
    } = useFieldArray({ // needs array of objects to work properly
        control,
        name: DetailsFormDataEnum.TITLES,
    });
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

    // FORM SUBMIT
    const createDetailsFormData: SubmitHandler<DetailsFormData> = (data) => {
        const dataElements = [
            ...data.titles,
            ...data.paragraphs,
            ...data.quoutes,
            ...data.lists,
            ...data.images,
        ]
        const titles: DescriptionTitle[] = []
        const paragraphs: DescriptionParagraph[] = []
        const quoutes: DescriptionQuoute[] = []
        const lists: DescriptionList[] = []
        const images: DescriptionFormImage[] = []


        order.forEach((orderedElement, i) => {
            if (orderedElement.componentData.orderId === dataElements[i].orderId) {

                switch (orderedElement.componentType) {
                    case DetailsFormDataEnum.TITLES:
                        titles.push({
                            title: (dataElements[i] as TitleFormData).title,
                            order: i
                        })
                        break;

                    case DetailsFormDataEnum.PARAGRAPHS:
                        paragraphs.push({
                            text: (dataElements[i] as ParagraphFormData).text,
                            order: i
                        })
                        break;

                    case DetailsFormDataEnum.QUOUTES:
                        quoutes.push({
                            text: (dataElements[i] as QuouteFormData).text,
                            author: (dataElements[i] as QuouteFormData).author,
                            order: i
                        })
                        break;

                    case DetailsFormDataEnum.LISTS:
                        lists.push({
                            options: (dataElements[i] as ListFormData).options,
                            numerable: (dataElements[i] as ListFormData).numerable,
                            order: i
                        })
                        break;

                    case DetailsFormDataEnum.IMAGES:
                        images.push({
                            image: (dataElements[i] as ImageFormData).image,
                            size: (dataElements[i] as ImageFormData).size,
                            description: (dataElements[i] as ImageFormData).description,
                            order: i
                        })
                        break;

                    default:
                        break;
                }
            }
        })

        const parsedFormData = {
            titles,
            paragraphs,
            quoutes,
            lists,
            images
        }

        console.log(parsedFormData)
    }

    // INPUT METHODS
    const createInput = useCallback(({
        elementType,
        listNumerable = false,
        imageSize = 'big'
    }: {
        elementType: DetailsFormDataEnumType
        listNumerable?: boolean
        imageSize?: DescriptionImageSize
    }) => {
        const orderId = uuidv4()
        let componentData: DetailsFormDataType

        // create input
        switch (elementType) {
            case DetailsFormDataEnum.TITLES:
                componentData = {
                    orderId,
                    title: ''
                };
                appendTitle(componentData);
                break;

            case DetailsFormDataEnum.PARAGRAPHS:
                componentData = {
                    orderId,
                    text: ''
                };
                appendParagraph(componentData);
                break;

            case DetailsFormDataEnum.QUOUTES:
                componentData = {
                    orderId,
                    text: '',
                    author: ''
                };
                appendQuoute(componentData);
                break;

            case DetailsFormDataEnum.LISTS:
                componentData = {
                    orderId,
                    options: [''],
                    numerable: listNumerable
                };
                appendList(componentData);
                break;

            case DetailsFormDataEnum.IMAGES:
                componentData = {
                    orderId,
                    size: imageSize,
                    image: null,
                    description: ''
                };
                appendImage(componentData);
                break;

            default:
                throw new Error(`Unknown element type: ${elementType}`);
        }

        // make input ordered
        dispatch(addDetailsComponent({
            componentType: elementType,
            componentData
        }))
    }, [])

    const deleteInput = useCallback((
        element: OrderComponent,
    ) => {
        const elementType = element.componentType
        const orderId = element.componentData.orderId

        let filedArrayIndex: number = -1
        let fieldArrayRemove: UseFieldArrayRemove | undefined = undefined

        switch (elementType) {
            case DetailsFormDataEnum.TITLES:
                fieldArrayRemove = removeTitle
                filedArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.TITLES>(orderId, titleFields)
                break;

            case DetailsFormDataEnum.PARAGRAPHS:
                fieldArrayRemove = removeParagraph
                filedArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.PARAGRAPHS>(orderId, paragraphFields)
                break;

            case DetailsFormDataEnum.QUOUTES:
                fieldArrayRemove = removeQuoute
                filedArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.QUOUTES>(orderId, quouteFields)
                break;

            case DetailsFormDataEnum.LISTS:
                fieldArrayRemove = removeList
                filedArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.LISTS>(orderId, listFields)
                break;

            case DetailsFormDataEnum.IMAGES:
                fieldArrayRemove = removeImage
                filedArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.IMAGES>(orderId, imageFields)

                // remove image from indexedDB
                const imageName = (element.componentData as ImageFormData).image
                if (imageName) del(imageName, store)
                break;

            default:
                break;
        }

        if (filedArrayIndex === -1 || !fieldArrayRemove) return
        fieldArrayRemove(filedArrayIndex)

        // remove ordered component from redux
        dispatch(removeDetailsComponent(orderId))
    }, [titleFields, paragraphFields, quouteFields, listFields, imageFields])

    const formInputsToRender = [
        titles && {
            label: 'Заголовок',
            createInputHandler: () => createInput({ elementType: DetailsFormDataEnum.TITLES })
        },
        paragraphs && {
            label: 'Абзац',
            createInputHandler: () => createInput({ elementType: DetailsFormDataEnum.PARAGRAPHS })
        },
        quoutes && {
            label: 'Цитата',
            createInputHandler: () => createInput({ elementType: DetailsFormDataEnum.QUOUTES })
        },
        lists && {
            label: 'Нумерований список',
            createInputHandler: () => createInput({
                elementType: DetailsFormDataEnum.LISTS,
                listNumerable: true
            })
        },
        lists && {
            label: 'Маркований список',
            createInputHandler: () => createInput({
                elementType: DetailsFormDataEnum.LISTS,
                listNumerable: false
            })
        },
        images && {
            label: 'Велика картинка',
            createInputHandler: () => createInput({
                elementType: DetailsFormDataEnum.IMAGES,
                imageSize: 'big'
            })
        },
        images && {
            label: 'Мала картинка',
            createInputHandler: () => createInput({
                elementType: DetailsFormDataEnum.IMAGES,
                imageSize: 'small'
            })
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
                                handleDelete={() => deleteInput(element)}
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
                                                componentData={element}
                                                index={index}
                                                register={register}
                                                orderSliceName={orderSliceName}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.PARAGRAPHS:
                                            const fieldParagraphArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.PARAGRAPHS>(element.componentData.orderId, paragraphFields)
                                            const fieldParagraphArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.PARAGRAPHS>(element.componentData.orderId, paragraphFields)

                                            return <DetailsParagraphInput<DetailsFormData>
                                                key={fieldParagraphArrayId}
                                                name={`${DetailsFormDataEnum.PARAGRAPHS}.${fieldParagraphArrayIndex}.text`}
                                                componentData={element}
                                                index={index}
                                                register={register}
                                                orderSliceName={orderSliceName}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.QUOUTES:
                                            const fieldQuouteArrayId = getFieldArrayIdByOrderId<DetailsFormDataEnum.QUOUTES>(element.componentData.orderId, quouteFields)
                                            const fieldQuouteArrayIndex = getFieldArrayIndexByOrderId<DetailsFormDataEnum.QUOUTES>(element.componentData.orderId, quouteFields)

                                            return <DetailsQuouteInput<DetailsFormData>
                                                key={fieldQuouteArrayId}
                                                name={`${DetailsFormDataEnum.QUOUTES}.${fieldQuouteArrayIndex}.text`}
                                                authorName={`${DetailsFormDataEnum.QUOUTES}.${fieldQuouteArrayIndex}.author`}
                                                componentData={element}
                                                index={index}
                                                register={register}
                                                orderSliceName={orderSliceName}
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
                                                componentData={element}
                                                index={index}
                                                register={register}
                                                setValue={setValue}
                                                orderSliceName={orderSliceName}
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
                                                componentData={element}
                                                index={index}
                                                imageName={`${DetailsFormDataEnum.IMAGES}.${fieldImageArrayIndex}.image`}
                                                register={register}
                                                orderSliceName={orderSliceName}
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