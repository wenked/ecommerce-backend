import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from 'typeorm';

@Entity()
export class EcommerceUser extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	bornDate: string;

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

	@Column()
	imgUrl: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;
	@Column({ default: false })
	isAdmin: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
