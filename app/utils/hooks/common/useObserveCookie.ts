import { useEffect, useState } from "react";

export function useObserveCookie(name: string, intervalMs = 500) {
	const [value, setValue] = useState<string | null>(null);

	useEffect(() => {
		function readCookie() {
			const match = document.cookie
				.split("; ")
				.find((row) => row.startsWith(`${name}=`));
			return match ? decodeURIComponent(match.split("=")[1]) : null;
		}

		setValue(readCookie()); // initial read

		const interval = setInterval(() => {
			setValue(readCookie());
		}, intervalMs);

		return () => clearInterval(interval);
	}, [name, intervalMs]);

	return value;
}
