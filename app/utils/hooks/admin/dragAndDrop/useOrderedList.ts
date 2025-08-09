import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { ServiceEmployeeFormData, ServiceFormDataEnum, ServiceTreatmentTypeServiceFormData } from '@/app/types/data/services.type';
import { setServiceCreateEmployees, setServiceCreateTreatmentTypes } from '@/app/utils/redux/services/serviceCreateFormSlice';
import { useAppDispatch } from '@/app/utils/redux/hooks';
import { useCallback } from 'react';

export interface OrderElementBasicType {
    order: number
}

export interface OrderedListServiceEmployeeInterface {
    order: ServiceEmployeeFormData[],
    valueName: ServiceFormDataEnum.EMPLOYEES,
    sliceName: 'servicesCreateForm',
}
export interface OrderedListServiceTreatmentTypeInterface {
    order: ServiceTreatmentTypeServiceFormData[],
    valueName: ServiceFormDataEnum.TREATMENTTYPES,
    sliceName: 'servicesCreateForm',
}
export type DraggableComponentsDataType = OrderedListServiceEmployeeInterface
    | OrderedListServiceTreatmentTypeInterface
export type DraggableComponentsType = ServiceEmployeeFormData
    | ServiceTreatmentTypeServiceFormData

export function useOrderedList() {
    const dispatch = useAppDispatch()

    const handleDragEnd = useCallback((
        event: DragEndEvent,
        data: DraggableComponentsDataType
    ) => {
        const {
            order,
            valueName,
            sliceName,
        } = data
        const { active, over } = event


        if (!over) return
        if (active.id === over.id) return

        // Find the actual items in the order array
        const activeItemIndex = order.findIndex(item => item.orderId === active.id)
        const overItemIndex = order.findIndex(item => item.orderId === over.id)

        if (activeItemIndex === -1 || overItemIndex === -1) return

        // Create the new ordered array
        switch (sliceName) {
            case 'servicesCreateForm':
                switch (valueName) {
                    case ServiceFormDataEnum.TREATMENTTYPES:
                        dispatch(setServiceCreateTreatmentTypes(arrayMove(order, activeItemIndex, overItemIndex)))
                        break;

                    case ServiceFormDataEnum.EMPLOYEES:
                        dispatch(setServiceCreateEmployees(arrayMove(order, activeItemIndex, overItemIndex)))
                        break;
                }
        }
    }, [])

    return handleDragEnd
}