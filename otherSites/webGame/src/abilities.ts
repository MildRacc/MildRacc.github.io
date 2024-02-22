import * as THREE from 'three'
import * as CANNON from 'cannon-es';

export default class playerAbilities{

    private scene: THREE.Scene
    private world: CANNON.World
    private camera: THREE.Camera
    private playerBody: CANNON.Body
    private playerMesh: THREE.Mesh

    public timeStep:number = 1/60


    constructor(camera:THREE.Camera, scene:THREE.Scene, world:CANNON.World, body:CANNON.Body, mesh:THREE.Mesh){
        this.scene = scene
        this.world = world
        this.camera = camera

        this.playerBody = body
        this.playerMesh = mesh
    }



    /**
     * playerTeleport
     */
    public playerTeleport(playerSpeed:number, maxDist:number = 10) { // Might not work well
        this.world.stepnumber = 1/120
        playerSpeed /= 3
        let click:boolean = false


        const playerPos = this.playerBody.position
        const playerQuaternion = this.playerBody.quaternion

        const offsetRotated = new CANNON.Vec3()
        playerQuaternion.vmult(new CANNON.Vec3(0, 2, 0), offsetRotated)

        const cameraPosition = playerPos.vadd(offsetRotated)

        const forwardOffset = new CANNON.Vec3(0, 0, -maxDist)
        const targetPosition = cameraPosition.vadd(forwardOffset)



        const hitBox = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(1, 2, 1)),
            mass: 0,
            fixedRotation: true
        })
        const boxGeometry = new THREE.BoxGeometry(1, 2, 1)
        const wireFrameGeometry = new THREE.WireframeGeometry(boxGeometry)
        const wireFrameMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF })

        const wireFrame = new THREE.LineSegments(wireFrameGeometry, wireFrameMaterial)

        this.scene.add(wireFrame)
        this.world.addBody(hitBox)

        this.asyncTP_Loop(click, hitBox, wireFrame, targetPosition)

        document.addEventListener('click', function clickHandler(event){
            if(event){
                click = true
                document.removeEventListener('click', clickHandler)
            }
        })
    }



    /**
     * raycast
     */
    public raycast(origin:CANNON.Vec3, direction:CANNON.Vec3, maxDist:number) {
        const playerPos = this.playerBody.position
        const playerQuaternion = this.playerBody.quaternion

        const offsetRotated = new CANNON.Vec3()
        playerQuaternion.vmult(new CANNON.Vec3(0, 2, 0), offsetRotated)

        const cameraPosition = playerPos.vadd(offsetRotated)

        const forwardOffset = new CANNON.Vec3(0, 0, -maxDist)
        const targetPosition = cameraPosition.vadd(forwardOffset)

        const result = new CANNON.RaycastResult();
        const ray = new CANNON.Ray(this.playerBody.position.clone(), targetPosition);
        ray.intersectWorld(this.world, {result});

        if (result.hasHit) {
            // Handle hit
            const hitPoint = result.hitPointWorld; // Intersection point in world coordinates
            const body = result.body; // The body that was hit
            console.log('Hit point:', hitPoint);
            console.log('Hit body:', body);
        }
    }



    private asyncTP_Loop(param:boolean, body:CANNON.Body, mesh:THREE.LineSegments, newPos:CANNON.Vec3) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                
                body.position.copy(newPos)
                body.quaternion.copy(this.playerBody.quaternion)
                mesh.position.copy(new THREE.Vector3(body.position.x, body.position.y, body.position.z))
                mesh.rotation.copy(new THREE.Euler().setFromQuaternion(new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)))
              
              if(param){
                resolve()
              }else{
                reject()
              }
            }, 100)
          })
    }
}