import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { Department } from "@/app/types/data/departments.type";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDepartments() {
	// "use cache";
	const first = performance.now();
	const res = await fetch(`${basicUrl}/departments`);
	const second = performance.now();
	console.log(second - first);
	console.log("res", res);

	const parsedData: Department[] = await res.json();
	console.log("departments Data", parsedData);

	await new Promise((resolve) => setTimeout(resolve, 1500));

	return parsedData;
}

export async function fetchWhatWeTreats() {
	// "use cache";
	const first = performance.now();
	const data = await fetch(`${basicUrl}/about-treatment`);
	const second = performance.now();
	// console.log(second - first);
	const parsedData: AboutTreatment[] = await data.json();
	// console.log("parsedData", parsedData);

	await new Promise((resolve) => setTimeout(resolve, 1500));

	return parsedData;
}
