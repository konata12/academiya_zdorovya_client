import styles from "./Header.module.scss";
import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import Links from "@/app/(clientErrorsLayout)/(client)/ui/Navbar/Links/Links";
import Link from "next/link";
import { fetchDepartments } from "@/app/services/client/fetchData.service";
import DepartmentsSelectContainer from "@/app/(clientErrorsLayout)/(client)/ui/Navbar/Departments_select/DepartmentsSelectContainer";

export default async function Header({ className }: { className?: string }) {
	// const departments = await fetchDepartments();

	return (
		<header className={`${styles.header} ${className || ""}`}>
			<nav className={`${styles.container} container`}>
				<Link href={"/"} className={styles.logo}>
					<Image src={logo} priority={true} alt="logo" />
				</Link>
				<DepartmentsSelectContainer />
				<Links />
				<div className={styles.bookingBtn}>
					<Link className={`btn yellow sm`} href={"/contacts"}>
						Запис на прийом
					</Link>
				</div>
			</nav>
		</header>
	);
}
