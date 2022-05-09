export as namespace Listener;
export default Listener;

import './event-listener';

export type ListenerAction<T> = (
  element: T,
  eventType: string,
  listener: EventListenerObject['handleEvent'],
  options?: AddEventListenerOptions
  ) => void;
  
import { default as Listener } from 'event-listener/src/event-listener';
export { EventRegistry, globalListener, addListener, removeListener } from "event-listener/src/event-listener";

declare module "@thednp/event-listener" {
  export default Listener;
}
