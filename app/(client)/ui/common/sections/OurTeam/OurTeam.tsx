import { EmployeeCard } from "@/app/(client)/ui/common/cards/EmployeeCard/EmployeeCard";
import { fetchEmployees } from "@/app/services/server/fetchData.service";
import { Employee } from "@/app/types/data/employees.type";
import React from "react";
import styles from "./OurTeam.module.scss";

export async function OurTeam() {
	const employees = await fetchEmployees();

	return (
		<>
			{!!employees.length && (
				<section className={`container section`}>
					<h2 className={"title left lg"}>Наша команда</h2>
					<p className={styles.description}>
						Досвідчені лікарі та фізичні терапевти, які піклуються про ваше
						відновлення та комфорт на кожному етапі лікування
					</p>
					<div className={styles.cardContainer}>
						{employees.map((employee: Employee) => (
							<EmployeeCard employee={employee} key={employee.id} />
						))}
					</div>
				</section>
			)}
		</>
	);
}
