import { CloseBtn } from "@/app/common_ui/Buttons/CloseBtn/CloseBtn";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./BigModal.module.scss";

interface BigModalProps {
	render: boolean;
	label: string;
	closeHandler: () => void;
	children?: React.ReactNode;
}

export function BigModal({ render, label, closeHandler, children }: BigModalProps) {
	return (
		<AnimatePresence>
			{render && (
				<motion.div className={styles.backgrond}>
					<div className={styles.modal}>
						<div className={styles.header}>
							<h4>{label}</h4>

							<CloseBtn closeHandler={closeHandler} />
						</div>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
