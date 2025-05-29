'use client'

import store from '@/app/utils/redux/store';
import React from 'react'
import { Provider } from 'react-redux';

export default function page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
