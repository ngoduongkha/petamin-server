import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1665561241547 implements MigrationInterface {
    name = 'Init1665561241547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'blocked', 'inactive')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "email" character varying NOT NULL,
                "name" character varying NOT NULL,
                "password" text NOT NULL,
                "status" "public"."users_status_enum" NOT NULL DEFAULT 'inactive',
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "status" boolean NOT NULL DEFAULT false,
                "message" character varying(255) NOT NULL,
                "user_id" uuid,
                "conversation_id" uuid,
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_conversation" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "last_message_id" integer,
                "mute" boolean NOT NULL DEFAULT false,
                "block" boolean NOT NULL DEFAULT false,
                "user_id" uuid,
                "conversation_id" uuid,
                CONSTRAINT "PK_3dad130078898b9325da36ab3db" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "avatar" character varying,
                "address" character varying,
                "phone" character varying,
                "description" character varying,
                "gender" character varying,
                "position" character varying,
                "birthday" TIMESTAMP,
                "user_id" uuid,
                CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"),
                CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "informations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "status" boolean NOT NULL DEFAULT false,
                "type" character varying NOT NULL,
                "value" character varying(255) NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_3e27903b20087cf4d880bb91ac3" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "species" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "name" character varying,
                "description" character varying,
                "img_url" character varying,
                CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "name" character varying,
                "age" integer,
                "gender" character varying,
                "breed" character varying,
                "is_neuter" boolean,
                "avatar_url" character varying,
                "weight" integer,
                "description" character varying,
                "speciesId" uuid,
                CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_deleted" boolean NOT NULL DEFAULT false,
                "title" character varying,
                "description" character varying(5000),
                "background" character varying DEFAULT 'white',
                "emoji" character varying DEFAULT 'haha',
                CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_conversation"
            ADD CONSTRAINT "FK_2b97367ea8ccd8e415681f8b0d7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_conversation"
            ADD CONSTRAINT "FK_b312a0529c18723a53f7e90cd9d" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD CONSTRAINT "FK_e3ea9fa4c09723d0a35de03faa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pet_photo"
            ADD CONSTRAINT "FK_c354ad85eba45246d750e0f4bf2" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pets"
            ADD CONSTRAINT "FK_4c1b843bcdb26e564381bfed82a" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "pets" DROP CONSTRAINT "FK_4c1b843bcdb26e564381bfed82a"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet_photo" DROP CONSTRAINT "FK_c354ad85eba45246d750e0f4bf2"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP CONSTRAINT "FK_e3ea9fa4c09723d0a35de03faa3"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_conversation" DROP CONSTRAINT "FK_b312a0529c18723a53f7e90cd9d"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_conversation" DROP CONSTRAINT "FK_2b97367ea8ccd8e415681f8b0d7"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_830a3c1d92614d1495418c46736"
        `);
        await queryRunner.query(`
            DROP TABLE "conversations"
        `);
        await queryRunner.query(`
            DROP TABLE "pets"
        `);
        await queryRunner.query(`
            DROP TABLE "species"
        `);
        await queryRunner.query(`
            DROP TABLE "pet_photo"
        `);
        await queryRunner.query(`
            DROP TABLE "informations"
        `);
        await queryRunner.query(`
            DROP TABLE "profiles"
        `);
        await queryRunner.query(`
            DROP TABLE "user_conversation"
        `);
        await queryRunner.query(`
            DROP TABLE "messages"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_status_enum"
        `);
    }

}