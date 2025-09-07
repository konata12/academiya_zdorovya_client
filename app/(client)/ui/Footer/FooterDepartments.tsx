import { fetchDepartments } from "@/app/services/server/fetchData.service";
import styles from "./Footer.module.scss";
import React from "react";
import Link from "next/link";

interface ParsedDepartments {
	[key: string]: {
		address: string;
		url: string;
	}[];
}

export default async function FooterDepartments() {
	const departments = await fetchDepartments();
	let parsedDepartments: ParsedDepartments = {};

	departments.forEach((department) => {
		if (!parsedDepartments.hasOwnProperty(department.city)) {
			parsedDepartments[department.city] = [
				{
					address: department.address,
					url: department.googleMapUrl,
				},
			];
		} else {
			parsedDepartments[department.city].push({
				address: department.address,
				url: department.googleMapUrl,
			});
		}
	});

	return (
		<address className={`${styles.departments}`}>
			{Object.entries(parsedDepartments).map((department, i) => {
				return (
					<div key={i}>
						<h5 className={styles.text}>{department[0]}</h5>
						<div className={styles.addresses}>
							{department[1].map((data, i) => {
								return (
									<Link
										href={data.url}
										target="_blank"
										className={`${styles.text} ${styles.big}`}
										key={`${data.address}_${i}`}
									>
										{data.address}
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</address>
	);
}
