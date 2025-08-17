import React, { useState } from "react";
import styles from "./EmployeeSearchbarWithTable.module.scss";
import { DraggableAreaContainer } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableAreaContainer";
import { DraggableElementContainer } from "@/app/common_ui/animated_components/DraggableAreaContainers/DraggableElementContainer/DraggableElementContainer";
import { FormInputError } from "@/app/types/data/form.type";
import {
	OrderedListServiceEmployeeInterface,
	useOrderedList,
} from "@/app/utils/hooks/admin/dragAndDrop/useOrderedList";
import {
	ServiceEmployeeFormData,
	ServiceEmployeesFormDataEnum,
	ServiceFormDataEnum,
} from "@/app/types/data/services.type";
import CommonTable from "@/app/admin/(provider)/ui/Tables/Common/CommonTable";
import TableLine from "@/app/admin/(provider)/ui/Tables/ListOption/TableLine";
import ModalWindow from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";
import { ErrorWrapper } from "@/app/common_ui/error_components/ErrorWrapper/ErrorWrapper";
import { EmployeeSearchbarList } from "@/app/admin/(provider)/ui/Forms/services/EmployeeSearchbarWithTable/EmployeeSearchbarList/EmployeeSearchbarList";

interface EmployeeSearchbarWithTableProps {
	handleModalState: (state: boolean, i: number) => void;
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>, i: number) => void;
	employeesModalIsOpen: boolean[];
	employees: ServiceEmployeeFormData[];
	error: FormInputError;
}

const employeesTableTitles = ["ПІ лікаря", "Посада", "Опції"];

export function EmployeeSearchbarWithTable({
	handleModalState,
	handleDelete,
	employees,
	employeesModalIsOpen,
	error,
}: EmployeeSearchbarWithTableProps) {
	const [query, setQuery] = useState("");
	const [showList, setShowList] = useState(false);

	const handleDragEnd = useOrderedList();

	const employeesDragData: OrderedListServiceEmployeeInterface = {
		order: employees,
		valueName: ServiceFormDataEnum.EMPLOYEES,
		sliceName: "servicesCreateForm",
	};

	return (
		<div className={styles.employees}>
			<p className={`title sm left`}>Хто лікує</p>

			<div className={styles.searchBarContainer}>
				<label
					className={`inputLabel ${styles.serachBarTitle}`}
					htmlFor="searchBar"
				>
					Виберіть лікаря
				</label>

				<ErrorWrapper
					error={error.message.length ? error.message : undefined}
					className={{
						errorWrapper: styles.searchBar,
					}}
				>
					<div className={styles.magnifyingGlass}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.43844 1.00848C5.42349 1.15975 4.53098 1.49608 3.71989 2.03296C3.13496 2.42016 2.41605 3.1386 2.02921 3.72262C1.56702 4.42036 1.2613 5.14876 1.08304 5.97707C1.00823 6.32454 0.998922 6.46464 1.00009 7.22607C1.00126 7.97231 1.01192 8.13186 1.08231 8.45462C1.45071 10.1443 2.40071 11.5367 3.80988 12.4522C5.89254 13.8054 8.62066 13.7871 10.6851 12.4061L11.0253 12.1785L12.3829 13.5323C13.2936 14.4406 13.785 14.9048 13.8759 14.9428C14.0823 15.029 14.4084 15.0163 14.6013 14.9145C14.8424 14.7873 14.9745 14.5767 14.9927 14.2906C15.0195 13.8706 15.0499 13.9104 13.5474 12.4015L12.1779 11.0262L12.4054 10.6863C13.3472 9.2794 13.6808 7.48146 13.3047 5.83927C12.7535 3.43304 10.9085 1.62082 8.47109 1.09169C8.18768 1.03016 7.96254 1.01271 7.33289 1.00355C6.90118 0.997312 6.49868 0.999502 6.43844 1.00848ZM7.71622 2.59253C8.36573 2.66603 9.0159 2.88485 9.56483 3.21465C9.9628 3.45376 10.1798 3.62492 10.5178 3.96633C10.9041 4.3566 11.1349 4.68389 11.3882 5.20062C11.9143 6.27396 12.0017 7.46193 11.6402 8.62571C11.2038 10.0307 9.98434 11.233 8.5667 11.6559C8.00806 11.8226 7.85436 11.8427 7.1686 11.8394C6.55366 11.8364 6.48331 11.8288 6.07337 11.721C4.5431 11.3188 3.29607 10.1628 2.80734 8.69355C2.6263 8.14927 2.57672 7.84133 2.57402 7.24431C2.57135 6.65117 2.62494 6.2879 2.79036 5.77789C3.29786 4.21325 4.64916 3.00079 6.2559 2.66836C6.82871 2.54983 7.17849 2.53169 7.71622 2.59253Z"
								fill="#2F3035"
								stroke="#2F3035"
								strokeWidth="0.3"
							/>
						</svg>
					</div>
					<input
						className={`input ${styles.input} ${showList ? styles.on : ""}`}
						type="text"
						id={ServiceFormDataEnum.EMPLOYEES}
						placeholder={`Введіть ім'я лікаря`}
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setShowList(true);
							if (!e.target.value) setShowList(false);
						}}
					/>
					<button
						className={`${styles.arrow} ${showList ? styles.on : ""}`}
						type="button"
						onClick={() => setShowList(!showList)}
					>
						<svg
							className={`${styles.svg} ${showList ? styles.on : ""}`}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="10"
							viewBox="0 0 16 10"
							fill="none"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14.947 1.65244C14.8149 1.27755 14.5611 1.07606 14.1868 1.04865C13.7315 1.01533 13.8458 0.918445 11.268 3.52158L8.90274 5.91006V5.89957C8.5 6.29396 8 6.83517 8 6.83517L7.10061 5.91073L4.75583 3.53978C2.28359 1.03991 2.24054 1.00202 1.87569 1.00001C1.63429 0.998663 1.29238 1.18671 1.1451 1.40184C0.993768 1.62294 0.956416 1.95477 1.05385 2.21282C1.10701 2.35358 1.75192 3.02679 4.34581 5.64927C7.74627 9.08719 7.65087 8.9998 8.00167 8.9998C8.35247 8.9998 8.25714 9.0871 11.6581 5.64927C14.6668 2.608 14.8887 2.3741 14.9449 2.18346C15.0179 1.93649 15.0181 1.85426 14.947 1.65244Z"
								strokeWidth="0.3"
							/>
						</svg>
					</button>
				</ErrorWrapper>
				<EmployeeSearchbarList showList={showList} query={query} />
			</div>

			{!!employees.length && (
				<>
					<p className={`inputLabel ${styles.tableTitle}`}>
						Таблиця лікарів цієї послуги
					</p>
					<CommonTable titles={employeesTableTitles}>
						<DraggableAreaContainer<OrderedListServiceEmployeeInterface>
							handleDragEnd={handleDragEnd}
							dndContextId="ServiceTratmentTypesList"
							data={employeesDragData}
							droppableAreaClassName={styles.mainBody}
						>
							{employees.map((employee, i) => {
								const nameSurname = `${employee[ServiceEmployeesFormDataEnum.NAME]} ${employee[ServiceEmployeesFormDataEnum.SURNAME]}`;
								const nameSurnameToRender = nameSurname.includes(
									"undefined",
								)
									? "Не завантажило ПІ лікаря"
									: nameSurname;

								return (
									<DraggableElementContainer
										key={i}
										id={employee.orderId}
										hasDraggableArea={true}
									>
										<TableLine key={i}>
											<span>{nameSurnameToRender}</span>
											<span>
												{
													employee[
														ServiceEmployeesFormDataEnum
															.POSITION
													]
												}
											</span>

											{employeesModalIsOpen[i] && (
												<ModalWindow title="Ви дійсно бажаєте видалити цього лікаря?">
													<button
														className={`btn cancel`}
														type="button"
														onClick={() =>
															handleModalState(
																false,
																i,
															)
														}
													>
														Скасувати видалення
													</button>
													<button
														onClick={(e) => {
															handleDelete(e, i);
														}}
														type="button"
														className={`btn blue lg`}
													>
														Підтвердити
													</button>
												</ModalWindow>
											)}

											<span
												className={styles.tableLineOptions}
											>
												<button
													onClick={() =>
														handleModalState(true, i)
													}
													type="button"
													className={`btn gray sm`}
												>
													Видалити
												</button>
											</span>
										</TableLine>
									</DraggableElementContainer>
								);
							})}
						</DraggableAreaContainer>

						<p className={styles.tableUnderText}>Порядок збережено</p>
					</CommonTable>
					<p className={styles.dragReminder}>
						Затисніть та переміщуйте послуги, щоб отримати бажаний
						порядок послуг*
					</p>
				</>
			)}
		</div>
	);
}
