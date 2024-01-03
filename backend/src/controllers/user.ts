import { registerSchema, loginSchema } from '../validators/user'
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '../repositories/user'
import { hashPassword, comparePassword } from '../utils/password'
import { generateJwt } from '../utils/jwt'

import type { FastifyRequest, FastifyReply } from 'fastify'

export const registerController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const parsedBody = registerSchema.safeParse(req.body)

		if (!parsedBody.success) {
			reply.code(400).send({
				error: 'Invalid body',
				details: parsedBody.error.issues,
			})

			return
		}

		const { username, password, email } = parsedBody.data

		const userExists = await getUserByUsername(username)

		if (userExists) {
			reply.code(409).send({
				error: 'User already exists',
			})

			return
		}

		const emailExists = await getUserByEmail(email)

		if (emailExists) {
			reply.code(409).send({
				error: 'Email already exists',
			})

			return
		}

		const hashedPassword = await hashPassword(password)

		const user = await createUser({
			username,
			password: hashedPassword,
			email,
		})

		reply.code(201).send({
			msg: 'User created successfully',
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}

export const loginController = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	try {
		const parsedBody = loginSchema.safeParse(req.body)

		if (!parsedBody.success) {
			reply.code(400).send({
				error: 'Invalid body',
				details: parsedBody.error.issues,
			})

			return
		}

		const { username, password } = parsedBody.data

		const user = await getUserByUsername(username)

		if (!user) {
			reply.code(401).send({
				error: 'Invalid credentials',
			})

			return
		}
		const isValidPassword = await comparePassword(password, user.password)

		if (!isValidPassword) {
			reply.code(401).send({
				error: 'Invalid credentials',
			})

			return
		}

		const token = generateJwt(user.id, user.username)

		reply.header('Authorization', `Bearer ${token}`)

		reply.code(200).send({
			msg: 'User logged in successfully',
		})
	} catch (err) {
		console.error(err)

		reply.code(500).send({
			error: 'Internal server error',
		})
	}
}
