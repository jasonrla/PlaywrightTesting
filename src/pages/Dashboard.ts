import { Page } from 'playwright';
import { test, expect } from '@playwright/test';

export class Dashboard {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
  
    async navigateToTribalPay() {
        await this.page.getByRole('button', { name: 'Tribal Pay' }).click();
    }
      
    async selectTransactions() {
        await this.page.getByRole('link', { name: 'Transactions' }).click();
    }

    async changeLanguageTo(Language: string){
        const listbox = await this.page.$('#menu-button-9');
        if (listbox) {
            await listbox.click();
            await expect(this.page.getByRole('menuitem', { name: Language })).toBeVisible({ timeout: 35000 });
            await this.page.getByRole('menuitem', { name: Language }).click();
        } else {
            throw new Error('Listbox not found');
        }
    }
       
}