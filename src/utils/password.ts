import { genSalt, hash, compare } from 'bcrypt'

export const hashPassword = async (password: string) => {
	const salt = await genSalt(10)
	const hashedPassword = hash(password, salt)

	return hashedPassword
}

export const comparePassword = async (
	password: string,
	hashedPassword: string
) => {
	const isValidPassword = await compare(password, hashedPassword)

	return isValidPassword
}
