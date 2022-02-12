const [btn] = document.getElementsByTagName('button');

EventListener.on(btn, 'click', function removeFirstComponent(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  console.log('"click" on removeFirstComponent should be propagationStopped')
  const instanceMap = [...compMap];
  if (compMap.size) instanceMap[0][1].dispose();

  btn.innerText = compMap.size ? (compMap.size + " Instances") : "No Instance";
  
  if (!compMap.size) {
    EventListener.off(btn, 'click', removeFirstComponent, false);
  }
}, false);

function initDemo() {
  [...document.querySelectorAll('div')].forEach(div => new DemoComponent(div));
}

if (document.body) initDemo();
else EventListener.on('DOMContentLoaded', initDemo, { once: true });
