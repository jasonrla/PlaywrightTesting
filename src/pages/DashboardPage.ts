import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/DashboardSelectors';

export default class Dashboard {
    private page: Page;
    private language: LanguageKey;
    
    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }
  
    async changeLanguage() {
        const currentLanguage = await this.page.textContent(sel.langSelector);
        if(currentLanguage !== this.language){
          if(this.language === 'english'){
            await this.page.click(sel.langSelector);
            await this.page.click(sel.engOption);
          }
          else if(this.language === 'spanish'){
            await this.page.click(sel.langSelector);
            await this.page.click(sel.spaOption);
          }
        }
    }

    async goToDashboardTab() {
        await this.page.getByRole('link', { name: sel.dashboard.Dashboard[this.language] }).click();
    }

    async goToCardsTab() {
        await this.page.getByRole('button', { name: sel.dashboard.Cards[this.language] }).click();
    }

    async goToUsersTab() {
        await this.page.getByRole('link', { name: sel.dashboard.Users[this.language] }).click();
    }

    async goToTribalPayTab() {
        await this.page.getByRole('button', { name: "Tribal Pay" }).click();
    }

    async goToStatementsTab() {
        await this.page.getByRole('link', { name: sel.dashboard.Statements[this.language] }).click();
    }

    async goToReportsTab() {
        await this.page.getByRole('link', { name: sel.dashboard.Reports[this.language] }).click();
    }

    async goToTransactionsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Transactions[this.language] }).click();
    }

    async goToBillsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Bills[this.language] }).click();
    }

    async goToVendorsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Vendors[this.language] }).click();
    }

    async goToApprovalsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Approvals[this.language] }).click();
    }

    async goToScheduledOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Scheduled[this.language] }).click();
    }

    async goToCanceledOption() {
        await this.page.getByRole('link', { name: sel.dashboard_tribalPay.Canceled[this.language] }).click();
    }

    async goToMyCardsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_cards.MyCards[this.language] }).click();
    }

    async goToAllCardsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_cards.AllCards[this.language] }).click();
    }

    async goToInvitationsOption() {
        await this.page.getByRole('link', { name: sel.dashboard_cards.Invitations[this.language] }).click();
    }

    async clickOnFiltersButton() {
        await this.page.getByRole('button', { name: sel.dashboard.Filters[this.language] }).click();
    }
     
    async filterByType() {
        await this.page.getByRole('menuitemradio', { name: sel.dashboard.FilterByType[this.language] }).click();
    }
    
    async filterByCards() {
        await this.page.getByRole('menuitemradio', { name: sel.dashboard.FilterByCards[this.language] }).click();
        await this.page.waitForTimeout(2000);
    }

    async clickOnFirstCardTransaction(amount: string) {
        await this.page.getByText(amount).first().click();
    }
}