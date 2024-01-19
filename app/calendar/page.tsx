'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

import type { GroupedEpisodesI } from '@/app/types/tvShow'

import Header from '../components/Header'

export default function Episodes() {
	const [userEpisodes, setUserEpisodes] = useState<GroupedEpisodesI>({})
	const { user } = useUser()

	const fetchUserEpisodes = async (userId: string) => {
		const url = `api/tvshow/user/${userId}/episodes`
		const res = await fetch(url, {
			method: 'GET',
		})
		const { data } = await res.json()

		setUserEpisodes(data)
	}

	const episodeCount = (season: number, number: number) => {
		return `S${season.toString().padStart(2, '0')}E${number
			.toString()
			.padStart(2, '0')}`
	}

	useEffect(() => {
		const userId = user?.id.split('_')[1]

		fetchUserEpisodes(userId!)
	}, [user])

	return (
		<>
			<Header />
			<main>
				{Object.entries(userEpisodes).map(([year, months]) => {
					return (
						<div key={year}>
							<h2 className="mt-6 text-2xl font-bold">{year}</h2>
							{Object.entries(months).map(([month, episodes]) => (
								<div key={month}>
									<h3 className="mb-2 mt-4 text-xl">{month}</h3>
									{episodes.map(
										({
											tvShowName,
											episodeName,
											season,
											number,
											airdate,
											episodeId,
										}) => (
											<div key={episodeId} className="flex gap-4">
												<p>{tvShowName}</p>
												<p>
													{episodeName} -{' '}
													{episodeCount(season, number)}
												</p>
												<p>{airdate}</p>
											</div>
										)
									)}
								</div>
							))}
						</div>
					)
				})}
			</main>
		</>
	)
}
