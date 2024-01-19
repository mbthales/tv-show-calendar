import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

export default function Header() {
	const pathname = usePathname()

	return (
		<header className="flex justify-around p-8">
			<h1>Tv Show Calendar</h1>

			<div className="flex items-center justify-center gap-6">
				<Link
					href="/calendar"
					className={pathname === '/calendar' ? 'underline' : ''}
				>
					Calendar
				</Link>
				<Link
					href="/tv-shows"
					className={pathname === '/tv-shows' ? 'underline' : ''}
				>
					Tv Shows
				</Link>
				<UserButton />
			</div>
		</header>
	)
}
