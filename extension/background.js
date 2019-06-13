'use strict';

{
  console.log('Extension started.');
  chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({ url: './pages/perm-stretcher/index.html' }));
}
