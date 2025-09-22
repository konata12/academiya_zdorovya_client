import { DetailsDataImage } from "@/app/common_ui/DetailsData/DetailsDataImage/DetailsDataImage";
import { DetailsDataList } from "@/app/common_ui/DetailsData/DetailsDataList/DetailsDataList";
import { DetailsDataParagraph } from "@/app/common_ui/DetailsData/DetailsDataParagraph/DetailsDataParagraph";
import { DetailsDataQuote } from "@/app/common_ui/DetailsData/DetailsDataQuote/DetailsDataQuoute";
import { DetailsDataTitle } from "@/app/common_ui/DetailsData/DetailsDataTitle/DetailsDataTitle";
import { parseDetailsResponseToOrderArray } from "@/app/services/server/details.service";
import {
	DetailsFormDataEnum,
	ImageFormDataEnum,
	ListFormDataEnum,
	ParagraphFormDataEnum,
	QuoteFormDataEnum,
	TitleFormDataEnum,
	UserDetailsRedactorType,
} from "@/app/types/data/details.type";
import styles from "./DetailsData.module.scss";

interface DetailsDataProps {
	data: UserDetailsRedactorType;
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

					case DetailsFormDataEnum.QUOTES:
						return (
							<DetailsDataQuote
								text={element[QuoteFormDataEnum.TEXT]}
								author={element[QuoteFormDataEnum.AUTHOR]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.LISTS:
						return (
							<DetailsDataList
								numerable={element[ListFormDataEnum.NUMERABLE]}
								options={element[ListFormDataEnum.OPTIONS]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.IMAGES:
						return (
							<DetailsDataImage
								description={element[ImageFormDataEnum.DESCRIPTION]}
								image={element[ImageFormDataEnum.IMAGE]}
								size={element[ImageFormDataEnum.SIZE]}
								key={i}
							/>
						);
				}
			})}
		</section>
	);
}
