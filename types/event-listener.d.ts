declare module "event-listener.js/src/EventListener" {
    export default EventListener;
    namespace EventListener {
        export { addListener as on };
        export { removeListener as off };
        export { globalListener };
        export { EventRegistry as registry };
    }
    /**
     * Register a new listener with its options and attach the `globalListener`
     * to the target if this is the first listener.
     *
     * @param {Element | HTMLElement | Window | Document} element
     * @param {string} eventType
     * @param {EventListenerObject['handleEvent']} listener
     * @param {AddEventListenerOptions} options
     */
    function addListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options: AddEventListenerOptions): void;
    /**
     * Remove a listener from registry and detach the `globalListener`
     * if no listeners are found in the registry.
     *
     * @param {Element | HTMLElement | Window | Document} element
     * @param {string} eventType
     * @param {EventListenerObject['handleEvent']} listener
     * @param {AddEventListenerOptions} options
     */
    function removeListener(element: Element | HTMLElement | Window | Document, eventType: string, listener: EventListenerObject['handleEvent'], options: AddEventListenerOptions): void;
    /**
     * The global event listener.
     *
     * @this {Element | HTMLElement | Window | Document}
     * @param {Event} e
     * @returns {void}
     */
    function globalListener(e: Event): void;
    /** @type {Record<string, any>} */
    const EventRegistry: Record<string, any>;
}
declare module "event-listener.js/types/more/listener" {
    export { default as EventListener } from "event-listener.js/src/EventListener";
}
