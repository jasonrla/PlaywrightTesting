import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';

test.beforeEach(async ({ page, loginPage, dashboardPage }) => {
});

test(`Test limited tab accessibility for 'user' role`, async ({ page, loginPage}) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
});

test(`Test limited tab accessibility for 'accountant' role`, async ({ page, loginPage}) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
});

test(`Test full tab accessibility for 'admin' role`, async ({ page, loginPage}) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
});

test(`Test full tab accessibility for 'super_admin' role`, async ({ page, loginPage}) => {
  await loginPage.loginSuccessful(config.userData.username, config.userData.password);
});
