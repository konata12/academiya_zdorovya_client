import { DetailsFormDataEnum, DetailsRedactorType } from "@/app/types/data/details.type";
import {
	OrderUserDetailsComponent,
	UserDetailsImageComponent,
	UserDetailsListComponent,
	UserDetailsParagraphComponent,
	UserDetailsQuoteComponent,
	UserDetailsTitleComponent,
} from "@/app/types/data/server/details.type";

export function parseDetailsResponseToOrderArray(
	details: DetailsRedactorType,
): OrderUserDetailsComponent[] {
	const parsedTitles: UserDetailsTitleComponent[] = details.titles.map((title) => {
		return {
			...title,
			type: DetailsFormDataEnum.TITLES,
		};
	});
	const parsedParagraphs: UserDetailsParagraphComponent[] = details.paragraphs.map(
		(paragraph) => {
			return {
				...paragraph,
				type: DetailsFormDataEnum.PARAGRAPHS,
			};
		},
	);
	const parsedQuotes: UserDetailsQuoteComponent[] = details.quotes.map((quote) => {
		return {
			...quote,
			type: DetailsFormDataEnum.QUOTES,
		};
	});
	const parsedLists: UserDetailsListComponent[] = details.lists.map((list) => {
		return {
			...list,
			type: DetailsFormDataEnum.LISTS,
		};
	});
	const parsedImages: UserDetailsImageComponent[] = details.images.map((image) => {
		return {
			...image,
			type: DetailsFormDataEnum.IMAGES,
		};
	});

	return [
		...parsedTitles,
		...parsedParagraphs,
		...parsedQuotes,
		...parsedLists,
		...parsedImages,
	].sort((a, b) => a.order - b.order);
}
