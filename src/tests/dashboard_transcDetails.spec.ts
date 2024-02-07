import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';
import { createCardTransaction, getCardDetails, getToken, getRandomDecimalNumber } from '../utils/utils';

const username = config.userData.username;
const password = config.userData.password;
const amount = getRandomDecimalNumber();

test.beforeAll(async ({ request }) => {
  const token = await getToken(request, expect, username, password);
  const cardDetails = await getCardDetails(request, expect, config.cardData.cardId, token);
  const lastFourDigits = cardDetails.lastFourDigits;
  const issuerCardId = cardDetails.issuerCardId;
  await createCardTransaction(request, expect, token, lastFourDigits, issuerCardId, amount, amount, '840');
});

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  await loginPage.loginSuccessful(username, password);
  await dashboardPage.clickOnFiltersButton();
  await dashboardPage.filterByType();
  await dashboardPage.filterByCards();
});

test(`Test a PDF file can be added to a Card transaction`, async ({ dashboardPage, transactionDetailsPage }) => {
  const file = config.files.PDF;

  await dashboardPage.clickOnFirstCardTransaction(`${amount} USD`);
  await transactionDetailsPage.uploadFile(file);

  expect(await transactionDetailsPage.isSuccessNotificationDisplayed()).toBe(true);
  expect(await transactionDetailsPage.isFileUploaded(file)).toBe(true);
  
});

test(`Test a PNG image can be added to a Card transaction`, async ({ dashboardPage, transactionDetailsPage }) => {
  const file = config.files.PNG;

  await dashboardPage.clickOnFirstCardTransaction(`${amount} USD`);
  await transactionDetailsPage.uploadFile(file);

  expect(await transactionDetailsPage.isSuccessNotificationDisplayed()).toBe(true);
  expect(await transactionDetailsPage.isFileUploaded(file)).toBe(true);
  
});

test(`Test a JPG image can be added to a Card transaction`, async ({ dashboardPage, transactionDetailsPage }) => {
  const file = config.files.JPG;

  await dashboardPage.clickOnFirstCardTransaction(`${amount} USD`);
  await transactionDetailsPage.uploadFile(file);

  expect(await transactionDetailsPage.isSuccessNotificationDisplayed()).toBe(true);
  expect(await transactionDetailsPage.isFileUploaded(file)).toBe(true);
  
});

test(`Test an XML file can be added to a Card transaction`, async ({ dashboardPage, transactionDetailsPage }) => {
  const file = config.files.XML;

  await dashboardPage.clickOnFirstCardTransaction(`${amount} USD`);
  await transactionDetailsPage.uploadFile(file);

  expect(await transactionDetailsPage.isSuccessNotificationDisplayed()).toBe(true);
  expect(await transactionDetailsPage.isFileUploaded(file)).toBe(true);
  
});

test(`Test a memo can be written to a Card transaction`, async ({ page, billsPage}) => {
});

test(`Test a file can be downloaded from a card transaction details`, async ({ page, billsPage}) => {
});

test(`Test a file can be deleted from a card transaction details`, async ({ page, billsPage}) => {
});

test(`Test a memo can me modified from a card transaction details`, async ({ page, billsPage}) => {
});

test(`Test card transaction details are the correct ones`, async ({ page, billsPage}) => {
});

test(`Test card receipts can be selected and downloaded`, async ({ page, billsPage}) => {
});

test(`Test card transaction details attachment can not be modified if transaction is from another user`, async ({ page, billsPage}) => {
});

test(`Test card transaction details memo can not be modified if transaction is from another user`, async ({ page, billsPage}) => {
});

