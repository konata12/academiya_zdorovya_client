import React from "react";
import styles from "./DeleteModalWindow.module.scss";
import { ErrorsResponsesBasic } from "@/app/types/data/response.type";
import ModalWindow, {
	ModalWindowProps,
} from "@/app/admin/(provider)/ui/Modals/ModalWindow/ModalWindow";

interface DeleteModalWindowProps extends ModalWindowProps {
	closeModalHandler: (i: number) => void;
	deleteHandler: (id: number) => Promise<void>;
	error: ErrorsResponsesBasic;
	index: number;
	id: number;
}

export default function DeleteModalWindow({
	title,
	error,
	index,
	id,
	closeModalHandler,
	deleteHandler,
}: DeleteModalWindowProps) {
	return (
		<ModalWindow title={title}>
			<button
				className={`btn cancel`}
				onClick={() => {
					closeModalHandler(index);
				}}
			>
				Скасувати видалення
			</button>
			{error.delete?.[index]?.message && (
				<span className={`error ${styles.deleteError}`}>
					{error.delete[index].message}
				</span>
			)}
			<button
				onClick={() => deleteHandler(id)}
				className={`btn blue lg ${styles.deleteBtn} ${error.delete?.[index]?.message ? styles.deleteBtnError : ""}`}
			>
				Підтвердити
			</button>
		</ModalWindow>
	);
}
