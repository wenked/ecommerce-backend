import { Item } from '../entity/Item';
import { Request, Response } from 'express';

export const AddItem = async (req: Request, res: Response) => {
	const { name, description, category, price, inventory } = req.body;

	try {
		if (!name || !description || !category || !price)
			return res.status(400).json({ error: 'Missing params' });
		const item = await Item.create({
			name,
			description,
			category,
			price,
			inventory,
		}).save();

		return res.status(200).json({ message: 'item successfully added', item });
	} catch (err) {
		console.error(err);
		res.status(400).json({ error: err });
	}
};

export const RemoveItem = async (req: Request, res: Response) => {
	const { id, quantity } = req.body;

	if (!id) res.status(404).json({ error: 'Missing params' });

	try {
		const item = await Item.findOne({ where: { id } });
		if (!item) return res.send(400).json({ error: 'Item not found' });

		if (item.inventory < quantity)
			return res.send(400).json({ error: 'not enough inventory' });

		await Item.update(id, { inventory: item.inventory - quantity });

		if (item.inventory === 0) {
			await Item.remove(id);
		}

		return res.status(200).json({ message: 'Item removed' });
	} catch (err) {
		return res.status(400).json({ err });
	}
};

export const UpdateItem = async (req: Request, res: Response) => {
	const { id, name, price, description, category, inventory } = req.body;

	if (!id) {
		return res.status(404).json({ error: 'Missing id' });
	}
	if (inventory) {
		const item = await Item.findOne({ where: { id } });

		if (!item) return res.status(400).json({ error: 'No item found' });

		await Item.update(id, { inventory: item.inventory + inventory });

		return res
			.status(200)
			.json({ message: 'Item added successfully in inventory' });
	}

	if (name) {
		await Item.update(id, { name });
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

	const item = await Item.findOne({ where: id });
};

export const ItemsList = async (req: Request, res: Response) => {
	const items = await Item.find();

	if (!items) return res.status(400).json({ error: 'No items found' });

	return res.status(200).json({ items });
};
