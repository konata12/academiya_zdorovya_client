import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import { DetailsBanner } from "@/app/(client)/ui/common/sections/DetailsBanner/DetailsBanner";
import { NewsCard } from "@/app/(client)/ui/News/NewsCard/NewsCard";
import { ServicesStages } from "@/app/(client)/ui/Services/ServicesStages/ServicesStages";
import { ServiceTypeCard } from "@/app/(client)/ui/Services/ServiceTypeCard/ServiceTypeCard";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { fetchOneService } from "@/app/services/server/fetchData.service";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function SingleServiceData({ params }: { params: { id: string } }) {
	const service = await fetchOneService(params.id);
	console.log(service);

	return (
		<div className={"page"}>
			<section className={"container"}>
				<DetailsBanner
					title={service.title}
					description={service.shortDescription}
					imageSrc={service.image}
				>
					<ContactUsBtn className={styles.btn} />
				</DetailsBanner>

				<div className={styles.description}>
					<article className={styles.stages}>
						<h2 className={"title left sm mb"}>Етапи лікування</h2>
						<ServicesStages stages={service.treatmentStages} />
						<Link className={styles.link} href={"/prices"}>
							Подивитись ціни на послуги
						</Link>
					</article>
					<article className={styles.mainDescription}>
						<h2 className={"title left sm mb"}>Про послугу</h2>
						<p>{service.mainDescription}</p>
					</article>
				</div>
			</section>
			<section className={`section container ${styles.serviceTypesSection}`}>
				<h2 className={"title left lg"}>Види послуги</h2>
				<p>{service.serviceTypesDescription}</p>
				{service.serviceTypes && (
					<div className={styles.cardsContainer}>
						{service.serviceTypes.map((data) => (
							<ServiceTypeCard
								serviceType={data}
								key={data.id}
								serviceId={params.id}
							/>
						))}
					</div>
				)}
			</section>
			<section className={`section ${styles.employeesSection}`}>
				<div className={`container`}>123</div>

				<Link className={`btn blue md returnBtn ${styles.returnBtn}`} href="/services">
					Повернутись до послуг
					<RightArrow />
				</Link>
			</section>
		</div>
	);
}
