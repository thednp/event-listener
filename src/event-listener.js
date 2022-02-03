import EventRegistry from './registry';
import globalListener, { addListener, removeListener } from './globalListener';

/**
 * Advanced event listener based on subscribe / publish pattern.
 * @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
 * @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
 * @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
 */
const EventListener = {
  on: addListener,
  off: removeListener,
  globalListener,
  registry: EventRegistry,
};

export default EventListener;
