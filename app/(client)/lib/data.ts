import axios from '../utils/axios'

export async function fetchDepartments() {
    try {
        const res = await axios.get('departments')

        return res
    } catch (error) {
        console.log(error, '******************')
        throw Error('failed to fetch departments')
    }
}