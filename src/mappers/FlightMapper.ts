import {Flight} from "../entity/Flight";

export class FlightMapper {
    public static mapExcelRowToFlight(row: any): Partial<Flight> {
        return {
            origin: row['origin'],
            destination: row['destination'],
            airline: row['airline'],
            flight_num: row['flight_num'],
            origin_iata_code: row['origin_iata_code'],
            origin_name: row['origin_name'],
            origin_latitude: parseFloat(row['origin_latitude']),
            origin_longitude: parseFloat(row['origin_longitude']),
            destination_iata_code: row['destination_iata_code'],
            destination_name: row['destination_name'],
            destination_latitude: parseFloat(row['destination_latitude']),
            destination_longitude: parseFloat(row['destination_longitude']),
        };
    }
    public static mapExcelDataToFlights(data: any[]): Partial<Flight>[] {
        return data.map(row => this.mapExcelRowToFlight(row));
    }
}
