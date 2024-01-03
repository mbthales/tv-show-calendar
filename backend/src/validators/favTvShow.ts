import { z } from 'zod'

export const favTvShowSchema = z.object({
	name: z.string().trim(),
	poster: z.string().trim(),
	premiered: z.string().trim(),
	episodes: z.string().trim(),
})
