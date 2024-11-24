import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { getExampleDOM } from './fixtures/getExampleDom';
import * as Listener from '../src/index';
import clickListener from './fixtures/clickListener';

describe('Test Listener Options', () => {
  let container: HTMLElement;
  const doc = document;
  beforeEach(async () => {
    container = getExampleDOM();
    await vi.waitUntil(() => container.querySelector('b') !== null, { timeout: 150 });
  });
  afterEach(async () => {
    document.documentElement.innerHTML = '';
  });

  it('can do `options`', () => {
    Listener.on(doc.body, 'click', clickListener, { once: true });
    doc.body.click();
    // this should produce no effect
    Listener.off(doc.body, 'click', clickListener);
    expect(Listener.registry.click, 'CLICK registry must be empty').to.be.undefined;

  });
});
