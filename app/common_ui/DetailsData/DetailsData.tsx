import { DetailsDataParagraph } from "@/app/common_ui/DetailsData/DetailsDataParagraph/DetailsDataParagraph";
import { DetailsDataTitle } from "@/app/common_ui/DetailsData/DetailsDataTitle/DetailsDataTitle";
import { parseDetailsResponseToOrderArray } from "@/app/services/server/details.service";
import {
	DetailsFormDataEnum,
	DetailsRedactorType,
	ParagraphFormDataEnum,
	TitleFormDataEnum,
} from "@/app/types/data/details.type";
import styles from "./DetailsData.module.scss";

interface DetailsDataProps {
	data: DetailsRedactorType;
	isLegalInfo?: boolean;
}

export default function DetailsData({ data, isLegalInfo }: DetailsDataProps) {
	const parsedData = parseDetailsResponseToOrderArray(data);
	console.log("parsedData: ", parsedData);
	return (
		<section className={styles.container}>
			{parsedData.map((element, i) => {
				switch (element.type) {
					case DetailsFormDataEnum.TITLES:
						return (
							<DetailsDataTitle
								title={element[TitleFormDataEnum.TITLE]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.PARAGRAPHS:
						return (
							<DetailsDataParagraph
								text={element[ParagraphFormDataEnum.TEXT]}
								isLegalInfo={isLegalInfo}
								key={i}
							/>
						);
				}
			})}
		</section>
	);
}
