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
    export default EventListener;
    /** @type {Record<string, any>} */
    export const EventRegistry: Record<string, any>;
    namespace EventListener {
        export { addListener as on };
        export { removeListener as off };
        export { globalListener };
        export { EventRegistry as registry };
    }
}
declare module "event-listener/types/more/listener" {
    export { default as EventListener, EventRegistry, globalListener, addListener, removeListener } from "event-listener/src/event-listener";
}
