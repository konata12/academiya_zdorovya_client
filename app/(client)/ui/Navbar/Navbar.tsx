'use client'
import { usePathname } from "next/navigation"
import styles from './navbar.module.scss'
import Image from "next/image"
import logo from '@/public/icons/logo.svg'
import Departments_select from "@/app/(client)/ui/Navbar/Departments_select/Departments_select"
import { Suspense, useState } from "react"
import Departments_select_skeleton from "@/app/(client)/ui/fallbacks/skeletons/Departments_select_skeleton"
import { fetchDepartments } from "@/app/(client)/lib/data"

export default function Navbar() {
    // if admin page then don't appear
    const pathname = usePathname()
    const jopa = pathname.split('/')
    if (jopa[1] === 'admin') return

    // fetch departments
    

    return <div className={styles.navbar}>
        <div className={`${styles.container} container`}>
            <Image
                src={logo}
                alt="logo"
            />
            {/* <Suspense fallback={<Departments_select_skeleton />}> */}
            <Departments_select />
            {/* </Suspense> */}
        </div>
    </div>
}