'use client'

import Footer from "@/app/admin/(provider)/ui/Footer/Footer";
import Header from "@/app/admin/(provider)/ui/Header/Header";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SideNavigation from "@/app/admin/(provider)/ui/SideNavigation/SideNavigation";
import styles from './layout.module.scss';
import { refreshTokens } from "@/app/utils/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/utils/redux/hooks";
import { RootState } from "@/app/utils/redux/store";
import { fullfilled } from "@/app/services/response";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { accessToken } = useAppSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()

    const isLoginPage = pathname.split('/')[2] === 'login'

    const refreshTokensAndCheckIsLogin = async () => {
        const response = await dispatch(refreshTokens())
        const isFulfilled = fullfilled(response.meta.requestStatus)
        if (!isFulfilled) router.push('/admin/login')
    }

    useEffect(() => {
        refreshTokensAndCheckIsLogin()
    }, [])

    return (
        <>
            <div className={styles.layout}>
                <div className={`${styles.layoutContainer}`}>
                    <Header isLoginPage={isLoginPage} />
                    <div className={styles.main}>
                        <div className={`container ${styles.mainContainer}`}>
                            {(!isLoginPage && accessToken) && <>
                                <SideNavigation />
                                <div className={styles.empty}></div>
                            </>}
                            {((isLoginPage || accessToken)
                                && <div className={styles.children}>
                                    {children}
                                </div>)
                                || <div className={styles.not_logged_in}>
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