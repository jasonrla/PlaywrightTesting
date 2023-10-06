import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { getURL } from '../../utils/loginHelper';
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';
import { Transactions } from '../../pages/Payments/Transactions';
import { SendPayment } from '../../pages/Payments/SendPayment';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
});

test('Testing Tribal Login has title', async ({ page }) => {
  const env = process.env.ENV || 'DEV';
  await page.goto(await getURL(env));
  await expect(page).toHaveTitle(/Tribal/);
});

test('Testing login with no credentials', async ({ page }) => {
  const env = process.env.ENV || 'DEV';
  await page.goto(await getURL(env));
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Please enter your email')).toBeVisible();
  await expect(page.getByText('Please enter a password')).toBeVisible();
});

test('Testing Login in'+ process.env.ENV, async ({ page }) => {
const env = process.env.ENV || 'DEV';
await login(page, env);
});