import { z } from 'zod'

export const watchedTvShowSchema = z.object({
	name: z.string().trim(),
	poster: z.string().trim(),
	premiered: z.string().trim(),
	episodes: z.array(
		z.object({
			name: z.string().trim(),
			season: z.number(),
			number: z.number(),
			airdate: z.string().trim(),
			isWatched: z.boolean(),
		})
	),
})
