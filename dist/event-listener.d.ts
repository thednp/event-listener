/**
 * Type definitions addapted from React 18.2
 * Project: https://react.dev/
 */
export type NativeAnimationEvent = AnimationEvent;
export type NativeClipboardEvent = ClipboardEvent;
export type NativeCompositionEvent = CompositionEvent;
export type NativeDragEvent = DragEvent;
export type NativeFocusEvent = FocusEvent;
export type NativeKeyboardEvent = KeyboardEvent;
export type NativeMouseEvent = MouseEvent;
export type NativeTouchEvent = TouchEvent;
export type NativePointerEvent = PointerEvent;
export type NativeTransitionEvent = TransitionEvent;
export type NativeUIEvent = UIEvent;
export type NativeWheelEvent = WheelEvent;
export interface AbstractView {
	styleMedia: StyleMedia;
	document: Document;
}
export interface BaseEvent<E = unknown, C = unknown, T = unknown> {
	nativeEvent: Event & E;
	currentTarget: C & EventTarget;
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
	type: string & NativeEventTypes;
}
/**
 * currentTarget - a reference to the element on which the event listener is registered.
 *
 * target - a reference to the element from which the event was originally dispatched.
 * This might be a child element to the element on which the event listener is registered.
 * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
 */
export type NativeEvent<T = PossibleEventTarget, E = Event> = BaseEvent<E, EventTarget & T, EventTarget>;
export interface ClipboardEvent<T = Element> extends NativeEvent<T, NativeClipboardEvent> {
	clipboardData?: DataTransfer;
}
export interface CompositionEvent<T = Element> extends NativeEvent<T, NativeCompositionEvent> {
	data: string;
}
export interface DragEvent<T = Element> extends MouseEvent<T, NativeDragEvent> {
	dataTransfer: DataTransfer;
}
export interface PointerEvent<T = Element> extends MouseEvent<T, NativePointerEvent> {
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
export interface FocusEvent<T = Element, R = Element> extends NativeEvent<T, NativeFocusEvent> {
	relatedTarget: (EventTarget & R) | null;
	target: EventTarget & T;
}
export type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type FormEvent<T = FormControl> = NativeEvent<T>;
export interface ChangeEvent<T = FormControl> extends FormEvent<T> {
	target: EventTarget & T;
}
export type ModifierKey = "Alt" | "AltGraph" | "CapsLock" | "Control" | "Fn" | "FnLock" | "Hyper" | "Meta" | "NumLock" | "ScrollLock" | "Shift" | "Super" | "Symbol" | "SymbolLock";
export interface KeyboardEvent<T = Element> extends UIEvent<T, NativeKeyboardEvent> {
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
export interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
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
export interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
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
export interface UIEvent<T = Element, E = NativeUIEvent> extends NativeEvent<T, E> {
	detail: number;
	view: AbstractView;
}
export interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
	deltaMode: number;
	deltaX: number;
	deltaY: number;
	deltaZ: number;
}
export interface AnimationEvent<T = Element> extends NativeEvent<T, NativeAnimationEvent> {
	animationName: string;
	elapsedTime: number;
	pseudoElement: string;
}
export interface TransitionEvent<T = Element> extends NativeEvent<T, NativeTransitionEvent> {
	elapsedTime: number;
	propertyName: string;
	pseudoElement: string;
}
export type EventHandler<E extends NativeEvent<unknown, unknown>> = (event: E) => void;
export type NativeEventHandler<T = Element> = EventHandler<NativeEvent<T>>;
export type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
export type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
export type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
export type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
export type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
export type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
export type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
export type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
export type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
export type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
export type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
export type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
export type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
export type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
export type SupportedEventObject<T> = NativeEvent<T> | ClipboardEvent<T> | CompositionEvent<T> | DragEvent<T> | FocusEvent<T> | FormEvent<T> | ChangeEvent<T> | KeyboardEvent<T> | MouseEvent<T> | TouchEvent<T> | PointerEvent<T> | UIEvent<T> | WheelEvent<T> | AnimationEvent<T> | TransitionEvent<T>;
export type SupportedEventHandler<T> = NativeEventHandler<T> | ClipboardEventHandler<T> | CompositionEventHandler<T> | DragEventHandler<T> | FocusEventHandler<T> | FormEventHandler<T> | ChangeEventHandler<T> | KeyboardEventHandler<T> | MouseEventHandler<T> | TouchEventHandler<T> | PointerEventHandler<T> | UIEventHandler<T> | WheelEventHandler<T> | AnimationEventHandler<T> | TransitionEventHandler<T>;
export type NativeEventTypes = "DOMContentLoaded" | "DOMMouseScroll" | "abort" | "beforeunload" | "blur" | "change" | "click" | "contextmenu" | "dblclick" | "error" | "focus" | "focusin" | "focusout" | "gesturechange" | "gestureend" | "gesturestart" | "hover" | "keydown" | "keypress" | "keyup" | "load" | "mousedown" | "mouseenter" | "mousein" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "mousewheel" | "move" | "orientationchange" | "pointercancel" | "pointerdown" | "pointerleave" | "pointermove" | "pointerup" | "readystatechange" | "reset" | "resize" | "scroll" | "select" | "selectend" | "selectstart" | "submit" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "unload";
export type PossibleEventTarget = EventTarget & (Element | Document | Window);
export type ListenerObject<T = PossibleEventTarget, H = SupportedEventHandler<T>> = Map<H, AddEventListenerOptions | undefined | boolean>;
export type EventsRegistry<T = PossibleEventTarget> = Record<string, Map<T, ListenerObject<T>>>;
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
export declare const addListener: <T extends PossibleEventTarget>(element: T, eventType: NativeEventTypes, listener: SupportedEventHandler<T>, options?: AddEventListenerOptions) => void;
/**
 * Remove a listener from registry and detach the `globalListener`
 * if no listeners are found in the registry.
 *
 */
export declare const removeListener: <T extends PossibleEventTarget>(element: T, eventType: NativeEventTypes, listener: SupportedEventHandler<PossibleEventTarget>, options?: AddEventListenerOptions) => void;
export declare const on: typeof addListener;
export declare const off: typeof removeListener;

export as namespace Listener;

export {};
