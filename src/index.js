const EventRegistry = {};
export { EventRegistry };
export function globalListener(e) {
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
export const addListener = (element, eventType, listener, options) => {
    if (!EventRegistry[eventType]) {
        EventRegistry[eventType] = new Map();
    }
    const oneEventMap = EventRegistry[eventType];
    if (!oneEventMap.has(element)) {
        oneEventMap.set(element, new Map());
    }
    const oneElementMap = oneEventMap.get(element);
    if (typeof oneElementMap === "undefined")
        return;
    const { size } = oneElementMap;
    oneElementMap.set(listener, options);
    if (!size) {
        element.addEventListener(eventType, globalListener, options);
    }
};
export const removeListener = (element, eventType, listener, options) => {
    const oneEventMap = EventRegistry[eventType];
    const oneElementMap = oneEventMap && oneEventMap.get(element);
    const savedOptions = oneElementMap && oneElementMap.get(listener);
    const eventOptions = savedOptions !== undefined ? savedOptions : options;
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
export default {
    on: addListener,
    off: removeListener,
    globalListener,
    registry: EventRegistry,
};
//# sourceMappingURL=index.js.map