'use client'
import { AuthContext } from "@/app/utils/context/authContext";
import Footer from "@/app/admin/ui/Footer/Footer";
import Header from "@/app/admin/ui/Header/Header";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import SideNavigation from "@/app/admin/ui/SideNavigation/SideNavigation";
import styles from './layout.module.scss';
import { setAccessTokenGlob } from "@/app/utils/data_stores/tokens_store";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isLoginPage = !pathname || pathname.split('/')[2] === 'login'

    const refreshToken = async () => {
        try {
            const response = await axiosInstance.post('auth/refresh')

            console.log('response:', response)
            setAccessToken(response.data.access_token)
            setAccessTokenGlob(response.data.access_token)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message)
            } else {
                console.log(error)
            }

            setAccessToken(null)
            setAccessTokenGlob(null)
            router.push('/admin/login')
        }
    }

    useEffect(() => {
        refreshToken()
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken }}>
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
            </AuthContext.Provider>
        </>
    )
}


