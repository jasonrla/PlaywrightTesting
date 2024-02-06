import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/VendorsSelector';

export default class Vendors {
    private page: Page;
    private language: LanguageKey;
    
    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }

    async searchVendorByName(vendorName: string) {
        await this.page.getByPlaceholder(sel.vendors.SearchBy[this.language]).click();
        await this.page.getByPlaceholder(sel.vendors.SearchBy[this.language]).fill(vendorName);
        await this.page.waitForTimeout(500);
    }

    async clickOnPayButton() {
        await this.page.getByRole('button', { name: sel.vendors.Pay[this.language], exact: true }).click();
    }

}