import React, { RefObject, useEffect, useRef } from "react";

export interface UseSelectProps {
	setShowList: React.Dispatch<React.SetStateAction<boolean>>;
	parentRef: RefObject<HTMLDivElement | null>;
}

export function useSelect({ setShowList, parentRef }: UseSelectProps) {
	const listRef = useRef<HTMLDivElement>(null);

	// HANDLE OUTSIDE CLICK CLOSE
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const departmentEl = parentRef?.current;
			// Check if click target is NOT inside the referenced element
			if (
				listRef.current &&
				!listRef.current.contains(event.target as Node) &&
				(!departmentEl || !departmentEl.contains(event.target as Node))
			) {
				setShowList(false);
			}
		}

		// Attach listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [listRef]);

	return { listRef };
}
