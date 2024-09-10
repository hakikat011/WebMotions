chrome.runtime.onInstalled.addListener(() => {
    console.log("WebMotions extension installed.");

    // Set default settings if not already set
    chrome.storage.sync.get(['gestureControl', 'sensitivity'], (data) => {
        if (data.gestureControl === undefined) {
            chrome.storage.sync.set({ gestureControl: true });
        }
        if (data.sensitivity === undefined) {
            chrome.storage.sync.set({ sensitivity: 5 });
        }
    });
});
