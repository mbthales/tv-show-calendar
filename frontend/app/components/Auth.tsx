import Link from 'next/link'

export default function Auth() {
	return (
		<div className="flex gap-4">
			<Link href={'/login'}>Login</Link>
			<Link href={'/register'}>Register</Link>
		</div>
	)
}
