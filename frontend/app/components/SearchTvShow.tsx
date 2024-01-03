'use client'

import { useState, useEffect } from 'react'

interface apiTvShow {
	score: number
	show: {
		id: number
		name: string
		image: { original: string; medium: string }
		premiered: string
	}
}

interface foundedTvShow {
	id: number
	name: string
	image: string
	premiered: string
	favorite: boolean
}

interface episodesTvShow {
	airdate: string
	name: string
	season: number
	number: number
}

export default function SearchTvShow() {
	const [inputShow, setInputShow] = useState('')
	const [foundedShows, setFoundedShows] = useState<foundedTvShow[]>([])

	const searchShow = async () => {
		const url = `https://api.tvmaze.com/search/shows?q=${inputShow}`
		const res = await fetch(url)
		const data = (await res.json()) as [apiTvShow]
		const tvShows = data.map(({ show }) => {
			return {
				id: show.id,
				name: show.name,
				image: show.image.original
					? show.image.original
					: show.image.medium,
				premiered: show.premiered,
				favorite: false,
			}
		})
		setFoundedShows(tvShows)
	}

	const markTvShow = (id: number) => {
		const tvShow = foundedShows.find((show) => show.id === id)

		saveFavTvShow(id)

		if (tvShow) {
			tvShow.favorite = !tvShow.favorite
			setFoundedShows([...foundedShows])
		}
	}

	const fetchEpisodesFavTvShows = async (tvShowId: number) => {
		const url = `https://api.tvmaze.com/shows/${tvShowId}/episodes`
		const res = await fetch(url)
		const data = (await res.json()) as [episodesTvShow]
		const episodes = data.map((episode) => {
			return {
				airdate: episode.airdate,
				name: episode.name,
				season: episode.season,
				number: episode.number,
				isWatched: false,
			}
		})

		return JSON.stringify(episodes)
	}

	const saveFavTvShow = async (tvShowId: number) => {
		const episodes = await fetchEpisodesFavTvShows(tvShowId)

		const url = `http://localhost:3000/user/clqx1s9bu0000n5itwg4hlu4w/tvShow`

		const tvShowName = foundedShows.find((show) => show.id === tvShowId)?.name
		const tvShowPoster = foundedShows.find(
			(show) => show.id === tvShowId
		)?.image
		const tvShowPremiered = foundedShows.find(
			(show) => show.id === tvShowId
		)?.premiered

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHF4MXM5YnUwMDAwbjVpdHdnNGhsdTR3IiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzA0MjQyMjAwLCJleHAiOjE3MDY4MzQyMDB9.V6squSL-rWMMBwcrzrqloODGHzUhNwAY0cMxU00g6CQ',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: tvShowName,
				poster: tvShowPoster,
				premiered: tvShowPremiered,
				episodes,
			}),
		})

		console.log(res)
	}

	useEffect(() => {
		searchShow()
	}, [inputShow])

	return (
		<main>
			<input
				type="text"
				onChange={(e) => setInputShow(e.target.value)}
				placeholder="Search"
			/>
			<div>
				{foundedShows.map(({ id, name, premiered, favorite }) => (
					<div key={id}>
						<p>{name}</p>
						<p>{premiered}</p>
						<button onClick={() => markTvShow(id)}>
							{favorite ? 'Remove from favorites' : 'Add to favorites'}
						</button>
					</div>
				))}
			</div>
		</main>
	)
}
