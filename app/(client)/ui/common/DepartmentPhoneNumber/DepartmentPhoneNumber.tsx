import { getDepartmentHotline } from "@/app/services/server/utils.service";

export default async function DepartmentPhoneNumber({ className }: { className?: string }) {
	const number = await getDepartmentHotline();

	return (
		<a href={`tel:${number}`} className={className || ""}>
			{number}
		</a>
	);
}
