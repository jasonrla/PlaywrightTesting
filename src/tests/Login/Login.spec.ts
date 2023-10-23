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

test('[International payment] Check "Confirm button" is enabled in '+ process.env.ENV + ' environment', async ({ page }) => {
  const env = process.env.ENV || 'PROD';
  await login(page, env);
  await page.getByRole('button', { name: 'Tribal Pay' }).click({timeout: 10000});
  await page.getByRole('link', { name: 'Transactions' }).click();
  await page.getByRole('button', { name: 'Send Payment' }).click();
  await page.locator('div').filter({ hasText: /^Please type the name of the recipient you want to use or create$/ }).nth(1).click();
  const beneficiary = (env === 'DEV')? 'Int beneficiary 53345340' : 'Int beneficiary 25692208';
  await page.getByText(beneficiary).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await sleep(2000);
  await page.locator('div').filter({ hasText: /^AmountUSDUSD \$0\.00$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^AmountUSDUSD \$0\.00$/ }).getByRole('textbox').fill('5');
  await page.locator('#field-23').click();
  await page.locator('#field-23').fill('testing');
  await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('.chakra-checkbox__control').first().click();
  await page.locator('div:nth-child(10) > .chakra-checkbox > .chakra-checkbox__control').click();
  await expect(page.getByRole('button', { name: 'Confirm Payment' })).toBeEnabled();
});

test('[Local payment] Check "Confirm button" is enabled in '+ process.env.ENV + ' environment', async ({ page }) => {
  const env = process.env.ENV || 'DEV';
  await login(page, env);
  await page.getByRole('button', { name: 'Tribal Pay' }).click({timeout: 10000});
  await page.getByRole('link', { name: 'Transactions' }).click();
  await page.getByRole('button', { name: 'Send Payment' }).click();
  await page.getByText('International').click();
  await page.locator('div').filter({ hasText: /^Local$/ }).click();
  await page.getByText('Please type the name of the recipient you want to use or create').click();
  const beneficiary = (env === 'DEV')? 'Local beneficiary 44397875' : 'Local beneficiary 49017245';
  await page.getByText(beneficiary).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await sleep(2000);
  await page.locator('div').filter({ hasText: /^AmountMXNUSD \$0\.00$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^AmountMXNUSD \$0\.00$/ }).getByRole('textbox').fill('100');
  await page.locator('#field-18').click();
  await page.locator('#field-18').fill('testing');
  await page.locator('#field-19').click();
  await page.locator('#field-19').fill('12345');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('label').first().click();
  await page.locator('div:nth-child(10) > .chakra-checkbox > .chakra-checkbox__control').click();
  await expect(page.getByRole('button', { name: 'Confirm Payment' })).toBeEnabled();
});

