import { EmployeeFormIndexedDBType } from '@/app/types/data/employees.type';
import {
    setEmployeeCreateBackgroundImgColor,
    setEmployeeCreateBasicValueError,
    setEmployeeCreateSocialMediaValue,
    setEmployeeCreateStringArrayError,
    setEmployeeCreateStringArrayValue,
    setEmployeeCreateStringValue
    } from '@/app/utils/redux/employees/employeeCreateFormSlice';
import { useMemo } from 'react';


export function useEmployeeFormSlice(indexedDBStoreName: EmployeeFormIndexedDBType) {
    const actions = useMemo(() => {
        switch (indexedDBStoreName) {
            case "employee_create_images":
                return {
                    // FORM SLICE
                    setStringValue: setEmployeeCreateStringValue,
                    setSocialMediaValue: setEmployeeCreateSocialMediaValue,
                    setStringArrayValue: setEmployeeCreateStringArrayValue,
                    setBackgroundImgColor: setEmployeeCreateBackgroundImgColor,
                    setBasicValueError: setEmployeeCreateBasicValueError,
                    setStringArrayValueError: setEmployeeCreateStringArrayError,
                };

            case "employee_update_images":
                return {
                    // FORM SLICE
                    setStringValue: setEmployeeCreateStringValue,
                    setSocialMediaValue: setEmployeeCreateSocialMediaValue,
                    setStringArrayValue: setEmployeeCreateStringArrayValue,
                    setBackgroundImgColor: setEmployeeCreateBackgroundImgColor,
                    setBasicValueError: setEmployeeCreateBasicValueError,
                    setStringArrayValueError: setEmployeeCreateStringArrayError,
                };
        }
    }, [indexedDBStoreName])

    return actions
}