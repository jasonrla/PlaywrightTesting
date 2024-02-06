import * as xlsx from 'xlsx';
import { config }  from '../utils/configLoader';

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



interface AuthRequest {
  username: string;
  password: string;
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