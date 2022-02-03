export as namespace EventListener;
export default EventListener;

import './event-listener';
import EventListener from 'event-listener.js/src/event-listener';

export { default as EventRegistry } from "event-listener.js/src/registry";
export { default as globalListener, addListener, removeListener } from "event-listener.js/src/globalListener";
export { default as EventListener } from "event-listener.js/src/event-listener";
