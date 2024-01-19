import Link from 'next/link'

export default function Home() {
	return (
		<main className="flex items-center justify-center">
			<div className="flex flex-col items-center gap-10">
				<h1 className="text-center text-6xl">Tv Show Calendar</h1>
				<p className="px-4 text-center text-xl">
					Follow your favorite tv shows and never miss an episode again
				</p>
				<div className="flex gap-6">
					<Link
						href={'/sign-in'}
						className="hover-underline-animation text-xl"
					>
						Login
					</Link>
					<Link
						href={'/sign-up'}
						className="hover-underline-animation text-xl"
					>
						Register
					</Link>
				</div>
			</div>
		</main>
	)
}
