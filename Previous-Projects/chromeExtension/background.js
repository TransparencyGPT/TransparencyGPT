chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Text from page:", request.text);
  // You can process the text here
});
