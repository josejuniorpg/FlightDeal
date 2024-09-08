import express from 'express';
import dotenv from 'dotenv';
import {AppDataSource} from "./config/database";
import "reflect-metadata"
import flightRoutes from "./routes/flightRoutes";
import weatherRoutes from "./routes/weatherRoutes";
import cityWeatherRoutes from "./routes/cityWeatherRoutes";
 import {FlightRepository} from "./repositories/FlightRepository";
import {CityWeatherRepository} from "./repositories/CityWeatherRepository";
import {FlightService} from "./services/FlightService";
import {CityWeatherService} from "./services/CityWeatherService";
import {Container} from "typedi";

//Load environment variables
dotenv.config();

const app = express();

//Dependency Injection
Container.set(FlightRepository, new FlightRepository());
Container.set(CityWeatherRepository, new CityWeatherRepository());

Container.get(FlightService);
Container.get(CityWeatherService);

//Global Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Initialize BD, and the server.
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        //Routes.
        app.use('/api/flights', flightRoutes);
        app.use('/api/weather', weatherRoutes);
        app.use('/api/city-weather', cityWeatherRoutes);


        //Initialize server.
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error: unknown) => {
        console.error('Error during Data Source initialization:', error);
    });
