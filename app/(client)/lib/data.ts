import axios from '../utils/axios'

export async function fetchDepartments() {
    try {
        const data = await axios.get('departments')
        console.log(axios.getUri)
        console.log(data, 444)

        return data
    } catch (error) {
        console.log(error)
    }
}