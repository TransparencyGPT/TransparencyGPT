chrome.runtime.sendMessage({
  action: "getText",
  text: document.body.innerText,
});
