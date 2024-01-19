import { SignIn } from '@clerk/nextjs'

export default function Signup() {
	return (
		<main className="flex items-center justify-center">
			<SignIn />
		</main>
	)
}
