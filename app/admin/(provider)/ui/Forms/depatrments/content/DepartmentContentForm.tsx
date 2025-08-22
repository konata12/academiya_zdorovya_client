import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";

export function DepartmentContentForm() {
	const { departments } = useAppSelector((state: RootState) => state.departments);

	const { id } = useParams<{
		id: string;
	}>();
	const department = departments.find((department) => `${department.id}` === id);

	return <div>anus</div>;
}
