import * as THREE from 'three'
import * as CANNON from 'cannon-es'
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import getMaps from './maps.ts';




// Preload textures
const textureLoader = new THREE.TextureLoader()
const floorGrid = textureLoader.load("assets/protoGridORNG.png")
floorGrid.wrapS = THREE.RepeatWrapping
floorGrid.wrapT = THREE.RepeatWrapping
floorGrid.repeat.set(36, 36)

const blockTexture = textureLoader.load("assets/texture_13.png")


export default class mapLoad{

    private objectID: { meshID:Array<any>, meshMat:Array<any>, bodyID:Array<any>, nextID:number }
    private scene: THREE.Scene
    private physicsWorld: CANNON.World
    private getMap = new getMaps()


    constructor(objects: { meshID:Array<any>, meshMat:Array<any>, bodyID:Array<any>, nextID:number }, scene:THREE.Scene, world:CANNON.World){
        this.objectID = objects
        this.scene = scene
        this.physicsWorld = world
    }

    /**
     * Map initializer
     */
    public mapinit(map:number = 0) { // Can easily swap between maps by changing default value of the map parameter
        const newMap = this.getMap.getMap(map)
        try {
            for (const entry of newMap) { // Gets all the data
                const shape = entry.shape // Convert shape value to lowercase for consistency
                const dimensions = entry.dim || [0, 0, 0]
                const radius = entry.rad || 0
                const height = entry.high || 0
                const rotations = entry.rot || [0, 0, 0]
                const position = entry.pos || [0, 0, 0]
                const mass = entry.mass || 0;
                const velocity = entry.velo || [0, 0, 0]
                const hoppable = entry.hop || false
    
                switch (shape) { // Adds geometry
                    case 'BoxGeometry':
                        this.c_newBox(new CANNON.Vec3(dimensions[0], dimensions[1], dimensions[2]), new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]))
                        break
                    case 'ConeGeometry':
                        this.c_newCone(height, radius, new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]), hoppable)
                        break
                    case 'SphereGeometry':
                        this.c_newSphere(radius, new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]))
                        break
                    case 'CylinderGeometry':
                        this.c_newCylinder(height, radius, new CANNON.Vec3(rotations[0], rotations[1], rotations[2]), new CANNON.Vec3(position[0], position[1], position[2]), mass, new CANNON.Vec3(velocity[0], velocity[1], velocity[2]))
                        break
                    default:
                        throw new Error("Unknown shape value: " + shape)
                }
            }
        } catch (error) {
            console.error("Error processing the map data:", error)
        }
    }
    


    public getObjects(){ // Returns all objects
        return this.objectID
    }


    private c_newBox(size:CANNON.Vec3 = new CANNON.Vec3(1, 1, 1), rotation:CANNON.Vec3 = new CANNON.Vec3(0, 0, 0), position:CANNON.Vec3 = new CANNON.Vec3(0, 0 + size.y, 0), mass:number = 1, velocity:CANNON.Vec3 = new CANNON.Vec3(0, 0, 0)) {
        const material = new THREE.MeshBasicMaterial({map: blockTexture})
        const boxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(size.x, size.y, size.z),
        material)
        this.objectID.meshMat.push(material) // Keep track of object material
        this.objectID.meshID.push(boxMesh) // Keep track of object mesh
    
    
        const boxBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(size.x/2, size.y/2, size.z/2)),
        mass: mass,
        velocity: velocity,
        collisionFilterGroup: 2
        })
        this.objectID.bodyID.push(boxBody) // Keep track of body
    
        this.objectID.nextID++ // Update ID
    
        // Set rotations
        boxMesh.quaternion.setFromEuler(new THREE.Euler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        ))
        boxBody.quaternion.setFromEuler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        )
    
        // Set positions
        boxMesh.position.set(position.x, position.y + size.y/2, position.z)
        boxBody.position.set(position.x, position.y + size.y/2, position.z)
    
        
        // Add object
        this.scene.add(boxMesh)
        this.physicsWorld.addBody(boxBody)
    }


    public c_newSphere(radius:number = 1, position:CANNON.Vec3 = new CANNON.Vec3(0, 0 + radius, 0), mass:number = 0, velocity:CANNON.Vec3 = new CANNON.Vec3(0, 0, 0)) {
        const material = new THREE.MeshBasicMaterial({map: blockTexture})
        const sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        material)
        this.objectID.meshMat.push(material) // Keep track of material
        this.objectID.meshID.push(sphereMesh) // Keep track of mesh
    
    
        const sphereBody = new CANNON.Body({
        shape: new CANNON.Sphere(radius),
        mass: mass,
        velocity: velocity,
        collisionFilterGroup: 2
        })
        this.objectID.bodyID.push(sphereBody) // Keep track of body
    
        this.objectID.nextID++ // Update ID
    
        // Set positions
        sphereMesh.position.set(position.x, position.y, position.z)
        sphereBody.position.set(position.x, position.y, position.z)
    

        // Add object
        this.scene.add(sphereMesh)
        this.physicsWorld.addBody(sphereBody)
    }


    public c_newCylinder(height:number = 1, radius:number = 1, rotation:CANNON.Vec3 = new CANNON.Vec3(1, 1, 1), position:CANNON.Vec3 = new CANNON.Vec3(0, 0 + radius, 0), mass:number = 0, velocity:CANNON.Vec3 = new CANNON.Vec3(0, 0, 0)) {
        const material = new THREE.MeshBasicMaterial({map: blockTexture})
        const coneMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, height),
        material)
        this.objectID.meshID.push(coneMesh) // Keep track of mesh
        this.objectID.meshMat.push(material) // Keep track of material
    
    
        const coneBody = new CANNON.Body({
        shape: new CANNON.Cylinder(radius, radius, height),
        mass: mass,
        velocity: velocity,
        collisionFilterGroup: 2
        })
        this.objectID.bodyID.push(coneBody) // Keep track of body
    
        this.objectID.nextID++ // Update ID
    
        // Set rotations
        coneMesh.quaternion.setFromEuler(new THREE.Euler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        ))
        coneBody.quaternion.setFromEuler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        )
    
        // Set positions
        coneMesh.position.set(position.x, position.y + (height/2), position.z)
        coneBody.position.set(position.x, position.y + (height/2), position.z)
    

        // Add object
        this.scene.add(coneMesh)
        this.physicsWorld.addBody(coneBody)
    }

    public c_newCone(height:number = 1, radius:number = 1, rotation:CANNON.Vec3 = new CANNON.Vec3(1, 1, 1), position:CANNON.Vec3 = new CANNON.Vec3(0, 0 + radius, 0), mass:number = 0, velocity:CANNON.Vec3 = new CANNON.Vec3(0, 0, 0), hoppable:boolean = false) {
        let hopRad // Check to see if the cone should be buggy (More fun if it is)
        if(hoppable){
        hopRad = 0
        }else{
        hopRad = 0.1
        }
        const material = new THREE.MeshBasicMaterial({map: blockTexture})
        const coneMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0, radius, height),
        material)
        this.objectID.meshID.push(coneMesh) // Keep track of mesh
        this.objectID.meshMat.push(material) // Keep track of material
    
    
        const coneBody = new CANNON.Body({
        shape: new CANNON.Cylinder(hopRad, radius, height),
        mass: mass,
        velocity: velocity,
        collisionFilterGroup: 2
        })
        this.objectID.bodyID.push(coneBody) // Keep track of body
    
        this.objectID.nextID++ // Update ID
    
        // Update rotations
        coneMesh.quaternion.setFromEuler(new THREE.Euler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        ))
        coneBody.quaternion.setFromEuler(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
        )
    
        // Update positions
        coneMesh.position.set(position.x, position.y + height/2, position.z)
        coneBody.position.set(position.x, position.y + height/2, position.z)
    

        // Add object
        this.scene.add(coneMesh)
        this.physicsWorld.addBody(coneBody)
    }

    // Non-Functional, what the fuck
    /*
    public c_newTrimesh(url: string = "assets/Suzanne.obj", rotation: CANNON.Vec3 = new CANNON.Vec3(0, 0, 0), position: CANNON.Vec3 = new CANNON.Vec3(0, 0, 0), mass: number = 0, velocity: CANNON.Vec3 = new CANNON.Vec3(0, 0, 0)) {
        const loader = new OBJLoader()
  
        let newMesh: THREE.Mesh | undefined
        let newBody: CANNON.Body | undefined
        let objectHeight: number | undefined
    
        // Load the body and mesh simultaneously
        loader.load(url, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
            // Create the Cannon.js body
            const geometry = child.geometry
            const vertices = geometry.attributes.position.array
            const indices = geometry.index.array
    
            const trimeshBody = new CANNON.Body({
                mass: mass,
                shape: new CANNON.Trimesh(vertices, indices),
                velocity: velocity,
            })
            newBody = trimeshBody
    
            // Create the Three.js mesh
            const loadedMesh = new THREE.Mesh(child.geometry, new THREE.MeshBasicMaterial())
            newMesh = loadedMesh
    
            // Set quaternion and position after loading
            if (newMesh && newBody) {
                newMesh.quaternion.setFromEuler(
                new THREE.Euler(
                    THREE.MathUtils.degToRad(rotation.x),
                    THREE.MathUtils.degToRad(rotation.y),
                    THREE.MathUtils.degToRad(rotation.z)
                    )
                );
    
                let boundingBox = new THREE.Box3()
                boundingBox.setFromObject(newMesh)
                objectHeight = boundingBox.getSize(new THREE.Vector3()).y
    
                newBody.quaternion.setFromEuler(
                THREE.MathUtils.degToRad(rotation.x),
                THREE.MathUtils.degToRad(rotation.y),
                THREE.MathUtils.degToRad(rotation.z)
                )
    
                if (objectHeight !== undefined) {
                newMesh.position.set(
                    position.x,
                    position.y + objectHeight / 2,
                    position.z
                    )
                }
            }
            }
        });
    
        // Add body and mesh to object synchronizer
        if (newMesh && newBody) {
            objectID.meshID.push(newMesh);
            objectID.bodyID.push(newBody);
            objectID.nextID++;
        }
        });
    }
    */
}