import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/TransactionsSelector';

export default class Transactions {
    private page: Page;
    private language: LanguageKey;
    
    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }
    
    async clickOnSendPaymentButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.transactions.SendPayment[this.language] }).click();
    }

    async clickOnPayBillButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.transactions.PayBill[this.language] }).click();
    }

    async selectPayNewVendorOption(): Promise<void> {
        await this.page.getByRole('menuitem', { name: sel.transactions.PayNewVendor[this.language] }).click();
    }

    async selectPayExistingVendorOption(): Promise<void> {
        await this.page.getByRole('menuitem', { name: sel.transactions.PayExistingVendor[this.language] }).click();
    }

    async selectPayBulkOption(): Promise<void> {
        await this.page.getByRole('menuitem', { name: sel.transactions.PayBulk[this.language] }).click();
    }

    async isAmountAndCurrencyCorrect(amount: string, currency: string): Promise<boolean> {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(`text=${currency}`);
        const element = await this.page.getByRole('gridcell', { name: currency }).first();
        const text = await element.innerText();
        return text === `${amount} ${currency}`;
    }

    async isVendorCorrect(vendor: string): Promise<boolean> {
        const element = await this.page.getByRole('gridcell', { name: vendor });
        const text = await element.innerText();
        return text === vendor;
    }

    async filterTodayTransactions(): Promise<void> {
        await this.page.waitForTimeout(4000);
        await this.page.getByRole('button', { name: sel.transactions.Date[this.language] }).click();
        await this.page.getByText(sel.transactions.Today[this.language]).click();
        await this.page.getByRole('button', { name: sel.transactions.Apply[this.language] }).click();
    }

    async areBulkPaymentAmountsCorrect(...amounts: string[]): Promise<boolean> {
        await this.page.waitForTimeout(7000);
        const amountElements = this.page.locator('tr.css-1ukntpp > td:nth-child(3)');
        let amountTexts = await amountElements.allInnerTexts();
        amountTexts = amountTexts.slice(0, amounts.length);
        return amounts.every(amount => amountTexts.includes(amount));
    }

    
}