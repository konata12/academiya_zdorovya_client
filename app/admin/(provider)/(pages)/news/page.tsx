"use client";

import React, { useEffect } from "react";
import styles from "./page.module.scss";
import { clear } from "idb-keyval";
import {
	closeNewsModal,
	deleteNews as deleteNewsAction,
	fetchNews,
	openNewsModal,
	resetNewsUpdateError,
	toggleIsBannerNews as toggleIsBannerNewsAction,
} from "@/app/utils/redux/news/newsSlice";
import { getIndexedDBStoreForImages } from "@/app/utils/hooks/admin/indexedDB/useIndexedDBStoreForImages";
import { News } from "@/app/types/data/news.type";
import { parseDetailsResponseToOrderComponentArray } from "@/app/services/details.service";
import { RootState } from "@/app/utils/redux/store";
import { setAllNewsFormUpdateDataOnLink } from "@/app/utils/redux/news/newsUpdateFormSlice";
import { setInitialDataOnLink } from "@/app/utils/redux/details/news/newsUpdateDetailsOrderSlice";
import { transferNewsImagesBetweenIndexDBStores } from "@/app/services/news.service";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { useParsedDate } from "@/app/utils/hooks/common/useParsedDate";
import { useRouter } from "next/navigation";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";

const titles = ["Назва", "Дата публікування", "Опції"];
const storeName = "news_images";
const updateStoreName = "news_update_images";

export default function page() {
	const { news, newsIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.news,
	);
	const { getParsedDateString } = useParsedDate();

	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(fetchNews());
	}, []);

	const deleteNews = async (id: number) => {
		dispatch(deleteNewsAction(id));
	};

	const openModalWindow = (i: number) => {
		dispatch(openNewsModal(i));
	};
	const closeModalWindow = (i: number) => {
		dispatch(closeNewsModal(i));
	};
	const toggleIsBannerNews = (id: number) => {
		dispatch(toggleIsBannerNewsAction(id));
	};
	// LOAD DATA TO FORM AND ORDER SLICES AND LOAD IMAGES TO UPLOAD STORE
	const linkToUpdatePage = async (news: News) => {
		const setStore = getIndexedDBStoreForImages(updateStoreName);
		// CLEAR PREVIOUS NEWS UPDATE FORM DATA IMAGES
		await clear(setStore);
		// PARSE DETAILS TO REDUX TYPE
		const parsedDetails = parseDetailsResponseToOrderComponentArray(news.details);

		// TRANSFER IMAGES TO ANOTHER STORE
		await transferNewsImagesBetweenIndexDBStores(news, storeName, updateStoreName);

		// SET DATA TO UPDATE SLICES
		dispatch(resetNewsUpdateError());
		dispatch(setAllNewsFormUpdateDataOnLink(news));
		dispatch(setInitialDataOnLink(parsedDetails));
		router.push(`news/update/${news.id}`);
	};

	return (
		<div>
			<p className={`title lg`}>Новини</p>

			<div className={styles.allNews}>
				<CommonTable titles={titles}>
					{!news.length ? (
						<CommonTable404
							error={error}
							status={status}
							notFoundMessage="Немає новин"
						/>
					) : (
						news.map((news, i) => (
							<TableLine key={news.id}>
								<span>{news.title}</span>
								<span>{getParsedDateString(news.createdAt)}</span>

								{newsIsModalOpen[i] && (
									<DeleteModalWindow
										title="Ви дійсно бажаєте видалити цю новину?"
										error={error}
										index={i}
										id={news.id}
										closeModalHandler={closeModalWindow}
										deleteHandler={deleteNews}
									/>
								)}

								<span className={styles.tableLineOptions}>
									<button
										onClick={() => {
											openModalWindow(i);
										}}
										className={`btn gray sm`}
									>
										Видалити
									</button>
									<button
										className={`btn blue sm`}
										onClick={() => linkToUpdatePage(news)}
									>
										Змінити
									</button>

									<button
										className={styles.starBtn}
										onClick={(e) => {
											// DISABLE BUTTON FOR 1 SECOND
											const button = e.currentTarget;
											button.disabled = true;
											setTimeout(() => {
												button.disabled = false;
											}, 1000);

											// MAKE REQUEST TO SERVER
											toggleIsBannerNews(news.id);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="-2 -2 24 24"
											fill="none"
										>
											<path
												d="M18.3323 6.08008C19.0323 6.08008 19.6589 6.53696 19.8989 7.2214C20.1389 7.90585 19.9423 8.67541 19.4073 9.14445L15.4656 12.492L17.0956 17.6687C17.319 18.3688 17.0923 19.1401 16.5306 19.5918C15.9673 20.0417 15.1956 20.073 14.604 19.6717L10.0157 16.5569L5.50243 19.7064C5.22077 19.9027 4.89744 20 4.57411 20C4.22245 20 3.86912 19.8853 3.57412 19.6543C3.00746 19.2131 2.7708 18.4452 2.98413 17.7434L4.55078 12.5059L0.589156 9.14618C0.0558293 8.67541 -0.139167 7.90758 0.102497 7.22314C0.34416 6.54043 0.969152 6.0853 1.66748 6.0853H6.66575L8.43573 1.1309C8.67906 0.451663 9.30239 0 9.99738 0C10.6924 0 11.3157 0.449926 11.559 1.1309L13.329 6.0853H18.3289L18.3323 6.08008Z"
												fill={news.isBannerNews ? "#004BAE" : "none"}
												stroke="#004BAE"
												strokeWidth="2"
											/>
										</svg>
									</button>
								</span>
							</TableLine>
						))
					)}
				</CommonTable>

				<SafeLink
					className={`btn blue xl ${styles.addButton}`}
					href={"/admin/news/create"}
				>
					Додати новину
				</SafeLink>
			</div>
		</div>
	);
}
