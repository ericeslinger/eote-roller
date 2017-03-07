import { EoteRollerPage } from './app.po';

describe('eote-roller App', () => {
  let page: EoteRollerPage;

  beforeEach(() => {
    page = new EoteRollerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
