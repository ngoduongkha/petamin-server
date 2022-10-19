import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1666150192433 implements MigrationInterface {
    name = 'Profile1666150192433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "position"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "bio" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "gender"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."profiles_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "gender" "public"."profiles_gender_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "birthday"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "birthday" TIMESTAMP WITH TIME ZONE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "birthday"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "birthday" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "gender"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."profiles_gender_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "gender" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "bio"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "position" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "description" character varying
        `);
    }

}
