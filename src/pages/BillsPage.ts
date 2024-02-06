import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/BillsSelectors';

export default class Bills {
    private page: Page;
    private language: LanguageKey;
    
    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }

    async clickOnPayNewBillButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.bills.PayNewBill[this.language] }).click();
    }

    async fillNewCompany(company: string): Promise<void> {
        await this.page.getByPlaceholder(sel.bills.SelectTheCompany[this.language]).click();
        await this.page.getByPlaceholder(sel.bills.SelectTheCompany[this.language]).fill(company);
        await this.page.getByText(company).click(); 
    }

    async fillAccountNumber(accountNumber: string): Promise<void> {
        await this.page.getByPlaceholder(sel.bills.DigitsCodeAccount[this.language]).click();
        await this.page.getByPlaceholder(sel.bills.DigitsCodeAccount[this.language]).fill(accountNumber);
    }

    async clickOnNextButton(): Promise<void> {
        await this.page.getByLabel(sel.bills.Next[this.language], { exact: true }).click();
    }

    async fillAmount(amount: string): Promise<void> {
        await this.page.getByText('0.00').click();
        await this.page.getByLabel(sel.bills.AmountToPay[this.language]).fill(amount);
    }

    async selectDate(date: string): Promise<void> {
        await this.page.getByPlaceholder(sel.bills.Date[this.language]).click();
        await this.page.getByText(date, { exact: true }).click();
    }

    async isAmountCorrect(amount: string, currency: string): Promise<boolean> {
        const amountVal = await this.page.getByText(`${amount} ${currency}`);
        return amountVal !== null;
    }

    async isAmountConversionCorrect(amount: string, currency: string): Promise<boolean> {
        const amountVal = await this.page.getByText(`${amount} ${currency}`);
        return amountVal !== null;
    }

    async isAccountNumberCorrect(accountNumber: string): Promise<boolean> {
        const accountNumberVal = await this.page.getByText(accountNumber);
        return accountNumberVal !== null;
    }

    async clickOnConfirmButton(): Promise<void> {
        await this.page.getByLabel(sel.bills.ConfirmPayment[this.language]).click();
    }

    async clickOnBackToBillsButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.bills.BackToBills[this.language] }).click();
    }
    

}