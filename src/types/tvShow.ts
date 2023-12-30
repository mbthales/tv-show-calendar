export interface TvShowCreateI {
	name: string
	poster: string
	premiered: string
}

export interface WatchedTvShowEpisodesI {
	name: string
	season: number
	number: number
	airdate: string
	isWatched: boolean
}

export interface WatchedTvShowCreateI {
	episodes: string
	tvShowId: string
	userId: string
}
