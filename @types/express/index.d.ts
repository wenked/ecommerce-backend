export {};

declare global {
	namespace Express {
		interface Request {
			userID: number;
			isAdmin: boolean;
		}
	}
}
