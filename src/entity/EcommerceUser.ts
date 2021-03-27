import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EcommerceUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@CreateDateColumn()
	bornDate: Date;

	@Column()
	street: string;

	@Column()
	houseNumber: number;

	@Column()
	district: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	postalCode: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
