import {browser, by, element, ExpectedConditions} from 'protractor';
import {url} from 'inspector';

describe('E2E Test (Seymour)', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should register in the application', async () => {
    await browser.get('/#/register');
    await element.all(by.id('input-username')).sendKeys('raulitojavierre');
    await element.all(by.id('email')).sendKeys('raulitojavierre@a.a');
    await element.all(by.id('description')).sendKeys('hola como estamos');
    await element.all(by.id('password')).sendKeys('password1234');
    await element.all(by.id('repeat_pswd')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('dashboard');
  });
});
