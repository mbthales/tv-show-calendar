import { format, getDate, parseISO, isAfter, subMonths } from 'date-fns'

async function fetchEpisodes() {
	const url = 'http://localhost:3000/user/clqpw1dag00003zbertrfj2he/tvshow'
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHFwdzFkYWcwMDAwM3piZXJ0cmZqMmhlIiwidXNlcm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzAzOTcwOTU3LCJleHAiOjE3MDY1NjI5NTd9.USDv-58wUMvVWeUGKz9Xt60Rc6n58Oq6PkPo77XztNY',
		},
	})
	const resData = await res.json()
	const data = resData.data as { episodes: string }[]
	const episodes = data
		.map((tvshow) => {
			return JSON.parse(tvshow.episodes)
		})
		.flat()
		.sort(
			(a, b) => new Date(a.airdate).getTime() - new Date(b.airdate).getTime()
		)

	return episodes
}

interface Episode {
	airdate: string
	name: string
	number: number
	season: number
}

export default async function Episodes() {
	const episodes = (await fetchEpisodes()) as Episode[]

	const recentEpisodes = episodes.filter((episode) => {
		const episodeDate = parseISO(episode.airdate)
		const oneMonthAgo = subMonths(new Date(), 1)
		return isAfter(episodeDate, oneMonthAgo)
	})
	const groupedEpisodes = recentEpisodes.reduce(
		(groups: { [key: string]: Episode[] }, episode) => {
			const date = parseISO(episode.airdate)
			const key = format(date, 'yyyy-MM')

			if (!groups[key]) {
				groups[key] = []
			}
			groups[key].push(episode)
			return groups
		},
		{} as { [key: string]: Episode[] }
	)

	return (
		<div>
			{Object.entries(groupedEpisodes).map(([key, episodes]) => {
				const [year, month] = key.split('-')

				return (
					<div key={key} className="mb-6">
						<h2 className="font-bold">{`${month}/${year}`}</h2>
						{episodes.map(({ number, name, season, airdate }) => (
							<div key={number} className="flex gap-4">
								<p>{name}</p>
								<p>
									{season}X{number}
								</p>
								<p>Day {getDate(parseISO(airdate))}</p>
							</div>
						))}
					</div>
				)
			})}
		</div>
	)
}
