import { DetailsDataImage } from "@/app/common_ui/DetailsData/DetailsDataImage/DetailsDataImage";
import { DetailsDataImagePreview } from "@/app/common_ui/DetailsData/DetailsDataImage/Preview/DetailsDataImagePreview";
import { DetailsDataList } from "@/app/common_ui/DetailsData/DetailsDataList/DetailsDataList";
import { DetailsDataParagraph } from "@/app/common_ui/DetailsData/DetailsDataParagraph/DetailsDataParagraph";
import { DetailsDataQuote } from "@/app/common_ui/DetailsData/DetailsDataQuote/DetailsDataQuoute";
import { DetailsDataTitle } from "@/app/common_ui/DetailsData/DetailsDataTitle/DetailsDataTitle";
import { getIndexedDBStoreNameForDetailsImages } from "@/app/services/admin/details.service";
import {
	DetailsFormDataEnum,
	DetailsOrderSliceNameType,
	ImageFormDataEnum,
	ListFormDataEnum,
	ParagraphFormDataEnum,
	QuoteFormDataEnum,
	TitleFormDataEnum,
} from "@/app/types/data/details.type";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import styles from "../DetailsData.module.scss";

export default function DetailsDataPreview({
	orderSliceName,
}: {
	orderSliceName: DetailsOrderSliceNameType;
}) {
	const parsedData = useAppSelector((state: RootState) => state[orderSliceName].order);
	const imageStoreName = getIndexedDBStoreNameForDetailsImages(orderSliceName);
	console.log("parsedData: ", parsedData);

	return (
		<section className={styles.container}>
			{parsedData.map((element, i) => {
				switch (element.type) {
					case DetailsFormDataEnum.TITLES:
						return (
							<DetailsDataTitle
								title={element.data[TitleFormDataEnum.TITLE]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.PARAGRAPHS:
						return (
							<DetailsDataParagraph
								text={element.data[ParagraphFormDataEnum.TEXT]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.QUOTES:
						return (
							<DetailsDataQuote
								text={element.data[QuoteFormDataEnum.TEXT]}
								author={element.data[QuoteFormDataEnum.AUTHOR]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.LISTS:
						return (
							<DetailsDataList
								numerable={element.data[ListFormDataEnum.NUMERABLE]}
								options={element.data[ListFormDataEnum.OPTIONS]}
								key={i}
							/>
						);

					case DetailsFormDataEnum.IMAGES:
						return (
							<DetailsDataImagePreview
								description={element.data[ImageFormDataEnum.DESCRIPTION]}
								image={element.data[ImageFormDataEnum.IMAGE]}
								imageStoreName={imageStoreName}
								size={element.data[ImageFormDataEnum.SIZE]}
								key={i}
							/>
						);
				}
			})}
		</section>
	);
}
