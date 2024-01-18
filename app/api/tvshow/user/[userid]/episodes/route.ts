import { parseISO, isAfter, subMonths, format } from 'date-fns'

import { getUserTvShows } from '@/server/repositories/tvShow'

import type {
	UserIdTvShowIdParamsI,
	GroupedEpisodesI,
	TvShowEpisodeI,
} from '@/app/types/tvShow'

export async function GET(_: Request, { params }: UserIdTvShowIdParamsI) {
	try {
		const { userid } = params
		const tvShows = await getUserTvShows(userid)
		const tvShowsEpisodes = tvShows
			.map((tvShow) => {
				const episodes: TvShowEpisodeI[] = JSON.parse(tvShow.episodes)

				return episodes.map((episode) => {
					return {
						tvShowName: tvShow.name,
						episodeId: episode.id,
						episodeName: episode.name,
						season: episode.season,
						number: episode.number,
						airdate: episode.airdate,
						isWatched: episode.isWatched,
					}
				})
			})
			.flat()
			.sort(
				(a, b) =>
					new Date(a.airdate).getTime() - new Date(b.airdate).getTime()
			)

		const recentEpisodes = tvShowsEpisodes.filter(({ airdate }) => {
			const episodeDate = parseISO(airdate)
			const oneMonthAgo = subMonths(new Date(), 1)

			return isAfter(episodeDate, oneMonthAgo)
		})

		const groupedEpisodes = recentEpisodes.reduce((groups, episode) => {
			const date = parseISO(episode.airdate)
			const year = format(date, 'yyyy')
			const month = format(date, 'MMMM')

			if (!groups[year]) {
				groups[year] = {}
			}

			if (!groups[year][month]) {
				groups[year][month] = []
			}

			groups[year][month].push(episode)

			return groups
		}, {} as GroupedEpisodesI)

		return Response.json({ data: groupedEpisodes })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
