# EventListener
Modern event listener for efficient applications based on the [subscribe-publish](https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8) pattern.

# NPM
```
npm install event-listener.js
```

# Package Features
* *EventListener* is ES6+ sourced with TypeScript definitions;
* *EventListener* comes with ES6, ES5 and ESM packaging, all in `/dist` folder;
* *EventListener* makes use of the native [Map](https://caniuse.com/mdn-javascript_builtins_map) to subscribe/register or unsubscribe/remove listeners, which is perfect since we need to make sure the exact listeners are added/removed;
* *EventListener* allows you to register multiple listeners for the same target, even of the same type, but always uses a single `globalListener` to call them all at once when event is triggered;
* *EventListener* "should" be able to manage event options, especially `once`, meaning that when the option is `true`, the listener is automatically un-subscribed and detached from target;
* *EventListener* will unsubscribe and detach listeners with the same options used when attached, which means you can "lazy" remove listeners on the fly.

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
  console.log('document is now loaded');
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
  prototype: Proto
}

// check if element has listener
if (documentClickListeners && documentClickListeners.has(handleMyClick)) {
  // do something about it
}
```

For advanced use, check out the [demo](./demo/index.html), showcasing the *EventListener* usage with a demo component.

# License
*EventListener* is released under the [MIT License](https://github.com/thednp/event-listener.js/blob/main/LICENSE).