import { Page } from 'playwright';
import { LanguageKey, dataPath } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/TransactionDetailsSelectors';

export default class TransactionDetails {
    private page: Page;
    private language: LanguageKey;
    
    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }
  
    async uploadFile(fileName: string) {
        const filePath: string = dataPath + fileName;
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.page.locator('#upload-icon').click()
        ]);
        await fileChooser.setFiles(filePath);
    }

    async isSuccessNotificationDisplayed(): Promise<boolean> {
        await this.page.waitForSelector('#chakra-toast-manager-top-right');
        return await this.page.locator('#chakra-toast-manager-top-right').getByText(sel.transactionDetails.NotifText[this.language]).innerText() == sel.transactionDetails.SuccessNotification[this.language];
    }

    async isFileUploaded(filename: string): Promise<boolean> {
        return await this.page.getByText(filename).innerText() == filename;
    }
    
}