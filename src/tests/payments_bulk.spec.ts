import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page, loginPage, dashboardPage, transactionsPage }) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
  await dashboardPage.goToTribalPayTab();
  await dashboardPage.goToTransactionsOption();
  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayBulkOption();
});

test(`Make a bulk payment`, async ({ page, sendPaymentPage, transactionsPage, vendorsPage }) => {

  const data = config.bulkPay.data as any[];
  const amounts = data.map(item => `${parseFloat(item[config.bulkPay.amountMXN]).toFixed(2)} MXN`);
  
  await sendPaymentPage.createBulkPaymentsXlsx(data, config.bulkPay.path);
  await sendPaymentPage.uploadXlsxFile(config.bulkPay.fileName);
  expect(await sendPaymentPage.isFileUploaded()).toBe(true);
  await sendPaymentPage.clickOnNextButton();

  await sendPaymentPage.selectBulkPaymentTermsCondition();
  await sendPaymentPage.clickOnConfirmPaymentButton();
  await sendPaymentPage.clickOnDoneButton();

  await transactionsPage.filterTodayTransactions();
  expect(await transactionsPage.areBulkPaymentAmountsCorrect(...amounts)).toBe(true);

});


test(`Error messages when Make a bulk payment`, async ({ page, sendPaymentPage, transactionsPage, vendorsPage }) => {

  const data = config.bulkPayWrongValues.data as any[];
  const amounts = data.map(item => `${parseFloat(item[config.bulkPay.amountMXN]).toFixed(2)} MXN`);
  
  await sendPaymentPage.createBulkPaymentsXlsx(data, config.bulkPay.path);
  await sendPaymentPage.uploadXlsxFile(config.bulkPay.fileName);
  expect(await sendPaymentPage.isFileUploaded()).toBe(true);
  expect(await sendPaymentPage.isNextButtonEnabled()).toBe(false);
});
