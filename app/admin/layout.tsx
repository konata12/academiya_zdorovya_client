'use client'
import { AuthContext } from "@/app/utils/context/authContext";
import Footer from "@/app/admin/ui/Footer/Footer";
import Header from "@/app/admin/ui/Header/Header";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import SideNavigation from "@/app/admin/ui/SideNavigation/SideNavigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isLoginPage = !pathname || pathname.split('/')[2] === 'login'
    console.log(isLoginPage)

    const refreshToken = async () => {
        try {
            const response = await axiosInstance.post('auth/refresh')

            console.log(response)
            setAccessToken(response.data.access_token)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message)
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
            <AuthContext.Provider value={{ accessToken, setAccessToken }}>
                <Header />
                {!isLoginPage && <SideNavigation />}
                {children}
                <Footer />
            </AuthContext.Provider>
        </>
    )
}


