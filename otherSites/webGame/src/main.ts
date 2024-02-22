import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import playerController from './playerControl.ts';
import mapLoad from './mapLoader.ts';

let objectID: { meshID:Array<any>, meshMat:Array<any>, bodyID:Array<any>, nextID:number } = {
  meshID: [],
  meshMat: [],
  bodyID: [],
  nextID: 0
}

const renderer = new THREE.WebGLRenderer()

const textureLoader = new THREE.TextureLoader()
const floorGrid = textureLoader.load("assets/protoGridORNG.png")
floorGrid.wrapS = THREE.RepeatWrapping
floorGrid.wrapT = THREE.RepeatWrapping
floorGrid.repeat.set(36, 36)

// const blockTexture = textureLoader.load("assets/texture_13.png")


renderer.setSize(window.innerWidth, window.innerHeight-1)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color("#7fdff5")
const light = new THREE.AmbientLight(0xffffff, 3)
scene.add(light)
const camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.1, 5000)


const groundMeshMat = new THREE.MeshBasicMaterial({
  map: floorGrid,
  side: THREE.DoubleSide,
  wireframe: false
})
const groundMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(500,500),
  groundMeshMat
)
objectID.meshID.push(groundMesh)
objectID.meshMat.push(groundMeshMat)
scene.add(groundMesh)


const physicsWorld = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81 * 2.35, 0)
})
const worldFloor = new CANNON.Body({
  shape: new CANNON.Plane(),
  fixedRotation: true,
  mass: 0
})
objectID.bodyID.push(worldFloor)



const player = new playerController(camera, scene, physicsWorld)
const mapLoader = new mapLoad(objectID, scene, physicsWorld)

mapLoader.mapinit(0)


// c_newBox(new CANNON.Vec3(5, 5, 5), new CANNON.Vec3(0, 0, 30), new CANNON.Vec3(0, 20, 3), 10, new CANNON.Vec3(0, -300, 0))
// c_newCone(10, 3, new CANNON.Vec3(0, 0, 0), new CANNON.Vec3(10, 3, 0), 10, new CANNON.Vec3(3, 30, -3), true)
// c_newSphere(5, new CANNON.Vec3(10, 10, 31), 10, undefined)
// c_newBox(new CANNON.Vec3(4, 4, 4), new CANNON.Vec3(0,0,0), new CANNON.Vec3(10, 0, 10), 0)
// c_newBox(new CANNON.Vec3(15, 17, 10), undefined, new CANNON.Vec3(0, 0, -50), 0)
// c_newBox(new CANNON.Vec3(15, 15, 10), undefined, new CANNON.Vec3(0, 0, -70), 0)
// c_newBox(new CANNON.Vec3(5, 4.5, 15), undefined, new CANNON.Vec3(15, 0, -70), 0)
// c_newCylinder(180, 20, new CANNON.Vec3(0,0,0), new CANNON.Vec3(76, 0, 10), 0, undefined)
// c_newTrimesh(undefined, undefined, new CANNON.Vec3(0, 3, 10), 10, undefined)
//c_newCone(20, 10, undefined, new CANNON.Vec3(30, 0, 30), 0, undefined)
// c_newCone(12, 8, new CANNON.Vec3(90, 0, 45), new CANNON.Vec3(50, 0, 50), 50)


physicsWorld.addBody(worldFloor)

const timeStep = 1/60

worldFloor.quaternion.setFromEuler(-1.5708, 0, 0)

renderer.setAnimationLoop(animate)

function animate(){
  physicsWorld.step(timeStep)

  copyBodies()
  player.updatePlayer()

  renderer.render(scene, camera)

  enableDebug()
}


let copyBodies = () => {
  objectID = mapLoader.getObjects()
  groundMesh.quaternion.copy(new THREE.Quaternion(worldFloor.quaternion.x, worldFloor.quaternion.y, worldFloor.quaternion.z, worldFloor.quaternion.w))
  groundMesh.position.copy(new THREE.Vector3(worldFloor.position.x, worldFloor.position.y, worldFloor.position.z))

  let foundMesh:THREE.Mesh
  let foundBody:CANNON.Body

  for(let i = 0; i < objectID.nextID; i++){
    foundMesh = objectID.meshID[i]
    foundBody = objectID.bodyID[i]
    
    
    foundMesh.quaternion.copy(new THREE.Quaternion(foundBody.quaternion.x, foundBody.quaternion.y, foundBody.quaternion.z, foundBody.quaternion.w))
    foundMesh.position.copy(new THREE.Vector3(foundBody.position.x, foundBody.position.y, foundBody.position.z))
  }
}

function enableDebug(){ // Enable the debug mode
  if(player.debugKey){
    let foundMesh:THREE.Mesh
    let meshMat:THREE.MeshBasicMaterial
    for(let i = 0; i < objectID.nextID+1; i++){
      if(objectID.meshID.length != objectID.meshMat.length){
        throw new Error("Inconsistent mesh count")
      }
      foundMesh = objectID.meshID[i] // Find mesh
      meshMat = objectID.meshMat[i] // Find corresponding material
      meshMat.wireframe = true // Make wireframe
      foundMesh.material = meshMat // Swap the material
    }
  }else if(!player.debugKey){
    let foundMesh:THREE.Mesh
    let meshMat:THREE.MeshBasicMaterial
    for(let i = 0; i < objectID.nextID+1; i++){
      foundMesh = objectID.meshID[i] // Find mesh
      meshMat = objectID.meshMat[i] // Find corresponding material
      meshMat.wireframe = false // Unmake wireframe
      foundMesh.material = meshMat // Swap the material
    }
  }
}

window.addEventListener('resize', function(){ // Resize shit perchance
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})