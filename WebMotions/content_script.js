(async function () {
    // Load TensorFlow.js and Handpose model
    const model = await handpose.load();

    // Setup webcam
    const videoElement = document.createElement('video');
    videoElement.width = 640;
    videoElement.height = 480;
    document.body.appendChild(videoElement);

    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch((err) => console.error("Error accessing webcam: ", err));

    // Gesture detection logic
    function detectGesture(landmarks) {
        const indexFingerTip = landmarks[8];
        const thumbTip = landmarks[4];

        const pinchDistance = distance(indexFingerTip, thumbTip);
        if (pinchDistance < 30) {
            return 'pinch';
        }

        const wrist = landmarks[0];
        if (indexFingerTip[0] < wrist[0] - 50) {
            return 'swipe-left';
        } else if (indexFingerTip[0] > wrist[0] + 50) {
            return 'swipe-right';
        }

        return null;
    }

    function distance(point1, point2) {
        return Math.sqrt(
            Math.pow(point2[0] - point1[0], 2) +
            Math.pow(point2[1] - point1[1], 2) +
            Math.pow(point2[2] - point1[2], 2)
        );
    }

    function visualizeGesture(landmarks, gesture) {
        const canvas = document.getElementById('gesture-canvas') || createGestureCanvas();
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw hand landmarks
        landmarks.forEach(point => {
            ctx.beginPath();
            ctx.arc(point[0], point[1], 3, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        });
        
        // Show gesture name
        if (gesture) {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'green';
            ctx.fillText(`Gesture: ${gesture}`, 10, 30);
        }
    }

    function createGestureCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'gesture-canvas';
        canvas.width = 640;
        canvas.height = 480;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.right = '0';
        canvas.style.zIndex = '9999';
        canvas.style.opacity = '0.7';
        document.body.appendChild(canvas);
        return canvas;
    }

    setInterval(async () => {
        const predictions = await model.estimateHands(videoElement);
        if (predictions.length > 0) {
            const landmarks = predictions[0].landmarks;
            const gesture = detectGesture(landmarks);
            visualizeGesture(landmarks, gesture);
            if (gesture) {
                handleGesture(gesture);
            }
        }
    }, 100);

    // Three.js integration
    let scene, camera, renderer, object;

    function initScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        object = new THREE.Mesh(geometry, material);
        scene.add(object);

        render();
    }

    function rotateObject(direction) {
        if (direction === 'left') {
            object.rotation.y -= 0.1;
        } else if (direction === 'right') {
            object.rotation.y += 0.1;
        }
        render();
    }

    function scaleObject(isPinching) {
        if (isPinching) {
            object.scale.set(object.scale.x * 1.1, object.scale.y * 1.1, object.scale.z * 1.1);
        } else {
            object.scale.set(object.scale.x * 0.9, object.scale.y * 0.9, object.scale.z * 0.9);
        }
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    initScene();
})();
