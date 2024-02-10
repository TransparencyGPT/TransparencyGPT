// This function is triggered when the popup is opened
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"], // Ensure 'content.js' is properly set to extract and send the page text
    });
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getText") {
    document.getElementById("pageText").textContent = message.text;
  }
});
