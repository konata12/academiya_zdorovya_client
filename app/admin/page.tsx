'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function admin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (pathName === '/admin') {
        router.push('/admin/login')
        return
    }
    })
    return (
        <>
            {children}
        </>
    )
}
