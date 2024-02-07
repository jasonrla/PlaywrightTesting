import * as xlsx from 'xlsx';
import { config }  from '../utils/configLoader';

export const dataPath = 'src/data/';

export type LanguageKey = 'english' | 'spanish';

export async function getRandomEmail() {
  const random = Math.random().toString(36).substring(7);
  return 'jason.lopez+'+random+'@tribal.credit'
}

export async function getRandomName() {
  const random = Math.random().toString(36).substring(7);
  return 'Jason '+random
}

export async function generateXlsx<T>(data: T[], path: string) {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, `${path}/${config.bulkPay.fileName}`);
}

export function getRandomDecimalNumber(intDigits = 2, decimalDigits = 2) {
  const maxInt = Math.pow(10, intDigits) - 1;
  const maxDecimal = Math.pow(10, decimalDigits) - 1;
  const randomInt = Math.floor(Math.random() * (maxInt + 1));
  const randomDecimal = Math.floor(Math.random() * (maxDecimal + 1));
  const randomNumber = `${randomInt}.${randomDecimal.toString().padStart(decimalDigits, '0')}`;
  return randomNumber;
}

interface AuthResponse {
  token: string;
  // Otros campos según la respuesta real del endpoint de autenticación
}

interface RateResponse {
  rate: number;
  // Otros campos según la respuesta real del endpoint de tasas
}

export async function getAdminToken(request: any, expect: any): Promise<string> {
  const response = await request.post(`${config.apiBaseUrl}/v1/sts/authentication`, {
    data: {
      username: config.TSAusername,
      password: config.TSApassword,
    },
  });
  expect(await response.status()).toBe(200);
  const data: AuthResponse = await response.json();
  return data.token;
}

export async function getExchangeRate(request: any, expect: any, fromCurrency: string, toCurrency: string, token: string): Promise<number> {
  const response = await request.get(`${config.apiBaseUrl}/v1/rates/latest?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  expect(await response.status()).toBe(200);

  const data: RateResponse = await response.json();
  return data.rate;
}

export async function getToken(request: any, expect: any, username: string, password: string): Promise<string> {
  const response = await request.post(`${config.apiBaseUrl}/v1/sts/authentication`, {
    data: {
      username: username,
      password: password,
    },
  });
  expect(await response.status()).toBe(200);
  const data: AuthResponse = await response.json();
  return data.token;
}

export async function getCardDetails(request: any, expect: any, cardId: string, token: string): Promise<any> {
  const response = await request.get(`${config.apiBaseUrl}/v1/internal/cards/${cardId}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  expect(await response.status()).toBe(200);
  return await response.json();
}

export async function createCardTransaction(request: any, expect: any, token: string, lastFourDigits: string, issuerCardId: string, 
localCurrency: string = '99.99', transAmount: string = '99.99', currency: string = '840'): Promise<void> {
  
  const dataCard = config.cardData.transactRequest;
  dataCard.account.pan = lastFourDigits;
  dataCard.account.cad = Number(issuerCardId);
  dataCard.amounts.local_currency_amount = localCurrency;
  dataCard.amounts.trans_amount = transAmount;
  dataCard.amounts.currency = currency;
  
  const response = await request.post(`${config.apiBaseUrl}/api/auth-api/Authorization`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    data: dataCard
  });
  expect(await response.status()).toBe(200);
  const jsonResponse = await response.json();
  expect(jsonResponse.response_code).toBe('00');
}

