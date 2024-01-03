import prisma from '../../prisma'

import type { FavTvShowCreateI } from '../types/favTvShow'

export const createFavTvShow = async (data: FavTvShowCreateI) => {
	const tvShow = await prisma.favTvShow.create({
		data,
	})

	prisma.$disconnect()

	return tvShow
}

// export const getTvShowByName = async (name: string) => {
// 	const tvShow = await prisma.tvShow.findUnique({
// 		where: {
// 			name,
// 		},
// 	})

// 	prisma.$disconnect()

// 	return tvShow
// }

export const getFavTvShowsByUserId = async (userId: string) => {
	const watchedTvShows = await prisma.favTvShow.findMany({
		where: {
			userId,
		},
	})

	prisma.$disconnect()

	return watchedTvShows
}

export const getFavTvShowByUserIdAndTvShowName = async (
	userId: string,
	name: string
) => {
	const watchedTvShows = await prisma.favTvShow.findUnique({
		where: {
			userId_name: {
				userId,
				name,
			},
		},
	})

	prisma.$disconnect()

	return watchedTvShows
}

// export const updateEpisodeWatchedTvShow = async (
// 	userId: string,
// 	tvShowId: string,
// 	episodes: string
// ) => {
// 	const watchedTvShows = await prisma.watchedTvShow.update({
// 		where: {
// 			userId_tvShowId: {
// 				userId,
// 				tvShowId,
// 			},
// 		},
// 		data: {
// 			episodes,
// 		},
// 	})

// 	prisma.$disconnect()

// 	return watchedTvShows
// }
