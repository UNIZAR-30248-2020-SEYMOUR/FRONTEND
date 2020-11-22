import {browser, by, element, ExpectedConditions, protractor} from 'protractor';
import {url} from 'inspector';

describe('E2E Tests (Seymour)', () => {

  it('Should register in the application and go to the profile with description', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should find himself in the searcher', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    element.all(by.name('search')).sendKeys('Raúl Javierre');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element.all(by.className('course')).count()).toBe(1);  // the name "course" is not the most appropriate
  });

  it('Should not find an inexistent user in the searcher', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    element.all(by.name('search')).sendKeys('Pepito que no existe');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element.all(by.className('course')).count()).toBe(0);  // the name "course" is not the most appropriate
  });

  it('Should register in the application and go to the profile without description', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description');
    element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription@gmail.com');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should find both Raúl users in the searcher', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    element.all(by.name('search')).sendKeys('Raúl');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(element.all(by.className('course')).count()).toBe(2);  // the name "course" is not the most appropriate
  });

  it('Should NOT register in the application because there is an user with same username)', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description');
    element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription2@gmail.com');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El nombre de usuario ya existe, elige otro');
  });

  it('Should NOT register in the application because there is an user with same email)', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre Without Description2');
    element.all(by.id('email-input')).sendKeys('javierreraulwithoutdescription@gmail.com');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El email ya está registrado');
  });

  it('Should NOT register in the application because passwords do not match', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password12345');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('Las contraseñas no coinciden');
  });

  it('Should NOT register in the application because passwords are not provided', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('La contraseña es necesaria');
  });

  it('Should NOT register in the application because passwords are too short', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('Raúl Javierre');
    element.all(by.id('email-input')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('pss');
    element.all(by.id('repeat-pswd-input')).sendKeys('pss');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('La longitud de la contraseña debe tener al menos 8 caracteres');
  });

  it('Should NOT register in the application because the username is too long', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    element.all(by.id('email-input')).sendKeys('long_username@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El nombre debe tener como máximo 40 caracteres');
  });

  it('Should NOT register in the application because the username is too short', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('shr');
    element.all(by.id('email-input')).sendKeys('short_username@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El nombre debe tener al menos 4 caracteres');
  });

  it('Should NOT register in the application because the username is not provided', async () => {
    browser.get('/#/register');
    element.all(by.id('email-input')).sendKeys('not_provided_username@gmail.com');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El nombre de usuario es necesario');
  });

  it('Should NOT register in the application because the email is too long', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('long email');
    element.all(by.id('email-input')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should NOT register in the application because the email is not provided', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('email not provided');
    element.all(by.id('description')).sendKeys('Hey there, I\'m using Seymour');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
    expect(element.all(by.className('invalid-register')).getText()).toContain('El correo electrónico es necesario');
  });

  it('Should NOT register in the application because the description is too long', async () => {
    browser.get('/#/register');
    element.all(by.id('username-input')).sendKeys('long description');
    element.all(by.id('email-input')).sendKeys('long_description@gmail.com');
    element.all(by.id('description')).sendKeys('LONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONGLONG');
    element.all(by.id('pswd-input')).sendKeys('password1234');
    element.all(by.id('repeat-pswd-input')).sendKeys('password1234');
    browser.actions().click(element(by.id('register-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('register');
  });

  it('Should login in the application', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('user-profile');
  });

  it('Should NOT login in the application because email was not provided', async () => {
    browser.get('/#/login');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should NOT login in the application because email was not provided', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    browser.actions().click(element(by.id('login-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should NOT login in the application because email or password were incorrect', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password12345');
    browser.actions().click(element(by.id('login-button'))).perform();
    expect(browser.getCurrentUrl()).toContain('login');
  });

  it('Should create a course in the application', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Nuevo curso'))).perform();
    element.all(by.name('courseName')).sendKeys('Curso De Angular');
    element.all(by.id('descripcion-curso')).sendKeys('En este curso de Angular aprenderéis muuuuuuuuchas cosas');
    browser.actions().click(element(by.id('combo-categories'))).perform();
    browser.element(by.css('#combo-categories [value=\'Software\']')).click();
    browser.actions().click(element(by.buttonText('Guardar curso'))).perform();
    browser.navigate().back();
    browser.navigate().forward();
    expect(element.all(by.className('course-title')).getText()).toContain('Curso De Angular');
  });

  it('Should create a course without description in the application', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Nuevo curso'))).perform();
    element.all(by.name('courseName')).sendKeys('Curso');
    browser.actions().click(element(by.id('combo-categories'))).perform();
    browser.element(by.css('#combo-categories [value=\'Software\']')).click();
    browser.actions().click(element(by.buttonText('Guardar curso'))).perform();
    browser.navigate().back();
    browser.navigate().forward();
    expect(element.all(by.className('course-title')).getText()).toContain('Curso');
  });

  it('Should NOT create a course in the application because coursename was not provided', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Nuevo curso'))).perform();
    element.all(by.id('descripcion-curso')).sendKeys('En este curso de Angular aprenderéis muuuuuuuuchas cosas');
    browser.actions().click(element(by.id('combo-categories'))).perform();
    browser.element(by.css('#combo-categories [value=\'Software\']')).click();
    browser.actions().click(element(by.buttonText('Guardar curso'))).perform();
    expect(element.all(by.className('invalid-update')).getText()).toContain('El nombre es necesario');
  });

  it('Should NOT create a course in the application because the category of the course was not provided', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Nuevo curso'))).perform();
    element.all(by.id('courseName')).sendKeys('Curso que no va a existir');
    browser.actions().click(element(by.buttonText('Guardar curso'))).perform();
    browser.navigate().back();
    browser.navigate().forward();
    expect(element.all(by.className('course-title')).getText()).not.toContain('Curso que no va a existir');
  });

  it('Should modify his profile in the application', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Modificar perfil'))).perform();
    element.all(by.id('input-username')).sendKeys('Raulito Modificado');
    element.all(by.id('input-email')).sendKeys('758906@unizar.es');
    browser.actions().click(element(by.buttonText('Guardar'))).perform();
    expect(element.all(by.className('display-2 text-white')).getText()).toContain('Hola Raulito Modificado');
  });

  it('Should modify again his profile in the application', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('758906@unizar.es');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Modificar perfil'))).perform();
    element.all(by.id('input-username')).sendKeys('Raúl Javierre');
    element.all(by.id('input-email')).sendKeys('javierreraul@gmail.com');
    browser.actions().click(element(by.buttonText('Guardar'))).perform();
    expect(element.all(by.className('display-2 text-white')).getText()).toContain('Hola Raúl Javierre');
  });

  it('Should NOT modify his profile in the application because email exists', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Modificar perfil'))).perform();
    element.all(by.id('input-username')).sendKeys('Raulito No Modificado');
    element.all(by.id('input-email')).sendKeys('javierreraulwithoutdescription@gmail.com');
    browser.actions().click(element(by.buttonText('Guardar'))).perform();
    expect(element.all(by.id('error-response')).getText()).toContain('Error al actualizar el perfil.');
  });

  it('Should NOT modify his profile in the application because username exists', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Modificar perfil'))).perform();
    element.all(by.id('input-username')).sendKeys('Raúl Javierre Without Description');
    element.all(by.id('input-email')).sendKeys('javierreraul@gmail.com');
    browser.actions().click(element(by.buttonText('Guardar'))).perform();
    expect(element.all(by.id('error-response')).getText()).toContain('Error al actualizar el perfil.');
  });

  it('Should delete an account', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraul@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Borrar perfil'))).perform();
    browser.actions().click(element(by.id('btn-delete'))).perform();
    expect(element.all(by.className('text-white')).getText()).toContain('¡Bienvenido!');
  });

  it('Should delete another account', async () => {
    browser.get('/#/login');
    element.all(by.id('emailInput')).sendKeys('javierreraulwithoutdescription@gmail.com');
    element.all(by.id('passwordInput')).sendKeys('password1234');
    browser.actions().click(element(by.id('login-button'))).perform();
    browser.actions().click(element(by.buttonText('Borrar perfil'))).perform();
    browser.actions().click(element(by.id('btn-delete'))).perform();
    expect(element.all(by.className('text-white')).getText()).toContain('¡Bienvenido!');
  });
});

