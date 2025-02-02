'use client'

import CommonTable from "@/app/admin/ui/Tables/Common/CommonTable"
import TableLine from "@/app/admin/ui/Tables/ListOption/TableLine"
import type { Departments } from "@/app/types/departments"
import axiosInstance from "@/app/utils/axios"
import { useAuth } from "@/app/utils/context/authContext"
import { useEffect, useState } from "react"

export default function Departments() {
    const { accessToken, setAccessToken } = useAuth()
    const [departments, setDepartments] = useState<Departments[] | null>(null)

    const getDepartments = async () => {
        try {
            const response = await axiosInstance.get('departments')
            setDepartments(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDepartments()
    }, [])

    console.log(departments)
    const titles = ['Місто', 'Адреса', 'Гаряча лінія', 'Опції']
    return (
        <div className="fw">
            <p>Відділення</p>
            <CommonTable
                titles={titles}
            >
                {departments && departments.map((department) => <TableLine key={department.id}>
                    <span>{department.city}</span>
                    <span>{department.address}</span>
                    <span>{department.hotline}</span>
                    <span>{department.city}</span>
                </TableLine>)}
            </CommonTable>
        </div>
    )
}
