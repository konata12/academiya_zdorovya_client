import { useFormChangeCheck } from "@/app/utils/hooks/common/useFormChangeCheck";
import { parseOldAndNewServiceDataToCheckIfDataIsEqual } from "@/app/services/service.service";
import { Service, ServiceFormData } from "@/app/types/data/services.type";
import { log } from "node:util";

export function useServiceFormChangeCheck(
	oldService: Service | undefined,
	newService: Omit<ServiceFormData, "errors">,
) {
	const { oldData, newData } = parseOldAndNewServiceDataToCheckIfDataIsEqual(
		oldService,
		newService,
	);
	useFormChangeCheck(oldData, newData);
}
