import styles from "./Header.module.scss";
import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import DepartmentsSelectContainer from "@/app/(client)/ui/Navbar/Departments_select/DepartmentsSelectContainer";
import Links from "@/app/(client)/ui/Navbar/Links/Links";
import Link from "next/link";
import { fetchDepartments } from "@/app/services/client/fetchData.service";

export default async function Header() {
	const departments = await fetchDepartments();

	return (
		<header className={styles.navbar}>
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
