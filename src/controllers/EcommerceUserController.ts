import { EcommerceUser } from '../entity/EcommerceUser';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createTokens } from '../middlewares/Auth';

export const Register = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		email,
		district,
		bornDate,
		password,
		street,
		houseNumber,
		postalCode,
		city,
		state,
	} = req.body;

	try {
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!district ||
			!bornDate ||
			!street ||
			!houseNumber ||
			!postalCode ||
			!city ||
			!state
		) {
			return res.status(500).json({ error: 'Missing parms' });
		}
		let ecommerceUser: EcommerceUser;
		const hashPassword = await bcrypt.hash(password, 10);

		ecommerceUser = await EcommerceUser.create({
			firstName,
			lastName,
			email,
			district,
			bornDate,
			street,
			houseNumber,
			city,
			state,
			postalCode,
			password: hashPassword,
		}).save();

		return res
			.status(200)
			.json({ message: 'Registered user', user: ecommerceUser });
	} catch (err) {
		if (err) {
			return res.status(400).json({ error: err });
		}
	}
};

export const Login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const ecommerceUser = await EcommerceUser.findOne({ where: { email } });

		if (!ecommerceUser) res.status(400).json({ error: "User doesn't exist" });

		const dbPassword = ecommerceUser.password;

		const hashPasswordBoolean = await bcrypt.compare(password, dbPassword);
		console.log(hashPasswordBoolean);
		if (!hashPasswordBoolean) res.status(400).json({ error: 'Wrong password' });

		const acessToken = createTokens(ecommerceUser);
		console.log(acessToken);

		res.cookie('access-token', acessToken, {
			maxAge: 60 * 60 * 24 * 30 * 1000,
			httpOnly: true,
		});

		return res.json({ message: 'logged in' });
	} catch (err) {
		return res.status(400).send({ error: err });
	}
};

export const Me = async (req: Request, res: Response) => {
	const ecommerceID = req.userID;

	const ecommerceUser = await EcommerceUser.findOne({
		where: { id: ecommerceID },
	});
	console.log(ecommerceUser);
	if (!ecommerceUser) {
		return res.status(400).json({ error: 'user not authenticated' });
	}

	return res.status(200).json({
		email: ecommerceUser.email,
		id: ecommerceUser.id,
		firstName: ecommerceUser.firstName,
		lastName: ecommerceUser.lastName,
	});
};

export const UpdateEcommerceUser = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		email,
		street,
		houseNumber,
		state,
		city,
		district,
		postalCode,
		bornDate,
		oldPassword,
		newPassword,
	} = req.body;
	const ecommerceUserID = req.userID;

	try {
		const ecommerceUser = await EcommerceUser.findOne({
			where: { id: ecommerceUserID },
		});
		if (!ecommerceUser)
			return res.status(400).json({ error: 'User not found' });

		if (oldPassword && newPassword) {
			const compareOldPassword = await bcrypt.compare(
				oldPassword,
				ecommerceUser.password
			);
			if (!compareOldPassword) {
				return res.status(400).json({ error: 'Incorrect password' });
			}
			const hashedNewPassword = await bcrypt.hash(newPassword, 10);

			await EcommerceUser.update(ecommerceUserID, {
				password: hashedNewPassword,
			});
		}

		if (firstName) {
			await EcommerceUser.update(ecommerceUserID, { firstName });
		}
		if (lastName) {
			await EcommerceUser.update(ecommerceUserID, { lastName });
		}
		if (email) {
			await EcommerceUser.update(ecommerceUserID, { email });
		}
		if (street) {
			await EcommerceUser.update(ecommerceUserID, { street });
		}
		if (houseNumber) {
			await EcommerceUser.update(ecommerceUserID, { houseNumber });
		}
		if (state) {
			await EcommerceUser.update(ecommerceUserID, { state });
		}
		if (city) {
			await EcommerceUser.update(ecommerceUserID, { city });
		}
		if (district) {
			await EcommerceUser.update(ecommerceUserID, { district });
		}
		if (bornDate) {
			await EcommerceUser.update(ecommerceUserID, { bornDate });
		}
		if (postalCode) {
			await EcommerceUser.update(ecommerceUserID, { postalCode });
		}

		return res.status(200).json({ Message: 'Update', user: ecommerceUser });
	} catch (err) {
		return res.status(400).json({ err });
	}
};
