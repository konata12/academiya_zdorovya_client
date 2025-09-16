"use client";

import { RightArrow } from "@/app/common_ui/images/RightArrow";
import { BigModal } from "@/app/common_ui/Modals/BigModal/BigModal";
import { Employee } from "@/app/types/data/employees.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./EmployeeCardBtn.module.scss";

export function EmployeeCardBtn({ employee }: { employee: Employee }) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<div>
			<button className={`btn blue md returnBtn`} onClick={() => setModalOpen(true)}>
				Дізнатися більше
				<RightArrow />
			</button>
			<BigModal
				render={modalOpen}
				label={"Про лікаря"}
				closeHandler={() => setModalOpen(false)}
			>
				<div className={styles.modalDataContainer}>
					<div className={styles.basicData}>
						<div className={styles.text}>
							<h6
								className={styles.name}
							>{`${employee.surname} ${employee.name}`}</h6>
							<p className={styles.position}>{employee.position}</p>
							<div className={styles.socialMedia}>
								{employee.instagram && (
									<Link
										href={employee.instagram}
										aria-label={"Employee_instagram"}
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 28 28"
											fill="none"
										>
											<path
												d="M14 2.52233C17.738 2.52233 18.1813 2.53633 19.6572 2.604C21.1832 2.674 22.7547 3.02167 23.8665 4.1335C24.9888 5.25583 25.326 6.81217 25.396 8.34283C25.4637 9.81867 25.4777 10.262 25.4777 14C25.4777 17.738 25.4637 18.1813 25.396 19.6572C25.3272 21.175 24.9713 22.7617 23.8665 23.8665C22.7442 24.9888 21.189 25.326 19.6572 25.396C18.1813 25.4637 17.738 25.4777 14 25.4777C10.262 25.4777 9.81867 25.4637 8.34283 25.396C6.83667 25.3272 5.229 24.9632 4.1335 23.8665C3.017 22.75 2.674 21.1785 2.604 19.6572C2.53633 18.1813 2.52233 17.738 2.52233 14C2.52233 10.262 2.53633 9.81867 2.604 8.34283C2.67283 6.83083 3.03217 5.23483 4.1335 4.1335C5.2535 3.0135 6.81567 2.674 8.34283 2.604C9.81867 2.53633 10.262 2.52233 14 2.52233ZM14 0C10.1978 0 9.72067 0.0163333 8.22733 0.084C6.06317 0.183167 3.91417 0.785167 2.34967 2.34967C0.779333 3.92 0.183167 6.06433 0.084 8.22733C0.0163333 9.72067 0 10.1978 0 14C0 17.8022 0.0163333 18.2793 0.084 19.7727C0.183167 21.9345 0.7875 24.0893 2.34967 25.6503C3.91883 27.2195 6.06667 27.8168 8.22733 27.916C9.72067 27.9837 10.1978 28 14 28C17.8022 28 18.2793 27.9837 19.7727 27.916C21.9357 27.8168 24.087 27.2137 25.6503 25.6503C27.2218 24.0788 27.8168 21.9357 27.916 19.7727C27.9837 18.2793 28 17.8022 28 14C28 10.1978 27.9837 9.72067 27.916 8.22733C27.8168 6.06317 27.2137 3.913 25.6503 2.34967C24.0835 0.782833 21.9298 0.182 19.7727 0.084C18.2793 0.0163333 17.8022 0 14 0Z"
												strokeWidth="0"
												fill="none"
											/>
											<path
												d="M14 6.81104C10.0299 6.81104 6.81104 10.0299 6.81104 14C6.81104 17.9702 10.0299 21.189 14 21.189C17.9702 21.189 21.189 17.9702 21.189 14C21.189 10.0299 17.9702 6.81104 14 6.81104ZM14 18.6667C11.4229 18.6667 9.33337 16.5772 9.33337 14C9.33337 11.4229 11.4229 9.33337 14 9.33337C16.5772 9.33337 18.6667 11.4229 18.6667 14C18.6667 16.5772 16.5772 18.6667 14 18.6667Z"
												strokeWidth="0"
												fill="none"
											/>
											<path
												d="M21.4735 8.20619C22.4013 8.20619 23.1535 7.45403 23.1535 6.52619C23.1535 5.59835 22.4013 4.84619 21.4735 4.84619C20.5456 4.84619 19.7935 5.59835 19.7935 6.52619C19.7935 7.45403 20.5456 8.20619 21.4735 8.20619Z"
												strokeWidth="0"
												fill="none"
											/>
										</svg>
									</Link>
								)}
								{employee.facebook && (
									<Link
										href={employee.facebook}
										aria-label={"Employee_facebook"}
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 28 28"
											fill="none"
										>
											<path
												d="M28 14.085C28 21.0721 22.8737 26.8646 16.1817 27.9158V18.159H19.4355L20.055 14.1223H16.1817V11.5031C16.1817 10.3983 16.723 9.32263 18.4567 9.32263H20.2172V5.88563C20.2172 5.88563 18.6188 5.61263 17.0917 5.61263C13.902 5.61263 11.8183 7.54579 11.8183 11.0446V14.1211H8.27283V18.1578H11.8183V27.9146C5.1275 26.8623 0 21.071 0 14.085C0 6.35346 6.2685 0.0849609 14 0.0849609C21.7315 0.0849609 28 6.35229 28 14.085Z"
												strokeWidth="0"
												fill="none"
											/>
										</svg>
									</Link>
								)}
								{employee.youtube && (
									<Link
										href={employee.youtube}
										aria-label={"Employee_youtube"}
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="20"
											viewBox="0 0 28 20"
											fill="none"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M4.46239 0.231006C0.918528 0.653301 -0.00502483 2.70168 2.05259e-05 10.1271C0.00657949 19.9416 0.0903332 20 14.1253 20C28.0285 20 28 20.0204 28 10.0028C28 2.36782 27.1658 0.681747 23.1542 0.208767C20.6926 -0.0811248 6.94546 -0.0648328 4.46239 0.231006ZM11.3503 6.33572L17.7195 10.0434L11.3503 13.4009V10.0434V6.33572Z"
												strokeWidth="0"
												fill="none"
											/>
										</svg>
									</Link>
								)}
								{employee.X && (
									<Link
										href={employee.X}
										aria-label={"Employee_X"}
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="28"
											height="28"
											viewBox="0 0 28 28"
											fill="none"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M0.00556475 0L6.10491 8.72954L10.8965 15.6154L5.47349 21.7241L0 28H1.12779H2.25558L6.98043 22.7051L12.0237 17.0513L15.9749 22.6175L19.802 28H23.901H28L21.9077 19.2805L16.5326 11.8462L21.9915 5.83333L27.1942 0H25.9752H24.7561L20.3358 5.02564L15.5932 10.4103L11.7899 5.02564L8.22694 0H4.11644H0.00556475ZM15.8681 13.9103L24.7116 26.2504H20.8536L12.0154 14.0197L3.19379 1.79487H7.10174L15.8681 13.9103Z"
												strokeWidth="0"
												fill="none"
											/>
										</svg>
									</Link>
								)}
							</div>
						</div>

						<div
							className={`${styles.imageContainer} ${styles[employee.backgroundImgColor]}`}
						>
							<Image src={employee.image} alt={"Фото працівника"} fill />
						</div>
					</div>

					<p>{employee.description}</p>

					<div>
						<h6>Освіта та практика</h6>
						<p>{employee.degree}</p>
					</div>

					<div>
						<h6>Основні напрямки діяльності</h6>
						<ul>
							{employee.workSpecialities.map((speciality) => (
								<li key={speciality}>{speciality}</li>
							))}
						</ul>
					</div>

					{employee.achivements && (
						<div>
							<h6>Досягнення за час роботи в Академії Здоров'я</h6>
							<ul>
								{employee.achivements.map((achivement) => (
									<li key={achivement}>{achivement}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</BigModal>
		</div>
	);
}
