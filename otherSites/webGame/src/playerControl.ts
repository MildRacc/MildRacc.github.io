import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import debugMode from './debug.ts'
//import playerAbilities from './abilities.ts'

export default class playerController
{

    private playerMesh:THREE.Mesh
    private playerBody:CANNON.Body
    private camera:THREE.Camera

    // These are not read at all, but theyre here in case I ever need them
    private scene:THREE.Scene
    private world:CANNON.World

    private keys: { [key: string]: boolean } = {}

    private camOffset = new CANNON.Vec3(0, 2, 0)
    private camSetting:boolean = true
    private deltaRotationX:number = 0 
    private deltaRotationY:number = 0

    private debug = new debugMode()
    //private abilities:playerAbilities

    public playerSpeed:number
    public speedMulti:number
    public jumpCooldown:boolean
    public jumpCnt:number
    public jumpReady:boolean
    public sensitivityMulti:number = 1
    public strafing = false

    




    constructor(camera:THREE.Camera, scene:THREE.Scene, world:CANNON.World){

        this.jumpCooldown = false
        this.jumpCnt = 2
        this.jumpReady = true

        this.playerSpeed = 0.2
        this.speedMulti = 1

        

        // Load the textures for the player model
        const textureLoader = new THREE.TextureLoader()
        const playerTexture = textureLoader.load("assets/texture_05.png")

        this.playerMesh = new THREE.Mesh(new THREE.CapsuleGeometry(1, 4), new THREE.MeshBasicMaterial({map:playerTexture}))
        this.playerBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(1, 3, 1)),
            mass:10,
            fixedRotation: true,
            position: new CANNON.Vec3(0, 3, 0),
            collisionFilterGroup: 1
        })


        
        // Reset jumps on collision
        this.playerBody.addEventListener('collide', (event:any) => {
            if(event.body){
                this.jumpCooldown = true
                this.jumpCnt = 2            }
        })


        this.camera = camera
        this.camera.position.set(this.playerBody.position.x, this.playerBody.position.x+ 5, this.playerBody.position.z)
        let perspectiveKey = false

        this.scene = scene
        this.world = world

        this.playerMesh.position.copy(new THREE.Vector3(this.playerBody.position.x, this.playerBody.position.y, this.playerBody.position.z))
        
        //this.abilities = new playerAbilities(camera, scene, world, this.playerBody, this.playerMesh)

        scene.add(this.playerMesh)
        world.addBody(this.playerBody)

        // Event listenors for keypresss
        document.addEventListener('keydown', (event) => this.keys[event.code] = true)
        document.addEventListener('keyup', (event) => this.keys[event.code] = false)

        const canvas = document.getElementById('gameCanvas') // Lock cursor on left click
        document.addEventListener('click', (event) => {
            if(event){
                canvas?.requestPointerLock()
            }
          })


        document.addEventListener('keydown', (event) => { // Allow the perspective to be changed
            if (event.code === 'ControlLeft') {
                perspectiveKey = true
            }
        })
        
        document.addEventListener('keyup', (event) => { // Allows the player to jump
            if(event.code == 'Space'){ 
                this.jumpReady = true
            }
        })

        document.addEventListener('keyup', (event) => { // Change perspective
            if (event.code === 'ControlLeft' && perspectiveKey) {
                if (this.camSetting) {
                    this.camOffset = new CANNON.Vec3(2, 3.2, 7)
                    this.camSetting = false
                } else {
                    this.camOffset = new CANNON.Vec3(0, 1.75, 0)
                    this.camSetting = true
                }
            }
            perspectiveKey = false
        })

        document.addEventListener('mousemove', (event) => { // Fuck this shit
            if (event) {
                const sensitivity = 0.007 * this.sensitivityMulti
                this.deltaRotationX = event.movementX * sensitivity
                let deltaRotationY = event.movementY * sensitivity
                this.deltaRotationY = deltaRotationY


                const axisX = new CANNON.Vec3(0, -1, 0)
                const quaternionX = new CANNON.Quaternion()
                quaternionX.setFromAxisAngle(axisX, this.deltaRotationX)

                // const axisY = new THREE.Vector3(1, 0, 0)
                // const quaternionY = new THREE.Quaternion()
                // quaternionY.setFromAxisAngle(axisY, deltaRotationY)

                this.playerBody.quaternion = quaternionX.mult(this.playerBody.quaternion)
                // this.deltaRotationY = this.quatToEuler(quaternionY.multiply(this.camera.quaternion.clone())).x
                console.log(deltaRotationY)
            }
        })
    }


    // Handle all keypresses
    private handleKeyDown = () => {
        // I dont wanna have to type Math.abs() 3.5*10^10^10 times
        const x = this.playerBody.velocity
        const w = Math.abs(x.x)
        const y = Math.abs(x.y)
        const z = Math.abs(x.z)

        if(!this.strafing && this.playerSpeed <= 0.4){
            this.playerSpeed = 0.2 * this.speedMulti
        }
        if(this.playerBody.velocity.x < 0.000001 && this.playerBody.velocity.y < 0.000001 && this.playerBody.velocity.z < 0.000001 && !this.strafing){
            this.playerSpeed = 0.2 * this.speedMulti
        }
        
        if(this.keys['ShiftLeft'] && !this.strafing && this.playerSpeed <= 0.4){ // Increase player speed
            this.playerSpeed = 0.3 * this.speedMulti
        }
        if (this.keys['Space'] && this.jumpCooldown && this.jumpReady || this.keys['Space'] && this.jumpCnt > 0 && this.jumpReady) { // Make player jump
            this.jumpCooldown = false
            this.jumpReady = false
            this.jumpCnt--
            if(this.playerBody.velocity.y < 0 ){
                this.playerBody.velocity.y += 13.20 + Math.abs(this.playerBody.velocity.y)
            }
            else{
                this.playerBody.velocity.y += 13
            }
        }
        if(this.keys['KeyD'] && this.keys['ArrowRight'] && this.playerSpeed >= 0.4 || this.keys['KeyA'] && this.keys['ArrowLeft'] && this.playerSpeed >= 0.2){ // Increase speed whilst doing the CSGO thing, doesnt work very well
            this.playerSpeed += 0.001 * this.speedMulti
            this.strafing = true
        }

        if(!(this.keys['KeyD'] && this.keys['ArrowRight']) && !(this.keys['KeyA'] && this.keys['ArrowLeft'])){ // Slow the player down when not CSGO thinging
            this.strafing = false
            this.playerSpeed-=0.001 * this.speedMulti
        }

        if(this.keys['KeyW']){ // Fo Gorward
            const forward = new CANNON.Vec3(0, 0, -1 * this.playerSpeed * this.speedMulti)
            const quat = this.playerBody.quaternion
            quat.vmult(forward, forward)
            this.playerBody.position.vadd(forward, this.playerBody.position)
            if(w < 30 && y < 30 && z < 30){ // Conserve some of the players momentum in mid air
                this.playerBody.velocity.vsub(new CANNON.Vec3(-forward.x - this.c_newVelocity(x.x/2), 0, -forward.z - this.c_newVelocity(x.z/2)), x)}
        }

        if(this.keys['KeyS']){
            const backward = new CANNON.Vec3(0, 0, 1 * this.playerSpeed * this.speedMulti)
            const quat = this.playerBody.quaternion
            quat.vmult(backward, backward)
            this.playerBody.position.vadd(backward, this.playerBody.position)
            if(w < 50 && y < 50 && z < 50){ // Conserve some of the players momentum in mid air
                this.playerBody.velocity.vsub(new CANNON.Vec3(-backward.x - this.c_newVelocity(x.x/2), 0, -backward.z - this.c_newVelocity(x.z/2)), x)
            }
        }

        if(this.keys['KeyA']){
            const left = new CANNON.Vec3(-1 * this.playerSpeed * this.speedMulti, 0, 0)
            const quat = this.playerBody.quaternion
            quat.vmult(left, left)
            this.playerBody.position.vadd(left, this.playerBody.position)
            if(w < 50 && y < 50 && z < 50){ // Conserve some of the players momentum in mid air
                this.playerBody.velocity.vsub(new CANNON.Vec3(-left.x - this.c_newVelocity(x.x/2), 0, -left.z - this.c_newVelocity(x.z/2)), x)
            }
        }

        if(this.keys['KeyD']){
            const right = new CANNON.Vec3(1 * this.playerSpeed * this.speedMulti, 0, 0)
            const quat = this.playerBody.quaternion
            quat.vmult(right, right)
            this.playerBody.position.vadd(right, this.playerBody.position)
            if(w < 50 && y < 50 && z < 50){ // Conserve some of the players momentum in mid air
                this.playerBody.velocity.vsub(new CANNON.Vec3(-right.x - this.c_newVelocity(x.x/2), 0, -right.z - this.c_newVelocity(x.z/2)), x)
            }
        }

        if(this.keys['ArrowLeft']){ // Look left at a constant rate
            const axis = new CANNON.Vec3(0, 1, 0)
            const angle = 0.075 * this.sensitivityMulti
            const quaternion = new CANNON.Quaternion()
            quaternion.setFromAxisAngle(axis, angle)
            this.playerBody.quaternion = quaternion.mult(this.playerBody.quaternion)
        }

        if(this.keys['ArrowRight']){ // Look right at a constant rate
            const axis = new CANNON.Vec3(0, 1, 0)
            const angle = -0.075 * this.sensitivityMulti
            const quaternion = new CANNON.Quaternion()
            quaternion.setFromAxisAngle(axis, angle)
            this.playerBody.quaternion = quaternion.mult(this.playerBody.quaternion)
        }
    }
    
    

    /**
     * Updates the player
     */
    public updatePlayer() {
        this.handleKeyDown()
    
        // Update the player's visual representation to match the physics body's position
        this.playerMesh.position.copy(new THREE.Vector3(this.playerBody.position.x, this.playerBody.position.y, this.playerBody.position.z))
        this.playerMesh.quaternion.copy(new THREE.Quaternion(this.playerBody.quaternion.x, this.playerBody.quaternion.y, this.playerBody.quaternion.z, this.playerBody.quaternion.w))


        // Update camera position and orientation to follow the player
        const playerPos = this.playerBody.position
        const playerQuaternion = this.playerBody.quaternion
    
        // Update camera position relative to the player (adjust values as needed)
        const offsetRotated = new CANNON.Vec3() // Initialize rotated offset
        playerQuaternion.vmult(this.camOffset, offsetRotated) // Rotate the offset by player's quaternion
    
        const cameraPosition = playerPos.vadd(offsetRotated) // Set the camera position relative to the player
    
        // Calculate a target position in the direction the player is facing
        const forwardOffset = new CANNON.Vec3(0, 0, -1) // Forward direction of the player
        playerQuaternion.vmult(forwardOffset, forwardOffset) // Rotate the forward direction
        let targetPosition = cameraPosition.vadd(forwardOffset) // Calculate the target position
    
        // Set the camera's position and make it look at the target position
        this.camera.position.copy(new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z))
        this.camera.lookAt(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z))
   }    

    get debugKey(){ // For debugging purposes
        return this.debug.debugVal
    }

    get velocity(){ // For velocitical(real word i swear) purposes
        return this.playerBody.velocity
    }

    //get newTimeStep(){
        //return this.abilities.timeStep
    //}

    public c_newVelocity(x:number): number { // Evil floating point bit hack
        if(x > 0){
            return (Math.sqrt(Math.abs(x / 20)) + (0.00001 * x))/1000
        }else{
            return -(Math.sqrt(Math.abs(x / 20)) + (0.00001 * x))/1000
        }
    }

    /**
     * Convert a quaternion to an Euler rotation
     */
    public quatToEuler(quaternion: THREE.Quaternion): THREE.Euler { // Convert quaternion to euler
        return new THREE.Euler().setFromQuaternion(quaternion) // This fucking sucks
    }
}