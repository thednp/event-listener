export type ListenerObject = Map<EventListener, AddEventListenerOptions | undefined | false>;

export type EventsRegistry = Record<string, Map<EventTarget, ListenerObject>>;
