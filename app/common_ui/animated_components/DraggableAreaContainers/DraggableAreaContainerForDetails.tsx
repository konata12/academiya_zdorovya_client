import React from "react";
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { OrderComponent } from "@/app/types/data/details.type";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface DraggableAreaContainerForDetailsProps {
	handleDragEnd: (event: DragEndEvent, order: OrderComponent[]) => void;
	dndContextId: string;
	order: OrderComponent[];
	children: React.ReactNode;
	droppableAreaClassName: string;
}

export function DraggableAreaContainerForDetails({
	handleDragEnd,
	dndContextId,
	order,
	children,
	droppableAreaClassName,
}: DraggableAreaContainerForDetailsProps) {
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
	return (
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
				<div ref={setNodeRef} className={droppableAreaClassName}>
					{children}
				</div>
			</SortableContext>
		</DndContext>
	);
}
