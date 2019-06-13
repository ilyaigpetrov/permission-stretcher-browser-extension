import { optional } from '../../permissions.mjs';

(async () => {

  toBeRequested.innerHTML = (await Promise.all(optional.map((perm) =>
    new Promise((resolve) =>
      chrome.permissions.contains({
        permissions: [perm],
      }, (ifGranted) =>
        resolve(`
<li style="white-space: nowrap">
  <button>test</button><input type="checkbox" ${ifGranted ? 'checked' : ''} data-perm="${perm}" id="perm-${perm}"><label for="perm-${perm}">${perm}</label>
</li>`
      )),
    ),

))).join('\n');

  toBeRequested.onchange = (event) => {

    const input = event.target;
    if(input.tagName !== 'INPUT') {
      return;
    }
    const perm = input.dataset.perm;
    chrome.permissions[input.checked ? 'request' : 'remove']({
      permissions: [perm],
    }, function(granted) {
      if (!granted) {
        input.checked = !input.checked;
        const err = chrome.runtime.lastError;
        const msg = err && err.msg;
        alert(`Change denied. Reason: ${msg || 'unknown'}.`);
      }
    });
  };

  toBeRequested.onclick = (event) => {

    const button = event.target;
    if(button.tagName !== 'BUTTON') {
      return;
    }
    console.log(chrome.tabs.executeScript({ code: 'alert("INJECTED!")' }));
  };

})();

