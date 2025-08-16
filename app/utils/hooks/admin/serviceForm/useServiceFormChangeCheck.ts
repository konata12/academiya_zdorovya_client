import {useFormChangeCheck} from "@/app/utils/hooks/common/useFormChangeCheck";
import {parseOldAndNewServiceDataToCheckIfDataIsEqual} from "@/app/services/service.service";
import {Service, ServiceFormData} from "@/app/types/data/services.type";

export function useServiceFormChangeCheck(
    oldService: Service | undefined,
    newService: Omit<ServiceFormData, 'errors'>
) {
    const {
        oldData,
        newData
    } = parseOldAndNewServiceDataToCheckIfDataIsEqual(oldService, newService)
    useFormChangeCheck(oldData, newData)
}