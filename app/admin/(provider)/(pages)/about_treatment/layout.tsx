"use client";

import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import TableLine from "./../../ui/Tables/ListOption/TableLine";
import { checkCreatePage, getUrlLastElement } from "@/app/services/admin/navigation.service";
import {
	closeAboutTreatmentsModal,
	deleteAboutTreatment as deleteAboutTreatmentAction,
	fetchAboutTreatments,
	openAboutTreatmentsModal,
} from "@/app/utils/redux/about_treatment/aboutTreatmentSlice";
import { RootState } from "@/app/utils/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

import SafeLink from "@/app/admin/(provider)/ui/Links/SafeLink/SafeLink";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import CommonTable404 from "@/app/admin/(provider)/ui/Tables/Common/CommonTable404/CommonTable404";
import DeleteModalWindow from "@/app/admin/(provider)/ui/Modals/DeleteModalWindow/DeleteModalWindow";
import { fulfilled } from "@/app/services/admin/response.service";

const titles = ["Послуга", "Опції"];

export default function WhatWeTreat({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { aboutTreatments, aboutTreatmentsIsModalOpen, error, status } = useAppSelector(
		(state: RootState) => state.aboutTreatment,
	);

	const dispatch = useAppDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const isCreatePage = checkCreatePage(pathname);

	useEffect(() => {
		dispatch(fetchAboutTreatments());
	}, []);

	const deleteAboutTreatment = async (id: number) => {
		const response = await dispatch(deleteAboutTreatmentAction(id));
		const isFulfilled = fulfilled(response.meta.requestStatus);
		if (isFulfilled) router.push("/admin/about_treatment");
	};
	const openModalWindow = (i: number) => {
		dispatch(openAboutTreatmentsModal({ i }));
	};
	const closeModalWindow = (i: number) => {
		dispatch(closeAboutTreatmentsModal({ i }));
	};

	return (
		<>
			<p className={`title lg pb`}>Що лікуємо</p>
			<CommonTable titles={titles}>
				{!aboutTreatments.length ? (
					<CommonTable404 error={error} status={status} />
				) : (
					aboutTreatments.map((aboutTreatment, i) => (
						<TableLine key={i}>
							<span>{aboutTreatment.title}</span>
							{aboutTreatmentsIsModalOpen[i] && (
								<DeleteModalWindow
									title="Ви дійсно бажаєте видалити цю новину?"
									error={error}
									index={i}
									id={aboutTreatment.id}
									closeModalHandler={closeModalWindow}
									deleteHandler={deleteAboutTreatment}
								/>
							)}
							<span>
								<button
									onClick={() => {
										openModalWindow(i);
									}}
									className={`btn gray sm`}
								>
									Видалити
								</button>
								<SafeLink
									className={`btn blue sm ${getUrlLastElement(pathname) === `${aboutTreatment.id}` ? "disabled" : ""}`}
									href={`/admin/about_treatment/update/${aboutTreatment.id}`}
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
				href={"/admin/about_treatment/create"}
			>
				Додати опис лікування
			</SafeLink>
			{children}
		</>
	);
}
