type NativeAnimationEvent = AnimationEvent$1;
type NativeClipboardEvent = ClipboardEvent$1;
type NativeCompositionEvent = CompositionEvent$1;
type NativeDragEvent = DragEvent$1;
type NativeFocusEvent = FocusEvent$1;
type NativeKeyboardEvent = KeyboardEvent$1;
type NativeMouseEvent = MouseEvent$1;
type NativeTouchEvent = TouchEvent$1;
type NativePointerEvent = PointerEvent$1;
type NativeTransitionEvent = TransitionEvent$1;
type NativeUIEvent = UIEvent$1;
type NativeWheelEvent = WheelEvent$1;
interface AbstractView {
	styleMedia: StyleMedia;
	document: Document;
}
interface BaseEvent<E = Event, C = unknown, T = unknown> {
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
/**
 * currentTarget - a reference to the element on which the event listener is registered.
 *
 * target - a reference to the element from which the event was originally dispatched.
 * This might be a child element to the element on which the event listener is registered.
 * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
 */
export type NativeEvent<T = Element, E = Event> = BaseEvent<E, T, T>;
interface ClipboardEvent$1<T = Element> extends NativeEvent<T, NativeClipboardEvent> {
	clipboardData: DataTransfer;
}
interface CompositionEvent$1<T = Element> extends NativeEvent<T, NativeCompositionEvent> {
	data: string;
}
interface DragEvent$1<T = Element> extends MouseEvent$1<T, NativeDragEvent> {
	dataTransfer: DataTransfer;
}
interface PointerEvent$1<T = Element> extends MouseEvent$1<T, NativePointerEvent> {
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
interface FocusEvent$1<T = Element, R = Element> extends NativeEvent<T, NativeFocusEvent> {
	relatedTarget: (EventTarget & R) | null;
	target: EventTarget & T;
}
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type FormEvent<T = FormControl> = NativeEvent<T>;
export interface ChangeEvent<T = FormControl> extends FormEvent<T> {
	target: EventTarget & T;
}
type ModifierKey = "Alt" | "AltGraph" | "CapsLock" | "Control" | "Fn" | "FnLock" | "Hyper" | "Meta" | "NumLock" | "ScrollLock" | "Shift" | "Super" | "Symbol" | "SymbolLock";
interface KeyboardEvent$1<T = Element> extends UIEvent$1<T, NativeKeyboardEvent> {
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
interface MouseEvent$1<T = Element, E = NativeMouseEvent> extends UIEvent$1<T, E> {
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
interface TouchEvent$1<T = Element> extends UIEvent$1<T, NativeTouchEvent> {
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
interface UIEvent$1<T = Element, E = NativeUIEvent> extends NativeEvent<T, E> {
	detail: number;
	view: AbstractView;
}
interface WheelEvent$1<T = Element> extends MouseEvent$1<T, NativeWheelEvent> {
	deltaMode: number;
	deltaX: number;
	deltaY: number;
	deltaZ: number;
}
interface AnimationEvent$1<T = Element> extends NativeEvent<T, NativeAnimationEvent> {
	animationName: string;
	elapsedTime: number;
	pseudoElement: string;
}
interface TransitionEvent$1<T = Element> extends NativeEvent<T, NativeTransitionEvent> {
	elapsedTime: number;
	propertyName: string;
	pseudoElement: string;
}
type EventHandler<T = Element, E = Event | NativeEvent<T>> = (event: E) => void;
export type NativeEventHandler<T = Element> = EventHandler<T, NativeEvent<T>>;
export type ClipboardEventHandler<T = Element> = EventHandler<T, ClipboardEvent$1<T>>;
export type CompositionEventHandler<T = Element> = EventHandler<T, CompositionEvent$1<T>>;
export type DragEventHandler<T = Element> = EventHandler<T, DragEvent$1<T>>;
export type FocusEventHandler<T = Element> = EventHandler<T, FocusEvent$1<T>>;
export type FormEventHandler<T = Element> = EventHandler<T, FormEvent<T>>;
export type ChangeEventHandler<T = Element> = EventHandler<T, ChangeEvent<T>>;
export type KeyboardEventHandler<T = Element> = EventHandler<T, KeyboardEvent$1<T>>;
export type MouseEventHandler<T = Element> = EventHandler<T, MouseEvent$1<T>>;
export type TouchEventHandler<T = Element> = EventHandler<T, TouchEvent$1<T>>;
export type PointerEventHandler<T = Element> = EventHandler<T, PointerEvent$1<T>>;
export type UIEventHandler<T = Element> = EventHandler<T, UIEvent$1<T>>;
export type WheelEventHandler<T = Element> = EventHandler<T, WheelEvent$1<T>>;
export type AnimationEventHandler<T = Element> = EventHandler<T, AnimationEvent$1<T>>;
export type TransitionEventHandler<T = Element> = EventHandler<T, TransitionEvent$1<T>>;
export type PossibleEventTarget = EventTarget & (Element | Document | Window);
export type EventRegistryEntry<T = EventTarget, H = NativeEventHandler<T>> = Map<H, AddEventListenerOptions | undefined | boolean>;
export type EventsRegistry = Record<string, Map<PossibleEventTarget, EventRegistryEntry<PossibleEventTarget>>>;
export declare const registry: EventsRegistry;
/**
 * The global event listener. This function must be a Function.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
 * eslint-ignore-next
 */
export declare const globalListener: (e: NativeEvent) => void;
/**
 * Register a new listener with its options and attach the `globalListener`
 * to the target if this is the first listener.
 */
export declare const addListener: <T = Element, L = EventListener>(element: T, eventType: string, listener: L, options?: AddEventListenerOptions) => void;
/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 */
export declare const removeListener: <T = Element, L = EventListener>(element: T, eventType: string, listener: L, options?: AddEventListenerOptions) => void;
export declare const on: typeof addListener;
export declare const off: typeof removeListener;

export {
	AnimationEvent$1 as AnimationEvent,
	ClipboardEvent$1 as ClipboardEvent,
	CompositionEvent$1 as CompositionEvent,
	DragEvent$1 as DragEvent,
	FocusEvent$1 as FocusEvent,
	KeyboardEvent$1 as KeyboardEvent,
	MouseEvent$1 as MouseEvent,
	PointerEvent$1 as PointerEvent,
	TouchEvent$1 as TouchEvent,
	TransitionEvent$1 as TransitionEvent,
	UIEvent$1 as UIEvent,
	WheelEvent$1 as WheelEvent,
};

export as namespace Listener;

export {};
