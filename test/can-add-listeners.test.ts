import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { getExampleDOM } from './fixtures/getExampleDom';

import * as Listener from '../src/index';
import clickListener from './fixtures/clickListener';

describe('Test Adding Listeners', () => {
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

  it('can do `addListener` click', () => {
    const b = doc.querySelector('b') as HTMLElement;

    if (doc.body) {
      Listener.on(doc.body, 'click', clickListener);
    }
    b.click();

    expect(b.innerHTML).to.equal('<b>click</b>');
    expect(Listener.registry.click).to.be.instanceOf(Map);

    doc.body.click();

    expect(doc.body.innerHTML).to.equal('<b>click</b>', 'should match HTML markup');
    expect(Listener.registry.click).to.be.instanceOf(Map);
  });

  it('can do `addListener` scroll', async () => {
    let scrolled = false;

    Listener.on(win, 'scroll', function (e) {
      // console.log({ target: e.target, currentTarget: e.currentTarget, win: win });
      doc.body.innerHTML = '<b>scroll</b>';
      scrolled = true;
    });

    win.scrollTo(0,1000);
    win.dispatchEvent(new Event('scroll'))

    await vi.waitFor(() => {
      expect(scrolled).to.be.true;
      expect(doc.body.innerHTML).to.equal('<b>scroll</b>');
      expect(win.scrollY).to.not.equal(0);
      expect(Listener.registry.scroll).to.be.instanceOf(Map);
    }, 150)
  });
});
