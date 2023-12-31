import { verifyJwt } from '../utils/jwt'

import type { FastifyRequest, FastifyReply } from 'fastify'
import type { UserJwtI } from '../types/user'

export const userAuthenticator = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const { authorization } = req.headers
	const { userId } = req.params as { userId: string }

	const token = authorization?.replace('Bearer ', '')

	if (!token) {
		reply.code(401).send({
			error: 'Unauthorized',
		})

		return
	}

	try {
		const decoded = verifyJwt(token) as UserJwtI

		if (decoded.userId !== userId) {
			reply.code(401).send({
				error: 'Unauthorized',
			})

			return
		}

		return
	} catch (err) {
		reply.code(401).send({
			error: 'Unauthorized',
		})
	}
}
