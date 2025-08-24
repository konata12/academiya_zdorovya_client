import { DepartmentContentSelectButtonsType } from "@/app/admin/(provider)/ui/Forms/depatrments/content/DepartmentContentForm";
import styles from "./DepartmentContentSelectButtons.module.scss";
import ButtonWithUnderlineAnimation from "@/app/common_ui/animated_components/ButtonWithUnderlineAnimation/ButtonWithUnderlineAnimation";

interface contentNamesArrayType {
	name: DepartmentContentSelectButtonsType;
	label: string;
}

const contentNamesArray: contentNamesArrayType[] = [
	{ name: "services", label: "Послуги" },
	{ name: "bookingServices", label: "Послуги для запису" },
	{ name: "employees", label: "Лікарі" },
];

export default function DepartmentContentSelectButtons({
	contentType,
	setContentType,
}: {
	contentType: DepartmentContentSelectButtonsType;
	setContentType: (changeParam: DepartmentContentSelectButtonsType) => void;
}) {
	return (
		<div className={styles.links}>
			{contentNamesArray.map((nameData, i) => {
				return (
					<ButtonWithUnderlineAnimation
						key={i}
						isActive={contentType === nameData.name}
						onClick={() => {
							setContentType(nameData.name);
						}}
					>
						{nameData.label}
					</ButtonWithUnderlineAnimation>
				);
			})}
		</div>
	);
}
