import prisma from '../../prisma'

import type { TvShowCreateI, WatchedTvShowCreateI } from '../types/tvShow'

export const createTvShow = async (data: TvShowCreateI) => {
	const tvShow = await prisma.tvShow.create({
		data,
	})

	prisma.$disconnect()

	return tvShow
}

export const getTvShowByName = async (name: string) => {
	const tvShow = await prisma.tvShow.findUnique({
		where: {
			name,
		},
	})

	prisma.$disconnect()

	return tvShow
}

export const createWatchedTvShow = async (data: WatchedTvShowCreateI) => {
	const watchedTvShow = await prisma.watchedTvShow.create({
		data,
	})

	prisma.$disconnect()

	return watchedTvShow
}

export const getWatchedTvShowsByUser = async (userId: string) => {
	const watchedTvShows = await prisma.watchedTvShow.findMany({
		where: {
			userId,
		},
	})

	prisma.$disconnect()

	return watchedTvShows
}
