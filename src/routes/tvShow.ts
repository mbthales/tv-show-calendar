import {
	addTvShowController,
	getTvShowsController,
	updateEpisodeController,
} from '../controllers/tvshow'
import { userAuthenticator } from '../middlewares/authentication'

import type { FastifyInstance } from 'fastify'

export const tvShowRoutes = async (app: FastifyInstance) => {
	app.post(
		'/user/:userId/tvshow',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			await addTvShowController(req, reply)
		}
	)

	app.get(
		'/user/:userId/tvshow',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			await getTvShowsController(req, reply)
		}
	)

	app.patch(
		'/user/:userId/tvshow/:tvShowId/episode/:episodeNumber',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			await updateEpisodeController(req, reply)
		}
	)
}
