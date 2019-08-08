
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiUrl = isDevelopment ?
    'http://localhost:8080/'
    : 'http://localhost:8080/';

