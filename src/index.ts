import express from 'express';
import dotenv from 'dotenv';
import {AppDataSource} from "./config/database";
import "reflect-metadata"

//Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('Hello World!');
});

// Initialize BD.
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        // Configure  middlewares, routes , etc.
    })
    .catch((error: unknown) => {
        console.error('Error during Data Source initialization:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
