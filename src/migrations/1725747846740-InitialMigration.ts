import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1725747846740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Migration has been executed', queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('Migration has been reverted', queryRunner);
    }

}
