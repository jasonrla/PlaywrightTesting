import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { getURL } from '../../utils/loginHelper';
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';
import { Transactions } from '../../pages/Payments/Transactions';
import { SendPayment } from '../../pages/Payments/SendPayment';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

let env: any;
let url;

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

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  test.setTimeout(60000);
  env = process.env.ENV || 'DEV';
  url = await getURL(env);
  await page.goto(url);
});

test('Testing Tribal Login has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Tribal/);
});

test('Testing login with no credentials', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Please enter your email')).toBeVisible();
  await expect(page.getByText('Please enter a password')).toBeVisible();
});

test('Testing Login in '+ env, async ({ page }) => {
  const configPath = path.resolve('src/config.yml');
  const configContent = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(configContent) as ConfigStructure;

  let email: string;
  let password: string;

  if (env === "PROD") {
    email = config.PROD.email;
    password = config.PROD.password;
  } else if (env === "DEV") {
    email = config.DEV.MX.email;
    password = config.DEV.MX.password;
  } else {
    throw new Error(`Invalid environment: ${env}`);
  }

  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

});