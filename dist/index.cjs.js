"use strict";
/*!
* Listener v2.0.0alpha1 (https://thednp.github.io/event-listener)
* Copyright 2022 © thednp
* Licensed under MIT (https://thednp.github.io/event-listener/blob/main/LICENSE)
*/
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EventRegistry: () => EventRegistry,
  addListener: () => addListener,
  default: () => src_default,
  globalListener: () => globalListener,
  removeListener: () => removeListener
});
module.exports = __toCommonJS(src_exports);
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
//# sourceMappingURL=index.cjs.js.map
