import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"
//Todo improve types, and add City.
@Entity('city_weather')
export class CityWeather {
    @PrimaryGeneratedColumn()
    id: number;

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
}
