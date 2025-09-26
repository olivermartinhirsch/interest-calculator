import { Locator, type Page, expect } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly title: Locator
    readonly dailyLink: Locator
    readonly monthlyLink: Locator
    readonly yearlyLink: Locator
    readonly principalSlider: Locator
    readonly submitButton: Locator
    readonly selectedValue: Locator
    readonly interestRateSelect: Locator
    readonly checkboxRate2: Locator
    readonly consentText: Locator
    readonly consentBox: Locator
    readonly interestAmount: Locator
    readonly totalInterest: Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.getByRole('heading')
        this.dailyLink = page.getByRole('link', { name: 'Daily' })
        this.monthlyLink = page.getByRole('link', { name: 'Monthly' })
        this.yearlyLink = page.getByRole('link', { name: 'Yearly' })
        this.principalSlider = page.getByRole('slider', { name: 'Principal Amount:' })
        this.submitButton = page.getByRole('button', {name: 'Calculate' })
        this.selectedValue = page.getByText('7500')
        this.interestRateSelect = page.getByRole('button', { name: 'Select Interest Rate' })
        this.checkboxRate2 = page.getByRole('checkbox', { name: '2%', exact: true })
        this.consentText = page.getByText('Please accept this mandatory')
        this.consentBox = page.getByRole('checkbox', { name: 'Please accept this mandatory' })
        this.interestAmount = page.getByRole('heading', { name: 'Interest Amount: 0.41' })
        this.totalInterest = page.getByRole('heading', { name: 'Total Amount with Interest: 7500.41' })
    }

    async setPrincipalAmount(amount: string) {
        await this.page.getByRole('slider', { name: 'Principal Amount:' }).fill(amount)

        const displayedValue = this.page.getByText(amount)
        await expect(displayedValue).toBeVisible()
    }

    async open() {
        await this.page.goto('http://3.8.242.61/')
    }

    async checkDecimalPlaces() {
        const fullTextTotal = await this.totalInterest.textContent()
        const fullTextAmount = await this.interestAmount.textContent()
        const interestAmountRegex = /\d+\.\d{2}/
        const interestTotalFormatRegex = /\d{1,3}(?:,\d{3})*\.\d{2}/

        //full disclosure, I had to google this regex. I am not a super genius.
        expect(fullTextTotal).toMatch(interestTotalFormatRegex)
        expect(fullTextAmount).toMatch(interestAmountRegex)
    }
}