import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Flight} from "./Flight";
//Todo improve types, and add City.
@Entity('city_weather')
export class CityWeather {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 3, unique: true, nullable: true})
    city_iata: string;

    @Column({type: 'float'})
    lat: number;

    @Column({type: 'float'})
    lon: number;

    @Column({type: 'varchar', length: 10})
    tz: string;

    @Column({type: 'date'})
    date: string;

    @Column({type: 'varchar', length: 50})
    units: string;

    @Column({type: 'text'})
    weather_overview: string;

    // Relation with Flight for origin
    @OneToMany(() => Flight, flight => flight.originCityWeather)
    originFlights: Flight[];

    // Relation with Flight for destiny
    @OneToMany(() => Flight, flight => flight.destinationCityWeather)
    destinationFlights: Flight[];
}
