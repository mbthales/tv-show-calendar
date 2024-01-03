export interface FavTvShowCreateI {
	name: string
	poster: string
	premiered: string
	episodes: string
	userId: string
}

export interface FavTvShowEpisodeI {
	tvShowName: string
	name?: string
	episodeName?: string
	season: number
	number: number
	airdate: string
	isWatched: boolean
}
