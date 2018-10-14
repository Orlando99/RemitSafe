const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'development'
    ? 'http://remitsafe.wpengine.com'
    : 'http://localhost:8080';

export default PAYMENT_SERVER_URL;