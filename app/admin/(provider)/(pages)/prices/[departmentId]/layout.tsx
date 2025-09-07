"use client";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import NotFoundFallback from "@/app/admin/(provider)/ui/NotFoundFallback/NotFoundFallback";
import {
	checkCreatePage,
	checkUpdatePage,
	getUrlLastElement,
} from "@/app/services/admin/navigation.service";
import { fetchOneDepartment } from "@/app/utils/redux/departments/departmentsSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import {
	closePriceSectionsModal,
	deletePriceSection as deletePriceSectionAction,
	deletePriceSectionFromState,
	fetchPriceSections,
	openPriceSectionsModal,
} from "@/app/utils/redux/prices/pricesSlice";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import { fulfilled } from "@/app/services/admin/response.service";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import { RightArrow } from "@/app/common_ui/images/RightArrow";

const titles = ["Послуга", "Опції"];

export default function page({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { departments, error: departmentError } = useAppSelector(
		(state: RootState) => state.departments,
	);
	const { priceSections, priceSectionsIsModalOpen, status, error } = useAppSelector(
		(state: RootState) => state.prices,
	);

	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const { departmentId } = useParams<{ departmentId: string }>();
	const isCreatePage = checkCreatePage(pathname);
	const isUpdatePage = checkUpdatePage(pathname);
	const department = departments.find((department) => {
		return `${department.id}` === departmentId;
	});

	if (!department) {
		return <NotFoundFallback message={"Такого відділення не існує"} />;
	}

	useEffect(() => {
		// fetch department if there are no departments in state after reloading
		if (!departments.length) {
			dispatch(fetchOneDepartment(departmentId));
		}
		// fetch price sections
		dispatch(fetchPriceSections(departmentId));
	}, []);

	if (!department) {
		return <div>Такого відділення не існує</div>;
	}

	const deletePriceSection = async (id: number, i: number) => {
		const response = await dispatch(deletePriceSectionAction(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);

		if (isFulfilled) {
			dispatch(deletePriceSectionFromState(id));
			closeModalWindow(i);
		}
	};

	const openModalWindow = (i: number) => {
		dispatch(openPriceSectionsModal({ i }));
	};

	const closeModalWindow = (i: number) => {
		dispatch(closePriceSectionsModal({ i }));
	};

	return (
		<>
			<div className={styles.titleWrap}>
				<p className={`title lg pb ${styles.title}`}>
					{department?.city}, {department?.address}
				</p>
				<SafeLink className={`btn blue md returnBtn`} href="/admin/prices">
					Назад
					<RightArrow />
				</SafeLink>
			</div>
			<CommonTable titles={titles}>
				{!priceSections.length ? (
					<CommonTable404
						error={error}
						status={status}
						notFoundMessage="Немає послуг з розцінками"
					/>
				) : (
					priceSections.map((priceSection, i) => (
						<TableLine key={priceSection.id}>
							<span>{priceSection.titles[0].text}</span>
							{priceSectionsIsModalOpen[i] && (
								<ModalWindow title="Ви дійсно бажаєте видалити цю послугу з розцінками?">
									<button
										className={`btn cancel`}
										onClick={() => {
											closeModalWindow(i);
										}}
									>
										Скасувати видалення
									</button>
									<button
										onClick={() => {
											deletePriceSection(priceSection.id, i);
										}}
										className={`btn blue lg`}
									>
										Підтвердити
									</button>
								</ModalWindow>
							)}
							<span className={styles.buttons}>
								<button
									onClick={() => {
										openModalWindow(i);
									}}
									className={`btn gray sm`}
								>
									Видалити
								</button>
								<SafeLink
									className={`btn blue sm ${getUrlLastElement(pathname) === `${priceSection.id}` && isUpdatePage ? "disabled" : ""}`}
									href={`/admin/prices/${departmentId}/update/${priceSection.id}`}
								>
									Змінити
								</SafeLink>
							</span>
						</TableLine>
					))
				)}
			</CommonTable>
			<SafeLink
				className={`btn blue xl ${styles.addButton} ${isCreatePage ? "disabled" : ""}`}
				href={`/admin/prices/${departmentId}/create`}
			>
				Додати послугу з розцінками
			</SafeLink>
			{children}
		</>
	);
}
