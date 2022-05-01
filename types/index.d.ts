export as namespace Listener;
export default EventListener;

import './event-listener';

declare module "@thednp/event-listener" {
  export default EventListener;
}

export type ListenerAction<T> = (
  element: T,
  eventType: string,
  listener: EventListenerObject['handleEvent'],
  options?: AddEventListenerOptions
  ) => void;
  
import {default as EventListener} from 'event-listener/src/event-listener';
export { EventRegistry, globalListener, addListener, removeListener } from "event-listener/src/event-listener";
