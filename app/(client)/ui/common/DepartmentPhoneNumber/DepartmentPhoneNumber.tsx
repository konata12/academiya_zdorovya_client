import { Department } from "@/app/types/data/departments.type";
import { getDepartmentIdServerComponent } from "@/app/services/client/utils.service";

export default async function DepartmentPhoneNumber({
	departmentsPromise,
	handledNumber,
	className,
}: {
	departmentsPromise: Promise<Department[]>;
	handledNumber?: string;
	className?: string;
}) {
	const number = handledNumber || (await getDepartmentIdServerComponent(departmentsPromise));

	return (
		<a href={`tel:${number}`} className={className || ""}>
			{number}
		</a>
	);
}
