import { useAppSelector } from "@/app/utils/redux/hooks";
import styles from "./SideNavigation.module.scss";
import SideNavButton from "@/app/admin/(provider)/ui/SideNavigation/SideNavButton/SideNavButton";
import { RootState } from "@/app/utils/redux/store";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Route = {
	label: string;
	path: string;
	checkRender?: boolean;
};

export const routes: Route[] = [
	{ label: "Відділення", path: "/admin/departments" },
	{ label: "Наповнення відділення", path: "/admin/fill_departments" },
	{ label: "Юридична інформація", path: "/admin/legal_information", checkRender: true },
	{ label: "Що лікуємо", path: "/admin/about_treatment" },
	{ label: "Лікарі", path: "/admin/employees" },
	{ label: "Послуги для запису", path: "/admin/booking_services" },
	{ label: "Послуги", path: "/admin/services", checkRender: true },
	{ label: "Ціни на послуги", path: "/admin/prices" },
	{ label: "Відгуки", path: "/admin/reviews" },
	{ label: "Новини", path: "/admin/news", checkRender: true },
];
const notRenderRoutes = ["create", "update", "privacyPolicy", "publicOffer"];

export default function SideNavigation() {
	const { accessToken } = useAppSelector((state: RootState) => state.auth);

	const pathname = usePathname();
	const pathArray = pathname.split("/");
	const isLoginPage = pathArray[2] === "login";

	const checkIsSideNavigationOpen = useCallback(
		(routes: Route[]) => {
			const route = routes.find((route) => pathname.includes(route.path));

			// IF SERVICE PAGE
			if (
				route &&
				route.path === "/admin/services" &&
				!pathname.includes("serviceType")
			) {
				return true;
			} else if (
				route &&
				route.path === "/admin/services" &&
				!pathname.includes("serviceType")
			) {
				return false;
			}

			// if route not checks render or pathArray length is less than 3
			if (!route?.checkRender || pathArray.length <= 3) return true;

			// if pathArray includes notRenderMainRoutes
			return !notRenderRoutes.some((route) => pathname.includes(route));
		},
		[pathname],
	);

	const sideNavigationIsOpen = checkIsSideNavigationOpen(routes);

	if (isLoginPage && !accessToken) return null;
	if (!sideNavigationIsOpen) return null;

	return (
		<>
			<div className={styles.empty}></div>

			<div className={styles.sideNav}>
				{routes.map((route) => {
					return (
						<SideNavButton
							path={route.path}
							label={route.label}
							key={route.path}
						/>
					);
				})}
			</div>
		</>
	);
}
