import { AuthContextType } from "@/app/admin/types";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextType>(null)
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContext.Provider");
    }
    return context;
}