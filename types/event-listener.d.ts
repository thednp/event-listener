declare module "event-listener/src/event-listener" {
    /**
     * The global event listener.
     *
     * @type {EventListener}
     * @this {EventTarget}
     */
    export function globalListener(this: EventTarget, e: Event): void;
    /**
     * Register a new listener with its options and attach the `globalListener`
     * to the target if this is the first listener.
     *
     * @type {Listener.ListenerAction<EventTarget>}
     */
    export const addListener: Listener.ListenerAction<EventTarget>;
    /**
     * Remove a listener from registry and detach the `globalListener`
     * if no listeners are found in the registry.
     *
     * @type {Listener.ListenerAction<EventTarget>}
     */
    export const removeListener: Listener.ListenerAction<EventTarget>;
    export default Listener;
    /** @type {Record<string, any>} */
    export const EventRegistry: Record<string, any>;
    /**
     * Advanced event listener based on subscribe / publish pattern.
     * @see https://www.patterns.dev/posts/classic-design-patterns/#observerpatternjavascript
     * @see https://gist.github.com/shystruk/d16c0ee7ac7d194da9644e5d740c8338#file-subpub-js
     * @see https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
     * @type {Listener}
     */
    const Listener: any;
}
declare module "event-listener/types/more/listener" {
    export { default as EventListener, EventRegistry, globalListener, addListener, removeListener } from "event-listener/src/event-listener";
}
