import { NewsCarousel } from "@/app/(client)/ui/common/sections/NewsCarousel/NewsCarousel";
import { fetchBannerNews } from "@/app/services/server/fetchData.service";

export async function NewsCarouselFetchContainer() {
	const news = await fetchBannerNews();

	return <NewsCarousel news={news} />;
}
