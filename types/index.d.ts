import { EventsRegistry } from './types';
declare const EventRegistry: EventsRegistry;
export { EventRegistry };
export declare function globalListener(e: Event): void;
export declare const addListener: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
export declare const removeListener: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
declare const _default: {
    on: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
    off: (element: EventTarget, eventType: string, listener: EventListener, options?: AddEventListenerOptions) => void;
    globalListener: typeof globalListener;
    registry: EventsRegistry;
};
export default _default;
//# sourceMappingURL=index.d.ts.map