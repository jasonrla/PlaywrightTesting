import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Page } from 'playwright';

interface EnvironmentConfig {
  url: string;
  email: string;
  password: string;
}

interface ConfigStructure {
  PROD: EnvironmentConfig;
  DEV: {
    MX: EnvironmentConfig;
  };
}

function isValidEnvironmentConfig(obj: any): obj is EnvironmentConfig {
  return obj &&
         'email' in obj && typeof obj.email === 'string' &&
         'password' in obj && typeof obj.password === 'string' &&
         'url' in obj && typeof obj.url === 'string';
}

function isValidConfig(obj: any): obj is ConfigStructure {
  return obj &&
         'PROD' in obj && isValidEnvironmentConfig(obj.PROD) &&
         'DEV' in obj && 'MX' in obj.DEV && isValidEnvironmentConfig(obj.DEV.MX);
}

const configPath = path.resolve('src/config.yml');
const configContent = fs.readFileSync(configPath, 'utf8');
const config = yaml.load(configContent) as ConfigStructure;

if (!isValidConfig(config)) {
  throw new Error('Invalid configuration format');
}

export async function login(page: Page, env: string) {
  let email: string;
  let password: string;
  let url: string;

  if (env === "PROD") {
    email = config.PROD.email;
    password = config.PROD.password;
    url = config.PROD.url;
  } else if (env === "DEV") {
    email = config.DEV.MX.email;
    password = config.DEV.MX.password;
    url = config.DEV.MX.url;
  } else {
    throw new Error(`Invalid environment: ${env}`);
  }
  
  await page.goto(url);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}
