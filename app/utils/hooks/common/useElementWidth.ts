import { useEffect, useRef, useState } from "react";

export function useElementWidth<T extends HTMLElement>(
	parentNodeLayer: number = 0,
	defaultWidth: number = 1440,
) {
	const [width, setWidth] = useState(defaultWidth);
	const ref = useRef<T>(null);

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
		// console.dir("target");
		// console.dir(target);
		setWidth(target.offsetWidth);

		return () => observer.disconnect();
	}, [parentNodeLayer]);

	return {
		width,
		ref,
	};
}
