// DOM elements
const toggleButton = document.getElementById('gesture-toggle');
const sensitivitySlider = document.getElementById('sensitivity-slider');
const sensitivityValue = document.getElementById('sensitivity-value');
const resetButton = document.getElementById('reset-btn');
const presetSelect = document.getElementById('preset-select');
const themeToggle = document.getElementById('theme-toggle');
const fpsValue = document.getElementById('fps-value');
const latencyValue = document.getElementById('latency-value');

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
        sensitivity: 5,
        currentPreset: 'default',
        theme: 'light'
    }, () => {
        toggleButton.innerText = 'ON';
        toggleButton.classList.remove('off');
        sensitivitySlider.value = 5;
        sensitivityValue.innerText = 5;
        presetSelect.value = 'default';
        document.querySelector('.container').setAttribute('data-theme', 'light');
    });
});

// Add theme toggle functionality
themeToggle.addEventListener('click', () => {
    const container = document.querySelector('.container');
    const currentTheme = container.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    container.setAttribute('data-theme', newTheme);
    chrome.storage.sync.set({ theme: newTheme });
});

// Load theme preference
chrome.storage.sync.get(['theme'], (data) => {
    if (data.theme) {
        document.querySelector('.container').setAttribute('data-theme', data.theme);
    }
});

// Handle preset selection
presetSelect.addEventListener('change', () => {
    const selectedPreset = presetSelect.value;
    chrome.storage.sync.get(['gesturePresets'], (data) => {
        const preset = data.gesturePresets[selectedPreset];
        chrome.storage.sync.set({ currentPreset: selectedPreset, ...preset });
    });
});

// Update performance metrics
function updatePerformanceMetrics() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_METRICS' }, (response) => {
            if (response) {
                fpsValue.textContent = response.fps;
                latencyValue.textContent = response.gestureLatency.toFixed(2);
            }
        });
    });
}

// Update metrics every second
setInterval(updatePerformanceMetrics, 1000);
