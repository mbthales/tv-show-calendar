'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { useState } from 'react'

import TvShowsFound from '@/app/components/TvShowsFound'

import type { TvShowApiI, TvShowFoundI, UserTvShowsI } from '@/app/types/tvShow'

export default function TvShows() {
	const [tvShowsFound, setTvShowsFound] = useState<TvShowFoundI[]>([])

	const { user } = useUser()
	const userId = user?.id.split('_')[1]

	const getUserTvShows = async () => {
		const url = `/api/tvshow/${userId}`
		const res = await fetch(url)
		const { data }: UserTvShowsI = await res.json()
		console.log(data)
		const tvShows = data.map((tvShow) => {
			return tvShow.tvShowId
		})

		return tvShows
	}

	const searchTvShow = async (tvShowSearched: string) => {
		const userTvShows = await getUserTvShows()

		const url = `https://api.tvmaze.com/search/shows?q=${tvShowSearched}`
		const res = await fetch(url)
		const data: TvShowApiI[] = await res.json()
		const formattedData = data.map((tvShow) => {
			return {
				name: tvShow.show.name,
				premiered: tvShow.show.premiered,
				poster: tvShow.show.image ? tvShow.show.image.original : null,
				id: tvShow.show.id,
				isWatched: userTvShows.includes(String(tvShow.show.id))
					? true
					: false,
			}
		})

		setTvShowsFound(formattedData)
	}

	return (
		<div className="flex flex-col">
			<div>
				<UserButton afterSignOutUrl="/" />
			</div>
			<input
				className="text-black"
				type="text"
				onChange={(e) => searchTvShow(e.target.value)}
			/>
			<TvShowsFound tvShows={tvShowsFound} userId={userId!} />
		</div>
	)
}
