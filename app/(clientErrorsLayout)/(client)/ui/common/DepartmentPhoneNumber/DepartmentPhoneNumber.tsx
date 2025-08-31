import { Department } from "@/app/types/data/departments.type";
import { cookies } from "next/headers";
import { getDepartmentIdServerComponent } from "@/app/services/client/utils.service";
import Link from "next/link";

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
		<address className={className || ""}>
			<Link href={`tel:${number}`}>{number}</Link>
		</address>
	);
}
