export type ListenerObject = Map<
  EventListenerObject["handleEvent"],
  AddEventListenerOptions
>;
export type EventsRegistry = Record<string, Map<EventTarget, ListenerObject>>;
