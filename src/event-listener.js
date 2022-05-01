/** @type {Record<string, any>} */
const EventRegistry = {};

export { EventRegistry };

/**
 * The global event listener.
 *
 * @type {EventListener}
 * @this {EventTarget}
 */
export function globalListener(e) {
  const that = this;
  const { type } = e;

  [...EventRegistry[type]].forEach((elementsMap) => {
    const [element, listenersMap] = elementsMap;
    [...listenersMap].forEach((listenerMap) => {
      if (element === that) {
        const [listener, options] = listenerMap;
        listener.apply(element, [e]);

        if (options && options.once) {
          removeListener(element, type, listener, options);
        }
      }
    });
  });
}

/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 *
 * @type {Listener.ListenerAction<EventTarget>}
 */
export const addListener = (element, eventType, listener, options) => {
  // get element listeners first
  if (!EventRegistry[eventType]) {
    EventRegistry[eventType] = new Map();
  }
  const oneEventMap = EventRegistry[eventType];

  if (!oneEventMap.has(element)) {
    oneEventMap.set(element, new Map());
  }
  const oneElementMap = oneEventMap.get(element);

  // get listeners size
  const { size } = oneElementMap;

  // register listener with its options
  oneElementMap.set(listener, options);

  // add listener last
  if (!size) {
    element.addEventListener(eventType, globalListener, options);
  }
};

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 * @type {Listener.ListenerAction<EventTarget>}
 */
export const removeListener = (element, eventType, listener, options) => {
  // get listener first
  const oneEventMap = EventRegistry[eventType];
  const oneElementMap = oneEventMap && oneEventMap.get(element);
  const savedOptions = oneElementMap && oneElementMap.get(listener);

  // also recover initial options
  const { options: eventOptions } = savedOptions !== undefined
    ? savedOptions
    : { options };

  // unsubscribe second, remove from registry
  if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
  if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
  if (!oneEventMap || !oneEventMap.size) delete EventRegistry[eventType];

  // remove listener last
  if (!oneElementMap || !oneElementMap.size) {
    element.removeEventListener(eventType, globalListener, eventOptions);
  }
};

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
