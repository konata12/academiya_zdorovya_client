import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import { EmployeeCard } from "@/app/(client)/ui/common/cards/EmployeeCard/EmployeeCard";
import { StackCarousel } from "@/app/(client)/ui/common/sections/StackCarousel/StackCarousel";
import { ServicesStages } from "@/app/(client)/ui/Services/ServicesStages/ServicesStages";
import { ServiceTypeCard } from "@/app/(client)/ui/Services/ServiceTypeCard/ServiceTypeCard";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { DetailsBanner } from "@/app/common_ui/sections/DetailsBanner/DetailsBanner";
import { fetchOneService } from "@/app/services/server/fetchData.service";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

export default async function SingleServiceData(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const service = await fetchOneService(id);
	console.log("service", service);

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
							<ServiceTypeCard serviceType={data} key={data.id} serviceId={id} />
						))}
					</div>
				)}
			</section>
			<section className={`section ${styles.employeesSection}`}>
				<StackCarousel
					label={"Лікарі, що підтримуватимуть вас"}
					text={
						"Досвідчені лікарі та терапевти, які піклуються про ваше відновлення та комфорт на кожному етапі лікування."
					}
					link={{
						href: "/about_us",
						text: "Більше про нас",
					}}
					className={{
						viewport: styles.carouselViewport,
					}}
					slidesContent={service.employees.map((employee, i) => (
						<EmployeeCard employee={employee.employee} key={i} />
					))}
				/>

				<Link className={`btn blue md returnBtn ${styles.returnBtn}`} href="/services">
					Повернутись до послуг
					<RightArrow />
				</Link>
			</section>
		</div>
	);
}
