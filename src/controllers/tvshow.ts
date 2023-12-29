import type { FastifyRequest, FastifyReply } from 'fastify'

export const addTvShowController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	reply.send('Hello World')
}
