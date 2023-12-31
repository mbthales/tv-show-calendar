import { sign, verify } from 'jsonwebtoken'

export const generateJwt = (id: string, username: string) => {
	return sign({ userId: id, username }, process.env.JWT_SECRET!, {
		expiresIn: '30d',
	})
}

export const verifyJwt = (jwt: string) => {
	return verify(jwt, process.env.JWT_SECRET!)
}
