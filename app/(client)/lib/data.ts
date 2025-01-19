import axios from '../utils/axios'

export async function fetchDepartments() {
    try {
        const res = await fetch(`http://localhost:5000/departments`, {
            method: 'GET'
        })

        return res
    } catch (error) {
        console.log(error)
        throw Error('failed to fetch departments')
    }
}