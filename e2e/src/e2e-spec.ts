import {browser, by, element, ExpectedConditions} from 'protractor';
import {url} from 'inspector';

describe('E2Es Test (Seymour)', () => {

  it('Should register in the application and go to the profile (happy path with description)', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    await element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    await element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should register in the application and go to the profile (happy path without description)', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description');
    await element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription@gmail.com');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should NOT register in the application because there is an user with same username)', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description');
    await element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription2@gmail.com');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because there is an user with same email)', async () => {
    browser.get('/#/register');
    await browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description2');
    await element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription@gmail.com');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because passwords do not match', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    await element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    await element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password12345');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because the username is too long', async () => {
    await element.all(by.id('username-input')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    await element.all(by.id('email-input')).sendKeys('long_username@gmail.com');
    await element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because the email is too long', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('long email');
    await element.all(by.id('email-input')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    await element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because the description is too long', async () => {
    browser.get('/#/register');
    await element.all(by.id('username-input')).sendKeys('long description');
    await element.all(by.id('email-input')).sendKeys('long_description@gmail.com');
    await element.all(by.id('description')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    await element.all(by.id('pswd-input')).sendKeys('password1234');
    await element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    await browser.actions().click(element(by.id('register-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should login in the application', async () => {
    browser.get('/#/login');
    await element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    await element.all(by.id('passwordInput')).sendKeys('password1234');
    await browser.actions().click(element(by.id('login-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should NOT login in the application because email was not provided', async () => {
    browser.get('/#/login');
    await element.all(by.id('passwordInput')).sendKeys('password1234');
    await browser.actions().click(element(by.id('login-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should NOT login in the application because email was not provided', async () => {
    browser.get('/#/login');
    await element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    await browser.actions().click(element(by.id('login-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should NOT login in the application because email or password were incorrect', async () => {
    browser.get('/#/login');
    await element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    await element.all(by.id('passwordInput')).sendKeys('password12345');
    await browser.actions().click(element(by.id('login-button'))).perform();
    await expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should create a course in the application', async () => {
    browser.get('/#/login');
    await element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    await element.all(by.id('passwordInput')).sendKeys('password1234');
    await browser.actions().click(element(by.id('login-button'))).perform();

  });
});
