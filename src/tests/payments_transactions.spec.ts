import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';
import { getRandomEmail, getRandomName, getAdminToken, getExchangeRate } from '../utils/utils';  

test.beforeEach(async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
  await dashboardPage.goToTribalPayTab();
  await dashboardPage.goToTransactionsOption();
});

test(`Make a local payment to an new vendor`, async ({ page, dashboardPage, sendPaymentPage, transactionsPage, vendorsPage }) => {

  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayNewVendorOption();

  const [vendorName, amount] = [await getRandomName(), config.localPay.amount];

  await sendPaymentPage.clickOnLocalOption();
  await sendPaymentPage.fillVendorName(vendorName);
  await sendPaymentPage.fillVendorEmail(await getRandomEmail());
  await sendPaymentPage.fillAccountHolderName(config.localPay.accountHolderName);
  await sendPaymentPage.fillClabeNumber(config.localPay.clabeNumber);
  
  expect(await sendPaymentPage.isCreateAndProceedButtonEnabled()).toBe(true);

  await sendPaymentPage.clickOnCreateAndProceedButton();

  await sendPaymentPage.fillMXNAmount(amount);
  await sendPaymentPage.fillPaymentConcept(config.localPay.payConcept);
  await sendPaymentPage.fillReferenceNumber(config.localPay.referenceNumber);
  await sendPaymentPage.clickOnNextButton();

  await sendPaymentPage.selectTermsCondition1();
  await sendPaymentPage.selectTermsCondition2();
  await sendPaymentPage.clickOnConfirmPaymentButton();
  await sendPaymentPage.clickOnDoneButton();

  expect(await transactionsPage.isAmountAndCurrencyCorrect(amount, 'MXN')).toBe(true);
  expect(await transactionsPage.isVendorCorrect(vendorName)).toBe(true);

});

test(`Make an international payment to an new vendor`, async ({ page, dashboardPage, sendPaymentPage, transactionsPage, vendorsPage }) => {

  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayNewVendorOption();

  const [vendorName, amount, email] = [await getRandomName(), config.interPay.amount, await getRandomEmail()];
  
  await sendPaymentPage.clickOnInternationalOption();
  await sendPaymentPage.fillVendorName(vendorName);
  await sendPaymentPage.fillVendorEmail(email);
  await sendPaymentPage.fillAddress(config.interPay.address);
  await sendPaymentPage.clickOnCountryField();
  await sendPaymentPage.selectCountry(config.interPay.country);
  await sendPaymentPage.selectState(config.interPay.state);
  await sendPaymentPage.fillCity(config.interPay.city);
  await sendPaymentPage.fillZipCode(config.interPay.zipCode);
  await sendPaymentPage.fillPhoneNumber(config.interPay.phoneNumber);
  await sendPaymentPage.fillAccountHolderNameInt(config.interPay.accountHolderName);
  await sendPaymentPage.fillSwiftCode(config.interPay.swiftCode);
  
  expect(await sendPaymentPage.isNextButtonEnabled()).toBe(true);
  await sendPaymentPage.clickOnNextButton();

  await sendPaymentPage.fillAccountNumber(config.interPay.accountNumber);
  await sendPaymentPage.fillABANumber(config.interPay.abaNumber);

  expect(await sendPaymentPage.isCreateAndProceedButtonEnabled()).toBe(true);
  await sendPaymentPage.clickOnCreateAndProceedButton();

  await sendPaymentPage.fillUSDAmount(amount);
  await sendPaymentPage.fillPaymentConceptInter(config.interPay.payConcept);
  
  await page.waitForTimeout(1000);
  expect(await sendPaymentPage.isNextButtonEnabled()).toBe(true);
  await sendPaymentPage.clickOnNextButton();
  
  await sendPaymentPage.selectTermsCondition1();
  await sendPaymentPage.selectTermsCondition2();

  await sendPaymentPage.clickOnConfirmPaymentButton();
  await sendPaymentPage.clickOnDoneButton();

  expect(await transactionsPage.isAmountAndCurrencyCorrect(amount, 'USD')).toBe(true);
  expect(await transactionsPage.isVendorCorrect(vendorName)).toBe(true);

});

test(`Make a local payment to an existing vendor`, async ({ page, dashboardPage, sendPaymentPage, transactionsPage, vendorsPage }) => {

  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayExistingVendorOption();

  const [amount, vendorName, payConcept, referenceNumber] = [config.localPay.amount, config.localPay.vendorName,
      config.localPay.payConcept, config.localPay.referenceNumber];

  await vendorsPage.searchVendorByName(vendorName);
  await vendorsPage.clickOnPayButton();

  await sendPaymentPage.fillMXNAmount(amount);
  await sendPaymentPage.fillPaymentConcept(payConcept);
  await sendPaymentPage.fillReferenceNumber(referenceNumber);
  await sendPaymentPage.clickOnNextButton();

  await sendPaymentPage.selectTermsCondition1();
  await sendPaymentPage.selectTermsCondition2();
  await sendPaymentPage.clickOnConfirmPaymentButton();
  await sendPaymentPage.clickOnDoneButton();

  expect(await transactionsPage.isAmountAndCurrencyCorrect(amount, 'MXN')).toBe(true);
  expect(await transactionsPage.isVendorCorrect(vendorName)).toBe(true);

});

test(`Make an international payment to an existing vendor`, async ({ page, dashboardPage, sendPaymentPage, transactionsPage, vendorsPage }) => {

  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayExistingVendorOption();

  const [amount, vendorName, payConcept] = [config.interPay.amount, config.interPay.vendorName, config.interPay.payConcept];

  await vendorsPage.searchVendorByName(vendorName);
  await vendorsPage.clickOnPayButton();

  await sendPaymentPage.fillUSDAmount(amount);
  await sendPaymentPage.fillPaymentConceptInter(payConcept);
  
  await page.waitForTimeout(1000);
  expect(await sendPaymentPage.isNextButtonEnabled()).toBe(true);
  await sendPaymentPage.clickOnNextButton();
  
  await sendPaymentPage.selectTermsCondition1();
  await sendPaymentPage.selectTermsCondition2();

  await sendPaymentPage.clickOnConfirmPaymentButton();
  await sendPaymentPage.clickOnDoneButton();

  expect(await transactionsPage.isAmountAndCurrencyCorrect(amount, 'USD')).toBe(true);
  expect(await transactionsPage.isVendorCorrect(vendorName)).toBe(true);

});


test(`Check the error message when transfer an amount lower than the minimum one`, async ({ page, request, dashboardPage, sendPaymentPage, transactionsPage, vendorsPage }) => {

  await transactionsPage.clickOnSendPaymentButton();
  await transactionsPage.selectPayExistingVendorOption();

  const [vendorName, payConcept] = [config.localPay.vendorName, config.localPay.payConcept];

  await vendorsPage.searchVendorByName(vendorName);
  await vendorsPage.clickOnPayButton();
  
  const adminToken = await getAdminToken(request, expect);
  const rate = await getExchangeRate(request, expect, 'MXN', 'USD', adminToken);

  const num = parseFloat(config.localPay.minAmountToTrasferInUSD);
  const val = (Math.floor((num/rate)*100)/100).toString();
  const val2 = (Math.floor(((num/rate) + 0.01)*100)/100).toString();

  await sendPaymentPage.fillMXNAmount(val);
  await sendPaymentPage.fillPaymentConcept(payConcept);
  expect (await sendPaymentPage.isAmountErrorMessageDisplayed()).toBe(true);

  await sendPaymentPage.fillMXNAmount2(config.localPay.minAmountToTrasferInUSD, val2);
  await sendPaymentPage.fillPaymentConcept(payConcept);
  expect (await sendPaymentPage.isAmountErrorMessageDisplayed()).toBe(false);

});




