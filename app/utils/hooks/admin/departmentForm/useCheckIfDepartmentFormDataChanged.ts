import { useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { useParams } from "next/navigation";
import { DepartmentsFormData } from "@/app/types/data/departments.type";
import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import _ from "lodash";

export function useCheckIfDepartmentFormDataChanged(formData: Partial<DepartmentsFormData>) {
	const { departments } = useAppSelector((state: RootState) => state.departments);
	const { id } = useParams();

	const oldDepartment = departments.find((department) => `${department.id}` === id);
	const parsedOldDepartment = oldDepartment
		? {
				city: oldDepartment?.city,
				hotline: oldDepartment?.hotline,
				address: oldDepartment?.address,
				googleMapUrl: oldDepartment?.googleMapUrl,
				googleMapReviewsUrl: oldDepartment?.googleMapReviewsUrl,
			}
		: undefined;

	useFormChangeCheck(parsedOldDepartment, formData);

	return _.isEqual(parsedOldDepartment, formData);
}
