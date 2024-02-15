import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707965328360 implements MigrationInterface {
    name = 'Migration1707965328360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`zip\` \`zip\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`address_detail\` \`address_detail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parent_id\` \`parent_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parent_id\` \`parent_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`address_detail\` \`address_detail\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sellers\` CHANGE \`zip\` \`zip\` varchar(255) NOT NULL`);
    }

}
