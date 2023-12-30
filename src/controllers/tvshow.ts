import { watchedTvShowSchema } from '../validators/tvShow'
import {
	createTvShow,
	getTvShowByName,
	createWatchedTvShow,
	getWatchedTvShowsByUser,
	getWatchedTvShowByUserIdAndTvShowId,
	updateEpisodeWatchedTvShow,
} from '../repositories/tvShow'

import type { FastifyRequest, FastifyReply } from 'fastify'
import type { WatchedTvShowEpisodesI } from '../types/tvShow'

export const addTvShowController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { userId } = req.params as { userId: string }
		const parsedBody = watchedTvShowSchema.safeParse(req.body)

		if (!parsedBody.success) {
			reply.code(400).send({
				error: 'Invalid body',
				details: parsedBody.error.issues,
			})

			return
		}

		const { name, poster, premiered, episodes } = parsedBody.data

		const tvShowExists = await getTvShowByName(name)

		if (!tvShowExists) {
			const tvShow = await createTvShow({ name, poster, premiered })

			await createWatchedTvShow({
				userId,
				tvShowId: tvShow.id,
				episodes,
			})

			reply.code(201).send({
				msg: 'User added a new tv show and a new watched tv show',
			})

			return
		}

		const tvShowWatched = await getWatchedTvShowByUserIdAndTvShowId(
			userId,
			tvShowExists.id
		)

		if (tvShowWatched) {
			reply.code(400).send({
				error: 'User already watched this tv show',
			})

			return
		}

		await createWatchedTvShow({
			userId,
			tvShowId: tvShowExists.id,
			episodes,
		})

		reply.code(201).send({
			msg: 'User added a new watched tv show',
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}

export const getTvShowsController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const { userId } = req.params as { userId: string }

		const watchedTvShows = await getWatchedTvShowsByUser(userId)

		reply.code(200).send({
			msg: 'User watched tv shows',
			data: watchedTvShows,
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}

export const updateEpisodeController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const { userId, tvShowId, episodeNumber } = req.params as {
		userId: string
		tvShowId: string
		episodeNumber: string
	}

	const tvShowWatched = await getWatchedTvShowByUserIdAndTvShowId(
		userId,
		tvShowId
	)

	const tvShowEpisodes = JSON.parse(
		tvShowWatched?.episodes as string
	) as WatchedTvShowEpisodesI[]

	const updatedEpisodes = tvShowEpisodes?.map((episode) => {
		if (episode.number === Number(episodeNumber)) {
			return {
				...episode,
				isWatched: !episode.isWatched,
			}
		}

		return episode
	})
	const updatedEpisodesString = JSON.stringify(updatedEpisodes)

	await updateEpisodeWatchedTvShow(userId, tvShowId, updatedEpisodesString)

	reply.code(200).send({
		msg: 'Episode updated',
	})
}
