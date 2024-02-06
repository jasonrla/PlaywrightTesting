import { Page } from 'playwright';
import { LanguageKey } from '../utils/utils';
import { config }  from '../utils/configLoader';
import * as sel from '../selectors/SendPaymentSelector';
import { generateXlsx } from '../utils/utils';

export default class SendPayment {
    private page: Page;
    private language: LanguageKey;

    constructor(page: Page, language: LanguageKey) {
        this.page = page;
        this.language = language;
    }

    async clickOnLocalOption(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.Local[this.language] }).click();
    }

    async fillVendorName(vendorName: string): Promise<void> {
        await this.page.locator("input").nth(0).fill(vendorName);
    }

    async fillVendorEmail(vendorEmail: string): Promise<void> {
        await this.page.locator("input").nth(1).fill(vendorEmail);
    }

    async fillAccountHolderName(accountHolderName: string): Promise<void> {
        await this.page.locator("input").nth(3).fill(accountHolderName);
    }

    async fillAccountHolderNameInt(accountHolderName: string): Promise<void> {
        await this.page.locator("input").nth(9).fill(accountHolderName);
    }

    async fillClabeNumber(clabeNumber: string): Promise<void> {
        await this.page.getByPlaceholder(sel.send_payment.ClabeNumber[this.language]).click();
        const input = await this.page.getByPlaceholder(sel.send_payment.ClabeNumber[this.language]);
        await input.click();
        for (const char of clabeNumber) {
            await input.press(char);
            await this.page.waitForTimeout(50);
        }
    }

    async clickOnCreateAndProceedButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.CreateAndProceed[this.language] }).click();
    }

    async isCreateAndProceedButtonEnabled(): Promise<boolean> {
        return await this.page.getByRole('button', { name: sel.send_payment.CreateAndProceed[this.language] }).isEnabled();
    }


    async clickOnInternationalOption(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.International[this.language] }).click();
    }

    async fillAddress(address: string): Promise<void> {
        await this.page.locator("input").nth(2).fill(address);
    }

    async clickOnCountryField(): Promise<void> {
        await this.page.locator(sel.Country).first().click();
    }

    async selectCountry(country: string): Promise<void> {
        await this.page.getByText(country, { exact: true }).click();
    }

    async selectState(state: string): Promise<void> {
        await this.page.locator(sel.State).first().click();
        await this.page.getByText(state, { exact: true }).click();
    }

    async fillCity(city: string): Promise<void> {
        await this.page.locator("input").nth(5).fill(city);
    }

    async fillZipCode(zipCode: string): Promise<void> {
        await this.page.locator("input").nth(6).fill(zipCode);
    }

    async fillPhoneNumber(phoneNumber: string): Promise<void> {
        await this.page.locator("input").nth(7).fill(phoneNumber);
    }

    async fillSwiftCode(swiftCode: string): Promise<void> {
        await this.page.locator("input").nth(10).fill(swiftCode);
    }

    async isNextButtonEnabled(): Promise<boolean> {
        await this.page.waitForTimeout(4000);
        return await this.page.getByRole('button', { name: sel.send_payment.Next[this.language] }).isEnabled();
    }

    async fillMXNAmount(amount: string): Promise<void> {
        const regexString = sel.send_payment.AmountMXNUSD[this.language];
        const regex = new RegExp(regexString.slice(1, regexString.length - 1));
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').click();
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').fill(amount);
    }

    async fillMXNAmount2(amount: string, amount2: string): Promise<void> {
        let [whole, decimal] = amount.split('.');
        let regexString = sel.send_payment.AmountMXNUSD[this.language];
        regexString = regexString.replace('$0\\.00', `\$${whole}\.${decimal}`);
        const regex = new RegExp(regexString.slice(1, regexString.length - 1));
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').click();
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').fill(amount2);
    }

    async fillPaymentConcept(concept: string): Promise<void> {
        await this.page.locator(sel.PaymentConcept).nth(2).isVisible();
        await this.page.locator(sel.PaymentConcept).nth(2).click();
        await this.page.locator(sel.PaymentConcept).nth(2).fill(concept);    
    }

    async fillReferenceNumber(referenceNumber: string): Promise<void> {
        //await this.page.locator("input").nth(6).click();
        //await this.page.locator(sel.ReferenceNumber).fill(referenceNumber);
        ////await fillInTextBox(this.page, sel.send_payment.ReferenceNumber[this.language], referenceNumber);
        await this.page.locator("input").nth(5).fill(referenceNumber);
    }

    async clickOnNextButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.Next[this.language] }).isEnabled();
        await this.page.getByRole('button', { name: sel.send_payment.Next[this.language] }).click();
    }

    async selectTermsCondition1(): Promise<void> {
        await this.page.locator(sel.TermsCondition1).first().click();
    }

    async selectTermsCondition2(): Promise<void> {
        await this.page.locator(sel.TermsCondition2).click();
    }

    async clickOnConfirmPaymentButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.ConfirmPayment[this.language] }).click();
    }

    async clickOnDoneButton(): Promise<void> {
        await this.page.getByRole('button', { name: sel.send_payment.Done[this.language] }).click();
    }

    async fillAccountNumber(accountNumber: string): Promise<void> {
        //await this.page.locator(sel.AccountNumber).click();
        //await this.page.locator(sel.AccountNumber).fill(accountNumber);
        await this.page.locator("input").nth(11).fill(accountNumber);
    }

    async fillABANumber(abaNumber: string): Promise<void> {
        //await this.page.locator(sel.ABANumber).click();
        //await this.page.locator(sel.ABANumber).fill(abaNumber);
        await this.page.locator("input").nth(12).fill(abaNumber);
    }

    async fillUSDAmount(amount: string): Promise<void> {
        const regexString = sel.send_payment.AmountUSDUSD[this.language];
        const regex = new RegExp(regexString.slice(1, regexString.length - 1));
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').click();
        await this.page.locator('div').filter({ hasText: regex }).getByRole('textbox').fill(amount);
    }

    async fillPaymentConceptInter(concept: string): Promise<void> {
        //await this.page.locator(sel.PaymentConceptInter).click();
        //await this.page.locator(sel.PaymentConceptInter).fill(concept);
        await this.page.locator("input").nth(10).fill(concept);
    }

    async createBulkPaymentsXlsx<T>(data: T[], path: string) {
        await generateXlsx(data, path);
    }

    async uploadXlsxFile(fileName: string) {
        const filePath: string = 'src/data/'+fileName;
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.page.getByRole('button', { name: sel.send_payment.UploadDocument[this.language] }).click()
        ]);
        await fileChooser.setFiles(filePath);
    }

    async isFileUploaded(): Promise<boolean> {
        await this.page.waitForSelector('body'); // Espera a que el cuerpo de la página esté cargado
        const uploadedTransactionsText = sel.send_payment.UploadedTransactions[this.language];
    
        const isTextPresentHandle = await this.page.waitForFunction(
            (text) => {
                const body = document.body;
                return body !== null && body.textContent !== null && body.textContent.includes(text);
            },
            uploadedTransactionsText
        );
    
        const isTextPresent = await isTextPresentHandle.jsonValue();
        return isTextPresent === true;
    }
        
    async selectBulkPaymentTermsCondition(): Promise<void> {
        await this.page.locator(sel.BulkPaymentTermsCondition).isVisible();
        await this.page.locator(sel.BulkPaymentTermsCondition).click();
    }

    async isAmountErrorMessageDisplayed(): Promise<boolean> {
        return await this.page.getByText(sel.error_message.MinAmount[this.language]).isVisible();
    }
    
}

