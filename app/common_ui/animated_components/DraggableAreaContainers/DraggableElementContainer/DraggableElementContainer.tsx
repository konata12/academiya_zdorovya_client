import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import styles from "./DraggableElementContainer.module.scss";

export interface DraggableElementContainerProps {
	children: React.ReactNode;
	id: string;
	className?: string;
	hasDraggableArea?: boolean;
}

export function DraggableElementContainer({
	children,
	id,
	className,
	hasDraggableArea = false,
}: DraggableElementContainerProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({
			id,
		});
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 100 : "auto",
	};

	// Common container props
	const containerProps = {
		ref: setNodeRef,
		style,
		className: `${className} ${styles.container}`,
	};

	if (hasDraggableArea) {
		return (
			<div {...containerProps}>
				{/* Drag handle area - only this part will trigger dragging */}
				<div
					{...attributes}
					{...listeners}
					style={{ cursor: "grab" }}
					className={`${styles.drag}`}
				>
					<div className={styles.circle}></div>
					<div className={styles.circle}></div>
					<div className={styles.circle}></div>
				</div>
				{children}
			</div>
		);
	}

	// Entire container is draggable
	return (
		<div
			{...containerProps}
			{...attributes}
			{...listeners}
			style={{ ...style, cursor: "grab" }}
		>
			{children}
		</div>
	);
}
