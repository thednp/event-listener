import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { getExampleDOM } from './fixtures/getExampleDom';
import * as Listener from '../src/index';
import clickListener from './fixtures/clickListener';
import scrollListener from './fixtures/scrollListener';

describe('Test Removing Listeners', () => {
  let container: HTMLElement;
  const doc = document;
  const win = window;
  beforeEach(async () => {
    container = getExampleDOM();
    await vi.waitUntil(() => container.querySelector('b') !== null, { timeout: 150 });
  });
  afterEach(async () => {
    document.documentElement.innerHTML = '';
  });

  it('can do `removeListener`', () => {
    const B = doc.querySelector('b');

    Listener.on(win, 'scroll', scrollListener);
    expect(Listener.registry.scroll, 'SCROLL registry must have items').to.be.instanceOf(Map);
    Listener.off(win, 'scroll', scrollListener);

    if (doc.body) {
      Listener.on(doc.body, 'click', clickListener);
      expect(Listener.registry.click, 'CLICK registry must have items').to.be.instanceOf(Map);
      Listener.off(doc.body, 'click', clickListener);
    }
    if (B) {
      Listener.on(B, 'click', clickListener);
      expect(Listener.registry.click, 'CLICK registry must have items').to.be.instanceOf(Map);
      Listener.off(B, 'click', clickListener);
    }

    expect(Listener.registry.scroll, 'SCROLL registry must be empty').to.be.undefined;
    expect(Listener.registry.click, 'CLICK registry must be empty').to.be.undefined;

  });
});
