import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1664374007610 implements MigrationInterface {
    name = 'Init1664374007610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'blocked', 'inactive')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
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
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
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
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
                "avatar" character varying,
                "address" character varying,
                "phone" character varying,
                "description" character varying,
                "gender" character varying,
                "position" character varying,
                "birthday" TIMESTAMP,
                CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "informations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
                "status" boolean NOT NULL DEFAULT false,
                "type" character varying NOT NULL,
                "value" character varying(255) NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_3e27903b20087cf4d880bb91ac3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "isDeleted" boolean NOT NULL DEFAULT false,
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
            ALTER TABLE "informations"
            ADD CONSTRAINT "FK_e3ea9fa4c09723d0a35de03faa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "informations" DROP CONSTRAINT "FK_e3ea9fa4c09723d0a35de03faa3"
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
