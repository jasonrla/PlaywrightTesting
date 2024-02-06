import config from './config';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.PROD_USERNAME;
const password = process.env.PROD_PASSWORD;

export default {
  ...config,
  baseUrl: 'https://app.tribalcredit.io/',
  userData: {
    username: username,
    password: password,
  },
  cardData: {
    cardName: 'Prod Card Name',
    validCardNumber: '8765432187654321',
    invalidCardNumber: '5678',
    // ... otras propiedades de tarjeta
  },
  paymentData: {
    // datos para pagos en prod
  },
};
