import { EmployeeCard } from "@/app/(client)/ui/common/sections/OurTeam/EmployeeCard/EmployeeCard";
import { fetchEmployees } from "@/app/services/server/fetchData.service";
import { getDepartmentIdFromCookies } from "@/app/services/server/utils.service";
import { Employee } from "@/app/types/data/employees.type";
import React from "react";
import styles from "./OurTeam.module.scss";

export async function OurTeam() {
	const employees = await fetchEmployees();
	console.log("employees:", employees);
	console.log("employees.length:", employees.length);

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
