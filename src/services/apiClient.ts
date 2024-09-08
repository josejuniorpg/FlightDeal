import axios, {AxiosInstance, AxiosResponse} from 'axios';

interface ApiOptions {
    baseURL: string;
    apiKey: string;
    apiKeyParam: string;
}

//todo add the configurations for header and body.
export function createAxiosInstance(options: ApiOptions): AxiosInstance {
    const axiosInstance = axios.create({
        baseURL: options.baseURL,
        timeout: 10000,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const apiKeyParam = options.apiKeyParam;
            const apiKey = process.env[options.apiKey];

            if (apiKey && apiKeyParam) {
                config.params = {
                    ...config.params,
                    [apiKeyParam]: apiKey
                };
            }

            return config;
        },
        (error) => Promise.reject(error)
    );


    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            console.error('API Error:', error.response?.data || error.message);
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

// Instances for APIs
export const weatherApi = createAxiosInstance({
    baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
    apiKey: 'OPENWEATHER_API_KEY',
    apiKeyParam: 'appid',
});
