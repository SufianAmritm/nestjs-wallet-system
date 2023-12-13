import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialsetup1702224813275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "country"(
	"id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	"currency" varchar NOT NULL,
	"created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	"deleted_at" timestamp NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp NULL,
	CONSTRAINT country_name_key UNIQUE ("name"),
	CONSTRAINT country_pkey PRIMARY KEY ("id")
)`);
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS "city" (
	"id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	"country_id" int4 NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp NULL,
	"deleted_at" timestamp NULL,
	CONSTRAINT city_name_key UNIQUE ("name"),
	CONSTRAINT city_pkey PRIMARY KEY ("id")


);


`);
    await queryRunner.query(`

    ALTER TABLE public.city ADD CONSTRAINT city_country_id_fkey FOREIGN KEY ("country_id") REFERENCES country("id");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('city', 'city_country_id_fkey');
    await queryRunner.dropTable('country');
    await queryRunner.dropTable('city');
  }
}
