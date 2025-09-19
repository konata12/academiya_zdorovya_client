import { NewsCarousel } from "@/app/(client)/ui/common/sections/NewsCarousel/NewsCarousel";
import { fetchBannerNews } from "@/app/services/server/fetchData.service";

export async function NewsCarouselFetchContainer() {
	const news = await fetchBannerNews();
	console.log("banner news", news);

	return <NewsCarousel news={news} />;
}
