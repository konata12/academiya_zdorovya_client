"use client";

import { useElementWidth } from "@/app/utils/hooks/common/useElementWidth";
import { CSSProperties } from "react";

export function DynamicRenderByWidth({
	children,
	notRenderWidth,
	parentNodeLayer,
	defaultWidth,
	className,
}: Readonly<{
	children: React.ReactNode;
	notRenderWidth: number;
	parentNodeLayer?: number;
	defaultWidth?: number;
	className?: string;
}>) {
	const { width, ref } = useElementWidth<HTMLDivElement>(parentNodeLayer, defaultWidth);
	// console.dir(ref.current?.parentElement?.parentElement);

	const styles: CSSProperties =
		width <= notRenderWidth
			? {
					height: 0,
					opacity: 0,
					width: 0,
					padding: 0,
					border: "none",
				}
			: {};

	return (
		<div ref={ref} style={styles} className={className || ""}>
			{children}
		</div>
	);
}
