import { ContactsFormRequest } from "@/app/(client)/ui/Forms/ContactsForm/ContactsForm";
import { getDepartmentIdFromCookiesAlsoCheckDepartments } from "@/app/services/server/utils.service";
import { AboutTreatment } from "@/app/types/data/about_treatment.type";
import { BookingService } from "@/app/types/data/booking_services.type";
import { Department, DepartmentsService } from "@/app/types/data/departments.type";
import { UserDetailsRedactorType } from "@/app/types/data/details.type";
import { Employee } from "@/app/types/data/employees.type";
import { News, UserNews } from "@/app/types/data/news.type";
import { PriceSection } from "@/app/types/data/prices.type";
import {
	Service,
	ServiceResponseDataUser,
	ServiceTypeResponseData,
	ServiceTypeResponseDataUser,
} from "@/app/types/data/services.type";

const basicUrl = process.env.NEXT_PUBLIC_API_URL;

// DATA WITH NO IMAGES
export async function fetchDepartments() {
	// const first = performance.now();
	const res = await fetch(`${basicUrl}/departments`);
	// const second = performance.now();
	// console.log(second - first);

	const parsedData: Department[] = await res.json();
	// console.log("departments Data", parsedData);

	return parsedData;
}
export async function fetchLegalInfo(title: "privacyPolicy" | "publicOffer") {
	const data = await fetch(`${basicUrl}/legal-information/${title}`);
	const parsedData: UserDetailsRedactorType = await data.json();

	return parsedData;
}
export async function fetchWhatWeTreatsNoImages() {
	const data = await fetch(`${basicUrl}/about-treatment/noImages`);
	const parsedData: AboutTreatment[] = await data.json();

	return parsedData;
}
export async function fetchPrices() {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const res = await fetch(`${basicUrl}/prices/all`, {
		headers: {
			Cookie: `departmentId=${departmentId};`,
		},
	});

	const parsedData: PriceSection[] = await res.json();
	console.log("prices Data", parsedData);

	return parsedData;
}
export async function fetchBookingServices() {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const res = await fetch(`${basicUrl}/booking-services/forDepartment`, {
		headers: {
			Cookie: `departmentId=${departmentId}`,
		},
	});

	const parsedData: BookingService[] = await res.json();
	console.log("booking services Data", parsedData);

	if ((parsedData as any).statusCode > 400) {
		return [
			{
				id: 0,
				name: "У цього відділення послуги для запису відсутні, записатись не вийде",
			},
		];
	}

	return parsedData;
}
export async function fetchServicesTitles() {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const res = await fetch(`${basicUrl}/services/getBasicDataForDepartment`, {
		headers: {
			Cookie: `departmentId=${departmentId}`,
		},
	});
	const parsedData: DepartmentsService[] = await res.json();

	if ((parsedData as any).statusCode > 400) return [];

	return parsedData;
}

// DATA WITH IMAGES
export async function fetchWhatWeTreats() {
	const data = await fetch(`${basicUrl}/about-treatment`);
	const parsedData: AboutTreatment[] = await data.json();

	return parsedData;
}
export async function fetchEmployees() {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const data = await fetch(`${basicUrl}/employees/forDepartment`, {
		headers: {
			Cookie: `departmentId=${departmentId}`,
		},
	});
	const parsedData: Employee[] = await data.json();

	return parsedData;
}
// NEWS
export async function fetchNewsCards() {
	const res = await fetch(`${basicUrl}/news/getBasicData`);

	const parsedData: News[] = await res.json();

	return parsedData;
}
export async function fetchBannerNews() {
	const res = await fetch(`${basicUrl}/news/banner`);

	const parsedData: News[] = await res.json();

	return parsedData;
}
export async function fetchOneNews(id: string) {
	const res = await fetch(`${basicUrl}/news/${id}`);

	const parsedData: UserNews = await res.json();
	return parsedData;
}
// SERVICES
export async function fetchServicesCards() {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const res = await fetch(`${basicUrl}/services/getBasicDataForDepartment`, {
		headers: {
			Cookie: `departmentId=${departmentId}`,
		},
	});

	const parsedData: Service[] = await res.json();
	return parsedData;
}
export async function fetchOneService(id: string) {
	let departmentId = await getDepartmentIdFromCookiesAlsoCheckDepartments();

	const res = await fetch(`${basicUrl}/services/${id}`, {
		headers: {
			Cookie: `departmentId=${departmentId}`,
		},
	});

	const parsedData: ServiceResponseDataUser = await res.json();
	return parsedData;
}
export async function fetchOneServiceType(id: string) {
	const res = await fetch(`${basicUrl}/services/serviceTypes/${id}`);

	const parsedData: ServiceTypeResponseDataUser = await res.json();
	return parsedData;
}

// POST REQUESTS
export async function postBooking(data: ContactsFormRequest) {
	const res = await fetch(`${basicUrl}/booking`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});

	return res.ok;
}
