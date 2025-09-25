import NavLink from "@/app/admin/(provider)/ui/Links/NavLink/NavLink";
import { routes } from "@/app/admin/(provider)/ui/SideNavigation/SideNavigation";
import { logout } from "@/app/utils/redux/auth/authSlice";
import { getAllNotRepliedCount } from "@/app/utils/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import logo from "@/public/icons/logo_admin.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./Header.module.scss";

export default function Header() {
	const { accessToken } = useAppSelector((state: RootState) => state.auth);
	const { allNotRepliedCount, errors } = useAppSelector((state: RootState) => state.booking);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllNotRepliedCount());
	}, []);

	const urlsForRedactive = routes.map((route) => route.path);
	const notRepliedCount =
		errors.getAllNotRepliedCount || allNotRepliedCount === null
			? "Помилка при отриманні"
			: allNotRepliedCount;

	const logoutAction = () => {
		dispatch(logout());
		window.location.reload();
	};

	return (
		<div className={`${styles.header} ${accessToken ? "" : styles.login}`}>
			<div className={styles.logo}>
				<Image src={logo} alt="logo" />
			</div>

			<div className={styles.links}>
				<NavLink url="/admin/departments" urlsForActive={urlsForRedactive}>
					Редактор сайту
				</NavLink>
				<NavLink url="/admin/bookings">Записи на прийом ({notRepliedCount})</NavLink>
			</div>
			<button className={`btn gray sm ${styles.logout}`} onClick={logoutAction}>
				Вийти
			</button>
		</div>
	);
}
