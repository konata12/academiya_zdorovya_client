let accessToken: string | null = null;

export const getAccessTokenGlob = () => accessToken;
export const setAccessTokenGlob = (token: string | null) => {
    accessToken = token;
};