// ./Api.js

export default async function fetchData(endpoint, method = 'GET', body = null) {
    try {
        const baseUrl = 'http://localhost:8000';

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify(body);
        }

        const url = `${baseUrl}/${endpoint}`;
        console.log(`Sending ${method} request to ${url} with body:`, body);

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}. Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Unexpected response content type for ${endpoint}: ${contentType}`);
        }

        const data = await response.json();
        console.log(`Response from ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`Error during API request to ${endpoint}:`, error);
        throw error; // Пробрасываем ошибку дальше для обработки в компоненте
    }
}