import { AppPage } from './app.po';

describe('E2E Test (Seymour)', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('¡Bienvenido!');
  });
});
