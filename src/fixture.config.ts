import { test as baseTest } from '@playwright/test';
import { LanguageKey } from './utils/utils';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SendPaymentPage from './pages/SendPaymentPage';
import TransactionsPage from './pages/TransactionsPage';
import VendorsPage from './pages/VendorsPage';
import BillsPage from './pages/BillsPage';
import TransactionDetailsPage from './pages/TransactionDetails';

const test = baseTest.extend<{ 
  language: LanguageKey, 
  loginPage: LoginPage, 
  dashboardPage: DashboardPage, 
  sendPaymentPage: SendPaymentPage, 
  transactionsPage: TransactionsPage, 
  vendorsPage: VendorsPage, 
  billsPage: BillsPage, 
  transactionDetailsPage: TransactionDetailsPage }>({
  
  language: async ({}, use) => {
    const locale = test.info().project.use.locale;
    let language: LanguageKey;
    locale === 'es-MX' ? language = 'spanish' : language = 'english';
    await use(language);
  },
  loginPage: async ({ page, language }, use) => {
    const loginPage = new LoginPage(page, language);
    await use(loginPage);
  },
  dashboardPage: async ({ page, language }, use) => {
    const dashboardPage = new DashboardPage(page, language);
    await use(dashboardPage);
  },
  sendPaymentPage: async ({ page, language }, use) => {
    const sendPaymentPage = new SendPaymentPage(page, language);
    await use(sendPaymentPage);
  },
  transactionsPage: async ({ page, language }, use) => {
    const transactionsPage = new TransactionsPage(page, language);
    await use(transactionsPage);
  },
  vendorsPage: async ({ page, language }, use) => {
    const vendorsPage = new VendorsPage(page, language);
    await use(vendorsPage);
  },
  billsPage: async ({ page, language }, use) => {
    const billsPage = new BillsPage(page, language);
    await use(billsPage);
  },
  transactionDetailsPage: async ({ page, language }, use) => {
    const transactionDetailsPage = new TransactionDetailsPage(page, language);
    await use(transactionDetailsPage);
  }

});

export default test;