import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {CityWeather} from "./CityWeather";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column()
    airline: string; //This can be Number

    @Column()
    flight_num: number;

    @Column()
    origin_iata_code: string;

    @Column()
    origin_name: string;

    @Column('decimal', {precision: 10, scale: 7})
    origin_latitude: number;

    @Column('decimal', {precision: 10, scale: 7})
    origin_longitude: number;

    @Column()
    destination_iata_code: string;

    @Column()
    destination_name: string;

    @Column('decimal', {precision: 10, scale: 7})
    destination_latitude: number;

    @Column('decimal', {precision: 10, scale: 7})
    destination_longitude: number;

    // Relation with CityWeather for origin
    @ManyToOne(() => CityWeather, { nullable: true })
    originCityWeather: CityWeather;

    @Column({ nullable: true })
    originCityWeatherId: number;

    // Relation with CityWeather for destiny
    @ManyToOne(() => CityWeather, { nullable: true })
    destinationCityWeather: CityWeather;

    @Column({ nullable: true })
    destinationCityWeatherId: number;
}
