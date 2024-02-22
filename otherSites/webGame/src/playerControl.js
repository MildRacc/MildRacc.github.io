"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var CANNON = require("cannon-es");
var debug_ts_1 = require("./debug.js");
//import playerAbilities from './abilities.ts'
var playerController = /** @class */ (function () {
    function playerController(camera, scene, world) {
        var _this = this;
        this.keys = {};
        this.camOffset = new CANNON.Vec3(0, 2, 0);
        this.camSetting = true;
        this.deltaRotationX = 0;
        this.deltaRotationY = 0;
        this.debug = new debug_ts_1.default();
        this.sensitivityMulti = 1;
        this.strafing = false;
        // Handle all keypresses
        this.handleKeyDown = function () {
            // I dont wanna have to type Math.abs() 3.5*10^10^10 times
            var x = _this.playerBody.velocity;
            var w = Math.abs(x.x);
            var y = Math.abs(x.y);
            var z = Math.abs(x.z);
            if (!_this.strafing && _this.playerSpeed <= 0.4) {
                _this.playerSpeed = 0.2 * _this.speedMulti;
            }
            if (_this.playerBody.velocity.x < 0.000001 && _this.playerBody.velocity.y < 0.000001 && _this.playerBody.velocity.z < 0.000001 && !_this.strafing) {
                _this.playerSpeed = 0.2 * _this.speedMulti;
            }
            if (_this.keys['ShiftLeft'] && !_this.strafing && _this.playerSpeed <= 0.4) { // Increase player speed
                _this.playerSpeed = 0.3 * _this.speedMulti;
            }
            if (_this.keys['Space'] && _this.jumpCooldown && _this.jumpReady || _this.keys['Space'] && _this.jumpCnt > 0 && _this.jumpReady) { // Make player jump
                _this.jumpCooldown = false;
                _this.jumpReady = false;
                _this.jumpCnt--;
                if (_this.playerBody.velocity.y < 0) {
                    _this.playerBody.velocity.y += 13.20 + Math.abs(_this.playerBody.velocity.y);
                }
                else {
                    _this.playerBody.velocity.y += 13;
                }
            }
            if (_this.keys['KeyD'] && _this.keys['ArrowRight'] && _this.playerSpeed >= 0.4 || _this.keys['KeyA'] && _this.keys['ArrowLeft'] && _this.playerSpeed >= 0.2) { // Increase speed whilst doing the CSGO thing, doesnt work very well
                _this.playerSpeed += 0.001 * _this.speedMulti;
                _this.strafing = true;
            }
            if (!(_this.keys['KeyD'] && _this.keys['ArrowRight']) && !(_this.keys['KeyA'] && _this.keys['ArrowLeft'])) { // Slow the player down when not CSGO thinging
                _this.strafing = false;
                _this.playerSpeed -= 0.001 * _this.speedMulti;
            }
            if (_this.keys['KeyW']) { // Fo Gorward
                var forward = new CANNON.Vec3(0, 0, -1 * _this.playerSpeed * _this.speedMulti);
                var quat = _this.playerBody.quaternion;
                quat.vmult(forward, forward);
                _this.playerBody.position.vadd(forward, _this.playerBody.position);
                if (w < 30 && y < 30 && z < 30) { // Conserve some of the players momentum in mid air
                    _this.playerBody.velocity.vsub(new CANNON.Vec3(-forward.x - _this.c_newVelocity(x.x / 2), 0, -forward.z - _this.c_newVelocity(x.z / 2)), x);
                }
            }
            if (_this.keys['KeyS']) {
                var backward = new CANNON.Vec3(0, 0, 1 * _this.playerSpeed * _this.speedMulti);
                var quat = _this.playerBody.quaternion;
                quat.vmult(backward, backward);
                _this.playerBody.position.vadd(backward, _this.playerBody.position);
                if (w < 50 && y < 50 && z < 50) { // Conserve some of the players momentum in mid air
                    _this.playerBody.velocity.vsub(new CANNON.Vec3(-backward.x - _this.c_newVelocity(x.x / 2), 0, -backward.z - _this.c_newVelocity(x.z / 2)), x);
                }
            }
            if (_this.keys['KeyA']) {
                var left = new CANNON.Vec3(-1 * _this.playerSpeed * _this.speedMulti, 0, 0);
                var quat = _this.playerBody.quaternion;
                quat.vmult(left, left);
                _this.playerBody.position.vadd(left, _this.playerBody.position);
                if (w < 50 && y < 50 && z < 50) { // Conserve some of the players momentum in mid air
                    _this.playerBody.velocity.vsub(new CANNON.Vec3(-left.x - _this.c_newVelocity(x.x / 2), 0, -left.z - _this.c_newVelocity(x.z / 2)), x);
                }
            }
            if (_this.keys['KeyD']) {
                var right = new CANNON.Vec3(1 * _this.playerSpeed * _this.speedMulti, 0, 0);
                var quat = _this.playerBody.quaternion;
                quat.vmult(right, right);
                _this.playerBody.position.vadd(right, _this.playerBody.position);
                if (w < 50 && y < 50 && z < 50) { // Conserve some of the players momentum in mid air
                    _this.playerBody.velocity.vsub(new CANNON.Vec3(-right.x - _this.c_newVelocity(x.x / 2), 0, -right.z - _this.c_newVelocity(x.z / 2)), x);
                }
            }
            if (_this.keys['ArrowLeft']) { // Look left at a constant rate
                var axis = new CANNON.Vec3(0, 1, 0);
                var angle = 0.075 * _this.sensitivityMulti;
                var quaternion = new CANNON.Quaternion();
                quaternion.setFromAxisAngle(axis, angle);
                _this.playerBody.quaternion = quaternion.mult(_this.playerBody.quaternion);
            }
            if (_this.keys['ArrowRight']) { // Look right at a constant rate
                var axis = new CANNON.Vec3(0, 1, 0);
                var angle = -0.075 * _this.sensitivityMulti;
                var quaternion = new CANNON.Quaternion();
                quaternion.setFromAxisAngle(axis, angle);
                _this.playerBody.quaternion = quaternion.mult(_this.playerBody.quaternion);
            }
        };
        this.jumpCooldown = false;
        this.jumpCnt = 2;
        this.jumpReady = true;
        this.playerSpeed = 0.2;
        this.speedMulti = 1;
        // Load the textures for the player model
        var textureLoader = new THREE.TextureLoader();
        var playerTexture = textureLoader.load("assets/texture_05.png");
        this.playerMesh = new THREE.Mesh(new THREE.CapsuleGeometry(1, 4), new THREE.MeshBasicMaterial({ map: playerTexture }));
        this.playerBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(1, 3, 1)),
            mass: 10,
            fixedRotation: true,
            position: new CANNON.Vec3(0, 3, 0),
            collisionFilterGroup: 1
        });
        // Reset jumps on collision
        this.playerBody.addEventListener('collide', function (event) {
            if (event.body) {
                _this.jumpCooldown = true;
                _this.jumpCnt = 2;
            }
        });
        this.camera = camera;
        this.camera.position.set(this.playerBody.position.x, this.playerBody.position.x + 5, this.playerBody.position.z);
        var perspectiveKey = false;
        this.scene = scene;
        this.world = world;
        this.playerMesh.position.copy(new THREE.Vector3(this.playerBody.position.x, this.playerBody.position.y, this.playerBody.position.z));
        //this.abilities = new playerAbilities(camera, scene, world, this.playerBody, this.playerMesh)
        scene.add(this.playerMesh);
        world.addBody(this.playerBody);
        // Event listenors for keypresss
        document.addEventListener('keydown', function (event) { return _this.keys[event.code] = true; });
        document.addEventListener('keyup', function (event) { return _this.keys[event.code] = false; });
        var canvas = document.getElementById('gameCanvas'); // Lock cursor on left click
        document.addEventListener('click', function (event) {
            if (event) {
                canvas === null || canvas === void 0 ? void 0 : canvas.requestPointerLock();
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.code === 'ControlLeft') {
                perspectiveKey = true;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.code == 'Space') {
                _this.jumpReady = true;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.code === 'ControlLeft' && perspectiveKey) {
                if (_this.camSetting) {
                    _this.camOffset = new CANNON.Vec3(2, 3.2, 7);
                    _this.camSetting = false;
                }
                else {
                    _this.camOffset = new CANNON.Vec3(0, 1.75, 0);
                    _this.camSetting = true;
                }
            }
            perspectiveKey = false;
        });
        document.addEventListener('mousemove', function (event) {
            if (event) {
                var sensitivity = 0.007 * _this.sensitivityMulti;
                _this.deltaRotationX = event.movementX * sensitivity;
                var deltaRotationY = event.movementY * sensitivity;
                _this.deltaRotationY = deltaRotationY;
                var axisX = new CANNON.Vec3(0, -1, 0);
                var quaternionX = new CANNON.Quaternion();
                quaternionX.setFromAxisAngle(axisX, _this.deltaRotationX);
                // const axisY = new THREE.Vector3(1, 0, 0)
                // const quaternionY = new THREE.Quaternion()
                // quaternionY.setFromAxisAngle(axisY, deltaRotationY)
                _this.playerBody.quaternion = quaternionX.mult(_this.playerBody.quaternion);
                // this.deltaRotationY = this.quatToEuler(quaternionY.multiply(this.camera.quaternion.clone())).x
                console.log(deltaRotationY);
            }
        });
    }
    /**
     * Updates the player
     */
    playerController.prototype.updatePlayer = function () {
        this.handleKeyDown();
        // Update the player's visual representation to match the physics body's position
        this.playerMesh.position.copy(new THREE.Vector3(this.playerBody.position.x, this.playerBody.position.y, this.playerBody.position.z));
        this.playerMesh.quaternion.copy(new THREE.Quaternion(this.playerBody.quaternion.x, this.playerBody.quaternion.y, this.playerBody.quaternion.z, this.playerBody.quaternion.w));
        // Update camera position and orientation to follow the player
        var playerPos = this.playerBody.position;
        var playerQuaternion = this.playerBody.quaternion;
        // Update camera position relative to the player (adjust values as needed)
        var offsetRotated = new CANNON.Vec3(); // Initialize rotated offset
        playerQuaternion.vmult(this.camOffset, offsetRotated); // Rotate the offset by player's quaternion
        var cameraPosition = playerPos.vadd(offsetRotated); // Set the camera position relative to the player
        // Calculate a target position in the direction the player is facing
        var forwardOffset = new CANNON.Vec3(0, 0, -1); // Forward direction of the player
        playerQuaternion.vmult(forwardOffset, forwardOffset); // Rotate the forward direction
        var targetPosition = cameraPosition.vadd(forwardOffset); // Calculate the target position
        // Set the camera's position and make it look at the target position
        this.camera.position.copy(new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z));
        this.camera.lookAt(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z));
    };
    Object.defineProperty(playerController.prototype, "debugKey", {
        get: function () {
            return this.debug.debugVal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(playerController.prototype, "velocity", {
        get: function () {
            return this.playerBody.velocity;
        },
        enumerable: false,
        configurable: true
    });
    //get newTimeStep(){
    //return this.abilities.timeStep
    //}
    playerController.prototype.c_newVelocity = function (x) {
        if (x > 0) {
            return (Math.sqrt(Math.abs(x / 20)) + (0.00001 * x)) / 1000;
        }
        else {
            return -(Math.sqrt(Math.abs(x / 20)) + (0.00001 * x)) / 1000;
        }
    };
    /**
     * Convert a quaternion to an Euler rotation
     */
    playerController.prototype.quatToEuler = function (quaternion) {
        return new THREE.Euler().setFromQuaternion(quaternion); // This fucking sucks
    };
    return playerController;
}());
exports.default = playerController;
