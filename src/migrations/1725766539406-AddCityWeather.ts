import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCityWeather1725766539406 implements MigrationInterface {
    name = 'AddCityWeather1725766539406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flight" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "origin" varchar NOT NULL, "destination" varchar NOT NULL, "airline" varchar NOT NULL, "flight_num" integer NOT NULL, "origin_iata_code" varchar NOT NULL, "origin_name" varchar NOT NULL, "origin_latitude" decimal(10,7) NOT NULL, "origin_longitude" decimal(10,7) NOT NULL, "destination_iata_code" varchar NOT NULL, "destination_name" varchar NOT NULL, "destination_latitude" decimal(10,7) NOT NULL, "destination_longitude" decimal(10,7) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "city_weather" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lat" float NOT NULL, "lon" float NOT NULL, "tz" varchar(10) NOT NULL, "date" date NOT NULL, "units" varchar(50) NOT NULL, "weather_overview" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "city_weather"`);
        await queryRunner.query(`DROP TABLE "flight"`);
    }

}
