import { DraggableComponent } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer";
import { OrderElementBasicType } from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";

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