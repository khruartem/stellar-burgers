import token from '../../fixtures/token.json';
import order from '../../fixtures/order.json';

beforeEach(() => {
  cy.log('go to burgerConstructor page');
  cy.visit('http://localhost:4000/');

  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

  // cy.window().then((win) =>
  //   win.localStorage.setItem(
  //     'refreshToken',
  //     `${cy.fixture('token').then((token) => token.refreshToken)}`
  //   )
  // );
});

describe('add ingredients', () => {
  it('add bun', () => {
    cy.log('click on a bun');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[0]._id}"] ~ button`).click();
    });

    cy.log('check bun`s quantity');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`.constructor-element__text:contains(${data[0].name})`).should(
        'have.length',
        2
      );
    });
  });

  it('add main', () => {
    cy.log('click on a main');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[1]._id}"] ~ button`).click();
    });

    cy.log('check main`s quantity');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`.constructor-element__text:contains(${data[1].name})`).should(
        'have.length',
        1
      );
    });
  });
});

describe('test modal', () => {
  it('open modal', () => {
    cy.log('click on ingredient');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[0]._id}"]`).click();
    });

    cy.log('check modal is open');
    cy.get('#modals div').first().as('modalContent').should('be.visible');

    cy.log('check modal has content');
    cy.get('@modalContent').children().should('have.length', 2);

    cy.log('check the correct modal is open');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get('h3.text').contains(data[0].name);
    });
  });

  it('modal close', () => {
    cy.log('click on ingredient');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[0]._id}"]`).click();
    });

    cy.log('close modal');
    cy.get('#modals div').first().find('button').click();

    cy.log('check modal is closed');
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('create order', () => {
  it('set tokens', () => {
    cy.log('set refreshToken and accessToken');
    cy.window().then((win) =>
      win.localStorage.setItem('refreshToken', token.refreshToken)
    );
    cy.setCookie('accessToken', token.accessToken);
  });

  it('make burger', () => {
    cy.log('clicking on ingrediens');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[5]._id}"] ~ button`).click();
      cy.get(`a[href="/ingredients/${data[1]._id}"] ~ button`).click();
      cy.get(`a[href="/ingredients/${data[3]._id}"] ~ button`).click();
    });

    cy.log('check burger');
    order.order.ingredients.forEach(({ name }) => {
      cy.get(`.constructor-element__text:contains(${name})`).should(
        'be.visible'
      );
    });
  });

  it('make order', () => {
    cy.log('clicking on ingrediens');
    cy.fixture('ingredients').then(({ data }) => {
      cy.get(`a[href="/ingredients/${data[5]._id}"] ~ button`).click();
      cy.get(`a[href="/ingredients/${data[1]._id}"] ~ button`).click();
      cy.get(`a[href="/ingredients/${data[3]._id}"] ~ button`).click();
    });

    cy.log('click order button');
    cy.get('button').filter(':contains("Оформить заказ")').click();

    cy.log('check order number');
    cy.get('#modals div')
      .first()
      .find('h2')
      .filter(`:contains("${order.order.number}")`)
      .should('be.visible');

    cy.log('close modal');
    cy.get('#modals div').first().find('button').click();

    cy.log('check modal is closed');
    cy.get('#modals').children().should('have.length', 0);

    cy.log('check constructor is empty');
    cy.get('.text:contains("Выберите булки")').should('have.length', 2);
    cy.get('.text:contains("Выберите начинку")').should('have.length', 1);

    cy.log('clear localStorage and Cookie');
    cy.clearLocalStorage();
    cy.clearCookie;
  });
});
