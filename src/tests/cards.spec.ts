import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';

test.beforeEach(async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
  await dashboardPage.goToCardsTab();
  await dashboardPage.goToMyCardsOption();
});

test(`Create a new card in MXN for a mexican user`, async ({ page, billsPage}) => {
});

test(`Create a new card in USD for a mexican user`, async ({ page, billsPage}) => {
});

test(`Create a new card in USD for a saudi user`, async ({ page, billsPage}) => {
});

test(`Create a new virtual card with less than maximum limit`, async ({ page, billsPage}) => {
});

test(`Create a new virtual card with maximum limit`, async ({ page, billsPage}) => {
});

test(`Create a new physical card with less than maximum limit`, async ({ page, billsPage}) => {
});

test(`Create a new physical card with maximum limit`, async ({ page, billsPage}) => {
});

test(`Check error message when amount is 0`, async ({ page, billsPage}) => {
});

test(`Check error message when no amount is entered`, async ({ page, billsPage}) => {
});

test(`Check the amount field is disabled when 'set to max limit' checkbox is checked`, async ({ page, billsPage}) => {
});

test(`When Tribal Travel Card toggle is on, check that only 'virtual' and 'single use' options are set`, async ({ page, billsPage}) => {
});

test(`When 'active' toggle is on, check that the card goes to 'Suspended' tab`, async ({ page, billsPage}) => {
});

test(`When 'suspended' toggle is on, check that the card goes to 'Active' tab`, async ({ page, billsPage}) => {
});

test(`When 'pause' the card, check that the it goes to 'Suspended' tab`, async ({ page, billsPage}) => {
});

test(`Test 'Show/hide details' button works` , async ({ page, billsPage}) => {
});

test(`Test when 'manage card' is selected, user can modify card_name, limit and tags`, async ({ page, billsPage}) => {
});

