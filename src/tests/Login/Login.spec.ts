import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';
import { Transactions } from '../../pages/Payments/Transactions';
import { SendPayment } from '../../pages/Payments/SendPayment';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
});

test('has title', async ({ page }) => {
  await page.goto('https://dev.app.tribalcredit.io/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tribal/);
});

test('Sign in with no credentials', async ({ page }) => {
  await page.goto('https://dev.app.tribalcredit.io/login');

  // Click the get started link.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Please enter your email')).toBeVisible();
  await expect(page.getByText('Please enter a password')).toBeVisible();

});

test('Login PROD', async ({ page }) => {
const env = process.env.ENV || 'DEV';
  console.log(env);
  await login(page, env);
});