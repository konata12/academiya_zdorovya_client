// wrapper for request with response status 401
// refreshes acces token and again calls fetch function

export async function requestWrapper<T>(fetchFunction: Function, data?: any) {
    try {
        await fetchFunction(data)
    } catch (error) {
        console.log(error)

        try {
            await refreshToken()
        } catch (error) {
            
        }
    }
}