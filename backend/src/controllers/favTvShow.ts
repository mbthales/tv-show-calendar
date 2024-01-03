import { parseISO, isAfter, subMonths, format } from 'date-fns'

import { favTvShowSchema } from '../validators/favTvShow'
import {
	getFavTvShowByUserIdAndTvShowName,
	createFavTvShow,
	getFavTvShowsByUserId,
} from '../repositories/favTvShow'

import type { FastifyRequest, FastifyReply } from 'fastify'
import type { FavTvShowEpisodeI } from '../types/favTvShow'

export const addFavTvShowController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { userId } = req.params as { userId: string }
		const parsedBody = favTvShowSchema.safeParse(req.body)

		if (!parsedBody.success) {
			reply.code(400).send({
				error: 'Invalid body',
				details: parsedBody.error.issues,
			})

			return
		}

		const { name, poster, premiered, episodes } = parsedBody.data

		const userFavTvShow = await getFavTvShowByUserIdAndTvShowName(
			userId,
			name
		)

		if (userFavTvShow) {
			reply.code(201).send({
				msg: 'User already has this tv show as favorite',
			})

			return
		}

		await createFavTvShow({
			name,
			poster,
			premiered,
			episodes,
			userId,
		})

		reply.code(201).send({
			msg: 'User fav a new tv show',
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}

export const getFavTvShowsEpisodesController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { userId } = req.params as { userId: string }

		const favTvShows = (await getFavTvShowsByUserId(userId))
			.map((tvShow) => {
				const episodes = JSON.parse(tvShow.episodes) as FavTvShowEpisodeI[]

				return episodes.map((episode) => {
					return {
						tvShowName: tvShow.name,
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
		const recentEpisodes = favTvShows.filter(({ airdate }) => {
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
		}, {} as { [key: string]: { [key: string]: FavTvShowEpisodeI[] } })

		reply.code(200).send({
			data: groupedEpisodes,
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}

// export const updateEpisodeController = async (
// 	req: FastifyRequest,
// 	reply: FastifyReply
// ) => {
// 	const { userId, tvShowId, episodeNumber } = req.params as {
// 		userId: string
// 		tvShowId: string
// 		episodeNumber: string
// 	}

// 	const tvShowWatched = await getWatchedTvShowByUserIdAndTvShowId(
// 		userId,
// 		tvShowId
// 	)

// 	const tvShowEpisodes = JSON.parse(
// 		tvShowWatched?.episodes as string
// 	) as WatchedTvShowEpisodesI[]

// 	const updatedEpisodes = tvShowEpisodes?.map((episode) => {
// 		if (episode.number === Number(episodeNumber)) {
// 			return {
// 				...episode,
// 				isWatched: !episode.isWatched,
// 			}
// 		}

// 		return episode
// 	})
// 	const updatedEpisodesString = JSON.stringify(updatedEpisodes)

// 	await updateEpisodeWatchedTvShow(userId, tvShowId, updatedEpisodesString)

// 	reply.code(200).send({
// 		msg: 'Episode updated',
// 	})
// }
