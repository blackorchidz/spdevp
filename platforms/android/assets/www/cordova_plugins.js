cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
        "id": "com.phonegap.plugins.barcodescanner.BarcodeScanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
        "id": "org.apache.cordova.camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
        "id": "org.apache.cordova.camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/Camera.js",
        "id": "org.apache.cordova.camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
        "id": "org.apache.cordova.camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.ionic.keyboard": "1.0.3",
    "org.apache.cordova.console": "0.2.12",
    "org.apache.cordova.device": "0.2.13",
    "com.phonegap.plugins.barcodescanner": "2.0.1",
    "org.apache.cordova.inappbrowser": "0.5.5-dev",
    "org.apache.cordova.camera": "0.3.4",
    "org.apache.cordova.geolocation": "0.3.11",
    "nl.x-services.plugins.toast": "2.0.3",
    "org.apache.cordova.splashscreen": "0.3.5"
}
// BOTTOM OF METADATA
});