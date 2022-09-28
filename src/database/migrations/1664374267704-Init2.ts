import { MigrationInterface, QueryRunner } from "typeorm";

export class Init21664374267704 implements MigrationInterface {
    name = 'Init21664374267704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "user_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "UQ_9e432b7df0d182f8d292902d1a2" UNIQUE ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "UQ_9e432b7df0d182f8d292902d1a2"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "user_id"
        `);
    }

}
