import config from './config';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DEV_USERNAME;
const password = process.env.DEV_PASSWORD;

const username_2fa_enroll = process.env.DEV_USERNAME_2FA_ENROLL;
const password_2fa_enroll = process.env.DEV_PASSWORD_2FA_ENROLL;

const username_2fa_auth = process.env.DEV_USERNAME_2FA_AUTH;
const password_2fa_auth = process.env.DEV_PASSWORD_2FA_AUTH;

export default {
  ...config,
  baseUrl: 'https://dev.app.tribalcredit.io/',
  apiBaseUrl: 'https://dev.api.tribalcredit.io',
  TSAusername: process.env.DEV_TSA_USERNAME,
  TSApassword: process.env.DEV_TSA_PASSWORD,
  userData: {
    username: username,
    password: password,
  },
  userData_2fa_enroll: {
    username: username_2fa_enroll,
    password: password_2fa_enroll
  },
  userData_2fa_auth: {
    username: username_2fa_auth,
    password: password_2fa_auth
  },
  localPay:{
    vendorName: 'Jason 0k65p',
    amount: '105.12', //decimal
    payConcept: 'Local payment',
    referenceNumber: '123',
    accountHolderName: 'Jason Lopez',
    clabeNumber: '706180102834917067',
    minAmountToTrasferInUSD: '2.00'
  },
  interPay:{
    vendorName: 'Jason 03zc6w',
    amount: '105.12', //decimal
    payConcept: 'Inter payment',
    address: 'Testing ave',
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Abu Dhabi',
    zipCode: '15048',
    phoneNumber: '969393339999',
    accountHolderName: 'Jason Lopez',
    swiftCode: 'SVBKUS6S',
    accountNumber: '3303164242',
    abaNumber: '121140399'
  },
  bulkPay:{
    amountMXN: 'Amount (MXN)',
    path: 'src/data',
    fileName: 'MX Bulk Payments Template.xlsx',
    data: [
      { 'Recipient Name': 'Juan Jimenez', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '109.64', 
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+1@tribal.credit', 
        'Payment Concept': 'Testing 1', 
        'Reference Number (Optional)': '123' 
      },
      { 'Recipient Name': 'Jose Rivas', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '115.23',
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+2@tribal.credit', 
        'Payment Concept': 'Testing 2', 
        'Reference Number (Optional)': '456'
      },
      { 'Recipient Name': 'Melissa Espinoza', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '109.64',
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+3@tribal.credit', 
        'Payment Concept': 'Testing 2', 
        'Reference Number (Optional)': '768'
      },
      { 'Recipient Name': 'Diana Vargas', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '110.32',
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+3@tribal.credit', 
        'Payment Concept': 'Testing 2', 
        'Reference Number (Optional)': '901'
      }
    ]
  },
  bulkPayWrongValues:{
    amountMXN: 'Amount (MXN)',
    path: 'src/data',
    fileName: 'MX Bulk Payments Template.xlsx',
    data: [
      { 'Recipient Name': 'Juan Jimenez', 
        'Account Holder Name': '', 
        'Amount (MXN)': '3.00', 
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+1@tribal.credit', 
        'Payment Concept': 'Testing 1', 
        'Reference Number (Optional)': '123' 
      },
      { 'Recipient Name': 'Jose Rivas', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '0',
        'Recipient CLABE Number': 'ASW462RT70-8349231', 
        'Recipient Email': 'jason.lopez+2tribal.credit', 
        'Payment Concept': 'Testing 2', 
        'Reference Number (Optional)': '456'
      },
      { 'Recipient Name': '', 
        'Account Holder Name': 'Jason Lopez', 
        'Amount (MXN)': '109.64',
        'Recipient CLABE Number': '1123462702834923121', 
        'Recipient Email': 'jason.lopez+3@tribal.credit', 
        'Payment Concept': 'Testing 2', 
        'Reference Number (Optional)': ''
      },
      { 'Recipient Name': 'Diana Vargas', 
        'Account Holder Name': 'Jason Lopezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 
        'Amount (MXN)': '110.32',
        'Recipient CLABE Number': '112346270283492312', 
        'Recipient Email': 'jason.lopez+3@tribal.credit', 
        'Payment Concept': '', 
        'Reference Number (Optional)': '901'
      }
    ]
  },
  cardData: {
    cardName: 'Dev Card Name',
    validCardNumber: '1234567812345678',
    invalidCardNumber: '1234',
    // ... otras propiedades de tarjeta
  },
  paymentData: {
    // datos para pagos en dev
  },
};
