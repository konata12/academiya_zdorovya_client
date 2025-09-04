import { useEffect, useRef, useState } from "react";

export function useElementWidth(parentNodeLayer: number = 0) {
	const [width, setWidth] = useState(1440);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) return;

		let target: HTMLElement | null = ref.current;
		for (let i = 0; i < parentNodeLayer; i++) {
			target = target?.parentElement ?? null;
		}

		if (!target) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(entry.contentRect.width);
			}
		});

		observer.observe(target);

		// set initial
		setWidth(target.offsetWidth);

		return () => observer.disconnect();
	}, [parentNodeLayer]);

	return {
		width,
		ref,
	};
}
