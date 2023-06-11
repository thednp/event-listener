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
  handleResize({ type }) {
    this.element.innerText =
      this.constructor.name +
      ' div#' +
      this.id +
      ',\ntriggered: "' +
      type +
      '",\nwindow.innerWidth:' +
      window.innerWidth;
  }
  /** @param {Event} e */
  handleClick(e) {
    const { target, type, pageX, pageY } = e;
    if (target && target.closest('button') !== null) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    console.log(
      '"click" on `handleClick` should be `propagationStopped` if the target is a button, otherwise is only executes once and removes itself',
    );

    this.element.innerText =
      this.constructor.name +
      ' div#' +
      this.id +
      ',\ntriggered: "' +
      type +
      '",\npageX: ' +
      pageX +
      ', pageY: ' +
      pageY;
  }
  handleScroll({ type }) {
    this.element.innerText =
      this.constructor.name + ' div#' + this.id + ',\ntriggered: "' + type + '",\nscrollY: ' + window.scrollY;
  }
  _addListeners() {
    Listener.on(document, 'click', this.handleClick, { once: true });
    Listener.on(window, 'resize', this.handleResize, { passive: true });
    Listener.on(window, 'scroll', this.handleScroll, { passive: true });
  }
  _removeListeners() {
    Listener.off(document, 'click', this.handleClick);
    Listener.off(window, 'resize', this.handleResize);
    Listener.off(window, 'scroll', this.handleScroll);
  }
  dispose() {
    this._removeListeners();
    compMap.delete(this.element);
  }
}
