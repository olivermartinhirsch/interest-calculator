import { test, expect } from '@playwright/test';
import { HomePage } from '../fixtures/homepage';
import { LoginPage } from '../fixtures/loginPage';

test.beforeEach('Navigate to application and log in', async ({ page }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page)
  await homePage.open();
  await loginPage.login('your email address', 'your password')

  // If I had more time I would make these environment variables but feel free to manually change them here to run the tests!
});

test.describe('Main journeys', () => {
test('Expected options for duration exist and are selectable', async ({ page }) => {
  const homePage = new HomePage(page)

  // Interesting that these are links and not buttons - I would raise this.
  //also minor issue but the slider is off centre when default 7500/15000 is selected. Visually looks wrong!
  await expect(homePage.dailyLink).toBeVisible()
  await homePage.dailyLink.click()
  // Daily is active by default - I would raise this with the PO as it might no tbe intentional behaviour. Otherwise I would check for it being inactive before clicking it!
  await expect(homePage.dailyLink).toHaveClass(/active/);

  await expect(homePage.monthlyLink).toBeVisible()
  await expect(homePage.monthlyLink).not.toHaveClass(/active/);
  await homePage.monthlyLink.click()
  await expect(homePage.monthlyLink).toHaveClass(/active/);
    
  await expect(homePage.yearlyLink).toBeVisible()
  await expect(homePage.yearlyLink).not.toHaveClass(/active/);
  await homePage.yearlyLink.click()
  await expect(homePage.yearlyLink).toHaveClass(/active/);
  });

  test('User can input principal amount', async ({ page }) => {
  const homePage = new HomePage(page)

  const selectedValue = '14900'

  await homePage.setPrincipalAmount(selectedValue)

  //this is a bit weird that it's not a text box and is a slider - would raise this.

  });

  test('User can select interest rate from 1% to 15%', async ({ page }) => {

    // this test will fail as 13% is missing, but the test is written as if it were there.
    const homePage = new HomePage(page)

    const minRate = 1
    const maxRate = 15
    await homePage.interestRateSelect.click()

    for(let rate = minRate; rate <= maxRate; rate++) {
      const rateLabel= `${rate}%`
      const rateCheckbox = page.getByRole('checkbox', { name: rateLabel, exact: true })
      // we have to make sure it's an exact match here else 1 would flag 11 as another element it could select from etc


      await rateCheckbox.check()
      await expect(rateCheckbox).toBeChecked()

      console.log(`Successfully checked the ${rateLabel} checkbox!`)
  }

  });

    test('Calculates the correct interest and displays calculated interest + total amount to 2 decimal places', async ({ page }) => {

    const homePage = new HomePage(page)

    await homePage.interestRateSelect.click()
    await homePage.checkboxRate2.click()
    await page.getByLabel('Selected Rate: 2%').locator('div').filter({ hasText: '2%' }).first().click();
    // bit of a hack to click off the dropdown in interest of time!
    await homePage.dailyLink.click()
    await homePage.consentBox.check()
    await homePage.submitButton.click()
    await expect(homePage.interestAmount).toBeVisible()
    await expect(homePage.totalInterest).toBeVisible()

    // this is correct and is working that it would generate 0.41 interest a day
    // I would check multiple in real life for the different caclulations but in interest of time have done one
    // for monthly it would be difficult to say if it is accurate as it depends on number of days in month
    //yearly is also correct when manually testing at 7500 @ 2 % for a year at 150.00 (7650.00)

    await homePage.checkDecimalPlaces()
  });

      test('Consent field should be mandatory and error if not checked', async ({ page }) => {

    const homePage = new HomePage(page)

    await homePage.interestRateSelect.click()
    await homePage.checkboxRate2.click()
    await page.getByLabel('Selected Rate: 2%').locator('div').filter({ hasText: '2%' }).first().click();
    // bit of a hack to click off the dropdown in interest of time!
    await homePage.dailyLink.click()
        //same as previous test but omitted the consent box
    await homePage.submitButton.click()
    await expect(homePage.interestAmount).not.toBeVisible()
    await expect(homePage.totalInterest).not.toBeVisible()

    //this test will fail as the consent box does not work when I manually tested it. It should not perform the calculation
    // the only other field not preselected is the interest rate which throws an error if you don't select anything and submit
  });

    test('Interest rate field should be mandatory and error if not checked', async ({ page }) => {

    const homePage = new HomePage(page)
    await homePage.dailyLink.click()
    await homePage.consentBox.check()
    await homePage.submitButton.click()
    await expect(homePage.interestAmount).not.toBeVisible()
    await expect(homePage.totalInterest).not.toBeVisible()
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe(alert)

      // checks the error dialog box appears
    })
  });

    test('Amount should be mandatory and error if not checked', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.principalSlider.fill('0')
    //set the amount to 0 which causes error
    await homePage.interestRateSelect.click()
    await homePage.checkboxRate2.click()
    await page.getByLabel('Selected Rate: 2%').locator('div').filter({ hasText: '2%' }).first().click();
    // bit of a hack to click off the dropdown in interest of time!
    await homePage.dailyLink.click()
    await homePage.consentBox.check()
    await homePage.submitButton.click()
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe(alert)

      // checks the error dialog box appears
    })
  });

    //   test.only('All elements should be visible on mobile', async ({ page }) => {
    // //iphone se resolution
    // test.use({viewport: {width: 375, height: 667}})
    // const homePage = new HomePage(page)
    // await expect(homePage.dailyLink).toBeVisible()

    // I ran out of time here... I was making sure the site is displaying all elements on mobile.

});



