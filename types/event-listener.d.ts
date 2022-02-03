declare module "event-listener.js/src/registry" {
    export default EventRegistry;
    /** @type {Record<string, any>} */
    const EventRegistry: Record<string, any>;
}
declare module "event-listener.js/src/globalListener" {
    /**
     * The global event listener.
     *
     * @this {Element | HTMLElement | Window | Document}
     * @param {Event} e
     * @returns {void}
     */
    export default function globalListener(e: Event): void;
    export function addListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options?: AddEventListenerOptions | undefined): void;
    export function removeListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options?: AddEventListenerOptions | undefined): void;
}
declare module "event-listener.js/src/event-listener" {
    export default EventListener;
    namespace EventListener {
        export { addListener as on };
        export { removeListener as off };
        export { globalListener };
        export { EventRegistry as registry };
    }
    import { addListener } from "event-listener.js/src/globalListener";
    import { removeListener } from "event-listener.js/src/globalListener";
    import globalListener from "event-listener.js/src/globalListener";
    import EventRegistry from "event-listener.js/src/registry";
}
declare module "event-listener.js/types/more/listener" {
    export { default as EventRegistry } from "event-listener.js/src/registry";
    export { default as globalListener, addListener, removeListener } from "event-listener.js/src/globalListener";
    export { default as EventListener } from "event-listener.js/src/event-listener";
}
