import type { FastifyRequest, FastifyReply } from 'fastify'

import { watchedTvShowSchema } from '../validators/tvShow'
import {
	createTvShow,
	getTvShowByName,
	createWatchedTvShow,
	getWatchedTvShowsByUser,
} from '../repositories/tvShow'

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

			const watchedTvShow = await createWatchedTvShow({
				userId,
				tvShowId: tvShow.id,
				episodes,
			})

			reply.code(201).send({
				msg: 'User added a new tv show',
				data: watchedTvShow,
			})

			return
		}

		const userWatchedTvShows = await getWatchedTvShowsByUser(userId)
		const tvShowWatched = userWatchedTvShows.find(({ tvShowId }) => {
			return tvShowId === tvShowExists.id
		})

		if (tvShowWatched) {
			reply.code(400).send({
				error: 'User already added this tv show',
			})

			return
		}

		const watchedTvShow = await createWatchedTvShow({
			userId,
			tvShowId: tvShowExists.id,
			episodes,
		})

		reply.code(201).send({
			msg: 'User added a new tv show',
			data: watchedTvShow,
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}
