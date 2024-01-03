import {
	addFavTvShowController,
	getFavTvShowsEpisodesController,
	// updateEpisodeController,
} from '../controllers/favTvShow'
import { userAuthenticator } from '../middlewares/authentication'

import type { FastifyInstance } from 'fastify'

export const tvShowRoutes = async (app: FastifyInstance) => {
	app.post(
		'/user/:userId/tvShow',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			await addFavTvShowController(req, reply)
		}
	)

	app.get(
		'/user/:userId/tvShow/episode',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			await getFavTvShowsEpisodesController(req, reply)
		}
	)

	// app.patch(
	// 	'/user/:userId/tvshow/:tvShowId/episode/:episodeNumber',
	// 	{
	// 		preValidation: [userAuthenticator],
	// 	},
	// 	async (req, reply) => {
	// 		await updateEpisodeController(req, reply)
	// 	}
	// )
}
