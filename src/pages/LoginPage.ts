import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/LoginSelectors';

export default class LoginPage {
  private page: Page;
  private language: LanguageKey;

  constructor(page: Page, language: LanguageKey) {
    this.page = page;
    this.language = language;
  }

  async openBrowser(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  async maximizeWindow(): Promise<void> {
    await this.page.setViewportSize({width: 1920, height: 1080});
  }

  async login(username: string, password: string): Promise<void> {
    await this.openBrowser();
    await this.maximizeWindow();
    await this.page.fill(sel.username, username);
    await this.page.fill(sel.password, password);
    await this.page.click(sel.clickButton);
  }

  async loginSuccessful(username: string, password: string): Promise<void> {
    await this.openBrowser();
    await this.maximizeWindow();
    await this.login(username, password);
    await this.page.waitForSelector(sel.companyAvailableBlnc);
    await this.page.waitForTimeout(2000);
  }

  async isTwoFAauthPageOpen(): Promise<boolean> {
    const url = await this.page.url();
    return url.includes('/login/two-factor-auth');
  }

  async isTwoFAenrollPageOpen(): Promise<boolean> {
    const url = await this.page.url();
    return url.includes('/login/2fa-enroll');
  }

  async isLoggedIn(): Promise<boolean> {
    const url = await this.page.url();
    return url.includes('/dashboard');
  }

  async selectLanguage(selector: string) {
    const currentLanguage = await this.page.textContent(selector);
    if(currentLanguage !== this.language){
      if(this.language === 'english'){
        await this.page.click(selector);
        await this.page.click(sel.engOption);
      }
      else if(this.language === 'spanish'){
        await this.page.click(selector);
        await this.page.click(sel.spaOption);
      }
    }
    await this.page.waitForTimeout(1000);
  }

  async isInvalidEmailMessageCorrect(selector: string) {
    return await this.compareTexts(selector, sel.login_errorMessages.noEmail[this.language]);
  }

  async isInvalidPasswordMessageCorrect(selector: string) {
    return await this.compareTexts(selector, sel.login_errorMessages.noPassword[this.language]);
  }

  async isSupportTextCorrect(selector: string) {
    return await this.compareTexts(selector, sel.login.supportText[this.language]);
  }

  async isSupportLinkTextCorrect(selector: string) {
    return await this.compareTexts(selector, sel.login.supportLinkText[this.language]);
  }

  async isSupportURLCorrect(url: string) {
    return url === sel.login.supportLinkURL[this.language];
  }

  async compareTexts(selector: string, expectedValue: string) {
    const element2 = await this.page.$(`${selector}`);
    return await (element2)?.innerText() === expectedValue;
  }
  
}
