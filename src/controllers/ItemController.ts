import { Item } from '../entity/Item';
import { Request, Response } from 'express';

export const AddItem = async (req: Request, res: Response) => {
	const { name, description, category, price, inventory, imgUrl } = req.body;

	try {
		if (!name || !description || !category || !price)
			return res.status(400).json({ error: 'Missing params' });
		const item = await Item.create({
			name,
			description,
			category,
			price,
			inventory,
			imgUrl,
		}).save();

		return res.status(200).json({ message: 'item successfully added', item });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err });
	}
};

export const RemoveItem = async (req: Request, res: Response) => {
	const { cartItems } = req.body;

	if (cartItems.length === 0)
		return res.status(404).json({ error: 'Missing params' });

	try {
		const errorsId = [];
		const errorsInventory = [];
		const itemsRemoved = [];
		let teste = 0;

		await cartItems.forEach(async (item) => {
			const dbitem = await Item.findOne({ where: { id: item.id } });

			if (!dbitem) {
				errorsId.push({ message: 'Item not found', id: item.id });

				return;
			}

			if (dbitem.inventory < item.amount) {
				errorsInventory.push({
					message: 'Not enough in inventory',
					id: item.id,
					name: dbitem.name,
				});

				return;
			}

			await Item.update(item.id, {
				inventory: dbitem.inventory - item.amount,
			});

			itemsRemoved.push({
				id: item.id,
				name: dbitem.name,
				message: 'Item removed successfully',
			});
		});

		setTimeout(
			() => res.status(200).json({ errorsInventory, errorsId, itemsRemoved }),
			3000
		);
	} catch (err) {
		return res.status(400).json({ err });
	}
};

export const UpdateItem = async (req: Request, res: Response) => {
	const {
		id,
		name,
		price,
		description,
		category,
		inventory,
		imgUrl,
		removeFromDb,
	} = req.body;

	if (!id) {
		return res.status(404).json({ error: 'Missing id' });
	}

	const dbitem = await Item.findOne({ where: { id } });

	if (!dbitem) {
		return res.status(400).send({ error: 'Item not found' });
	}

	if (removeFromDb) {
		await Item.createQueryBuilder()
			.delete()
			.where('id = :id', { id: id })
			.execute();

		return res
			.status(200)
			.json({ message: 'Item removed from db successfully' });
	}
	if (inventory) {
		const item = await Item.findOne({ where: { id } });

		if (!item) return res.status(400).json({ error: 'No item found' });

		await Item.update(id, { inventory: item.inventory + inventory });
	}

	if (name) {
		await Item.update(id, { name: name });
	}

	if (imgUrl) {
		await Item.update(id, { imgUrl });
	}

	if (price) {
		await Item.update(id, { price });
	}

	if (description) {
		await Item.update(id, { description });
	}

	if (category) {
		await Item.update(id, { category });
	}

	const item = await Item.findOne({ where: { id } });
	return res.status(200).json({ message: 'Update succefully', item });
};

export const ItemsList = async (req: Request, res: Response) => {
	const items = await Item.find();

	if (!items) return res.status(400).json({ error: 'No items found' });

	return res.status(200).json({ items });
};
