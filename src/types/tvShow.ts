export interface TvShowCreateI {
	name: string
	poster: string
	premiered: string
}

export interface WatchedTvShowCreateI {
	episodes: {
		name: string
		season: number
		number: number
		airdate: string
		isWatched: boolean
	}[]
	tvShowId: string
	userId: string
}
