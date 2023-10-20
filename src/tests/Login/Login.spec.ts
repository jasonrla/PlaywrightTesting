import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { Login } from '../../pages/Login';

async function sleep(milliseconds: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
});

test('Sign in with no credentials', async ({ page }) => {
  await page.goto('https://dev.app.tribalcredit.io/login');

  // Click the get started link.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Please enter your email')).toBeVisible();
  await expect(page.getByText('Please enter a password')).toBeVisible();

});

test('Login '+ process.env.ENV, async ({ page }) => {
  const env = process.env.ENV || 'DEV';
  await login(page, env);
  await page.getByRole('button', { name: 'Tribal Pay' }).click();
  await page.getByRole('link', { name: 'Transactions' }).click();
  await page.getByRole('button', { name: 'Send Payment' }).click();
  await page.locator('div').filter({ hasText: /^Please type the name of the recipient you want to use or create$/ }).nth(1).click();
  await page.getByText('Int beneficiary 53345340').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await sleep(2000);
  await page.locator('div').filter({ hasText: /^AmountUSDUSD \$0\.00$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^AmountUSDUSD \$0\.00$/ }).getByRole('textbox').fill('70');
  await page.locator('#field-23').click();
  await page.locator('#field-23').fill('testing');
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('.chakra-checkbox__control').first().click();
  await page.locator('div:nth-child(10) > .chakra-checkbox > .chakra-checkbox__control').click();
  await expect(page.getByRole('button', { name: 'Confirm Payment' })).toBeEnabled();
});

