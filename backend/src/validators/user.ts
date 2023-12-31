import { z } from 'zod'

export const registerSchema = z.object({
	username: z.string().min(4).max(10).toLowerCase().trim(),
	email: z.string().trim().toLowerCase().email(),
	password: z.string().min(6).trim(),
})

export const loginSchema = z.object({
	username: z.string().min(4).max(10).toLowerCase().trim(),
	password: z.string().min(6).trim(),
})
