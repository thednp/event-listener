/**
 * Advanced event listener based on subscribe / publish pattern.
 *
 * @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
 * @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
 * @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
 */
import { version } from "../package.json";

import {
  AnimationEvent,
  AnimationEventHandler,
  ChangeEvent,
  ChangeEventHandler,
  ClipboardEvent,
  ClipboardEventHandler,
  CompositionEvent,
  CompositionEventHandler,
  DragEvent,
  DragEventHandler,
  EventRegistryEntry,
  EventsRegistry,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  NativeEvent,
  NativeEventHandler,
  PointerEvent,
  PointerEventHandler,
  PossibleEventTarget,
  TouchEvent,
  TouchEventHandler,
  TransitionEvent,
  TransitionEventHandler,
  UIEvent,
  UIEventHandler,
  WheelEvent,
  WheelEventHandler,
} from "./types";

const registry: EventsRegistry = {};

/**
 * The global event listener. This function must be a Function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 */
const globalListener = (e: NativeEvent) => {
  const { type, currentTarget } = e;

  registry[type].forEach((listenersMap, element) => {
    /* istanbul ignore else @preserve */
    if (currentTarget === element) {
      listenersMap.forEach((options, listener) => {
        listener.apply(element, [e]);

        if (typeof options === "object" && options.once) {
          removeListener(element, type, listener, options);
        }
      });
    }
  });
};

/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 */
const addListener = <T = Element, L = EventListener>(
  element: T,
  eventType: string,
  listener: L,
  options?: AddEventListenerOptions,
): void => {
  // get element listeners first
  /* istanbul ignore else @preserve */
  if (!registry[eventType]) {
    registry[eventType] = new Map();
  }
  const oneEventMap = registry[eventType];

  /* istanbul ignore else @preserve */
  if (!oneEventMap.has(element as PossibleEventTarget)) {
    oneEventMap.set(element as PossibleEventTarget, new Map());
  }
  const oneElementMap = oneEventMap.get(
    element as PossibleEventTarget,
  ) as EventRegistryEntry<T, L>;

  // get listeners size
  const { size } = oneElementMap;

  // register listener with its options
  oneElementMap.set(listener, options);

  // add listener last
  /* istanbul ignore else @preserve */
  if (!size) {
    (element as PossibleEventTarget).addEventListener(
      eventType,
      globalListener as unknown as EventListener,
      options,
    );
  }
};

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 */
const removeListener = <T = Element, L = EventListener>(
  element: T,
  eventType: string,
  listener: L,
  options?: AddEventListenerOptions,
): void => {
  // get listener first
  const oneEventMap = registry[eventType];
  const oneElementMap = oneEventMap &&
    (oneEventMap.get(element as PossibleEventTarget) as EventRegistryEntry<T>);
  const savedOptions = oneElementMap &&
    oneElementMap.get(listener as NativeEventHandler<typeof element>);

  // also recover initial options
  const eventOptions = savedOptions !== undefined ? savedOptions : options;

  // unsubscribe second, remove from registry
  /* istanbul ignore else @preserve */
  if (
    oneElementMap &&
    oneElementMap.has(listener as NativeEventHandler<typeof element>)
  ) {
    oneElementMap.delete(listener as NativeEventHandler<typeof element>);
  }
  /* istanbul ignore else @preserve */
  if (oneEventMap && (!oneElementMap || !oneElementMap.size)) {
    oneEventMap.delete(element as PossibleEventTarget);
  }
  /* istanbul ignore else @preserve */
  if (!oneEventMap || !oneEventMap.size) delete registry[eventType];

  // remove listener last
  /* istanbul ignore else @preserve */
  if (!oneElementMap || !oneElementMap.size) {
    (element as PossibleEventTarget).removeEventListener(
      eventType,
      globalListener as unknown as EventListener,
      eventOptions,
    );
  }
};

// alias main methods
const on: typeof addListener = addListener;
const off: typeof removeListener = removeListener;

export {
  addListener,
  globalListener,
  off,
  on,
  registry,
  removeListener,
  version,
};
export type {
  AnimationEvent,
  AnimationEventHandler,
  ChangeEvent,
  ChangeEventHandler,
  ClipboardEvent,
  ClipboardEventHandler,
  CompositionEvent,
  CompositionEventHandler,
  DragEvent,
  DragEventHandler,
  EventRegistryEntry,
  EventsRegistry,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  NativeEvent,
  NativeEventHandler,
  PointerEvent,
  PointerEventHandler,
  PossibleEventTarget,
  TouchEvent,
  TouchEventHandler,
  TransitionEvent,
  TransitionEventHandler,
  UIEvent,
  UIEventHandler,
  WheelEvent,
  WheelEventHandler,
};
