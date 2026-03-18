/*!
* @thednp/event-listener ESM v2.0.13 (https://thednp.github.io/event-listener)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/event-listener/blob/main/LICENSE)
*/
"use strict";

import "./chunk-CE8aYT3Z.mjs";
//#region package.json
var version = "2.0.13";
//#endregion
//#region src/index.ts
/**
* Advanced event listener based on subscribe / publish pattern.
*
* @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
* @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
* @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
*/
const registry = {};
/**
* The global event listener.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
*/
const globalListener = (e) => {
	const { type, currentTarget } = e;
	registry[type].forEach((listenersMap, element) => {
		if (currentTarget === element) listenersMap.forEach((options, listener) => {
			listener.apply(element, [e]);
			if (typeof options === "object" && options.once) removeListener(element, type, listener, options);
		});
	});
};
/**
* Register a new listener with its options and attach the `globalListener`
* to the target if this is the first listener.
*/
const addListener = (element, eventType, listener, options) => {
	if (!registry[eventType]) registry[eventType] = /* @__PURE__ */ new Map();
	const oneEventMap = registry[eventType];
	if (!oneEventMap.has(element)) oneEventMap.set(element, /* @__PURE__ */ new Map());
	const oneElementMap = oneEventMap.get(element);
	const { size } = oneElementMap;
	oneElementMap.set(listener, options);
	if (!size) element.addEventListener(eventType, globalListener, options);
};
/**
* Remove a listener from registry and detach the `globalListener`
* if no listeners are found in the registry.
*/
const removeListener = (element, eventType, listener, options) => {
	const oneEventMap = registry[eventType];
	const oneElementMap = oneEventMap && oneEventMap.get(element);
	const savedOptions = oneElementMap && oneElementMap.get(listener);
	const eventOptions = savedOptions !== void 0 ? savedOptions : options;
	if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
	if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
	if (!oneEventMap || !oneEventMap.size) delete registry[eventType];
	if (!oneElementMap || !oneElementMap.size) element.removeEventListener(eventType, globalListener, eventOptions);
};
const on = addListener;
const off = removeListener;
//#endregion
export { addListener, globalListener, off, on, registry, removeListener, version };

//# sourceMappingURL=index.mjs.map