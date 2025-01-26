import { Dispatch, SetStateAction } from "react";

export type AuthContextType = {
    accessToken: string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
} | null;