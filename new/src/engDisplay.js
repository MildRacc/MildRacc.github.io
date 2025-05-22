import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"


class displayObject {
    objectPath = ""
    objectScale = 1.0
    objectPos = new THREE.Vector3(0, 0, 0)
    objectRotation = new THREE.Vector3(0, 0, 0)
    canvasDimensions = { width: 350, height: 350 }
    canvas = null
    scene = null
    camera = null
    renderer = null
    mesh = null
    animate = ()=>{return}

    constructor(canvas){
        if(typeof canvas !== "object"){
            console.error("Canvas is not an object")
            return
        }
        this.canvas = canvas
    }

    setObjectPath(path){
        this.objectPath = path
    }
    setObjectScale(scale){
        this.objectScale = scale
    }
    setObjectPos(x, y, z){
        this.objectPos = new THREE.Vector3(x, y, z)
    }
    setObjectRotation(x, y, z){
        this.objectRotation = new THREE.Vector3(x, y, z)
    }
    setCanvasDimensions(width, height){
        this.canvasDimensions.width = width
        this.canvasDimensions.height = height
    }
    setCanvas(canvas){
        this.canvas = canvas
    }
    display(){
        // Create scene
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xdddddd)
        
        // Create camera with better positioning
        this.camera = new THREE.PerspectiveCamera(
            75, 
            this.canvasDimensions.width / this.canvasDimensions.height, 
            0.1, 
            1000
        )
        // Position camera to better see the model
        this.camera.position.set(0, 0, 5)
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            canvas: this.canvas 
        })
        this.renderer.setSize(this.canvasDimensions.width, this.canvasDimensions.height)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // Add a ground plane to receive shadows
        const planeGeometry = new THREE.PlaneGeometry(10, 10)
        const planeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xaaaaaa,
            roughness: 0.8
        })


        // Setup lights - before loading the model
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true // Enable shadow casting
        directionalLight.shadow.mapSize.width = 1024 // Higher resolution shadows
        directionalLight.shadow.mapSize.height = 1024
        this.scene.add(directionalLight)
        
        let ambientLight = new THREE.AmbientLight(0x404040, 55) // Reduced intensity
        this.scene.add(ambientLight)

        // Add orbit controls helper - debug code
        console.log("Loading STL from:", this.objectPath)

        // Load STL file
        const loader = new GLTFLoader()
        loader.load(this.objectPath, (gltf) => {
            // Success callback - This runs when loading completes
            console.log("GLTF loaded successfully", gltf)
            
            // GLTF objects already come with meshes and materials
            this.mesh = gltf.scene
            
            // Scale the entire scene
            this.mesh.scale.set(this.objectScale, this.objectScale, this.objectScale)
            this.mesh.position.set(this.objectPos.x, this.objectPos.y, this.objectPos.z)
            this.mesh.rotation.set(this.objectRotation.x, this.objectRotation.y, this.objectRotation.z)
            
            // Enable shadows for all meshes in the scene
            this.mesh.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true
                    node.receiveShadow = true
                }
            })
            
            // Add the entire GLTF scene to our scene
            this.scene.add(this.mesh)
            
            // Position camera to see the model
            this.camera.lookAt(this.mesh.position)
            
            // Start animation loop after mesh is loaded
            this.startAnimation()
            
        }, (xhr) => {
            // Progress callback
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        }, (error) => {
            // Error callback
            console.error("Error loading GLTF:", error)
        })
    }

    startAnimation() {
        const animate = () => {
            requestAnimationFrame(animate)
            
            // Slowly rotate the mesh if it exists
            if (this.mesh) {
                this.mesh.rotation.z += 0.01
            }
            
            this.renderer.render(this.scene, this.camera)
        }
        
        this.animate = animate
        animate()
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const canv1 = document.getElementById("roboGlove")
    if (canv1) {
        let newDisplay = new displayObject(canv1)
        
        // Use a GLB file instead of GLTF
        newDisplay.setObjectPath("./assets/3d_models/glove/scene.gltf")
        newDisplay.setObjectScale(0.25)
        newDisplay.setObjectPos(0, 0, 0) // Start with 0,0,0 position
        newDisplay.setObjectRotation(90, 0, 0)
    
        
        newDisplay.display()
    } else {
        console.error("Canvas element 'roboGlove' not found")
    }
})