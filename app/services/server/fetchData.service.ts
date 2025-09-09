import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { Department, DepartmentsService } from "@/app/types/data/departments.type";
import { PriceSection } from "@/app/types/data/prices.type";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDepartments() {
	// const first = performance.now();
	const res = await fetch(`${basicUrl}/departments`);
	// const second = performance.now();
	// console.log(second - first);

	const parsedData: Department[] = await res.json();
	console.log("departments Data", parsedData);

	return parsedData;
}

export async function fetchWhatWeTreats() {
	const data = await fetch(`${basicUrl}/about-treatment`);
	const parsedData: AboutTreatment[] = await data.json();

	return parsedData;
}
export async function fetchWhatWeTreatsNoImages() {
	const data = await fetch(`${basicUrl}/about-treatment/noImages`);
	const parsedData: AboutTreatment[] = await data.json();

	return parsedData;
}

export async function fetchServicesTitles() {
	const res = await fetch(`${basicUrl}/services/getBasicData`);
	const parsedData: DepartmentsService[] = await res.json();
	// console.log("services Data", parsedData);

	return parsedData;
}

export async function fetchPrices(departmentId: string) {
	const res = await fetch(`${basicUrl}/prices/all`, {
		headers: {
			Cookie: `departmentId=${departmentId};`,
		},
	});

	const parsedData: PriceSection[] = await res.json();
	console.log("prices Data", parsedData);

	return parsedData;
}

export async function fetchBannerNews() {
	const res = await fetch(`${basicUrl}/news/banner`);

	const parsedData: DepartmentsService[] = await res.json();

	return parsedData;
}
