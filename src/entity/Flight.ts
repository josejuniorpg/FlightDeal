import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}
