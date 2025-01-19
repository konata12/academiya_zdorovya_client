'use client'
import { usePathname } from "next/navigation"
import styles from './navbar.module.scss'
import Image from "next/image"
import logo from '@/public/icons/logo.svg'
import Departments_select from "@/app/(client)/ui/Navbar/Departments_select/Departments_select"

export default function Navbar() {
    const pathname = usePathname()
    const jopa = pathname.split('/')
    if (jopa[1] === 'admin') return

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