"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var CANNON = require("cannon-es");
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
var maps_ts_1 = require("./maps.js");
// Preload textures
var textureLoader = new THREE.TextureLoader();
var floorGrid = textureLoader.load("assets/protoGridORNG.png");
floorGrid.wrapS = THREE.RepeatWrapping;
floorGrid.wrapT = THREE.RepeatWrapping;
floorGrid.repeat.set(36, 36);
var blockTexture = textureLoader.load("assets/texture_13.png");
var mapLoad = /** @class */ (function () {
    function mapLoad(objects, scene, world) {
        this.getMap = new maps_ts_1.default();
        this.objectID = objects;
        this.scene = scene;
        this.physicsWorld = world;
    }
    /**
     * Map initializer
     */
    mapLoad.prototype.mapinit = function (map) {
        if (map === void 0) { map = 0; }
        var newMap = this.getMap.getMap(map);
        try {
            for (var _i = 0, newMap_1 = newMap; _i < newMap_1.length; _i++) { // Gets all the data
                var entry = newMap_1[_i];
                var shape = entry.shape; // Convert shape value to lowercase for consistency
                var dimensions = entry.dim || [0, 0, 0];
                var radius = entry.rad || 0;
                var height = entry.high || 0;
                var rotations = entry.rot || [0, 0, 0];
                var position = entry.pos || [0, 0, 0];
                var mass = entry.mass || 0;
                var velocity = entry.velo || [0, 0, 0];
                var hoppable = entry.hop || false;
                switch (shape) { // Adds geometry
                    case 'BoxGeometry':
                        this.c_newBox(new CANNON.Vec3(dimensions[0], dimensions[1], dimensions[2]), new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]));
                        break;
                    case 'ConeGeometry':
                        this.c_newCone(height, radius, new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]), hoppable);
                        break;
                    case 'SphereGeometry':
                        this.c_newSphere(radius, new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]));
                        break;
                    case 'CylinderGeometry':
                        this.c_newCylinder(height, radius, new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]));
                        break;
                    default:
                        throw new Error("Unknown shape value: " + shape);
                }
            }
        }
        catch (error) {
            console.error("Error processing the map data:", error);
        }
    };
    mapLoad.prototype.getObjects = function () {
        return this.objectID;
    };
    mapLoad.prototype.c_newBox = function (size, rotation, position, mass, velocity) {
        if (size === void 0) { size = new CANNON.Vec3(1, 1, 1); }
        if (rotation === void 0) { rotation = new CANNON.Vec3(0, 0, 0); }
        if (position === void 0) { position = new CANNON.Vec3(0, 0 + size.y, 0); }
        if (mass === void 0) { mass = 1; }
        if (velocity === void 0) { velocity = new CANNON.Vec3(0, 0, 0); }
        var material = new THREE.MeshBasicMaterial({ map: blockTexture });
        var boxMesh = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
        this.objectID.meshMat.push(material); // Keep track of object material
        this.objectID.meshID.push(boxMesh); // Keep track of object mesh
        var boxBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
            mass: mass,
            velocity: velocity,
            collisionFilterGroup: 2
        });
        this.objectID.bodyID.push(boxBody); // Keep track of body
        this.objectID.nextID++; // Update ID
        // Set rotations
        boxMesh.quaternion.setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z)));
        boxBody.quaternion.setFromEuler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z));
        // Set positions
        boxMesh.position.set(position.x, position.y + size.y / 2, position.z);
        boxBody.position.set(position.x, position.y + size.y / 2, position.z);
        // Add object
        this.scene.add(boxMesh);
        this.physicsWorld.addBody(boxBody);
    };
    mapLoad.prototype.c_newSphere = function (radius, position, mass, velocity) {
        if (radius === void 0) { radius = 1; }
        if (position === void 0) { position = new CANNON.Vec3(0, 0 + radius, 0); }
        if (mass === void 0) { mass = 0; }
        if (velocity === void 0) { velocity = new CANNON.Vec3(0, 0, 0); }
        var material = new THREE.MeshBasicMaterial({ map: blockTexture });
        var sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(radius), material);
        this.objectID.meshMat.push(material); // Keep track of material
        this.objectID.meshID.push(sphereMesh); // Keep track of mesh
        var sphereBody = new CANNON.Body({
            shape: new CANNON.Sphere(radius),
            mass: mass,
            velocity: velocity,
            collisionFilterGroup: 2
        });
        this.objectID.bodyID.push(sphereBody); // Keep track of body
        this.objectID.nextID++; // Update ID
        // Set positions
        sphereMesh.position.set(position.x, position.y, position.z);
        sphereBody.position.set(position.x, position.y, position.z);
        // Add object
        this.scene.add(sphereMesh);
        this.physicsWorld.addBody(sphereBody);
    };
    mapLoad.prototype.c_newCylinder = function (height, radius, rotation, position, mass, velocity) {
        if (height === void 0) { height = 1; }
        if (radius === void 0) { radius = 1; }
        if (rotation === void 0) { rotation = new CANNON.Vec3(1, 1, 1); }
        if (position === void 0) { position = new CANNON.Vec3(0, 0 + radius, 0); }
        if (mass === void 0) { mass = 0; }
        if (velocity === void 0) { velocity = new CANNON.Vec3(0, 0, 0); }
        var material = new THREE.MeshBasicMaterial({ map: blockTexture });
        var coneMesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height), material);
        this.objectID.meshID.push(coneMesh); // Keep track of mesh
        this.objectID.meshMat.push(material); // Keep track of material
        var coneBody = new CANNON.Body({
            shape: new CANNON.Cylinder(radius, radius, height),
            mass: mass,
            velocity: velocity,
            collisionFilterGroup: 2
        });
        this.objectID.bodyID.push(coneBody); // Keep track of body
        this.objectID.nextID++; // Update ID
        // Set rotations
        coneMesh.quaternion.setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z)));
        coneBody.quaternion.setFromEuler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z));
        // Set positions
        coneMesh.position.set(position.x, position.y + (height / 2), position.z);
        coneBody.position.set(position.x, position.y + (height / 2), position.z);
        // Add object
        this.scene.add(coneMesh);
        this.physicsWorld.addBody(coneBody);
    };
    mapLoad.prototype.c_newCone = function (height, radius, rotation, position, mass, velocity, hoppable) {
        if (height === void 0) { height = 1; }
        if (radius === void 0) { radius = 1; }
        if (rotation === void 0) { rotation = new CANNON.Vec3(1, 1, 1); }
        if (position === void 0) { position = new CANNON.Vec3(0, 0 + radius, 0); }
        if (mass === void 0) { mass = 0; }
        if (velocity === void 0) { velocity = new CANNON.Vec3(0, 0, 0); }
        if (hoppable === void 0) { hoppable = false; }
        var hopRad; // Check to see if the cone should be buggy (More fun if it is)
        if (hoppable) {
            hopRad = 0;
        }
        else {
            hopRad = 0.1;
        }
        var material = new THREE.MeshBasicMaterial({ map: blockTexture });
        var coneMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, radius, height), material);
        this.objectID.meshID.push(coneMesh); // Keep track of mesh
        this.objectID.meshMat.push(material); // Keep track of material
        var coneBody = new CANNON.Body({
            shape: new CANNON.Cylinder(hopRad, radius, height),
            mass: mass,
            velocity: velocity,
            collisionFilterGroup: 2
        });
        this.objectID.bodyID.push(coneBody); // Keep track of body
        this.objectID.nextID++; // Update ID
        // Update rotations
        coneMesh.quaternion.setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z)));
        coneBody.quaternion.setFromEuler(THREE.MathUtils.degToRad(rotation.x), THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z));
        // Update positions
        coneMesh.position.set(position.x, position.y + height / 2, position.z);
        coneBody.position.set(position.x, position.y + height / 2, position.z);
        // Add object
        this.scene.add(coneMesh);
        this.physicsWorld.addBody(coneBody);
    };
    return mapLoad;
}());
exports.default = mapLoad;
