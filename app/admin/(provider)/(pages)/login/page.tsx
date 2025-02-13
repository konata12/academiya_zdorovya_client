'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.scss'
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { login } from "@/app/utils/redux/auth/authSlice";
import type { Login } from "@/app/types/auth";
import { RootState } from "@/app/utils/redux/store";
import { fullfilled } from "@/app/services/response";

export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const { accessToken, error } = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if (accessToken) router.push('/admin/departments')
    }, [accessToken])

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await dispatch(login({ userName, password }))
        const isFulfilled = fullfilled(response.meta.requestStatus)

        if (isFulfilled) {
            router.push('/admin/departments')
        }
    }

    // If the user is already logged in, prevent rendering the login form
    if (accessToken) return <div className={styles.isLogged}>
        Ви вже увійшли, зараз вас перенесе на сторінку відділень
    </div>

    return (
        <div className={styles.container}>
            <form
                className={styles.form}
                onSubmit={formSubmit}
            >
                <p className={`title lg ${styles.title}`}>Вхід</p>
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
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error.login && <p className='error'>{error.login.message}</p>}
                <button className={`btn blue xl ${styles.btn}`}>
                    Увійти
                </button>
            </form>
        </div>
    );
}
