import { DepartmentsRes, SelectOptions } from "@/app/(client)/types";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function Departments_select() {
	const [data, setData] = useState<SelectOptions[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	async function fetchData() {
		try {
			const response = await fetch("http://localhost:5000/departments");
			if (!response.ok) {
				throw new Error("Network response was not ok((((((((((");
			}
			const jsonData: DepartmentsRes[] = await response.json();
			const result = jsonData.map((department) => {
				return {
					value: department.id,
					label: `${department.city}, ${department.address}`,
				};
			});
			setData(result);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<Select
				options={data}
				placeholder={data[0].label}
				unstyled
				isSearchable={false}
				styles={{
					control: (base, state) => ({
						display: "flex",
					}),
				}}
			/>
		</>
	);
}
