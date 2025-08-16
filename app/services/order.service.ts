import { DraggableComponent } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer";
import { OrderElementBasicType } from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";
import { v4 as uuidv4 } from 'uuid';

export function parseOrderedArrayToRequest<T extends DraggableComponent>(
    arr: T[]
): (Omit<T, "orderId"> & OrderElementBasicType)[] {
    return arr.map((element, i) => {
        const { orderId, ...data } = element;
        return {
            ...data,
            order: i
        };
    });
}

export function sortByOrderWithoutOrderId<T extends OrderElementBasicType>(
    arr: T[]
): (Omit<T, "order">)[] {
    return [...arr].sort((a, b) => {
        return a.order - b.order
    }).map(orderData => {
        const { order, ...data } = orderData;
        return data
    })
}
export function sortByOrderWithOrderId<T extends OrderElementBasicType>(
    arr: T[]
): (Omit<T, "order"> & DraggableComponent)[] {
    return [...arr].sort((a, b) => {
        return a.order - b.order
    }).map(orderData => {
        const { order, ...data } = orderData;
        return {
            ...data,
            orderId: uuidv4(),
        }
    })
}