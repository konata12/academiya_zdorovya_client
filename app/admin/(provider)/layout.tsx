'use client'

import Footer from "@/app/admin/(provider)/ui/Footer/Footer";
import Header from "@/app/admin/(provider)/ui/Header/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './layout.module.scss';
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { fullfilled } from "@/app/services/response";
import Main from "@/app/admin/(provider)/ui/Main/Main";
import { RootState } from "@/app/utils/redux/store";


export default function Admin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
            accessToken,
    } = useAppSelector((state: RootState) => state.auth)
    
    const dispatch = useAppDispatch()
    const router = useRouter()

    const refreshTokensAndCheckIsLogin = async () => {
        const response = await dispatch(refreshTokens())
        const isFulfilled = fullfilled(response.meta.requestStatus)
        if (!isFulfilled) router.push('/admin/login')
    }

    useEffect(() => {
        if (accessToken) return
        refreshTokensAndCheckIsLogin()
    }, [])

    return (
        <>
            <div className={styles.layout}>
                <div className={`${styles.layoutContainer}`}>
                    <Header />
                    <Main>
                        {children}
                    </Main>
                    <Footer />
                </div>
            </div>
        </>
    )
}