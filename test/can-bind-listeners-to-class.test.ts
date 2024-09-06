import { expect, it, describe, vi, beforeEach, afterEach } from 'vitest';
import { getExampleDOM } from './fixtures/getExampleDom';
import * as Listener from '../src/index';
import Sample from './fixtures/sample';

describe('Test Binding Class Objects to Listeners', () => {
  let container: HTMLElement;
  const doc = document;
  beforeEach(async () => {
    container = getExampleDOM();
    await vi.waitUntil(() => container.querySelector('b') !== null, { timeout: 150 });
  });
  afterEach(async () => {
    document.documentElement.innerHTML = '';
  });

  it('can work with class `this` bind', () => {
    new Sample(doc.body);
    (doc.body.children[0] as HTMLElement).click();

    expect(doc.body.innerHTML).to.equal('<strong>Hello World! We have 1 visitors</strong>');
    expect(Listener.registry.click).to.be.instanceOf(Map);

  });
});
