"use client";

import { ContactUsBtn } from "@/app/(client)/ui/common/buttons/ContactUsBtn/ContactUsBtn";
import { ServicesStages } from "@/app/(client)/ui/Services/ServicesStages/ServicesStages";
import { ServiceTypeCardPreview } from "@/app/(client)/ui/Services/ServiceTypeCard/preview/ServiceTypeCardPreview";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { DetailsBannerPreview } from "@/app/common_ui/sections/DetailsBanner/Preview/DetailsBannerPreview";
import { useGetImageUrlFromIndexedDBImage } from "@/app/utils/hooks/admin/indexedDB/useGetImageUrlFromIndexedDBImage";
import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./page.module.scss";

export default function SingleServiceData() {
	const service = useAppSelector((state: RootState) => state.serviceUpdateForm);
	const imageUrl = useGetImageUrlFromIndexedDBImage(service.image, "service_update_images");
	const pathname = usePathname();

	return (
		<div className={"page"}>
			<section className={"container"}>
				<DetailsBannerPreview
					title={service.title}
					description={service.shortDescription}
					imageSrc={imageUrl}
				>
					<ContactUsBtn className={styles.btn} />
				</DetailsBannerPreview>

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
						{service.serviceTypes.map((data, i) => (
							<ServiceTypeCardPreview
								serviceType={data}
								imageStoreName={"service_update_images"}
								key={i}
							/>
						))}
					</div>
				)}
			</section>
			<section className={`section ${styles.employeesSection}`}>
				<div className={`container`}>123</div>
				{/*<EmployeesCarousel />*/}

				<Link
					className={`btn blue md returnBtn ${styles.returnBtn}`}
					href={pathname.replace("/preview", "")}
				>
					Повернутись до послуги
					<RightArrow />
				</Link>
			</section>
		</div>
	);
}
