const prod = {
    url: {
        API_URL: 'http://www.api.orbitcluster.com/v1',
        API_ASSETS_URL: 'http://www.api.orbitcluster.com/public',
        APP_URL: 'https://www.orbitcluster.com'
    }
}

const dev = {
    url: {
        API_URL: 'http://localhost:4000/v1',
        API_ASSETS_URL: 'http://localhost:4000/public',
        APP_URL: 'http://localhost:3000'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
