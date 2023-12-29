import fastify from 'fastify'
import cookie from '@fastify/cookie'

import userRoutes from './routes/user'

const app = fastify()

app.register(cookie)

userRoutes(app)

app.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
