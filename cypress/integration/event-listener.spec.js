/// <reference types="cypress" />

import EventListener from '../../src/event-listener';

const clickListener = function({target}) {
  target.innerHTML = '<b>click</b>';
}

const scrollListener = function({target}) {
  console.log(target)
  target.body.innerHTML = '<b>scroll</b>';
}

describe('EventListener Testing', () => {
  before(() => {
    cy.visit('cypress/test.html')
      .wait(17);
  });

  beforeEach(() => {
    cy.get('body').then((body) => {
        cy.wrap(body).as('body');
      })
      .window().then((win) => {
        cy.wrap(win).as('win');
      })
      .wait(200);
  });

  it('can do `addListener` click', () => {
    cy.get('@body').then((body) => {
        if (body[0]) {
          EventListener.on(body[0], 'click', clickListener);
        }
      })
      .wait(17)
      .get('@body').trigger('click', { force: true }).then((body) => {
        expect(body[0].innerHTML).to.equal('<b>click</b>');
        expect(EventListener.registry.click).to.be.instanceOf(Map)
      })
      .wait(17)
      .get('b').trigger('click', { force: true }).then((b) => {
        expect(b[0].innerHTML).to.equal('<b>click</b>');
        expect(EventListener.registry.click).to.be.instanceOf(Map)
      })
  });

  it('can do `addListener` scroll', () => {
    cy.get('@win').then((win) => {
        if (win) {
          EventListener.on(win, 'scroll', scrollListener);
        }
      })
      .wait(100)
      .get('@win').then((win) => {
        win.scrollTo(0,1500);
      })
      .wait(200)
      .get('@body').then((body) => {
        expect(body[0].innerHTML).to.equal('<b>scroll</b>');
        expect(EventListener.registry.scroll).to.be.instanceOf(Map)
      })
  });

  it('can do `removeListener`', () => {
    cy.get('@body').then((body) => {
        if (body[0]) {
          EventListener.on(body[0], 'click', clickListener);
        }
      })
      .get('b').then((b) => {
        if (b[0]) {
          EventListener.on(b[0], 'click', clickListener);
        }
      })
      .get('@win').then((win) => {
        if (win) {
          EventListener.on(win, 'scroll', scrollListener);
        }
      })
      .get('@body').then((body) => {
        if (body[0]) {
          expect(EventListener.registry.click).to.be.instanceOf(Map);
          EventListener.off(body[0], 'click', clickListener);
        }
      })
      .get('b').then((b) => {
        if (b[0]) {
          EventListener.off(b[0], 'click', clickListener);
        }
      })
      .get('@win').then((win) => {
        if (win) {
          expect(EventListener.registry.scroll).to.be.instanceOf(Map);
          EventListener.off(win, 'scroll', scrollListener);
        }
      })
      .wait(17)
      .get('@body').then((body) => {
        if (body[0]) {
          expect(EventListener.registry.click).to.be.undefined;
          expect(EventListener.registry.scroll).to.be.undefined;
        }
      });
  })

  it('can do `options`', () => {
    cy.get('@body').then((body) => {
        if (body[0]) {
          EventListener.on(body[0], 'click', clickListener, { once: true });
        }
      })
      .wait(17)
      .get('@body').trigger('click', { force: true })
      .wait(17)
      .get('@body').then((body) => {
        if (body[0]) {
          expect(EventListener.registry.click).to.be.undefined;
        }
      })
      .get('@body').then((body) => {
        if (body[0]) {
          // this should produce no effect
          EventListener.off(body[0], 'click', clickListener);
        }
      })
      .wait(17)

  })
});