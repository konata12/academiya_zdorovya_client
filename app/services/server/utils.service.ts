import { Department } from "@/app/types/data/departments.type";
import { cookies } from "next/headers";

export async function getDepartmentIdServerComponent(
	departmentsPromise: Promise<Department[]>,
) {
	const departments = await departmentsPromise;
	const cookieStore = await cookies();
	const id = cookieStore.get("departmentId")?.value;
	return departments.find((department) => `${department.id}` === `${id}`)?.hotline;
}
