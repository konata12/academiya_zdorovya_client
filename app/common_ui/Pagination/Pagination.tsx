"use client";

import { PaginationButton } from "@/app/common_ui/Pagination/PaginationButton/PaginationButton";
import { useSearchParams } from "next/navigation";
import styles from "./Pagination.module.scss";

export interface PaginationQuery {
	page: string;
	isArrow?: boolean;
}

interface PaginationProps {
	dataCount: number;
	limit: number;
}

export function Pagination({ dataCount, limit }: PaginationProps) {
	const pagesCount = Math.ceil(dataCount / limit);
	const searchParams = useSearchParams();
	const page = searchParams.get("page") || 1;

	const renderPaginationButtons = () => {
		const arrLength = 4;
		const middleArr = new Array(arrLength).fill(1);

		if (pagesCount <= 6) {
			return new Array(pagesCount)
				.fill(0)
				.map((_, i) => <PaginationButton page={`${i + 1}`} key={i + 1} />);
		} else {
			if (+page < arrLength) {
				return (
					<>
						{middleArr.map((_, i) => (
							<PaginationButton page={`${i + 1}`} key={i + 1} />
						))}
						<span className={styles.dots}>...</span>
						<PaginationButton page={`${pagesCount}`} />
					</>
				);
			} else if (+page >= arrLength && +page < pagesCount - 2) {
				return (
					<>
						<PaginationButton page={`${1}`} />
						<span className={styles.dots}>...</span>
						{middleArr.map((_, i) => (
							<PaginationButton
								page={`${i + (+page - 2)}`}
								key={i + (+page - 2)}
							/>
						))}
						<span className={styles.dots}>...</span>
						<PaginationButton page={`${pagesCount}`} />
					</>
				);
			} else if (+page >= pagesCount - 2) {
				return (
					<>
						<PaginationButton page={`${1}`} />
						<span className={styles.dots}>...</span>
						{middleArr
							.map((_, i) => (
								<PaginationButton
									page={`${pagesCount - i}`}
									key={pagesCount - i}
								/>
							))
							.reverse()}
					</>
				);
			}
		}
	};

	return (
		<div className={styles.container}>
			<PaginationButton page={`${1}`} isArrow={true} />
			{renderPaginationButtons()}
			<PaginationButton page={`${pagesCount}`} isArrow={true} />
		</div>
	);
}
