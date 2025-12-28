//#region package.json
var version = "2.0.12";

//#endregion
//#region src/index.ts
const registry = {};
const globalListener = (e) => {
	const { type, currentTarget } = e;
	registry[type].forEach((listenersMap, element) => {
		if (currentTarget === element) listenersMap.forEach((options, listener) => {
			listener.apply(element, [e]);
			if (typeof options === "object" && options.once) removeListener(element, type, listener, options);
		});
	});
};
const addListener = (element, eventType, listener, options) => {
	if (!registry[eventType]) registry[eventType] = /* @__PURE__ */ new Map();
	const oneEventMap = registry[eventType];
	if (!oneEventMap.has(element)) oneEventMap.set(element, /* @__PURE__ */ new Map());
	const oneElementMap = oneEventMap.get(element);
	const { size } = oneElementMap;
	oneElementMap.set(listener, options);
	if (!size) element.addEventListener(eventType, globalListener, options);
};
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