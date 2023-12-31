import fastify from 'fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

import userRoutes from './routes/user'
import { tvShowRoutes } from './routes/tvShow'

const app = fastify()

app.register(cookie)
app.register(cors, {
	origin: 'http://localhost:3001',
	credentials: true,
})

userRoutes(app)
tvShowRoutes(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
