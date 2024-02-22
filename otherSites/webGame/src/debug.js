"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debugMode = /** @class */ (function () {
    function debugMode() {
        var _this = this;
        this.debugMode = false;
        document.addEventListener('keyup', function (event) {
            console.log("E");
            if (event.code == 'KeyE') {
                if (!_this.debugMode) {
                    console.log("E2");
                    _this.debugMode = true;
                }
                else {
                    console.log("E3");
                    _this.debugMode = false;
                }
            }
        });
    }
    Object.defineProperty(debugMode.prototype, "debugVal", {
        get: function () {
            return this.debugMode;
        },
        enumerable: false,
        configurable: true
    });
    return debugMode;
}());
exports.default = debugMode;
