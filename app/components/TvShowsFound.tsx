import Image from 'next/image'

import type {
	TvShowEpisodesI,
	TvShowFoundI,
	TvShowsFoundPropsI,
} from '@/app/types/tvShow'

export default function TvShowsFound({ tvShows, userId }: TvShowsFoundPropsI) {
	const getTvShowEpisodes = async (tvShowId: string) => {
		const url = `https://api.tvmaze.com/shows/${tvShowId}/episodes`
		const res = await fetch(url)
		const data: TvShowEpisodesI[] = await res.json()
		const formattedData = data.map((episode) => {
			return {
				id: episode.id,
				airdate: episode.airdate,
				number: episode.number,
				season: episode.season,
				name: episode.name,
				isWatched: false,
			}
		})

		return JSON.stringify(formattedData)
	}

	const removeTvShowAsWatched = async (tvShowId: string) => {
		const url = `/api/tvshow/user/${userId}`

		await fetch(url, {
			method: 'DELETE',
			body: JSON.stringify({
				tvShowId: String(tvShowId),
			}),
		})
	}

	const markTvShowAsWatched = async (tvShow: TvShowFoundI) => {
		const url = `/api/tvshow/user/${userId}`
		await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				name: tvShow.name,
				tvShowId: String(tvShow.tvShowId),
				premiered: tvShow.premiered,
				episodes: await getTvShowEpisodes(tvShow.tvShowId),
			}),
		})
	}

	return (
		<div className="flex flex-col">
			{tvShows.map((tvShow) => {
				return (
					<div key={tvShow.tvShowId} className="flex flex-col">
						<div>
							<p>{tvShow.name}</p>
							<p>{tvShow.premiered}</p>
							{tvShow.poster && (
								<Image
									src={tvShow.poster}
									alt={tvShow.name}
									width={200}
									height={200}
								/>
							)}
						</div>
						{tvShow.isWatched ? (
							<button
								onClick={() => removeTvShowAsWatched(tvShow.tvShowId)}
							>
								Added
							</button>
						) : (
							<button onClick={() => markTvShowAsWatched(tvShow)}>
								Add
							</button>
						)}
					</div>
				)
			})}
		</div>
	)
}
