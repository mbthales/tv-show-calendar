export interface TvShowApiI {
	show: {
		id: string
		name: string
		premiered: string
		image: {
			medium: string
			original: string
		}
	}
}

export interface TvShowFoundI {
	name: string
	premiered: string
	poster: string | null
	tvShowId: string
	isWatched: boolean
}

export interface UserTvShowsI {
	data: {
		tvShowId: string
		episodes: string
		name: string
		premiered: string
		userId: string
	}[]
}

export interface TvShowEpisodesI {
	id: number
	name: string
	season: number
	number: number
	airdate: string
}

export interface UserIdParamI {
	params: {
		userid: string
	}
}

export interface UserIdTvShowIdParamsI {
	params: {
		userid: string
		tvshowid: string
	}
}

export interface TvShowsFoundPropsI {
	tvShows: TvShowFoundI[]
	userId: string
}

export interface TvShowEpisodeI {
	id: number
	name: string
	season: number
	number: number
	airdate: string
	isWatched: boolean
}

export interface GroupedEpisodesI {
	[key: string]: {
		[key: string]: {
			tvShowName: string
			episodeId: number
			episodeName: string
			season: number
			number: number
			airdate: string
			isWatched: boolean
		}[]
	}
}
