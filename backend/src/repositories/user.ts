import prisma from '../../prisma'

import type { UserCreateI } from '../types/user'

export const createUser = async (data: UserCreateI) => {
	const user = await prisma.user.create({
		data,
	})

	prisma.$disconnect()

	return user
}

export const getUserByUsername = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
	})

	prisma.$disconnect()

	return user
}

export const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: { email },
	})

	prisma.$disconnect()

	return user
}
