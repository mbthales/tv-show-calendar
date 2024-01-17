import { prisma } from '@/prisma'

import type { TvShowI } from '../types/tvShow'

export const createTvShow = async (data: TvShowI) => {
	const tvShow = await prisma.tvShow.create({
		data,
	})

	prisma.$disconnect()

	return tvShow
}

export const getUserTvShows = async (userId: string) => {
	const tvShows = await prisma.tvShow.findMany({
		where: {
			userId,
		},
	})

	prisma.$disconnect()

	return tvShows
}
