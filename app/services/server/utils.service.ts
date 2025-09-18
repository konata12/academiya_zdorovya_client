"use server";

import { fetchDepartments } from "@/app/services/server/fetchData.service";
import { cookies } from "next/headers";

export async function getDepartmentIdFromCookies() {
	const cookieStore = await cookies();
	return cookieStore.get("departmentId")?.value;
}

export async function getDepartmentIdFromCookiesAlsoCheckDepartments() {
	let departmentId = await getDepartmentIdFromCookies();

	if (!departmentId) {
		departmentId = `${(await fetchDepartments())[0].id}`;
	}

	return departmentId;
}

export async function getDepartmentByIdFromCookies() {
	const departments = await fetchDepartments();
	const id = await getDepartmentIdFromCookies();
	return departments.find((department) => `${department.id}` === `${id}`);
}

export async function getDepartmentHotline() {
	return (await getDepartmentByIdFromCookies())?.hotline;
}
