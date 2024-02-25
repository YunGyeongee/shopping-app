import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708826305068 implements MigrationInterface {
    name = 'Migration1708826305068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`seller_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`seller_id\``);
    }

}
