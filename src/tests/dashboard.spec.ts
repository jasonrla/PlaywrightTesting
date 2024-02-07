import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';

test.beforeEach(async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
});

test(`Test filters works`, async ({ page, billsPage}) => {
});

test(`Test reset filter works`, async ({ page, billsPage}) => {
});

test(`Test 'legal' link is available`, async ({ page, billsPage}) => {
});

test(`Test 'support' link is available`, async ({ page, billsPage}) => {
});

