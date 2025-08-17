import { useCombinedRefs } from "@/app/utils/hooks/common/useCombinedRefs";
import React, { useEffect, useRef, useState } from "react";

interface AutoResizingTextareaProps {
	ref: React.Ref<HTMLTextAreaElement>;
	lineHeight?: number;
	padding?: number;
	minRows?: number;
	maxRows?: number;
	style?: React.CSSProperties;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	[key: string]: any;
}

export default function AutoResizingTextareaHookForm({
	ref: externalRef,
	lineHeight = 24,
	padding = 24,
	minRows = 1,
	maxRows = 100,
	style,
	value: propValue,
	onChange: propOnChange,
	...props
}: AutoResizingTextareaProps) {
	const internalRef = useRef<HTMLTextAreaElement>(null);
	const combinedRef = useCombinedRefs<HTMLTextAreaElement>(
		externalRef,
		internalRef,
	);
	const [value, setValue] = useState(propValue || "");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		if (propOnChange) {
			propOnChange(e);
		}
	};

	useEffect(() => {
		const textarea = internalRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			const scrollHeight = textarea.scrollHeight;
			const rowHeight =
				parseInt(getComputedStyle(textarea).lineHeight) || lineHeight;
			const rows = Math.min(
				maxRows,
				Math.max(
					minRows,
					Math.floor((scrollHeight - padding * 2) / rowHeight),
				),
			);
			textarea.style.height = `${rows * rowHeight + padding * 2}px`;
		}
	}, [value, minRows, maxRows, lineHeight, padding]);

	return (
		<textarea
			ref={combinedRef}
			style={{
				resize: "none",
				overflow: "hidden",
				minHeight: `${minRows * lineHeight + padding * 2}px`,
				...style,
			}}
			rows={minRows}
			onChange={handleChange}
			{...props}
		/>
	);
}
