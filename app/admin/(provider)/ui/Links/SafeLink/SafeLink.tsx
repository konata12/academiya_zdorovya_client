import { useAppDispatch, useAppSelector } from '@/app/utils/redux/hooks'
import { setFormDefaultValues } from '@/app/utils/redux/navigation/navigationSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SafeLink({
    href,
    children,
    className
}: {
    href: string
    children: React.ReactNode
    className?: string
}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const formDefaultValues = useAppSelector(state => state.navigation.formDefaultValues)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!formDefaultValues) {
            // Get the closest <a> element
            const linkElement = (e.target as HTMLElement).closest('a')
            if (!linkElement) return // Safety check

            // check if link leads to the same page
            const linkUrl = linkElement.href
            const currentUrl = window.location.href
            if (linkUrl === currentUrl) return

            const confirmed = window.confirm("Ви впевнені, що хочете покинути сторінку? Зміни не буде збережено.");
            if (!confirmed) {
                e.preventDefault(); // Prevents navigation
                return;
            }
        }
        dispatch(setFormDefaultValues(true)) // after leaving page set formDefaultValues in redux to initial
        router.push(href); // Navigate manually
    };

    return (
        <Link
            className={`${className || ''}`}
            href={href}
            onClick={handleClick}
        >
            {children}
        </Link>
    )
}
