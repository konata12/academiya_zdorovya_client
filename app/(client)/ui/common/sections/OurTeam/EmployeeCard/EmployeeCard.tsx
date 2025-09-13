import { EmployeeCardBtn } from "@/app/(client)/ui/common/sections/OurTeam/EmployeeCard/EmployeeCarbBtn/EmployeeCardBtn";
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
			<div className={styles.text}>
				<h3 className={styles.name}>{`${employee.name} ${employee.surname}`}</h3>
				<p className={styles.position}>{employee.position}</p>
			</div>
			<EmployeeCardBtn employee={employee} />
		</article>
	);
}
