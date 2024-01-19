import { prisma } from '@/prisma'

import type { TvShowI } from '@/server/types/tvShow'

export const createTvShow = async (data: TvShowI) => {
	const tvShow = await prisma.tvShow.create({
		data,
	})

	return tvShow
}

export const findTvShowByUserId = async (userId: string, tvShowId: string) => {
	const tvShow = await prisma.tvShow.findUnique({
		where: {
			tvShowId_userId: {
				tvShowId,
				userId,
			},
		},
	})

	return tvShow
}

export const getUserTvShows = async (userId: string) => {
	const tvShows = await prisma.tvShow.findMany({
		where: {
			userId,
		},
	})

	return tvShows
}

export const deleteTvShow = async (userId: string, tvShowId: string) => {
	const tvShow = await prisma.tvShow.delete({
		where: {
			tvShowId_userId: {
				tvShowId,
				userId,
			},
		},
	})

	return tvShow
}
