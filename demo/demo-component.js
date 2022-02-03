const compMap = new Map();

class DemoComponent {
  constructor(target) {
    this.element = target;
    this.id = target.getAttribute('id');
    
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this._addListeners();
    compMap.set(this.element, this);
  }
  handleResize({ type }){
    this.element.innerText = this.constructor.name + ' div#' + this.id + ', triggered: "' + type+ '", new Window size:' + window.innerWidth;
  }
  /** @param {Event} e */
  handleClick(e){
    const { target, type, pageX } = e;
    if (target && target.closest('button') !== null ) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    console.log('"click" on `handleClick` should be `propagationStopped` if the target is a button, otherwise is only executes once and removes itself');

    this.element.innerText = this.constructor.name + ' div#' + this.id + ', triggered: "' + type + '", pageX: ' + pageX;
  }
  handleScroll({ type }){
    this.element.innerText = this.constructor.name + ' div#' + this.id + ', triggered: "' + type + '", scrollY: ' + window.scrollY;
  }
  _addListeners() {        
    EventListener.on(document, 'click', this.handleClick, { once: true });
    EventListener.on(window, 'resize', this.handleResize, { passive: true });
    EventListener.on(window, 'scroll', this.handleScroll, { passive: true });
  }
  _removeListeners() {
    EventListener.off(document, 'click', this.handleClick);
    EventListener.off(window, 'resize', this.handleResize);
    EventListener.off(window, 'scroll', this.handleScroll);
  }
  dispose() {
    this._removeListeners();
    compMap.delete(this.element);
  }
}