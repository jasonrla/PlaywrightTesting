import test from '../fixture.config';
import { expect } from '@playwright/test';
import { config }  from '../utils/configLoader';
import { Page } from 'playwright';
import * as sel from '../selectors/LoginSelectors';

test.beforeEach(async ({ page, loginPage }) => {
  await loginPage.openBrowser();
});

test.describe(`2FA tests`, () => {
  
    test(`Test user is redirected to enroll 2FA flow`, async ({ page, loginPage }) => {

      await loginPage.login(config.userData_2fa_enroll.username, config.userData_2fa_enroll.password);
  
      await page.waitForSelector(sel.tribal2FAEnrollLogo);
      await page.waitForTimeout(2000);
  
      const twoFAenrollPageOpen = await loginPage.isTwoFAenrollPageOpen();
      expect(twoFAenrollPageOpen).toBe(true);
    });
    
    test(`Test that the user is prompted to enter the six digits of 2FA`, async ({ page, loginPage }) => {

      await loginPage.login(config.userData_2fa_auth.username, config.userData_2fa_auth.password);
      await page.waitForSelector(sel.tribal2FASixDigits);
      await page.waitForTimeout(2000);

      const twoFAAuthpageOpen = await loginPage.isTwoFAauthPageOpen();
      expect(twoFAAuthpageOpen).toBe(true);
    });

    test(`Test an error message is displayed when enter a random six digits of 2FA`, async ({ page, loginPage }) => {

      await loginPage.login(config.userData_2fa_auth.username, config.userData_2fa_auth.password);
      await page.waitForSelector(sel.tribal2FASixDigits);
      await page.waitForTimeout(2000);

      await page.fill('#pin-input-1-0', "123456");

      //IN PROGRESS
    });

  
});

test.describe(`Login verifications`, () => {

    test(`Test a login succesfull without mark the Beta contract`, async ({ page, loginPage }) => {
      await loginPage.login(config.userData.username, config.userData.password);
      await page.waitForSelector(sel.tribalLogo);
      const isLoggedIn = await loginPage.isLoggedIn();
      expect(isLoggedIn).toBe(true);

    });

    test(`Test the error message when invalid email is entered`, async ({ page, loginPage }) => {
      const data = ['email', '@tribal.credit', 'jason.lopeztribal.credit', '12123', '@', 'jason.lopez$tribal.credit', ' '];

      for (const item of data) {
          await loginPage.login(item, config.userData.password);
          await page.waitForSelector(`${sel.invalidEmailText}`);
          await loginPage.selectLanguage(`${sel.langSelector}`);
          expect( await loginPage.isInvalidEmailMessageCorrect(sel.invalidEmailText)).toBe(true);
          
      };
    });

    test(`Test the error message when no password is entered`, async ({ page, loginPage }) => {
      const data = [''];

      for (const item of data) {
          await loginPage.login(config.userData.username, item);
          await page.waitForSelector(`${sel.invalidPasswordText}`);
          await loginPage.selectLanguage(`${sel.langSelector}`); 
          expect( await loginPage.isInvalidPasswordMessageCorrect(sel.invalidPasswordText)).toBe(true);
      };
      
    });

});


test.describe(`Login support links`, () => {
  
    test(`Test support text is displayed`, async ({ page, loginPage }) => {
      await loginPage.selectLanguage(`${sel.langSelector}`);
      expect( await loginPage.isSupportTextCorrect(sel.supportText)).toBe(true);
    });

    test(`Test support link text is displayed`, async ({ page, loginPage }) => {
      await loginPage.selectLanguage(`${sel.langSelector}`);
      expect( await loginPage.isSupportLinkTextCorrect(sel.supportLinkText)).toBe(true);
    });

    test(`Test support link URL is correct`, async ({ page, loginPage }) => {
      await loginPage.selectLanguage(`${sel.langSelector}`);
      await page.click(`${sel.supportLinkText}`);

      const newPagePromise = new Promise(resolve => page.once('popup', resolve));
      await page.click(`${sel.supportLinkText}`);
      const newPage = (await newPagePromise) as Page;

      const url = newPage.url();
      expect( await loginPage.isSupportURLCorrect(url)).toBe(true);
    });

});
