import { z } from 'zod'

import { createTvShow, getUserTvShows } from '@/server/repositories/tvShow'

type userIdParam = {
	params: {
		userid: string
	}
}

const TvShowSchema = z.object({
	tvShowId: z.string(),
	name: z.string(),
	episodes: z.string(),
	premiered: z.string(),
})

export async function GET(_: Request, { params }: userIdParam) {
	try {
		const { userid } = params
		const tvShows = await getUserTvShows(userid)

		return Response.json({ data: tvShows })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request, { params }: userIdParam) {
	try {
		const body = await req.json()
		const parsedBody = TvShowSchema.safeParse(body)

		if (!parsedBody.success) {
			return Response.json(
				{ error: 'Invalid body request', details: parsedBody.error.issues },
				{ status: 400 }
			)
		}

		const { userid } = params

		if (!userid) {
			return Response.json({ error: 'No user id provided' }, { status: 400 })
		}

		const userTvShows = await getUserTvShows(userid)

		// if (userAlreadyHasTvShow) {
		// 	return Response.json(
		// 		{
		// 			error: `User already has ${parsedBody.data.title} in their tv shows`,
		// 		},
		// 		{ status: 400 }
		// 	)
		// }

		await createTvShow({
			...parsedBody.data,
			userId: userid,
		})

		return Response.json({ data: 'User added a tv show' })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
