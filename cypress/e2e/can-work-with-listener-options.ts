/// <reference types="cypress" />
import Listener from '../../src/index';
import clickListener from '../fixtures/clickListener';

describe('TestListener Options', () => {
  before(() => {
    cy.visit('cypress/test.html')
  });

  it('can do `options`', () => {
    cy.window().should(win => {
      if (win) {
        const doc = win.document;
        Listener.on(doc.body, 'click', clickListener, { once: true });
        doc.body.click();
        // this should produce no effect
        Listener.off(doc.body, 'click', clickListener);
        expect(Listener.registry.click, 'CLICK registry must be empty').to.be.undefined;
      }
    });
  });
});