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
    cardId: '84ae761b-24f7-488f-a47e-adf2733d2f8e',
    transactRequest: {
      "auth_type": "Auth",
      "ecommerce": {
          "is_ecommerce": false
      },
      "validation_results": {
          "arqc": "Y",
          "cvv3": "N",
          "pin": "N",
          "avs_result": "B",
          "aav": "N",
          "cvv1": "Y",
          "offline_pin": "N",
          "cvv2": "N"
      },
      "id": "SwwYqn4lSg66WHRFVKlmtw",
      "emv": {
          "brand": "visa",
          "terminal_verification_results": {
              "pin_required_no_pad_or_bad_pad": true,
              "cardholder_verification_not_successful": false,
              "raw": "8080108000",
              "online_pin_entered": false,
              "pin_try_limit_exceeded": false,
              "pin_required_pad_pres_but_no_pin_entered": false
          },
          "is_emv": true
      },
      "network": "Mastercard",
      "amounts": {
          "cashback_amount": "0.0",
          "local_currency_amount": "localCurrency",
          "trans_amount": "transAmount",
          "settle_currency_amount": "46.96",
          "available_funds": "767.49",
          "settle_exchange_rate": "61000000",
          "currency": "currency",
          "amt_til_limit": "4930.42",
          "settle_currency": "840",
          "local_currency": "840",
          "exchange_rate": "2",
          "fee_amount": "0.00"
      },
      "auth_id": 1513795,
      "risk_score": "None",
      "version": "3.0",
      "international": false,
      "merchant": {
          "merchant_country": "840",
          "terminal_network": null,
          "terminal_id": "13400050",
          "merchant_state": "GA",
          "acquirer_id": "555555",
          "merchant_description": "Wal-Mart Super Center  ",
          "merchant_id": "A100100100",
          "merchant_postal_code": "30038"
      },
      "eligible_for_balance_return": false,
      "pin_entry_capability": "Capable",
      "timestamp": "20210813:063838MST",
      "response_code_objects": {},
      "mcc": 5411,
      "original_id": 0,
      "account": {
          "xid": 222222,
          "expiration_date": "2405",
          "prn": "777777777777",
          "card_status": "N",
          "merchant_supplied_expiration_date": null,
          "account_status": "N",
          "track_expiration_date": "2405",
          "pan": "lastFourDigits",
          "cad": "issuerCardId" //number
      },
      "transaction": {
          "cardholder_present": "Y",
          "recurring": "N"
      },
      "entry_type": "EMV Chip",
      "response_code": "00",
      "transaction_type": "Auth",
      "mti": "0200",
      "partial_supported": false,
      "subnetwork": "Mastercard Debit Switch",
      "bai": null
    }
  },
  files:{
    PDF: 'PDF_receipt.pdf',
    PNG: 'PNG_receipt.png',
    JPG: 'JPG_receipt.jpg',
    XML: 'XML_receipt.xml',
  },
  paymentData: {
    // datos para pagos en dev
  },
};
