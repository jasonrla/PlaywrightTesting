import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';

test.beforeEach(async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
  await dashboardPage.goToTribalPayTab();
  await dashboardPage.goToBillsOption();
});


test(`Make a bill payment`, async ({ page, billsPage}) => {

  await billsPage.clickOnPayNewBillButton();   
  await billsPage.fillNewCompany('agua y drenaje de Monterrey');
  await billsPage.clickOnNextButton();
  await billsPage.fillAccountNumber('12345678901234567890123456789012');
  await billsPage.clickOnNextButton();
  await billsPage.fillAmount('45.32');
  await billsPage.selectDate('8');
  await billsPage.clickOnNextButton();

  expect(await billsPage.isAmountCorrect('45.32', 'MXN')).toBe(true);
  expect(await billsPage.isAmountConversionCorrect('2.64', 'USD')).toBe(true);
  expect(await billsPage.isAccountNumberCorrect('12345678901234567890123456789012')).toBe(true);
  await billsPage.clickOnConfirmButton();
  await billsPage.clickOnBackToBillsButton();

});              




