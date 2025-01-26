'use client'

import axiosInstance from "@/app/utils/axios";
import Button from "@/app/common_ui/buttons/Button";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/context/authContext";

export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const { accessToken, setAccessToken } = useAuth()

    const router = useRouter()

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('auth/login', {
                userName,
                password
            })
            console.log(response)
            setError(null)
            setAccessToken(response.data.access_token)
            router.push('departments')
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
            }
            setAccessToken(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <p>Вхід</p>
                <input
                    type="text"
                    placeholder="Логін"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <Button
                    text={loading ? 'Очікуєм' : 'Увійти'}
                />
            </form>
        </div>
    );
}
