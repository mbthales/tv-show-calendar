import type { FastifyInstance } from 'fastify'

import { registerController, loginController } from '../controllers/user'

const userRoutes = async (app: FastifyInstance) => {
	app.post('/register', async (req, reply) => {
		await registerController(req, reply)
	})

	app.post('/login', async (req, reply) => {
		await loginController(req, reply)
	})
}

export default userRoutes
