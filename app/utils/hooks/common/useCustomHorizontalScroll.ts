import { RefObject, useCallback, useEffect, useState } from "react";

export function useCustomHorizontalScroll(ref: RefObject<HTMLElement | null>) {
	const [scrollWidth, setScrollWidth] = useState(0);
	const [scrollX, setScrollX] = useState(0);

	useEffect(() => {
		// ResizeObserver for dynamic changes
		const observer = new ResizeObserver((entries) => {
			if (ref.current) {
				const newContainerWidth = ref.current.offsetWidth;
				const scrolledDistance = ref.current.scrollLeft;
				const children = Array.from(ref.current.children);

				const newChildNodesTotalWidth = children.reduce((sum, child) => {
					const el = child as HTMLElement;
					return sum + el.offsetWidth;
				}, 0);

				if (newChildNodesTotalWidth > newContainerWidth) {
					setScrollWidth((newContainerWidth / newChildNodesTotalWidth) * 100);
					setScrollX(
						(scrolledDistance / newChildNodesTotalWidth) * newContainerWidth,
					);
				} else {
					setScrollWidth(0);
					setScrollX(0);
				}
			}
		});

		if (ref.current) {
			observer.observe(ref.current);
		}
		return () => observer.disconnect();
	}, []);

	const handleScroll = useCallback(() => {
		if (!ref.current) return;

		const newContainerWidth = ref.current.offsetWidth;
		const scrolledDistance = ref.current.scrollLeft;
		const children = Array.from(ref.current.children);

		const newChildNodesTotalWidth = children.reduce((sum, child) => {
			const el = child as HTMLElement;
			return sum + el.offsetWidth;
		}, 0);

		if (newChildNodesTotalWidth > newContainerWidth) {
			setScrollX((scrolledDistance / newChildNodesTotalWidth) * newContainerWidth);
		} else {
			setScrollX(0);
		}
	}, []);

	return {
		scrollWidth,
		scrollX,
		handleScroll,
	};
}
