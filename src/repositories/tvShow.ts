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

export const getWatchedTvShowByUserIdAndTvShowId = async (
	userId: string,
	tvShowId: string
) => {
	const watchedTvShows = await prisma.watchedTvShow.findUnique({
		where: {
			userId_tvShowId: {
				userId,
				tvShowId,
			},
		},
	})

	prisma.$disconnect()

	return watchedTvShows
}

export const updateEpisodeWatchedTvShow = async (
	userId: string,
	tvShowId: string,
	episodes: string
) => {
	const watchedTvShows = await prisma.watchedTvShow.update({
		where: {
			userId_tvShowId: {
				userId,
				tvShowId,
			},
		},
		data: {
			episodes,
		},
	})

	prisma.$disconnect()

	return watchedTvShows
}
