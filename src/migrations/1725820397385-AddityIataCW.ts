import { MigrationInterface, QueryRunner } from "typeorm";

export class AddityIataCW1725820397385 implements MigrationInterface {
    name = 'AddityIataCW1725820397385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_city_weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lat" float NOT NULL, "lon" float NOT NULL, "tz" varchar(10) NOT NULL, "date" date NOT NULL, "units" varchar(50) NOT NULL, "weather_overview" text NOT NULL, "city_iata" varchar(3), CONSTRAINT "UQ_9f09cc24adb98bc95754a2fe251" UNIQUE ("city_iata"))`);
        await queryRunner.query(`INSERT INTO "temporary_city_weather"("id", "lat", "lon", "tz", "date", "units", "weather_overview") SELECT "id", "lat", "lon", "tz", "date", "units", "weather_overview" FROM "city_weather"`);
        await queryRunner.query(`DROP TABLE "city_weather"`);
        await queryRunner.query(`ALTER TABLE "temporary_city_weather" RENAME TO "city_weather"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city_weather" RENAME TO "temporary_city_weather"`);
        await queryRunner.query(`CREATE TABLE "city_weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lat" float NOT NULL, "lon" float NOT NULL, "tz" varchar(10) NOT NULL, "date" date NOT NULL, "units" varchar(50) NOT NULL, "weather_overview" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "city_weather"("id", "lat", "lon", "tz", "date", "units", "weather_overview") SELECT "id", "lat", "lon", "tz", "date", "units", "weather_overview" FROM "temporary_city_weather"`);
        await queryRunner.query(`DROP TABLE "temporary_city_weather"`);
    }

}
