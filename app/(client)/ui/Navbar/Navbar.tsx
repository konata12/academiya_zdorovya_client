'use client'
import { usePathname } from "next/navigation"
import styles from './navbar.module.scss'
import Image from "next/image"
import logo from '@/public/icons/logo.svg'
import Departments_select from "@/app/(client)/ui/Navbar/Departments_select/Departments_select"

export default function Navbar() {
    // if admin page then don't appear
    const pathname = usePathname()
    if (!pathname || pathname.split('/')[1] === 'admin') return null

    // fetch departments


    return <div className={styles.navbar}>
        <div className={`${styles.container} container`}>
            <Image
                src={logo}
                alt="logo"
            />
            <Departments_select />
            
        </div>
    </div>
}