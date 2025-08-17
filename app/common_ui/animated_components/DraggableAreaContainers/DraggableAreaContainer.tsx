import React from "react";
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { DraggableComponentsDataType } from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export interface DraggableComponent {
	orderId: string;
}
interface DraggableAreaContainerProps<T extends DraggableComponentsDataType> {
	handleDragEnd: (event: DragEndEvent, data: T) => void;
	dndContextId: string;
	data: T;
	children: React.ReactNode;
	droppableAreaClassName: string;
}

export function DraggableAreaContainer<T extends DraggableComponentsDataType>({
	handleDragEnd,
	dndContextId,
	data,
	children,
	droppableAreaClassName,
}: DraggableAreaContainerProps<T>) {
	const { setNodeRef } = useDroppable({
		id: dndContextId,
	});
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // Require 8px movement to start dragging
			},
		}),
	);
	const { order } = data;

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={(e) => handleDragEnd(e, data)}
			modifiers={[restrictToVerticalAxis, restrictToParentElement]}
		>
			<SortableContext
				items={order ? order.map((element) => element.orderId) : []}
				strategy={verticalListSortingStrategy}
			>
				{/* DROPPABLE AREA */}
				<div ref={setNodeRef} className={droppableAreaClassName}>
					{children}
				</div>
			</SortableContext>
		</DndContext>
	);
}
