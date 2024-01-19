import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

import Header from './components/Header'

export const metadata: Metadata = {
	title: 'Tv Show Calendar',
	description:
		'Follow your favorite tv shows and never miss an episode again.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>{children}</body>
			</html>
		</ClerkProvider>
	)
}
