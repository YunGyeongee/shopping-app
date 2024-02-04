import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707050528855 implements MigrationInterface {
    name = 'Migration1707050528855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`zip\` int NULL, \`address\` varchar(255) NULL, \`address_detail\` varchar(255) NULL, \`point\` int NOT NULL DEFAULT '0', \`is_seller\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`deleted_at\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
