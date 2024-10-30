import { version } from '../package.json';

declare interface AbstractView {
    styleMedia: StyleMedia;
    document: Document;
}

/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 */
export declare const addListener: <T = Element, L = EventListener>(element: T, eventType: string, listener: L, options?: AddEventListenerOptions) => void;

declare interface AnimationEvent_2<T = Element> extends NativeEvent<T, NativeAnimationEvent> {
    animationName: string;
    elapsedTime: number;
    pseudoElement: string;
}
export { AnimationEvent_2 as AnimationEvent }

export declare type AnimationEventHandler<T = Element> = EventHandler<T, AnimationEvent_2<T>>;

declare interface BaseEvent<E = Event, C = unknown, T = unknown> {
    nativeEvent: E;
    currentTarget: C | null;
    target: T & EventTarget;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
}

export declare interface ChangeEvent<T = FormControl> extends FormEvent<T> {
    target: EventTarget & T;
}

export declare type ChangeEventHandler<T = Element> = EventHandler<T, ChangeEvent<T>>;

declare interface ClipboardEvent_2<T = Element> extends NativeEvent<T, NativeClipboardEvent> {
    clipboardData: DataTransfer;
}
export { ClipboardEvent_2 as ClipboardEvent }

export declare type ClipboardEventHandler<T = Element> = EventHandler<T, ClipboardEvent_2<T>>;

declare interface CompositionEvent_2<T = Element> extends NativeEvent<T, NativeCompositionEvent> {
    data: string;
}
export { CompositionEvent_2 as CompositionEvent }

export declare type CompositionEventHandler<T = Element> = EventHandler<T, CompositionEvent_2<T>>;

declare interface DragEvent_2<T = Element> extends MouseEvent_2<T, NativeDragEvent> {
    dataTransfer: DataTransfer;
}
export { DragEvent_2 as DragEvent }

export declare type DragEventHandler<T = Element> = EventHandler<T, DragEvent_2<T>>;

declare type EventHandler<T = Element, E = Event | NativeEvent<T>> = (event: E) => void;

export declare type EventRegistryEntry<T = EventTarget, H = NativeEventHandler<T>> = Map<H, AddEventListenerOptions | undefined | boolean>;

export declare type EventsRegistry = Record<string, Map<PossibleEventTarget, EventRegistryEntry<PossibleEventTarget>>>;

declare interface FocusEvent_2<T = Element, R = Element> extends NativeEvent<T, NativeFocusEvent> {
    relatedTarget: (EventTarget & R) | null;
    target: EventTarget & T;
}
export { FocusEvent_2 as FocusEvent }

export declare type FocusEventHandler<T = Element> = EventHandler<T, FocusEvent_2<T>>;

declare type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export declare type FormEvent<T = FormControl> = NativeEvent<T>;

export declare type FormEventHandler<T = Element> = EventHandler<T, FormEvent<T>>;

/**
 * The global event listener. This function must be a Function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 */
export declare const globalListener: (e: NativeEvent) => void;

declare interface KeyboardEvent_2<T = Element> extends UIEvent_2<T, NativeKeyboardEvent> {
    altKey: boolean;
    /** @deprecated */
    charCode: number;
    ctrlKey: boolean;
    code: string;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: ModifierKey): boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
     */
    key: string;
    /** @deprecated */
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    /** @deprecated */
    which: number;
}
export { KeyboardEvent_2 as KeyboardEvent }

export declare type KeyboardEventHandler<T = Element> = EventHandler<T, KeyboardEvent_2<T>>;

declare type ModifierKey = "Alt" | "AltGraph" | "CapsLock" | "Control" | "Fn" | "FnLock" | "Hyper" | "Meta" | "NumLock" | "ScrollLock" | "Shift" | "Super" | "Symbol" | "SymbolLock";

declare interface MouseEvent_2<T = Element, E = NativeMouseEvent> extends UIEvent_2<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: ModifierKey): boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget | null;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
}
export { MouseEvent_2 as MouseEvent }

export declare type MouseEventHandler<T = Element> = EventHandler<T, MouseEvent_2<T>>;

/**
 * Type definitions addapted from React 18.2
 * Project: https://react.dev/
 */
declare type NativeAnimationEvent = AnimationEvent_2;

declare type NativeClipboardEvent = ClipboardEvent_2;

declare type NativeCompositionEvent = CompositionEvent_2;

declare type NativeDragEvent = DragEvent_2;

/**
 * currentTarget - a reference to the element on which the event listener is registered.
 *
 * target - a reference to the element from which the event was originally dispatched.
 * This might be a child element to the element on which the event listener is registered.
 * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
 */
export declare type NativeEvent<T = Element, E = Event> = BaseEvent<E, T, T>;

export declare type NativeEventHandler<T = Element> = EventHandler<T, NativeEvent<T>>;

declare type NativeFocusEvent = FocusEvent_2;

declare type NativeKeyboardEvent = KeyboardEvent_2;

declare type NativeMouseEvent = MouseEvent_2;

declare type NativePointerEvent = PointerEvent_2;

declare type NativeTouchEvent = TouchEvent_2;

declare type NativeTransitionEvent = TransitionEvent_2;

declare type NativeUIEvent = UIEvent_2;

declare type NativeWheelEvent = WheelEvent_2;

export declare const off: typeof removeListener;

export declare const on: typeof addListener;

declare interface PointerEvent_2<T = Element> extends MouseEvent_2<T, NativePointerEvent> {
    pointerId: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    width: number;
    height: number;
    pointerType: "mouse" | "pen" | "touch";
    isPrimary: boolean;
}
export { PointerEvent_2 as PointerEvent }

export declare type PointerEventHandler<T = Element> = EventHandler<T, PointerEvent_2<T>>;

export declare type PossibleEventTarget = EventTarget & (Element | Document | Window);

export declare const registry: EventsRegistry;

/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 */
export declare const removeListener: <T = Element, L = EventListener>(element: T, eventType: string, listener: L, options?: AddEventListenerOptions) => void;

declare interface TouchEvent_2<T = Element> extends UIEvent_2<T, NativeTouchEvent> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: ModifierKey): boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
}
export { TouchEvent_2 as TouchEvent }

export declare type TouchEventHandler<T = Element> = EventHandler<T, TouchEvent_2<T>>;

declare interface TransitionEvent_2<T = Element> extends NativeEvent<T, NativeTransitionEvent> {
    elapsedTime: number;
    propertyName: string;
    pseudoElement: string;
}
export { TransitionEvent_2 as TransitionEvent }

export declare type TransitionEventHandler<T = Element> = EventHandler<T, TransitionEvent_2<T>>;

declare interface UIEvent_2<T = Element, E = NativeUIEvent> extends NativeEvent<T, E> {
    detail: number;
    view: AbstractView;
}
export { UIEvent_2 as UIEvent }

export declare type UIEventHandler<T = Element> = EventHandler<T, UIEvent_2<T>>;

export { version }

declare interface WheelEvent_2<T = Element> extends MouseEvent_2<T, NativeWheelEvent> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}
export { WheelEvent_2 as WheelEvent }

export declare type WheelEventHandler<T = Element> = EventHandler<T, WheelEvent_2<T>>;

export { }
