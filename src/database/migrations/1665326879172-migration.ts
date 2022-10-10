import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1665326879172 implements MigrationInterface {
    name = 'migration1665326879172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "isDeleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "img_url" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "title" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "description" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "is_deleted" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "pets" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "species" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "img_url"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "is_deleted"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "species"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pet-photo"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "isDeleted" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
