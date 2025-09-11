"use client";

import React, { useEffect } from "react";
import styles from "./page.module.scss";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { getLegalInformation } from "@/app/utils/redux/legal_information/legalInformationSlice";
import { useParsedDate } from "@/app/utils/hooks/common/useParsedDate";
import { useLegalInformationLinkToUpdatePage } from "@/app/utils/hooks/admin/legalInformation/useLegalInformationLinkToUpdatePage";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import { LegalInformationEnumType } from "@/app/types/data/legal_information.type";

const titles = ["Назва", "Статус", "Дата публікування", "Опції"];
const titleColumnNames = {
	privacyPolicy: "Політика конфіденційності",
	publicOffer: "Публічна оферта",
};

export default function page() {
	const { privacyPolicy, publicOffer } = useAppSelector(
		(state: RootState) => state.legalInformation,
	);
	const dispatch = useAppDispatch();
	const { getParsedDateStringWithMinutes } = useParsedDate();
	const linkToUpdatePage = useLegalInformationLinkToUpdatePage();

	useEffect(() => {
		dispatch(getLegalInformation());
	}, []);

	const data = Object.entries({ privacyPolicy, publicOffer });
	console.log("data", data);

	return (
		<div>
			<p className={`title lg mb`}>Юридична інформація</p>

			<CommonTable
				titles={titles}
				className={{
					titles: styles.titles,
					list: styles.list,
				}}
			>
				{data.map((item, index) => {
					const title = [item[0] as LegalInformationEnumType][0];
					return (
						<TableLine key={index}>
							<span>{titleColumnNames[title]}</span>
							<span>{item[1]?.data ? "Створена" : "Не створена"}</span>
							<span>
								{item[1]?.updatedAt
									? getParsedDateStringWithMinutes(item[1]?.updatedAt)
									: "Немає дати"}
							</span>

							<span className={styles.tableLineOptions}>
								<button
									className={`btn blue sm`}
									type="button"
									onClick={() => linkToUpdatePage(title, item[1]?.data)}
								>
									Змінити
								</button>
							</span>
						</TableLine>
					);
				})}
			</CommonTable>
		</div>
	);
}
