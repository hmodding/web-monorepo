import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupSchema1712751238456 implements MigrationInterface {
    name = 'SetupSchema1712751238456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account-creations" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_922e306b88cf0374edfdb2d9870" UNIQUE ("username"), CONSTRAINT "UQ_901f0228d4f95fe6615c763466e" UNIQUE ("email"), CONSTRAINT "UQ_43624027956d72737d9b4abf8e0" UNIQUE ("token"), CONSTRAINT "PK_ec375e9e6c8c311d9bee1017ad6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discord-account-creations" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "discordUserId" character varying NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "token" character varying NOT NULL, "discordUserObject" json NOT NULL, CONSTRAINT "UQ_071193d10725557f2c656606550" UNIQUE ("discordUserId"), CONSTRAINT "PK_a8090c9b9d57e10ebedd46695a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discord-sign-ons" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "discordUserId" character varying NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_212cb3da829e0c822eeb5948b53" UNIQUE ("userId"), CONSTRAINT "UQ_8b1bbd0a815fa634ed8ce0d33ab" UNIQUE ("discordUserId"), CONSTRAINT "PK_e4363c13fe7bd4731b904851dac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "download-trackers" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "ipHash" character varying(32) NOT NULL, "path" text NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_933e38f8ce862ce24ba95b5c5a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0001d7dc7ade0ae01ff95220d0" ON "download-trackers" ("ipHash", "path") `);
        await queryRunner.query(`CREATE TABLE "file-scans" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fileUrl" text NOT NULL, "scanId" character varying(96), "scanResult" json, CONSTRAINT "PK_c443d558fe974a2334f096bc8c2" PRIMARY KEY ("fileUrl"))`);
        await queryRunner.query(`CREATE TABLE "launcher-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "changelog" text NOT NULL, CONSTRAINT "PK_1178cd892d9fb2c9480ceeca1fc" PRIMARY KEY ("version"))`);
        await queryRunner.query(`CREATE TABLE "raft-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "version" character varying NOT NULL, "buildId" integer NOT NULL, "title" character varying, "releasedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_00c8f75d8f253380d0c13cbe538" UNIQUE ("version"), CONSTRAINT "PK_9b1b8bd67ef4c6e61d12c161fb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loader-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "rmlVersion" character varying NOT NULL, "raftVersionId" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "readme" text, CONSTRAINT "REL_db84be34a7ac841123ba628729" UNIQUE ("raftVersionId"), CONSTRAINT "PK_ea1300e6a75f988f975901f75f7" PRIMARY KEY ("rmlVersion"))`);
        await queryRunner.query(`CREATE TABLE "plugin-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "pluginId" integer NOT NULL, "version" character varying(64) NOT NULL, "changelog" text NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "minServerVersionId" character varying(64) NOT NULL, "maxServerVersionId" character varying(64) NOT NULL, "definiteMaxServerVersion" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_256e878ed04ad061004215c5a85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_edea5a407dc3910a00ad40b498" ON "plugin-versions" ("pluginId", "version") `);
        await queryRunner.query(`CREATE TABLE "scheduled-plugin-deletions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "pluginId" integer NOT NULL, "deletionTime" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_b69ceb0e699e921843b147db81f" UNIQUE ("pluginId"), CONSTRAINT "REL_b69ceb0e699e921843b147db81" UNIQUE ("pluginId"), CONSTRAINT "PK_bfed2a621a5829fc26ac37083a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plugins" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "slug" character varying(64) NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "maintainerId" integer NOT NULL, "bannerImageUrl" text NOT NULL, "repositoryUrl" text, "scheduledDeletionId" integer, CONSTRAINT "UQ_be05b99ec42163d07a0e74da7ec" UNIQUE ("slug"), CONSTRAINT "REL_adfbe3636ea90b7af1eb877389" UNIQUE ("scheduledDeletionId"), CONSTRAINT "PK_bb3d17826b76295957a253ba73e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-privileges" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_00fa50968ef07c37f80df8e960d" UNIQUE ("username"), CONSTRAINT "REL_00fa50968ef07c37f80df8e960" UNIQUE ("username"), CONSTRAINT "PK_46cc82591ba610baff105957878" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ModLikes" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, "modId" character varying(64) NOT NULL, CONSTRAINT "PK_c45bcc2a3faa1fd88434123a6be" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod-bundles" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "maintainerId" integer NOT NULL, "bannerImageUrl" text, CONSTRAINT "PK_d5d005b186ab80b6b1e80856417" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "modId" character varying(64) NOT NULL, "version" character varying(64) NOT NULL, "changelog" text NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "minRaftVersionId" integer, "maxRaftVersionId" integer, "definiteMaxRaftVersion" boolean NOT NULL, CONSTRAINT "PK_c663ffff3d6480f79aa0e5dee6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_eaabf9277bab5a6ed4b6d50410" ON "mod-versions" ("modId", "version") `);
        await queryRunner.query(`CREATE TABLE "scheduled-mod-deletions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "modId" character varying NOT NULL, "deletionTime" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_289613b90d9c3e5cd608e08e896" UNIQUE ("modId"), CONSTRAINT "REL_289613b90d9c3e5cd608e08e89" UNIQUE ("modId"), CONSTRAINT "PK_db56550bc11fe6f4f1ef51dd04d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mods" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" character varying(64) NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "category" character varying NOT NULL, "author" character varying NOT NULL, "bannerImageUrl" text, "repositoryUrl" text, "iconImageUrl" text, CONSTRAINT "PK_5e0ced6abe92940577832c70cd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "password-resets" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_6c763a1083194f4bafefd34656f" UNIQUE ("userId"), CONSTRAINT "UQ_c6302ad976ab8acead449a1be62" UNIQUE ("token"), CONSTRAINT "REL_6c763a1083194f4bafefd34656" UNIQUE ("userId"), CONSTRAINT "PK_c8513b8adc379b3679e1482c2fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server-versions" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "version" character varying NOT NULL, "raftVersion" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "downloadUrl" text NOT NULL, "changelog" text, CONSTRAINT "PK_f23c80aabeb378893ed3ad00e3e" PRIMARY KEY ("version"))`);
        await queryRunner.query(`CREATE TABLE "ModBundleContents" ("modBundleId" integer NOT NULL, "modVersionId" integer NOT NULL, CONSTRAINT "PK_5aca43438c16a9e0493ecf46009" PRIMARY KEY ("modBundleId", "modVersionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1fda2df77d6e3f2625a3f335d7" ON "ModBundleContents" ("modBundleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8ded2644aa25bd4aec1913c48" ON "ModBundleContents" ("modVersionId") `);
        await queryRunner.query(`ALTER TABLE "loader-versions" ADD CONSTRAINT "FK_db84be34a7ac841123ba6287294" FOREIGN KEY ("raftVersionId") REFERENCES "raft-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugin-versions" ADD CONSTRAINT "FK_bd6c3538634d8dc1fa8c83937ea" FOREIGN KEY ("pluginId") REFERENCES "plugins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled-plugin-deletions" ADD CONSTRAINT "FK_b69ceb0e699e921843b147db81f" FOREIGN KEY ("pluginId") REFERENCES "plugins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugins" ADD CONSTRAINT "FK_ee6d4c34ac5b14a4ab01c7a509c" FOREIGN KEY ("maintainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugins" ADD CONSTRAINT "FK_adfbe3636ea90b7af1eb8773892" FOREIGN KEY ("scheduledDeletionId") REFERENCES "scheduled-plugin-deletions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-privileges" ADD CONSTRAINT "FK_00fa50968ef07c37f80df8e960d" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ModLikes" ADD CONSTRAINT "FK_c45bcc2a3faa1fd88434123a6be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ModLikes" ADD CONSTRAINT "FK_4162bbea8098f0e3ac195778c97" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-bundles" ADD CONSTRAINT "FK_d008daa6ea854857b2342053ed6" FOREIGN KEY ("maintainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-versions" ADD CONSTRAINT "FK_e9776cd7284068e7e80f43a835b" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-versions" ADD CONSTRAINT "FK_675b46216a8cf9014f5819b6565" FOREIGN KEY ("minRaftVersionId") REFERENCES "raft-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-versions" ADD CONSTRAINT "FK_0bdd6966125fa7ff58297f71025" FOREIGN KEY ("maxRaftVersionId") REFERENCES "raft-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled-mod-deletions" ADD CONSTRAINT "FK_289613b90d9c3e5cd608e08e896" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password-resets" ADD CONSTRAINT "FK_6c763a1083194f4bafefd34656f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" ADD CONSTRAINT "FK_1fda2df77d6e3f2625a3f335d7d" FOREIGN KEY ("modBundleId") REFERENCES "mod-bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" ADD CONSTRAINT "FK_e8ded2644aa25bd4aec1913c48e" FOREIGN KEY ("modVersionId") REFERENCES "mod-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ModBundleContents" DROP CONSTRAINT "FK_e8ded2644aa25bd4aec1913c48e"`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" DROP CONSTRAINT "FK_1fda2df77d6e3f2625a3f335d7d"`);
        await queryRunner.query(`ALTER TABLE "password-resets" DROP CONSTRAINT "FK_6c763a1083194f4bafefd34656f"`);
        await queryRunner.query(`ALTER TABLE "scheduled-mod-deletions" DROP CONSTRAINT "FK_289613b90d9c3e5cd608e08e896"`);
        await queryRunner.query(`ALTER TABLE "mod-versions" DROP CONSTRAINT "FK_0bdd6966125fa7ff58297f71025"`);
        await queryRunner.query(`ALTER TABLE "mod-versions" DROP CONSTRAINT "FK_675b46216a8cf9014f5819b6565"`);
        await queryRunner.query(`ALTER TABLE "mod-versions" DROP CONSTRAINT "FK_e9776cd7284068e7e80f43a835b"`);
        await queryRunner.query(`ALTER TABLE "mod-bundles" DROP CONSTRAINT "FK_d008daa6ea854857b2342053ed6"`);
        await queryRunner.query(`ALTER TABLE "ModLikes" DROP CONSTRAINT "FK_4162bbea8098f0e3ac195778c97"`);
        await queryRunner.query(`ALTER TABLE "ModLikes" DROP CONSTRAINT "FK_c45bcc2a3faa1fd88434123a6be"`);
        await queryRunner.query(`ALTER TABLE "user-privileges" DROP CONSTRAINT "FK_00fa50968ef07c37f80df8e960d"`);
        await queryRunner.query(`ALTER TABLE "plugins" DROP CONSTRAINT "FK_adfbe3636ea90b7af1eb8773892"`);
        await queryRunner.query(`ALTER TABLE "plugins" DROP CONSTRAINT "FK_ee6d4c34ac5b14a4ab01c7a509c"`);
        await queryRunner.query(`ALTER TABLE "scheduled-plugin-deletions" DROP CONSTRAINT "FK_b69ceb0e699e921843b147db81f"`);
        await queryRunner.query(`ALTER TABLE "plugin-versions" DROP CONSTRAINT "FK_bd6c3538634d8dc1fa8c83937ea"`);
        await queryRunner.query(`ALTER TABLE "loader-versions" DROP CONSTRAINT "FK_db84be34a7ac841123ba6287294"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8ded2644aa25bd4aec1913c48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1fda2df77d6e3f2625a3f335d7"`);
        await queryRunner.query(`DROP TABLE "ModBundleContents"`);
        await queryRunner.query(`DROP TABLE "server-versions"`);
        await queryRunner.query(`DROP TABLE "password-resets"`);
        await queryRunner.query(`DROP TABLE "mods"`);
        await queryRunner.query(`DROP TABLE "scheduled-mod-deletions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaabf9277bab5a6ed4b6d50410"`);
        await queryRunner.query(`DROP TABLE "mod-versions"`);
        await queryRunner.query(`DROP TABLE "mod-bundles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ModLikes"`);
        await queryRunner.query(`DROP TABLE "user-privileges"`);
        await queryRunner.query(`DROP TABLE "plugins"`);
        await queryRunner.query(`DROP TABLE "scheduled-plugin-deletions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_edea5a407dc3910a00ad40b498"`);
        await queryRunner.query(`DROP TABLE "plugin-versions"`);
        await queryRunner.query(`DROP TABLE "loader-versions"`);
        await queryRunner.query(`DROP TABLE "raft-versions"`);
        await queryRunner.query(`DROP TABLE "launcher-versions"`);
        await queryRunner.query(`DROP TABLE "file-scans"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0001d7dc7ade0ae01ff95220d0"`);
        await queryRunner.query(`DROP TABLE "download-trackers"`);
        await queryRunner.query(`DROP TABLE "discord-sign-ons"`);
        await queryRunner.query(`DROP TABLE "discord-account-creations"`);
        await queryRunner.query(`DROP TABLE "account-creations"`);
    }

}
