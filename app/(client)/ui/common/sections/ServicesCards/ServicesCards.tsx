import { ServiceCard } from "@/app/(client)/ui/common/sections/ServicesCards/ServiceCard/ServiceCard";
import { fetchServicesCards } from "@/app/services/server/fetchData.service";
import { Service } from "@/app/types/data/services.type";
import React from "react";
import styles from "./ServicesCards.module.scss";

export async function ServicesCards() {
	const services = await fetchServicesCards();
	console.log("services", services);

	return (
		<>
			{!!services.length && (
				<section className={`container section`}>
					<div className={styles.cardsContainer}>
						{services.map((service: Service) => (
							<ServiceCard service={service} key={service.id} />
						))}
					</div>
				</section>
			)}
		</>
	);
}
