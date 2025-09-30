"use client";

import { CloseBtn } from "@/app/common_ui/Buttons/CloseBtn/CloseBtn";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true); // now safe to access document
	}, []);

	const handleOutsideClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target !== backgroundRef.current) return;
		closeHandler();
	};

	if (!mounted) return null;

	return createPortal(
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
		</AnimatePresence>,
		document.body,
	);
}
