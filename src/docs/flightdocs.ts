/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: API for managing flights
 */

/**
 * @swagger
 * /api/flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
 */

/**
 * @swagger
 * /api/flights/update/{id}:
 *   put:
 *     summary: Update an existing flight
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the flight to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Flight not found
 */

/**
 * @swagger
 * /api/flights/get-by-id/{id}:
 *   get:
 *     summary: Get a flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the flight to retrieve
 *     responses:
 *       200:
 *         description: Flight details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       404:
 *         description: Flight not found
 */

/**
 * @swagger
 * /api/flights/with-weather:
 *   get:
 *     summary: Get all flights with weather information
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of flights with weather information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   origin:
 *                     type: string
 *                   destination:
 *                     type: string
 *                   airline:
 *                     type: string
 *                   flight_num:
 *                     type: integer
 *                   origin_iata_code:
 *                     type: string
 *                   origin_name:
 *                     type: string
 *                   origin_latitude:
 *                     type: number
 *                     format: decimal
 *                   origin_longitude:
 *                     type: number
 *                     format: decimal
 *                   destination_iata_code:
 *                     type: string
 *                   destination_name:
 *                     type: string
 *                   destination_latitude:
 *                     type: number
 *                     format: decimal
 *                   destination_longitude:
 *                     type: number
 *                     format: decimal
 *                   weather:
 *                     type: object
 *                     properties:
 *                       temperature:
 *                         type: number
 *                       description:
 *                         type: string
 */

/**
 * @swagger
 * /api/flights/unique-cities:
 *   get:
 *     summary: Get all unique cities associated with flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of unique cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cityName:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                     format: decimal
 *                   longitude:
 *                     type: number
 *                     format: decimal
 */

/**
 * @swagger
 * /api/flights/create:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/flights/excel/get-flight-weather:
 *   get:
 *     summary: Export flights with weather information to an Excel file
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: Excel file with flight and weather information
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /api/flights/excel/upload:
 *   post:
 *     summary: Upload an Excel file to create flights
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Flights created successfully
 *       400:
 *         description: Bad request
 */
