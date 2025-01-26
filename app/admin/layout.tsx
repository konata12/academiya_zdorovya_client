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
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message)
            } else {
                console.log(error)
            }
            setAccessToken(null)
            router.push('login')
        }
    }

    useEffect(() => {
        refreshToken()
    }, [])

    return (
        <>
            <div className={styles.layout}>
                <AuthContext.Provider value={{ accessToken, setAccessToken }}>
                    <div className={styles.container}>
                        <Header isLoginPage={isLoginPage} />
                        {(!isLoginPage && accessToken) && <SideNavigation />}
                        <div className={styles.main}>
                            {((isLoginPage || accessToken) && children) || <div className={styles.not_logged_in}>
                                Ввійдіть в адмін панель
                            </div>}
                        </div>
                        <Footer />
                    </div>
                </AuthContext.Provider>
            </div>
        </>
    )
}


