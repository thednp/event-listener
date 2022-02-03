/*!
* EventListener v0.0.4 (https://github.com/thednp/event-listener.js)
* Modern event listener for efficient applications.
* Copyright 2022 © thednp
* Licensed under MIT (https://github.com/thednp/event-listener.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EventListener = factory());
})(this, (function () { 'use strict';

  /** @type {Record<string, any>} */
  var EventRegistry = {};

  /**
   * The global event listener.
   *
   * @this {Element | HTMLElement | Window | Document}
   * @param {Event} e
   * @returns {void}
   */
  function globalListener(e) {
    var that = this;
    var type = e.type;
    var oneEvMap = EventRegistry[type] ? [].concat( EventRegistry[type] ) : [];

    oneEvMap.forEach(function (elementsMap) {
      var element = elementsMap[0];
      var listenersMap = elementsMap[1];
      [].concat( listenersMap ).forEach(function (listenerMap) {
        if (element === that) {
          var listener = listenerMap[0];
          var options = listenerMap[1];
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
   * @param {Element | HTMLElement | Window | Document} element
   * @param {string} eventType
   * @param {EventListenerObject['handleEvent']} listener
   * @param {AddEventListenerOptions=} options
   */
  var addListener = function (element, eventType, listener, options) {
    // get element listeners first
    if (!EventRegistry[eventType]) {
      EventRegistry[eventType] = new Map();
    }
    var oneEventMap = EventRegistry[eventType];

    if (!oneEventMap.has(element)) {
      oneEventMap.set(element, new Map());
    }
    var oneElementMap = oneEventMap.get(element);

    // get listeners size
    var size = oneElementMap.size;

    // register listener with its options
    if (oneElementMap) {
      oneElementMap.set(listener, options);
    }

    // add listener last
    if (!size) {
      element.addEventListener(eventType, globalListener, options);
    }
  };

  /**
   * Remove a listener from registry and detach the `globalListener`
   * if no listeners are found in the registry.
   *
   * @param {Element | HTMLElement | Window | Document} element
   * @param {string} eventType
   * @param {EventListenerObject['handleEvent']} listener
   * @param {AddEventListenerOptions=} options
   */
  var removeListener = function (element, eventType, listener, options) {
    // get listener first
    var oneEventMap = EventRegistry[eventType];
    var oneElementMap = oneEventMap && oneEventMap.get(element);
    var savedOptions = oneElementMap && oneElementMap.get(listener);
    // also recover initial options
    var ref = savedOptions !== undefined
      ? savedOptions
      : { options: options };
    var eventOptions = ref.options;

    // unsubscribe second, remove from registry
    if (oneElementMap && oneElementMap.has(listener)) { oneElementMap.delete(listener); }
    if (oneEventMap && (!oneElementMap || !oneElementMap.size)) { oneEventMap.delete(element); }
    if (!oneEventMap || !oneEventMap.size) { delete EventRegistry[eventType]; }

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
  var EventListener = {
    on: addListener,
    off: removeListener,
    globalListener: globalListener,
    registry: EventRegistry,
  };

  return EventListener;

}));
