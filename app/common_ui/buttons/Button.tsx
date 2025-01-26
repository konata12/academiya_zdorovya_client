import Link from 'next/link'

export default function Button({
    color = 'blue',
    isLink = false,
    url,
    text
}: {
    color?: 'yellow' | 'blue',
    isLink?: boolean,
    url?: string,
    text: string
}) {

    if (isLink) return (
        <Link
            href={url ? url : ''}
        >
            {text}
        </Link>
    )
    return (
        <button
            type='submit'
        >
            {text}
        </button>
    )
}
