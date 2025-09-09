import { useEffect, useState } from "react";

export function useSideNav(id?: string) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		function handleScroll() {
			if (!id) return;
			const coords = document.getElementById(id)?.getBoundingClientRect();

			if (!coords) return;

			if (coords.y + coords.height <= 300 || coords.y > 400) {
				setIsActive(false);
				return;
			}

			if (coords.y <= 400) {
				setIsActive(true);
			}
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return { isActive };
}
