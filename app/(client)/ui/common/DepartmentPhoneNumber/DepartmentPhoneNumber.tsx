import { fetchDepartments } from "@/app/services/server/fetchData.service";
import { getDepartmentIdServerComponent } from "@/app/services/server/utils.service";

export default async function DepartmentPhoneNumber({ className }: { className?: string }) {
	const departments = fetchDepartments();
	const number = await getDepartmentIdServerComponent(departments);

	return (
		<a href={`tel:${number}`} className={className || ""}>
			{number}
		</a>
	);
}
