// DOM elements
const toggleButton = document.getElementById('gesture-toggle');
const sensitivitySlider = document.getElementById('sensitivity-slider');
const sensitivityValue = document.getElementById('sensitivity-value');
const resetButton = document.getElementById('reset-btn');

// Retrieve and set initial state from storage
chrome.storage.sync.get(['gestureControl', 'sensitivity'], (data) => {
    const gestureControl = data.gestureControl !== undefined ? data.gestureControl : true;
    const sensitivity = data.sensitivity || 5;

    toggleButton.innerText = gestureControl ? 'ON' : 'OFF';
    toggleButton.classList.toggle('off', !gestureControl);
    sensitivitySlider.value = sensitivity;
    sensitivityValue.innerText = sensitivity;
});

// Toggle Gesture Control
toggleButton.addEventListener('click', () => {
    const isOn = toggleButton.innerText === 'ON';
    toggleButton.innerText = isOn ? 'OFF' : 'ON';
    toggleButton.classList.toggle('off', isOn);
    chrome.storage.sync.set({ gestureControl: !isOn });
});

// Update Gesture Sensitivity
sensitivitySlider.addEventListener('input', () => {
    const sensitivity = sensitivitySlider.value;
    sensitivityValue.innerText = sensitivity;
    chrome.storage.sync.set({ sensitivity });
});

// Reset to Default Settings
resetButton.addEventListener('click', () => {
    chrome.storage.sync.set({
        gestureControl: true,
        sensitivity: 5
    }, () => {
        toggleButton.innerText = 'ON';
        toggleButton.classList.remove('off');
        sensitivitySlider.value = 5;
        sensitivityValue.innerText = 5;
    });
});
