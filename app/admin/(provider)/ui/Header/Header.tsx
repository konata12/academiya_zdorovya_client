import Image from "next/image";
import logo from "@/public/icons/logo_admin.png";
import styles from "./Header.module.scss";
import NavLink from "@/app/admin/(provider)/ui/Links/NavLink/NavLink";
import { routes } from "@/app/admin/(provider)/ui/SideNavigation/SideNavigation";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useEffect } from "react";
import { getAllNotRepliedCount } from "@/app/utils/redux/booking/bookingSlice";

export default function Header() {
	const { allNotRepliedCount, errors } = useAppSelector((state: RootState) => state.booking);

	const dispatch = useAppDispatch();
	const pathname = usePathname();

	useEffect(() => {
		dispatch(getAllNotRepliedCount());
	}, []);

	const isLoginPage = pathname.split("/")[2] === "login";
	const urlsForRedactive = routes.map((route) => route.path);
	const notRepliedCount =
		errors.getAllNotRepliedCount || allNotRepliedCount === null
			? "Помилка при отриманні"
			: allNotRepliedCount;

	return (
		<div className={`${styles.header}`}>
			<div className={`container ${styles.container} ${isLoginPage && styles.login}`}>
				<div className={styles.logo}>
					<Image src={logo} alt="logo" />
				</div>

				<div className={styles.links}>
					<NavLink url="/admin/departments" urlsForActive={urlsForRedactive}>
						Редактор сайту
					</NavLink>
					<NavLink url="/admin/bookings">
						Записи на прийом ({notRepliedCount})
					</NavLink>
				</div>
			</div>
		</div>
	);
}
