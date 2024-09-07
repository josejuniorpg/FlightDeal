import express from 'express';
import dotenv from 'dotenv';

//Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
