'use client'

import { useAuth } from "@/app/utils/context/authContext"

export default function Departments() {
    const { accessToken, setAccessToken } = useAuth()
    console.log(accessToken)
    return (
        <div>
            sraka
        </div>
    )
}
