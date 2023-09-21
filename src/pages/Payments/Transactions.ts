import { Page } from 'playwright';

export class Transactions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async clickSendPayment() {
        await this.page.getByRole('button', { name: 'Send Payment' }).click();
    }
    
}