import {
	DetailsFormDataEnum,
	QuoteFormComponentProps,
} from "@/app/types/data/details.type";
import React from "react";
import styles from "./DetailsQuouteInput.module.scss";
import { useOrderedFormInput } from "@/app/utils/hooks/admin/detailsForm/useOrderedFormInput";
import AutoResizingTextarea from "@/app/common_ui/form_components/basic_components/AutoResizingTextarea/AutoResizingTextarea";
import { ErrorWrapper } from "@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper";

export default function DetailsQuoteInput({
	index,
	componentData,
	className,
	orderSliceName,
}: QuoteFormComponentProps) {
	const { handleChange } = useOrderedFormInput(orderSliceName);
	const { text, author } = componentData.data;
	const quoteErrors = componentData.error;

	const handleChangeProps = {
		componentData,
		index,
	};

	return (
		<div
			id={DetailsFormDataEnum.QUOTES + index}
			className={`${styles.container} ${className?.container}`}
		>
			<div className={`${styles.sideLine}`}></div>
			<ErrorWrapper
				error={quoteErrors.text.message}
				className={{ errorWrapper: styles.textErrorWrapper }}
			>
				<AutoResizingTextarea
					className={`${styles.text} ${className?.quote || ""}`}
					placeholder="Текст цитати"
					padding={0}
					minRows={1}
					lineHeight={26}
					value={text}
					onChange={(e) => {
						handleChange<HTMLTextAreaElement>({
							e,
							keyOfValueToChange: "text",
							...handleChangeProps,
						});
					}}
				/>
			</ErrorWrapper>

			<ErrorWrapper
				error={quoteErrors.author.message}
				className={{ error: styles.authorError }}
			>
				<input
					type="text"
					className={`${styles.author} ${className?.author}`}
					placeholder="Автор цитати"
					value={author}
					onChange={(e) => {
						handleChange<HTMLInputElement>({
							e,
							keyOfValueToChange: "author",
							...handleChangeProps,
						});
					}}
				/>
			</ErrorWrapper>
		</div>
	);
}
