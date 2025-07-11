import React, { useCallback } from 'react';
import styles from './DetailsForm.module.scss';
import {
    DescriptionImage,
    DescriptionImageSize,
    DescriptionList,
    DescriptionParagraph,
    DescriptionQuoute,
    DescriptionTitle,
    DetailsFormDataEnum,
    DetailsFormDataEnumType,
    DetailsFormDataErrorType,
    DetailsFormDataType,
    DetailsFromProps,
    DetailsRedactorType,
    ImageError,
    ImageFormData,
    ListError,
    ListFormData,
    OrderComponent,
    ParagraphFormData,
    QuouteError,
    QuouteFormData,
    TitleFormData,
} from '@/app/types/data/details.type';
import {
    DndContext,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { RootState } from '@/app/utils/redux/store';

import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks';
import { useDetailsFormSelectSlice } from '@/app/utils/hooks/admin/detailsForm/useDetailsFormSelectSlice';
import { useOrderedForm } from '@/app/utils/hooks/admin/detailsForm/useOrderedForm';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import DetailsTitleInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsTitleInput/DetailsTitleInput'
import CreateDetailsInputBtn from '@/app/admin/(provider)/ui/Forms/details/createDetailsInputBtn/CreateDetailsInputBtn'
import SubmitButton from '@/app/admin/(provider)/ui/Forms/common/submitButton/SubmitButton'
import DetailsDraggableContainer from '@/app/admin/(provider)/ui/Forms/details/inputs/DetailsDraggableContainer';
import DetailsParagraphInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsParagraphInput/DetailsParagraphInput';
import DetailsQuouteInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsQuouteInput/DetailsQuouteInput';
import DetailsListInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsListInput/DetailsListInput';
import DetailsImageInput from '@/app/admin/(provider)/ui/Forms/details/inputs/detailsImageInput/DetailsImageInput';
import { getIndexedDBStoreForDetailsImages } from '@/app/services/details.service';


export default function DetailsForm({
    titles,
    paragraphs,
    quoutes,
    lists,
    images,

    // need for determining which order slice to use
    orderSliceName = 'newsDetailsOrder',
}: DetailsFromProps) {
    const order = useAppSelector((state: RootState) => state.newsDetailsOrder.order)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const {
        handleDragEnd,
    } = useOrderedForm(orderSliceName)
    const {
        addDetailsComponent,
        removeDetailsComponent,
        setDetailsComponentError,

        submitForm,
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

    const imageStoreName = getIndexedDBStoreForDetailsImages(orderSliceName)

    // FORM SUBMIT
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errorsData: {
            error: DetailsFormDataErrorType,
            id: string
        }[] = []

        const titles: DescriptionTitle[] = []
        const paragraphs: DescriptionParagraph[] = []
        const quoutes: DescriptionQuoute[] = []
        const lists: DescriptionList[] = []
        const images: DescriptionImage[] = []

        order.forEach((orderComponent, index) => {
            switch (orderComponent.type) {
                case DetailsFormDataEnum.TITLES: {
                    const title = orderComponent.data.title

                    // VALIDATE
                    if (!title.length) {
                        const error = { title: { message: 'Заповніть заголовок' } }
                        const id = DetailsFormDataEnum.TITLES + index

                        dispatch(setDetailsComponentError({
                            index,
                            error,
                        }))

                        errorsData.push({ error, id })
                    }

                    // PASS DATA
                    titles.push({
                        title,
                        order: index
                    })
                    break;
                }
                case DetailsFormDataEnum.PARAGRAPHS: {
                    const text = orderComponent.data.text

                    if (!text.length) {
                        const error = { text: { message: 'Заповніть абзац' } }
                        const id = DetailsFormDataEnum.PARAGRAPHS + index

                        dispatch(setDetailsComponentError({
                            index,
                            error,
                        }))
                        errorsData.push({ error, id })
                    }

                    paragraphs.push({
                        text,
                        order: index
                    })
                    break;
                }
                case DetailsFormDataEnum.QUOUTES: {
                    const { text, author } = orderComponent.data

                    // Check if there are any errors
                    if (!text.length || !author.length) {
                        const error: QuouteError = {
                            text: { message: !text.length ? 'Заповніть цитату' : '' },
                            author: { message: !author.length ? 'Введіть автора' : '' },
                        };
                        const id = DetailsFormDataEnum.QUOUTES + index


                        dispatch(setDetailsComponentError({
                            index,
                            error,
                        }));
                        errorsData.push({ error, id })
                    }

                    quoutes.push({
                        text,
                        author,
                        order: index
                    })
                    break;
                }
                case DetailsFormDataEnum.LISTS: {
                    const { options, numerable } = orderComponent.data;
                    const listErrors: ListError = {
                        options: []
                    };

                    // Check if there are any errors
                    listErrors.options = orderComponent.data.options.map((option, i) => {
                        return option.length
                            ? { message: '' }
                            : { message: 'Введіть пункт списку' }
                    })
                    const containsError = !!(listErrors.options.filter(optionMessage => optionMessage.message.length > 0).length)
                    if (containsError) {
                        dispatch(setDetailsComponentError({
                            index,
                            error: listErrors,
                        }));
                        errorsData.push({
                            error: listErrors,
                            id: DetailsFormDataEnum.LISTS + index
                        })
                    }

                    lists.push({
                        options,
                        numerable,
                        order: index
                    })
                    break;
                }
                case DetailsFormDataEnum.IMAGES:
                    const { image, description } = orderComponent.data

                    // Check if there are any errors
                    if ((!image || !image?.length) || !description.length) {
                        const error: ImageError = {
                            image: { message: (!image || !image?.length) ? 'Завантажте зображення' : '' },
                            description: { message: !description.length ? 'Введіть опис' : '' },
                        };
                        const id = DetailsFormDataEnum.IMAGES + index

                        dispatch(setDetailsComponentError({
                            index,
                            error,
                        }));
                        errorsData.push({ error, id })
                    }

                    images.push({
                        image: image || '', //if image is empty or is null, there will be return of function after switch
                        size: orderComponent.data.size,
                        description: orderComponent.data.description,
                        order: index
                    })
                    break;

                default:
                    break;
            }
        })

        // FORM VALIDATION
        if (errorsData.length) {
            // SCROLL TO INPUT
            (document.querySelector(`#${errorsData[0].id}`) as HTMLInputElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            return
        }

        const parsedFormData: DetailsRedactorType = {
            titles,
            paragraphs,
            quoutes,
            lists,
            images
        }

        dispatch(submitForm(parsedFormData))
        router.push('./')
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
        let newComponent: OrderComponent

        // create input
        switch (elementType) {
            case DetailsFormDataEnum.TITLES:
                newComponent = {
                    type: DetailsFormDataEnum.TITLES,
                    data: {
                        orderId,
                        title: ''
                    },
                    error: {
                        title: { message: '' }
                    }
                }
                break;

            case DetailsFormDataEnum.PARAGRAPHS:
                newComponent = {
                    type: DetailsFormDataEnum.PARAGRAPHS,
                    data: {
                        orderId,
                        text: '',
                    },
                    error: {
                        text: { message: '' }
                    }
                }
                break;

            case DetailsFormDataEnum.QUOUTES:
                newComponent = {
                    type: DetailsFormDataEnum.QUOUTES,
                    data: {
                        orderId,
                        text: '',
                        author: '',
                    },
                    error: {
                        text: { message: '' },
                        author: { message: '' },
                    }
                }
                break;

            case DetailsFormDataEnum.LISTS:
                newComponent = {
                    type: DetailsFormDataEnum.LISTS,
                    data: {
                        orderId,
                        options: [''],
                        numerable: listNumerable
                    },
                    error: {
                        options: [{ message: '' }]
                    }
                }
                break;

            case DetailsFormDataEnum.IMAGES:
                newComponent = {
                    type: DetailsFormDataEnum.IMAGES,
                    data: {
                        orderId,
                        size: imageSize,
                        image: null,
                        description: ''
                    },
                    error: {
                        image: { message: '' },
                        description: { message: '' },
                    }
                }
                break;

            default:
                throw new Error(`Unknown element type: ${elementType}`);
        }

        // make input ordered
        dispatch(addDetailsComponent(newComponent))
    }, [])

    const deleteInput = useCallback((
        element: OrderComponent,
    ) => {
        // remove ordered component from redux
        dispatch(removeDetailsComponent(element.data.orderId))
    }, [])

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
        <form onSubmit={handleSubmit}>
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
                    items={order.map((element) => element.data.orderId)}
                    strategy={horizontalListSortingStrategy}
                >
                    {/* DROPPABLE AREA */}
                    <div
                        ref={setNodeRef}
                        className={styles.mainBody}
                    >
                        {order.map((element, index) => {
                            return <DetailsDraggableContainer
                                id={element.data.orderId}
                                elementType={element.type}
                                index={index}
                                handleDelete={() => deleteInput(element)}
                                key={index}
                            >
                                {(() => {
                                    const componentData = element.data
                                    const key = componentData.orderId

                                    switch (element.type) {
                                        case DetailsFormDataEnum.TITLES:
                                            return <DetailsTitleInput
                                                key={key}
                                                componentData={element}
                                                index={index}
                                                orderSliceName={orderSliceName}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.PARAGRAPHS:
                                            return <DetailsParagraphInput
                                                key={key}
                                                componentData={element}
                                                index={index}
                                                orderSliceName={orderSliceName}
                                                className={styles.orderedComponent}
                                            />

                                        case DetailsFormDataEnum.QUOUTES:
                                            return <DetailsQuouteInput
                                                key={key}
                                                componentData={element}
                                                index={index}
                                                orderSliceName={orderSliceName}
                                                className={{
                                                    quoute: styles.orderedComponent,
                                                    author: styles.orderedComponent,
                                                    container: styles.orderedComponent,
                                                }}
                                            />

                                        case DetailsFormDataEnum.LISTS:
                                            return <DetailsListInput
                                                key={key}
                                                componentData={element}
                                                index={index}
                                                orderSliceName={orderSliceName}
                                                className={{
                                                    option: styles.orderedComponent,
                                                    container: styles.orderedComponent,
                                                }}
                                            />

                                        case DetailsFormDataEnum.IMAGES:
                                            return <DetailsImageInput
                                                key={key}
                                                componentData={element}
                                                index={index}
                                                orderSliceName={orderSliceName}
                                                indexedDBStoreName={imageStoreName}
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
                            </DetailsDraggableContainer>
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