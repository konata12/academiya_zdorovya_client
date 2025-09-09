import { SideNav } from "@/app/(client)/ui/common/SideNav/SideNav";
import PriceTable from "@/app/(client)/ui/common/tables/PriceTable/PriceTable";
import { fetchPrices } from "@/app/services/server/fetchData.service";
import { getDepartmentIdFromCookiesAlsoCheckDepartments } from "@/app/services/server/utils.service";
import React from "react";
import styles from "./page.module.scss";

export default async function AboutUs() {
	const departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();
	const prices = await fetchPrices(departmentId);
	const pricesNamesList = prices.map((price) => {
		return { label: price.titles[0].text, id: price.titles[0].text };
	});

	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Ціни на послуги</h1>
				<p>Ознайомтесь з вартістю реабілітаційних програм у нашому центрі</p>
			</section>
			{!prices.length ? (
				<p className={"title lg error"}>У цього відділення немає таблиць розцінок</p>
			) : (
				<section className={`container ${styles.pricesSection}`}>
					<SideNav list={pricesNamesList} />
					<div className={styles.prices}>
						{prices.map((price, i) => (
							<PriceTable data={price} key={i} />
						))}
					</div>
				</section>
			)}
		</div>
	);
}
