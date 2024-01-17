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
				epTitle: episode.name,
			}
		})

		return JSON.stringify(formattedData)
	}

	const markTvShowAsWatched = async (tvShow: TvShowFoundI) => {
		const url = `/api/tvshow/${userId}`
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				name: tvShow.name,
				tvShowId: String(tvShow.id),
				premiered: tvShow.premiered,
				episodes: await getTvShowEpisodes(tvShow.id),
			}),
		})
		const data = await res.json()
		console.log(data)
	}

	return (
		<div className="flex flex-col">
			{tvShows.map((tvShow) => {
				return (
					<div key={tvShow.id} className="flex flex-col">
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
							<button>Added</button>
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
