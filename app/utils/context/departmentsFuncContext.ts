import { createContext, useContext } from "react";

export const DepartmentsContext = createContext<{
    getDepartments: () => Promise<void>;
}>({
    getDepartments: async () => {},
})

export function useDepartmentsFunc() {
    const context = useContext(DepartmentsContext)
    if (!context) {
        throw new Error("useAuth must be used within an DepartmentsContext.Provider");
    }
    return context;
}