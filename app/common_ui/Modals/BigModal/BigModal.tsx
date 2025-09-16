import { CloseBtn } from "@/app/common_ui/Buttons/CloseBtn/CloseBtn";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import styles from "./BigModal.module.scss";

interface BigModalProps {
	render: boolean;
	label: string;
	closeHandler: () => void;
	children?: React.ReactNode;
}

export function BigModal({ render, label, closeHandler, children }: BigModalProps) {
	const backgroundRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleOutsideClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target !== backgroundRef.current) return;
		closeHandler();
	};

	return (
		<AnimatePresence>
			{render && (
				<>
					<motion.div
						className={styles.backgroundContainer}
						ref={backgroundRef}
						onClick={(e) => handleOutsideClick(e)}
					>
						<motion.div
							className={styles.modal}
							ref={modalRef}
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
						>
							<div className={styles.header}>
								<h4>{label}</h4>

								<CloseBtn closeHandler={closeHandler} />
							</div>
							{children}
						</motion.div>
					</motion.div>
					<motion.div
						className={styles.background}
						onClick={closeHandler}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					></motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
