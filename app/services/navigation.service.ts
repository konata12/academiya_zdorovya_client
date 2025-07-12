export function checkCreatePage(pathname: string) {
    const lastElement = getUrlLastElement(pathname)
    return lastElement === 'create'
}

export function checkUpdatePage(pathname: string) {
    return pathname.split('/').includes('update')
}

export function getUrlLastElement(pathname: string) {
    const arr = pathname.split('/')
    return arr[arr.length - 1]
}

export function getUrlOrderElement(pathname: string, index: number) {
    return pathname.split('/')[index]
}