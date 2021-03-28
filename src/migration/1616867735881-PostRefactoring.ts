import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1616867735881 implements MigrationInterface {
    name = 'PostRefactoring1616867735881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "bornDate"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "houseNumber"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP CONSTRAINT "UQ_e9bcffc7959d15ff1cb0cbbccc5"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "inventory"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP CONSTRAINT "UQ_96c7914007cacfce5b0c8cd9ff2"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD CONSTRAINT "UQ_96c7914007cacfce5b0c8cd9ff2" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "bornDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "houseNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "district" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "postalCode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD CONSTRAINT "UQ_e9bcffc7959d15ff1cb0cbbccc5" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "inventory" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "inventory"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP CONSTRAINT "UQ_e9bcffc7959d15ff1cb0cbbccc5"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "postalCode"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "houseNumber"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "street"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "bornDate"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP CONSTRAINT "UQ_96c7914007cacfce5b0c8cd9ff2"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD CONSTRAINT "UQ_96c7914007cacfce5b0c8cd9ff2" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "inventory" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD CONSTRAINT "UQ_e9bcffc7959d15ff1cb0cbbccc5" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "postalCode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "district" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "houseNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "street" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecommerce_user" ADD "bornDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
