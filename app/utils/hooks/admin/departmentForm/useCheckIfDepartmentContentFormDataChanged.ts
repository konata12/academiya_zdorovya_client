import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import { DepartmentContentTableDataType } from "@/app/types/data/departments.type";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import _ from "lodash";

export function useCheckIfDepartmentContentFormDataChanged() {
	const { departments } = useAppSelector((state: RootState) => state.departments);
	const { tableData } = useAppSelector((state: RootState) => state.departmentsContentForm);
	const { id } = useParams();

	const department = departments.find((department) => `${department.id}` === id);
	const parsedOldDepartmentContentData: DepartmentContentTableDataType | undefined =
		department && {
			bookingServices: department?.bookingServices,
			employees: department?.employees,
			services: department?.services,
		};

	useFormChangeCheck(parsedOldDepartmentContentData, tableData);

	return _.isEqual(parsedOldDepartmentContentData, tableData);
}
