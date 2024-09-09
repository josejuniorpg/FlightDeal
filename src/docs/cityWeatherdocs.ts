/**
 * @swagger
 * tags:
 *   name: CityWeather
 *   description: API for managing city weather data
 */

/**
 * @swagger
 * /api/city-weather:
 *   get:
 *     summary: Get all city weather overviews
 *     tags: [CityWeather]
 *     responses:
 *       200:
 *         description: List of city weather overviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CityWeather'
 */

/**
 * @swagger
 * /api/city-weather/get-by-id/{id}:
 *   get:
 *     summary: Get city weather overview by ID
 *     tags: [CityWeather]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the city weather overview to retrieve
 *     responses:
 *       200:
 *         description: City weather details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CityWeather'
 *       404:
 *         description: City weather overview not found
 */

/**
 * @swagger
 * /api/city-weather/create:
 *   post:
 *     summary: Create a new city weather overview
 *     tags: [CityWeather]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CityWeather'
 *     responses:
 *       201:
 *         description: City weather overview created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/city-weather/get-by-latlon:
 *   get:
 *     summary: Get city weather overview by latitude and longitude
 *     tags: [CityWeather]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Latitude of the city
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: Longitude of the city
 *     responses:
 *       200:
 *         description: City weather overview details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CityWeather'
 *       404:
 *         description: City weather overview not found
 */

/**
 * @swagger
 * /api/city-weather/search-or-create-by-latlon:
 *   post:
 *     summary: Search for or create a city weather overview by latitude and longitude
 *     tags: [CityWeather]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the city
 *               lon:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the city
 *               tz:
 *                 type: string
 *                 description: Timezone of the city
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the weather record
 *               units:
 *                 type: string
 *                 description: Units of measure for the weather data
 *               weather_overview:
 *                 type: string
 *                 description: General weather overview
 *     responses:
 *       200:
 *         description: City weather overview created or retrieved successfully
 *       400:
 *         description: Bad request
 */
