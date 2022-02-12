# EventListener
Modern event listener for efficient applications based on the [subscribe-publish](https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8) pattern.

**EventListener** is less than 900 bytes when minified, but packs a surprising amount of power.

[![NPM Version](https://img.shields.io/npm/v/event-listener.js.svg?style=flat-square)](https://www.npmjs.com/package/event-listener.js)
[![NPM Downloads](https://img.shields.io/npm/dm/event-listener.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=event-listener.js)
[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/event-listener.js/badge)](https://www.jsdelivr.com/package/npm/event-listener.js)


# Features
* **EventListener** is ES6+ sourced with TypeScript definitions;
* **EventListener** comes with ES6, ES5 and ESM packaging, all in `/dist` folder;
* **EventListener** makes use of the native [Map](https://caniuse.com/mdn-javascript_builtins_map) to subscribe/register or unsubscribe/remove listeners, which is perfect since we need to make sure the exact listeners are added/removed; this completely invalidates the need to [deconstruct function objects](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript) for comparison's sake to make sure event listeners are properly handled;
* **EventListener** allows you to register multiple listeners for the same target, even of the same type, but always uses a single `globalListener` to call them all at once when event is triggered;
* **EventListener** "should" be able to manage event options, especially `once`, meaning that when the option is `true`, the listener is automatically un-subscribed and detached from target;
* **EventListener** will unsubscribe and detach listeners with the same options used when attached, which means you can "lazy" remove listeners on the fly.

# NPM
```
npm install event-listener.js
```

# CDN
```html
<script src="https://cdn.jsdelivr.net/npm/event-listener.js/dist/event-listener.min.js"></script>
```

# Use
```js
import EventListener from 'event-listener.js';

// execute a listener once
EventListener.on(document, 'DOMContentLoaded', () => {
  console.log('document is now loaded');
}, { once: true });


// add a listener with `useCapture: false`
function handleMyClick(e) {
  if (e.target.tagName === 'button') {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  console.log('do something else instead');
}
EventListener.on(document, 'click', handleMyClick, false);

// remove a listener, `EventListener` will get listener options from registry
EventListener.off(document, 'click', handleMyClick);

// add listener to `window`, this listener has no name and cannot be removed
EventListener.on(window, 'scroll', () => console.log(window.scrollY));
```

Since we're implementing `Map`, you can make use of its prototype to access registry:
```js
// get element listener registry
const documentClickListeners = EventListener.registry['click'].get(document);

// returns
Map(1) {
  Entries(Array) => [
    0: {
      key: ƒ() // listener
      value: false // listener options
    }
  ],
  size: 1, // size of the Map
  prototype: Prototype
}

// check if element has listener
if (documentClickListeners && documentClickListeners.has(handleMyClick)) {
  // do something about it
}

// get listener options
const myListenerOptions = documentClickListeners && documentClickListeners.get(handleMyClick));

// returns false, which is the `useCapture` option value added for `handleMyClick`
```

# Advanced Use
You can also make use of "tree shaking" to import only the module you want, for instance:

```js
import { addListener } from 'event-listener.js';

addListener(document, handleMyClick, true);
```

For more advanced use, check out the [demo](./demo/index.html), showcasing the **EventListener** usage with a demo component.

# License
**EventListener** is released under the [MIT License](https://github.com/thednp/event-listener.js/blob/main/LICENSE).