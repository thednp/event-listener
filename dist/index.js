/*!
* Listener v2.0.0alpha2 (https://thednp.github.io/event-listener)
* Copyright 2022 © thednp
* Licensed under MIT (https://thednp.github.io/event-listener/blob/main/LICENSE)
*/
// src/index.ts
var EventRegistry = {};
function globalListener(e) {
  const that = this;
  const { type } = e;
  [...EventRegistry[type]].forEach((elementsMap) => {
    const [element, listenersMap] = elementsMap;
    if (element === that) {
      [...listenersMap].forEach((listenerMap) => {
        const [listener, options] = listenerMap;
        listener.apply(element, [e]);
        if (options && options.once) {
          removeListener(element, type, listener, options);
        }
      });
    }
  });
}
var addListener = (element, eventType, listener, options) => {
  if (!EventRegistry[eventType]) {
    EventRegistry[eventType] = /* @__PURE__ */ new Map();
  }
  const oneEventMap = EventRegistry[eventType];
  if (!oneEventMap.has(element)) {
    oneEventMap.set(element, /* @__PURE__ */ new Map());
  }
  const oneElementMap = oneEventMap.get(element);
  const { size } = oneElementMap;
  oneElementMap.set(listener, options);
  if (!size) {
    element.addEventListener(eventType, globalListener, options);
  }
};
var removeListener = (element, eventType, listener, options) => {
  const oneEventMap = EventRegistry[eventType];
  const oneElementMap = oneEventMap && oneEventMap.get(element);
  const savedOptions = oneElementMap && oneElementMap.get(listener);
  const eventOptions = savedOptions !== void 0 ? savedOptions : options;
  if (oneElementMap && oneElementMap.has(listener))
    oneElementMap.delete(listener);
  if (oneEventMap && (!oneElementMap || !oneElementMap.size))
    oneEventMap.delete(element);
  if (!oneEventMap || !oneEventMap.size)
    delete EventRegistry[eventType];
  if (!oneElementMap || !oneElementMap.size) {
    element.removeEventListener(eventType, globalListener, eventOptions);
  }
};
var Listener = {
  on: addListener,
  off: removeListener,
  globalListener,
  registry: EventRegistry
};
var src_default = Listener;
export {
  EventRegistry,
  addListener,
  src_default as default,
  globalListener,
  removeListener
};
//# sourceMappingURL=index.js.map
