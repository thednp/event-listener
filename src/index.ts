/**
 * Advanced event listener based on subscribe / publish pattern.
 *
 * @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
 * @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
 * @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
 */

import {
  SupportedEventObject,
  SupportedEventHandler,
  EventHandler,
  NativeEventTypes,
  NativeEvent,
  ClipboardEvent,
  CompositionEvent,
  DragEvent,
  FocusEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  PointerEvent,
  UIEvent,
  WheelEvent,
  AnimationEvent,
  TransitionEvent,
  NativeEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  DragEventHandler,
  FocusEventHandler,
  FormEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  PointerEventHandler,
  UIEventHandler,
  WheelEventHandler,
  AnimationEventHandler,
  TransitionEventHandler,
  PossibleEventTarget,
  ListenerObject,
  EventsRegistry,
} from './types';

const registry: EventsRegistry = {};

/**
 * The global event listener. This function must be a Function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 * eslint-ignore-next
 */
const globalListener = (e: NativeEvent) => {
  const { type, currentTarget } = e;

  [...registry[type]].forEach(([element, listenersMap]) => {
    /* istanbul ignore else */
    if (currentTarget === element) {
      [...listenersMap].forEach(([listener, options]) => {
        (listener as EventHandler<typeof e>).apply(element, [e]);

        if (typeof options === 'object' && options.once) {
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
const addListener = <T extends PossibleEventTarget>(
  element: T,
  eventType: NativeEventTypes,
  listener: SupportedEventHandler<T>,
  options?: AddEventListenerOptions,
): void => {
  // get element listeners first
  if (!registry[eventType]) {
    registry[eventType] = new Map();
  }
  const oneEventMap = registry[eventType] as unknown as Map<T, ListenerObject<T, SupportedEventHandler<T>>>;

  if (!oneEventMap.has(element)) {
    oneEventMap.set(element, new Map());
  }
  const oneElementMap = oneEventMap.get(element) as ListenerObject;

  // get listeners size
  const { size } = oneElementMap;

  // register listener with its options
  oneElementMap.set(listener as SupportedEventHandler<PossibleEventTarget>, options);

  // add listener last
  if (!size) {
    element.addEventListener(eventType, globalListener as unknown as EventListenerObject, options);
  }
};

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 */
const removeListener = <T extends PossibleEventTarget>(
  element: T,
  eventType: NativeEventTypes,
  listener: SupportedEventHandler<PossibleEventTarget>,
  options?: AddEventListenerOptions,
): void => {
  // get listener first
  const oneEventMap = registry[eventType];
  const oneElementMap = oneEventMap && oneEventMap.get(element);
  const savedOptions = oneElementMap && oneElementMap.get(listener);

  // also recover initial options
  const eventOptions = savedOptions !== undefined ? savedOptions : options;

  // unsubscribe second, remove from registry
  if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
  if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
  if (!oneEventMap || !oneEventMap.size) delete registry[eventType];

  // remove listener last
  /* istanbul ignore else */
  if (!oneElementMap || !oneElementMap.size) {
    element.removeEventListener(eventType, globalListener as unknown as EventListenerObject, eventOptions);
  }
};

// alias main methods
const on: typeof addListener = addListener;
const off: typeof removeListener = removeListener;

export { addListener, removeListener, on, off, globalListener, registry };
export type {
  SupportedEventObject,
  SupportedEventHandler,
  EventHandler,
  NativeEventTypes,
  NativeEvent,
  ClipboardEvent,
  CompositionEvent,
  DragEvent,
  FocusEvent,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  PointerEvent,
  UIEvent,
  WheelEvent,
  AnimationEvent,
  TransitionEvent,
  NativeEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  DragEventHandler,
  FocusEventHandler,
  FormEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  PointerEventHandler,
  UIEventHandler,
  WheelEventHandler,
  AnimationEventHandler,
  TransitionEventHandler,
  PossibleEventTarget,
  ListenerObject,
  EventsRegistry,
};
