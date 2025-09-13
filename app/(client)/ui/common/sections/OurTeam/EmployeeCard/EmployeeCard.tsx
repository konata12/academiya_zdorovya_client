import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { Employee } from "@/app/types/data/employees.type";
import Image from "next/image";
import React from "react";
import styles from "./EmployeeCard.module.scss";

export function EmployeeCard({ employee }: { employee: Employee }) {
	return (
		<article className={styles.container}>
			<div className={`${styles.imageContainer} ${styles[employee.backgroundImgColor]}`}>
				<Image src={employee.image} alt={"Фото працівника"} fill />
			</div>
			<div></div>
			<button className={`btn blue md returnBtn ${styles.btn}`}>
				Дізнатися більше
				<RightArrow />
			</button>
		</article>
	);
}
