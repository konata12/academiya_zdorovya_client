import { Departments } from "@/app/types/departments";
import { AxiosError } from "axios";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const DepartmentsContext = createContext<{
    getDepartments: () => Promise<void>,
    setGetDepartmentsError: Dispatch<SetStateAction<AxiosError | null>>,
    departments: Departments[]
}>({
    getDepartments: async () => { },
    setGetDepartmentsError:  () => { },
    departments: []
})

export function useDepartmentsFunc() {
    const context = useContext(DepartmentsContext)
    if (!context) {
        throw new Error("useAuth must be used within an DepartmentsContext.Provider");
    }
    return context;
}