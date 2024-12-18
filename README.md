## EventListener

[![Coverage Status](https://coveralls.io/repos/github/thednp/event-listener/badge.svg)](https://coveralls.io/github/thednp/event-listener)
[![ci](https://github.com/thednp/event-listener/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/event-listener/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@thednp/event-listener.svg)](https://www.npmjs.com/package/@thednp/event-listener)
[![NPM Downloads](https://img.shields.io/npm/dm/@thednp/event-listener.svg)](http://npm-stat.com/charts.html?package=@thednp/event-listener)
[![jsDeliver](https://img.shields.io/jsdelivr/npm/hw/@thednp/event-listener)](https://www.jsdelivr.com/package/npm/@thednp/event-listener)
[![typescript version](https://img.shields.io/badge/typescript-5.6.3-brightgreen)](https://www.typescriptlang.org/)
[![vitest version](https://img.shields.io/badge/vitest-2.1.5-brightgreen)](https://vitest.dev/)
[![vite version](https://img.shields.io/badge/vite-5.4.11-brightgreen)](https://github.com/vitejs)

A TypeScript sourced event listener for efficient applications based on the [subscribe-publish](https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8) pattern, around 700 bytes when minified and packs a surprising amount of power.

## Features

- **EventListener** is TypeScript sourced, with some types addapted from React;
- **EventListener** makes use of the native [Map](https://caniuse.com/mdn-javascript_builtins_map) to subscribe/register or unsubscribe/remove listeners, which is perfect since we need to make sure the exact listeners are added/removed; this completely invalidates the need to [deconstruct function objects](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript) for comparison's sake to make sure event listeners are properly handled;
- **EventListener** allows you to register multiple listeners for the same target, even of the same type, but always uses a single `globalListener` to call them all at once when event is triggered;
- **EventListener** "should" be able to manage event options, especially `once`, meaning that when the option is `true`, the listener is automatically un-subscribed and detached from target;
- **EventListener** will unsubscribe and detach listeners with the same options used when attached, which means you can "lazy" remove listeners on the fly.


# Install

```bash
pnpm install @thednp/event-listener
```

```bash
yarn add @thednp/event-listener
```

```bash
npm install @thednp/event-listener
```

```bash
deno add npm:@thednp/event-listener@latest
```


## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@thednp/event-listener/dist/event-listener.js"></script>
```

## Use

```js
import * as Listener from '@thednp/event-listener';

// execute a listener once
Listener.on(document, 'DOMContentLoaded', () => {
    console.log('document is now loaded');
  },
  { once: true },
);

// add a listener with `useCapture: false`
function handleMyClick(e: Listener.NativeEvent) {
  if (e.target.tagName === 'button') {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  console.log('do something else instead');
}
Listener.on(document, 'click', handleMyClick, false);

// remove a listener, `EventListener` will get listener options from registry
Listener.off(document, 'click', handleMyClick);

// add listener to `window`, this listener has no name and cannot be removed
Listener.on(window, 'scroll', () => console.log(window.scrollY));
```

Since we're implementing `Map`, you can make use of its prototype to access registry:

```js
// get element listener registry
const documentClickListeners = Listener.registry['click'].get(document);

// returns
Map(1) {
  Entries => [
    0: {
      key: handleMyClick() // listener
      value: false // listener options
    }
  ],
  size: 1, // size of the Map
  prototype: [Prototype(Map)]
}

// check if element has listener
if (documentClickListeners && documentClickListeners.has(handleMyClick)) {
  // do something about it
}

// check if a listener is the one you're looking for
if (documentClickListeners) {
  const [eventListener] = documentClickListeners;
  if (eventListener === handleMyClick) {
    // do something about it
  }
}

// get listener options
const myListenerOptions = documentClickListeners && documentClickListeners.get(handleMyClick);

// returns false, which is the `useCapture` option value added for `handleMyClick`
```

## Advanced Use

You can also make use of the types for more consistent code:

```ts
import { on, FocusEventHandler } from '@thednp/event-listener';

const handleMyFocus: FocusEventHandler<HTMLInputElement> = (e) => {
  console.log(e)
}

const myInput = document.querySelector('input') || document.createElement('input');
on(myInput, 'focus', handleMyFocus);
```

For more advanced use, check out the [demo](https://thednp.github.io/event-listener), showcasing the **EventListener** usage with a demo component.

## Run the tests suite

- [Download](https://github.com/thednp/event-listener/archive/refs/heads/master.zip) the package from Github;
- unpack/unzip and open the folder with your editor;
- open your terminal and navigate to the root of the unpacked folder;
- run `npm install` or `npm update`, takes a few minutes to download the Electron browser;
- run `npm run test-ui` to open the browser mode testing OR `npm run test` to run the tests in headless mode.

## License

**EventListener** is released under the [MIT License](https://github.com/thednp/event-listener/blob/main/LICENSE).
