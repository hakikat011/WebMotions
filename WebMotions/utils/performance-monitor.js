class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            gestureLatency: 0,
            memoryUsage: 0
        };
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
    }

    updateFPS() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        this.frameCount++;

        if (deltaTime >= 1000) {
            this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }

    measureGestureLatency(startTime) {
        this.metrics.gestureLatency = performance.now() - startTime;
    }

    getMetrics() {
        return this.metrics;
    }
}

export const performanceMonitor = new PerformanceMonitor(); 