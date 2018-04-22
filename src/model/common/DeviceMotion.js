const SHAKE_THRESHOLD = 8000;
let lastUpdate = 0;
let x;
let y;
let z;
let lastX = 0;
let lastY = 0;
let lastZ = 0;
let motionCallback;

export default class DeviceMotion {
  constructor (callback) {
    motionCallback = callback;
  }
  deviceMotionHandler (eventData) {
    let acceleration = eventData.accelerationIncludingGravity;
    let curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 10) {
      let diffTime = curTime - lastUpdate;
      lastUpdate = curTime;
      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;
      let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
      if (speed > SHAKE_THRESHOLD) {
        motionCallback && motionCallback();
      }
      lastX = x;
      lastY = y;
      lastZ = z;
    }
  }
  register () {
    // 运动事件监听
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.deviceMotionHandler, false);
    }
  }
  cancel () {
    if (window.DeviceMotionEvent) {
      window.removeEventListener('devicemotion', this.deviceMotionHandler);
    }
  }
}
