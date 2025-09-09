import styles from "./DetailsDataParagraph.module.scss";

interface DetailsDataParagraphProps {
	text: string;
	isLegalInfo?: boolean;
}

export function DetailsDataParagraph({ text, isLegalInfo }: DetailsDataParagraphProps) {
	return (
		<p className={`${styles.paragraph} ${isLegalInfo ? styles.legalInfo : ""}`}>{text}</p>
	);
}
