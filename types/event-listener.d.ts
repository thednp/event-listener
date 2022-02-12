declare module "event-listener.js/src/event-listener" {
    /**
     * The global event listener.
     *
     * @this {Element | HTMLElement | Window | Document}
     * @param {Event} e
     * @returns {void}
     */
    export function globalListener(e: Event): void;
    export function addListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options?: AddEventListenerOptions | undefined): void;
    export function removeListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options?: AddEventListenerOptions | undefined): void;
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
declare module "event-listener.js/types/more/listener" {
    export { default as EventListener, EventRegistry, globalListener, addListener, removeListener } from "event-listener.js/src/event-listener";
}
