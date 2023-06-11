const [btn] = document.getElementsByTagName('button');

Listener.on(
  btn,
  'click',
  function removeFirstComponent(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log('"click" on removeFirstComponent should be propagationStopped');
    const instanceMap = [...compMap];
    if (compMap.size) instanceMap[0][1].dispose();

    btn.innerText = compMap.size ? compMap.size + ' Instances' : 'No Instance';

    if (!compMap.size) {
      Listener.off(btn, 'click', removeFirstComponent, false);
    }
  },
  false,
);

function initDemo() {
  [...document.querySelectorAll('div')].forEach(div => new DemoComponent(div));
}

if (document.body) initDemo();
else Listener.on('DOMContentLoaded', initDemo, { once: true });
