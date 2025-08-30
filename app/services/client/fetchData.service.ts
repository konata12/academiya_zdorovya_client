import { AboutTreatment } from "@/app/types/data/about_treatment.type";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

// export async function fetchDepartments() {
// 	console.log("fetch started"); // will log only once
// 	const res = await fetch(`${basicUrl}/departments`);
// 	const parsedData = await res.json();
// 	return parsedData;
// }
export async function fetchDepartments() {
	const first = Date.now();
	const data = await fetch(`${basicUrl}/departments`);
	const second = Date.now();
	console.log(second - first);
	const parsedData = await data.json();
	console.log("parsedData", parsedData);

	return parsedData;
}

export async function fetchWhatWeTreats() {
	const first = Date.now();
	const data = await fetch(`${basicUrl}/about-treatment`);
	const second = Date.now();
	console.log(second - first);
	const parsedData: AboutTreatment[] = await data.json();
	console.log("parsedData", parsedData);

	await new Promise((resolve) => setTimeout(resolve, 1500));

	return parsedData;
}
