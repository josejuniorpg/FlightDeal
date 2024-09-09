/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Flight ID
 *         origin:
 *           type: string
 *           description: Origin city
 *         destination:
 *           type: string
 *           description: Destination city
 *         airline:
 *           type: string
 *           description: Airline of the flight
 *         flight_num:
 *           type: integer
 *           description: Flight number
 *         origin_iata_code:
 *           type: string
 *           description: IATA code of the origin
 *         origin_name:
 *           type: string
 *           description: Name of the origin city
 *         origin_latitude:
 *           type: number
 *           format: decimal
 *           description: Latitude of the origin
 *         origin_longitude:
 *           type: number
 *           format: decimal
 *           description: Longitude of the origin
 *         destination_iata_code:
 *           type: string
 *           description: IATA code of the destination
 *         destination_name:
 *           type: string
 *           description: Name of the destination city
 *         destination_latitude:
 *           type: number
 *           format: decimal
 *           description: Latitude of the destination
 *         destination_longitude:
 *           type: number
 *           format: decimal
 *           description: Longitude of the destination
 *         originCityWeatherId:
 *           type: integer
 *           description: ID of the origin city's weather
 *         destinationCityWeatherId:
 *           type: integer
 *           description: ID of the destination city's weather
 *     CityWeather:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Weather record ID
 *         city_iata:
 *           type: string
 *           description: IATA code of the city
 *         lat:
 *           type: number
 *           format: float
 *           description: Latitude of the city
 *         lon:
 *           type: number
 *           format: float
 *           description: Longitude of the city
 *         tz:
 *           type: string
 *           description: Time zone of the city
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the weather record
 *         units:
 *           type: string
 *           description: Units of measurement for the weather
 *         weather_overview:
 *           type: string
 *           description: General weather description
 */

