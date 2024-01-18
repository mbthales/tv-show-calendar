import { z } from 'zod'

import {
	createTvShow,
	getUserTvShows,
	findTvShowByUserId,
	deleteTvShow,
} from '@/server/repositories/tvShow'

import type { UserIdParamI } from '@/app/types/tvShow'

const TvShowSchema = z.object({
	tvShowId: z.string(),
	name: z.string(),
	episodes: z.string(),
	premiered: z.string(),
})

const DeleteTvSchowSchema = z.object({
	tvShowId: z.string(),
})

export async function GET(_: Request, { params }: UserIdParamI) {
	try {
		const { userid } = params
		const tvShows = await getUserTvShows(userid)
		console.log(tvShows)

		return Response.json({ data: tvShows })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(req: Request, { params }: UserIdParamI) {
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

		const userTvShow = await findTvShowByUserId(
			userid,
			parsedBody.data.tvShowId
		)

		if (userTvShow) {
			return Response.json(
				{
					error: `User already added ${parsedBody.data.name} in their tv shows`,
				},
				{ status: 400 }
			)
		}

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

export async function DELETE(req: Request, { params }: UserIdParamI) {
	try {
		const body = await req.json()
		const parsedBody = DeleteTvSchowSchema.safeParse(body)

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

		await deleteTvShow(userid, parsedBody.data.tvShowId)

		return Response.json({ data: 'User deleted a tv show' })
	} catch (err) {
		console.log(err)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
