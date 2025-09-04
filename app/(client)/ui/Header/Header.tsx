import DepartmentsSelectContainer from "@/app/(client)/ui/Header/Departments_select/DepartmentsSelectContainer";
import Links from "@/app/(client)/ui/Header/Links/Links";
import { fetchDepartments } from "@/app/services/server/fetchData.service";
import logo from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./Header.module.scss";

export default async function Header({ className }: { className?: string }) {
	const departments = fetchDepartments();

	return (
		<>
			<header className={`${styles.header} ${className || ""}`}>
				<nav className={`${styles.container} container`} aria-label="Main navigation">
					<Link href={"/"} className={styles.logo}>
						<Image src={logo} priority={true} alt="logo" />
					</Link>
					<Suspense
						fallback={<p className={`loading ${styles.departmentsFallback}`}></p>}
					>
						<DepartmentsSelectContainer departmentsPromise={departments} />
					</Suspense>
					<Links />
				</nav>
			</header>
			<div className={styles.headerShape}></div>
		</>
	);
}
