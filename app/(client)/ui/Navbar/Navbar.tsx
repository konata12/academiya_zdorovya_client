'use client'
import { usePathname } from "next/navigation"
import styles from './navbar.module.scss'
import Image from "next/image"
import logo from '@/public/icons/logo.svg'
import Departments_select from "@/app/(client)/ui/Navbar/Departments_select/Departments_select"
import Links from "@/app/(client)/ui/Navbar/Links/Links"
import Link from "next/link"
import Button from "@/app/common_ui/buttons/Button"

export default function Navbar() {
    // if admin page then don't appear
    const pathname = usePathname()
    if (!pathname || pathname.split('/')[1] === 'admin') return null

    return <div className={styles.navbar}>
        <div className={`${styles.container} container`}>
            <Link href={'/'}>
                <Image
                    src={logo}
                    alt="logo"
                />
            </Link>
            <Departments_select />
            <Links />
            <Button
                text="Запис на прийом"
                isLink={true}
                url="contacts"
            />
        </div>
    </div>
}