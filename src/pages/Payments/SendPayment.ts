import { Page } from 'playwright';

export class SendPayment {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async clickPaymentDestinationListBox() {
        await this.page.getByText('International').click();
    }
    
    async selectPaymentDestinationLocal() {
        await this.page.getByText('Local').click();
    }
    
    async clickPaymentTypeListBox() {
        await this.page.getByText('Single Payment').click();
    }
    
    async selectPaymentTypeBulkPayment() {
        await this.page.getByText('Bulk Payment').click();
    }
    
    async clickAndUploadXlsxFile() {
        const filePath: string = 'src/data/MX Bulk Payments Template.xlsx';
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.page.getByRole('button', { name: 'Upload document' }).click()
        ]);
        await fileChooser.setFiles(filePath);
    }
    
    async clickNext() {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }
    
    async selectCheckBox() {
        await this.page.locator('label span').click();
    }
    
    async clickConfirmPayment() {
        await this.page.getByRole('button', { name: 'Confirm Payment' }).click();
    }
      
}