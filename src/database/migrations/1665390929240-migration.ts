import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665390929240 implements MigrationInterface {
    name = 'migration1665390929240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pet_photo" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "img_url" character varying,
                "title" character varying,
                "description" character varying,
                "petId" uuid,
                CONSTRAINT "PK_aaa74002136d2a09c66e7e8f4bc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "pet_photo"
            ADD CONSTRAINT "FK_c354ad85eba45246d750e0f4bf2" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "pet_photo" DROP CONSTRAINT "FK_c354ad85eba45246d750e0f4bf2"
        `);
        await queryRunner.query(`
            DROP TABLE "pet_photo"
        `);
    }

}
