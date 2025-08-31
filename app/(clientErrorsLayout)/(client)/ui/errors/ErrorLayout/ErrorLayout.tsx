import styles from "./ErrorLayout.module.scss";
import Link from "next/link";
import { RightArrow } from "@/app/common_ui/images/RightArrow";
import React from "react";

interface ErrorLayoutProps {
	code: 404 | 500;
	massage: string;
	action: string;
	className?: string;
}

export default function ErrorLayout({ code, massage, action, className }: ErrorLayoutProps) {
	return (
		<div className={`${styles.page} ${className || ""}`}>
			<p className={styles.code}>{code}</p>
			<p className={styles.shortDescription}>{massage}</p>
			<p className={styles.mainDescription}>{action}</p>
			{code === 404 && (
				<Link className="btn blue md returnBtn" href="/">
					Повернутись на головну
					<RightArrow />
				</Link>
			)}
		</div>
	);
}
