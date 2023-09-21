import { test, expect } from '@playwright/test';
import { login } from '../../utils/loginHelper';
import { Dashboard } from '../../pages/Dashboard';
import { Transactions } from '../../pages/Payments/Transactions';
import { SendPayment } from '../../pages/Payments/SendPayment';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
});

test('Make a Bulk Payment', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const transaction = new Transactions(page);
  const sendPayment = new SendPayment(page);

  const env = process.env.ENV || 'DEV';
  console.log(env);
  await login(page, env);
  
  //await expect(page.getByLabel('I understand and agree to Alhassan\'s New Template')).toBeVisible({timeout: 15000});
  //await page.getByLabel('I understand and agree to Alhassan\'s New Template').check()
  //await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('img', { name: 'Tribal logo' })).toBeVisible({ timeout: 35000 });
  await dashboard.changeLanguageTo('English');

  await dashboard.navigateToTribalPay();
  await dashboard.selectTransactions();
  await transaction.clickSendPayment();
  
  await expect(page.getByRole('heading', { name: 'Send Payment' })).toBeVisible();
  
  await sendPayment.clickPaymentDestinationListBox();
  await sendPayment.selectPaymentDestinationLocal();
  await sendPayment.clickPaymentTypeListBox();
  await sendPayment.selectPaymentTypeBulkPayment();
  await sendPayment.clickAndUploadXlsxFile();
  
  await expect(page.getByText('MX Bulk Payments Template.xlsx')).toBeVisible({timeout: 10000});

  await sendPayment.clickNext();
  await sendPayment.selectCheckBox();
  await sendPayment.clickConfirmPayment();

  await expect(page.getByText('Success!')).toBeVisible({timeout: 10000});

});

/*
test('Local Payment', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const transaction = new Transactions(page);
  const sendPayment = new SendPayment(page);

  await login(page, 'DEV');
  await dashboard.navigateToTribalPay();
  
  await page.getByRole('button', { name: 'Tribal Pay' }).click();
  await page.getByRole('link', { name: 'Transactions' }).click();

  const selector = 'p.chakra-text.css-ucnxlx';

  const element = await page.$(selector);
  let fullText: string = '';
  
  if (element) {
    fullText = await element.innerText();
  }

  const regex = /([\d,]+.\d{2})/;  // Expresión regular para capturar números con comas y decimales
  const match = fullText.match(regex);
  console.log("match: "+match);
  let initialAmount: number = 0;

  if (match) {
    initialAmount = parseFloat(match[1].replace(/,/g, ''));  
  }

  console.log(`Monto inicial: ${initialAmount}`);

  //await page.getByText('3,346,878.92 MXN').click();
  await page.getByRole('button', { name: 'Send Payment' }).click();
  await page.getByText('International').click();
  await page.locator('div').filter({ hasText: /^Local$/ }).click();
  await page.getByText('Please type the name of the recipient you want to use or create').click();
  await page.getByText('Local beneficiary 44397875').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('div').filter({ hasText: /^AmountMXNUSD \$0\.00$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^AmountMXNUSD \$0\.00$/ }).getByRole('textbox').fill('600');
  await page.locator('#field-17').click();
  await page.locator('#field-17').fill('123123');
  await page.locator('#field-18').click();
  await page.locator('#field-18').fill('34532');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('.chakra-checkbox__control').first().click();
  await page.locator('div:nth-child(10) > .chakra-checkbox > .chakra-checkbox__control').click();
  await page.getByRole('button', { name: 'Confirm Payment' }).click();
  await page.getByText('Success!').click();
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByText('3,346,278.92 MXN').click();
  
});
*/