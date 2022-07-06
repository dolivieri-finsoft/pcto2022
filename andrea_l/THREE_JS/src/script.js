import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/sestriere.jpg')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(2, 2, 2);
const geometry2 = new THREE.SphereGeometry( .5, 16  , 8);
const geometry3 = new THREE.DodecahedronGeometry(3, 1);

// Materials

const material = new THREE.MeshBasicMaterial()
material.wireframe = true
material.color = new THREE.Color(0xff0000)

const material2 = new THREE.MeshBasicMaterial();
material2.wireframe = true
material2.color = new THREE.Color(0x0000ff)

const material3 = new THREE.MeshBasicMaterial();
material3.wireframe = true
material3.color = new THREE.Color(0xffa500)

// Mesh
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

const sphere2 = new THREE.Mesh(geometry2, material2)
scene.add(sphere2)

const dodecagon = new THREE.Mesh(geometry3, material3)
scene.add(dodecagon)

/**
* Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
* Camera
*/

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
* Animate
*/


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

document.onkeydown = function (e){
    if(e.keyCode === 65){
        dodecagon.rotation.y += -.5
        cube.rotation.x += 1
    }else if(e.keyCode === 87){
        camera.position.z += .5
    }else if(e.keyCode === 68){
        dodecagon.rotation.y += .5
        cube.rotation.x += -1
    }else if(e.keyCode === 83){
        camera.position.z += -.5
    }
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    //Update objects
    cube.rotation.y = .5 * elapsedTime

    sphere2.rotation.y = .5 * elapsedTime

    dodecagon.rotation.x = .5 * elapsedTime

    //cube.rotation.y += 1.5 * (targetX - cube.rotation.y)
    //cube.rotation.x += 2 * (targetY - cube.rotation.x)

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

