'use client'

import store from '@/app/utils/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';

export default function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const length = pathname.split('/').length
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (length === 2) {
            accessToken ?
                router.push('/admin/login')
                : router.push('/admin/departments')
        }
    })
    
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
