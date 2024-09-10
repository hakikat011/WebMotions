
# WebMotions Gesture Extension

WebMotions is a Chrome extension that allows users to control 3D objects on webpages using hand gestures. This innovative tool combines the power of TensorFlow.js for hand tracking and Three.js for 3D rendering to create an interactive and immersive web experience.

## Features

- Real-time hand gesture recognition
- Control 3D objects on web pages
- Seamless integration with existing web content
- Easy-to-use popup interface

## Installation

1. Clone this repository or download the ZIP file.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the WebMotions extension icon in your browser toolbar to open the popup interface.
2. Enable the extension on the desired webpage.
3. Use your hand gestures to interact with 3D objects on the page.

## Technologies Used

- TensorFlow.js
- Handpose model
- Three.js
- Chrome Extension API

## File Structure

- `manifest.json`: Extension configuration
- `background.js`: Background script for extension functionality
- `content_script.js`: Content script injected into web pages
- `popup/popup.html`: Popup interface HTML
- `assets/`: Directory containing extension icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
