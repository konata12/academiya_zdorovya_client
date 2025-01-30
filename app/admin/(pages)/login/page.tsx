'use client'

import axiosInstance from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/context/authContext";
import styles from './Login.module.scss'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const { accessToken, setAccessToken } = useAuth()
    console.log(accessToken, 112233)

    const router = useRouter()

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('auth/login', {
                userName,
                password
            })
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

    useEffect(() => {
        if (accessToken) {
            router.push('departments')
        }
    }, [accessToken, router])

    // If the user is already logged in, prevent rendering the login form
    if (accessToken) return <div className={styles.isLogged}>
        Ви вже увійшли, зараз вас перенесе на сторінку відділень
    </div>

    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={login}
            >
                <p className={styles.title}>Вхід</p>
                <input
                    className={`input ${styles.login}`}
                    type="text"
                    placeholder="Логін"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    className={`input ${styles.password}`}
                    type="text"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button className={`btn blue xl ${styles.btn}`}>
                    Увійти
                </button>
            </form>
        </div>
    );
}
