'use client'

import Footer from "@/app/admin/(provider)/ui/Footer/Footer";
import Header from "@/app/admin/(provider)/ui/Header/Header";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideNavigation from "@/app/admin/(provider)/ui/SideNavigation/SideNavigation";
import styles from './layout.module.scss';
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { fulfilled } from "@/app/services/response";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken)
    const router = useRouter()
    const pathname = usePathname()
    const isLoginPage = !pathname || pathname.split('/')[2] === 'login'

    // const refreshToken = async () => {
    //     try {
    //         const response = await axiosInstance.post('auth/refresh')

    //         console.log('response:', response)
    //         setAccessToken(response.data.access_token)
    //         setAccessTokenGlob(response.data.access_token)
    //     } catch (error) {
    //         if (error instanceof AxiosError) {
    //             console.log(error.message)
    //         } else {
    //             console.log(error)
    //         }

    //         setAccessToken(null)
    //         setAccessTokenGlob(null)
    //         router.push('/admin/login')
    //     }
    // }

    const refreshTokensAndCheckIsLogin = async () => {
        const response = await dispatch(refreshTokens())
        const isFulfilled = fulfilled(response.meta.requestStatus)
        if (!isFulfilled) router.push('/admin/login')
    }

    useEffect(() => {
        refreshTokensAndCheckIsLogin()
    }, [])

    return (
        <>
            <div className={styles.layout}>
                <div className={`${styles.container} ${!isLoginPage && styles.loggedIn}`}>
                    <Header isLoginPage={isLoginPage} />
                    <div className={styles.main}>
                        <div className={`container ${styles.container}`}>
                            {(!isLoginPage && accessToken) && <>
                                <SideNavigation />
                                <div className={styles.empty}>0</div>
                            </>}
                            {((isLoginPage || accessToken) && children) || <div className={styles.not_logged_in}>
                                Ввійдіть в адмін панель
                            </div>}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}


