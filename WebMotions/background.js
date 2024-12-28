chrome.runtime.onInstalled.addListener(() => {
    console.log("WebMotions extension installed.");

    // Set default settings if not already set
    chrome.storage.sync.get(['gestureControl', 'sensitivity', 'gesturePresets'], (data) => {
        if (data.gestureControl === undefined) {
            chrome.storage.sync.set({ gestureControl: true });
        }
        if (data.sensitivity === undefined) {
            chrome.storage.sync.set({ sensitivity: 5 });
        }
        if (data.gesturePresets === undefined) {
            chrome.storage.sync.set({
                gesturePresets: {
                    default: {
                        pinchThreshold: 30,
                        swipeThreshold: 50,
                        rotationSpeed: 0.1
                    },
                    precise: {
                        pinchThreshold: 20,
                        swipeThreshold: 40,
                        rotationSpeed: 0.05
                    },
                    fast: {
                        pinchThreshold: 40,
                        swipeThreshold: 60,
                        rotationSpeed: 0.2
                    }
                }
            });
        }
    });
});
