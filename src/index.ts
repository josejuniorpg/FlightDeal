import express from 'express';
import dotenv from 'dotenv';
import {AppDataSource} from "./config/database";
import "reflect-metadata"
import flightRoutes from "./routes/flightRoutes";
import weatherRoutes from "./routes/weatherRoutes";

//Load environment variables
dotenv.config();

const app = express();

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


        //Initialize server.
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error: unknown) => {
        console.error('Error during Data Source initialization:', error);
    });
