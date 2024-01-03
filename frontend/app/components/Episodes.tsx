interface Episode {
	[byYear: string]: {
		[byMonth: string]: {
			tvShowName: string
			episodeName: string
			number: number
			season: number
			airdate: string
			isWatched: boolean
		}[]
	}
}

async function fetchEpisodes() {
	const url =
		'http://localhost:3000/user/clqx1s9bu0000n5itwg4hlu4w/tvShow/episode'
	const res = await fetch(url, {
		cache: 'no-cache',
		method: 'GET',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHF4MXM5YnUwMDAwbjVpdHdnNGhsdTR3IiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzA0MjQyMjAwLCJleHAiOjE3MDY4MzQyMDB9.V6squSL-rWMMBwcrzrqloODGHzUhNwAY0cMxU00g6CQ',
		},
	})
	const resData = await res.json()

	return resData.data as Episode
}

export default async function Episodes() {
	const episodes = await fetchEpisodes()

	const episodeCount = (season: number, number: number) => {
		return `S${season.toString().padStart(2, '0')}E${number
			.toString()
			.padStart(2, '0')}`
	}

	return (
		<div>
			{Object.entries(episodes).map(([year, months]) => {
				return (
					<div key={year}>
						<h2 className="font-bold text-2xl mt-6">{year}</h2>
						{Object.entries(months).map(([month, episodes]) => (
							<div key={month}>
								<h3 className="text-xl mt-4 mb-2">{month}</h3>
								{episodes.map(
									({
										tvShowName,
										episodeName,
										season,
										number,
										airdate,
									}) => (
										<div key={number} className="flex gap-4">
											<p>{tvShowName}</p>
											<p>
												{episodeName} -{' '}
												{episodeCount(season, number)}
											</p>
											<p>{airdate}</p>
											<button>Watched</button>
										</div>
									)
								)}
							</div>
						))}
					</div>
				)
			})}
		</div>
	)
}
