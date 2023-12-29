import { addTvShowController } from '../controllers/tvshow'
import { userAuthenticator } from '../middlewares/authentication'

import type { FastifyInstance } from 'fastify'

export const tvShowRoutes = async (app: FastifyInstance) => {
	app.get(
		'/user/:userId/tvshow',
		{
			preValidation: [userAuthenticator],
		},
		async (req, reply) => {
			addTvShowController(req, reply)
		}
	)
}
