import * as three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats-js'
import { gsap } from 'gsap'
import axios from 'axios'
// import Stats from 'three/examples/jsm/libs/stats.module'
// import Stats from 'three/examples/jsm/libs/'
// console.log(Statss);

var stats = new Stats();
stats.showPanel(0)
// document.body.appendChild(stats.dom);

const canvas = document.querySelector(".webgl")

const scene = new three.Scene()
const sizes = {
    width: window.innerWidth,
    heigth: window.innerHeight
}

const camera = new three.PerspectiveCamera(75, sizes.width / sizes.heigth)
scene.add(camera)
camera.position.z = 8
camera.position.x = 1
// camera.position.y=2

const effect = {
    x: sizes.width / 100,
    y: sizes.heigth / 100
}


window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.heigth = window.innerHeight

    camera.aspect = sizes.width / sizes.heigth
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.heigth)

    effect.x = sizes.width / 100
    effect.y = sizes.heigth / 100

})
// console.log(document);
const orbitcontrol = new OrbitControls(camera, canvas)
orbitcontrol.minPolarAngle = 1.6
orbitcontrol.maxPolarAngle = 1.6
// scene.add(orbitcontrol)


// const box = new three.Mesh(new three.TorusGeometry(), new three.MeshBasicMaterial({
//     color: "#ff0000"
// }))
// scene.add(box)

const textloader = new three.TextureLoader()
// const texture = textloader.load("./srgb.jpg")
const texture = textloader.load("./Untitled.jpg")
three.ColorManagement.enabled = true
texture.colorSpace = three.SRGBColorSpace
// texture.encoding=three.sRGBEncoding
// console.log(texture);
texture.flipY = false

const material = new three.MeshStandardMaterial({ map: texture })
const lampmaterial = new three.MeshStandardMaterial({ color: "yellow", emissive: "yellow", emissiveIntensity: 5 })
const firematerial = new three.MeshStandardMaterial({ color: "orange" })
// lampmaterial.emissiveIntensity=0.1
// const light2 = new three.PointLight(0xff0040, 40);
// light2.add(new three.Mesh(new three.SphereGeometry(0.5, 16, 8), new three.MeshBasicMaterial({ color: 0xff0040 })));
// scene.add(light2);

const modeloader = new GLTFLoader()
let model;

modeloader.load("./forest.glb", (gltf) => {
    // console.log("gltf", gltf.scene.children);
    gltf.scene.traverse((child) => {
        // console.log(child);
        child.material = material
    })

    const lamp = gltf.scene.children.find((child) => child.name === "lamp");
    const lamp1 = gltf.scene.children.find((child) => child.name === "lamp1");
    const lamp2 = gltf.scene.children.find((child) => child.name === "lamp2");
    const lamp3 = gltf.scene.children.find((child) => child.name === "lamp3");
    const lamp4 = gltf.scene.children.find((child) => child.name === "lamp4");
    const lamp5 = gltf.scene.children.find((child) => child.name === "lamp5");
    const lamp6 = gltf.scene.children.find((child) => child.name === "lamp6");
    const fire = gltf.scene.children.find((child) => child.name === "fire");
    // console.log(lamp, lamp1, lamp2, lamp3, lamp4, lamp5, lamp6);
    // console.log(lamp);
    fire.material = firematerial
    lamp.material = lamp1.material = lamp2.material = lamp3.material = lamp4.material = lamp5.material = lamp6.material = lampmaterial

    // console.log(lamp);
    // model.push(gltf.scene)
    model = gltf.scene
    // model.scale.set(.1, .1, .1)
    model.position.y = -2
    // model.position.z = -3

    // console.log(gltf.scene.children);
    // console.log(model.material);
    scene.add(model)

    // console.log("lodede");
})

//fireflies
// console.log(new three.BoxGeometry());
const flies = new three.BufferGeometry()
const count = 100
const position = new Float32Array(count * 3)

for (let i = 0; i < count; i++) {
    position[i * 3] = (Math.random() - .5) * 20
    position[i * 3 + 1] = 1 + (Math.random() - .5) * 15
    position[i * 3 + 2] = -4 + (Math.random() - .5) * 30

}

const flytexture = textloader.load("1.png")


flies.setAttribute("position", new three.BufferAttribute(position, 3))
const flymaterial = new three.PointsMaterial({
    color: "orange",
    size: .2,
    sizeAttenuation: true,
    alphaMap: flytexture,
    transparent: true,
    depthWrite: false,
    blending: three.AdditiveBlending
})
const flymesh = new three.Points(flies, flymaterial)
scene.add(flymesh)
// console.log(position);

const light = new three.PointLight(0xffffff, 100)
light.position.set(5, 1, -1)
// scene.add(light)

const ambient = new three.AmbientLight("white", 4)
scene.add(ambient)

const light1 = new three.PointLight("orange", 20, 1, 1);
// light1.add(new three.Mesh(new three.SphereGeometry(0.1, 16, 8), new three.MeshBasicMaterial({ color: "orange",transparent:true })));
scene.add(light1);

let mouse = new three.Vector2()
// mouse=mouse.normalize()

window.addEventListener("mousemove", (e) => {
    // console.log(effect.x);
    // e.preventDefault()
    mouse.x = (e.clientX / sizes.width - .5) * effect.x
    mouse.y = -(e.clientY / sizes.heigth - .5) * effect.y


    const cursor = document.querySelector(".cursor")
    const cursor1 = document.querySelector(".cursor1")
    const cursor2 = document.querySelector(".cursor2")
    const cursor3 = document.querySelector(".cursor3")

    // cursor.style.top = e.clientY + "px"
    // cursor.style.left = e.clientX + "px"

    gsap.to(cursor, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        duration: 0.3
    })

    gsap.to(cursor1, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        duration: 0.4
    })

    gsap.to(cursor2, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        duration: 0.5
    })

    gsap.to(cursor3, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        duration: 0.6,
    })

})

const target = document.querySelector(".cursor")
target.addEventListener('touchmove', function (event) {

    event.preventDefault()
    var touch = event.touches[0];
    // console.log(event.touches);
    // Get the touch coordinates
    var x = touch.clientX;
    var y = touch.clientY;

    // Move the element to the new coordinates
    target.style.left = (x - 50) + 'px'; // Adjusting for half of target width
    target.style.top = (y - 50) + 'px';  // Adjusting for half of target height
});

// console.log(stats.dom);

// const lighthelper = new three.PointLightHelper(light)
// scene.add(lighthelper)

const ray = new three.Raycaster()
ray.setFromCamera(mouse, camera)



const renderer = new three.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.heigth)
renderer.outputColorSpace = three.SRGBColorSpace
// console.log(renderer.info)
// document.querySelector(".data").textContent=(renderer.info.memory.geometries)



const intialwebsite = document.referrer
const usertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone + " " + Intl.DateTimeFormat().resolvedOptions().locale
var device = "";
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    device = navigator.userAgent;
    return regex.test(navigator.userAgent);
}
isMobile()
console.log(device, intialwebsite, usertimezone);

// axios.defaults.baseURL="http://localhost:3000/"
// axios.defaults.baseURL = ""
https://rich-cyan-chinchilla-wrap.cyclic.app/

axios.defaults.baseURL = import.meta.env.VITE_AXIOSPOST

axios.post("bonfire", { device, intialwebsite, usertimezone })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error("Error posting data:", error);
    });







const clock = new three.Clock()
let previostime = 0
// console.log(flies.attributes.position.array.length);

function tick() {
    stats.begin()

    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime);
    // const deltatime = elapsedTime - previostime
    // previostime = elapsedTime
    // console.log(deltatime,elapsedTime);
    renderer.render(scene, camera)

    light1.position.x = mouse.x
    light1.position.y = mouse.y
    // light1.position.y = mouse.x
    //     flies.attributes.position.array.forEach((val)=>{
    // // console.log(val);
    //         Math.sin(elapsedTime)
    //     })
    if (model) {
        // model.rotation.y += -.0001

    }
    // light1.position.x = Math.sin(elapsedTime * 0.7);
    // light1.position.y = Math.cos(elapsedTime * 0.5);
    // light1.position.z = Math.cos(elapsedTime * 0.3);

    // const fly = flies.attributes.position
    // for (let i = 1; i < fly.array.length; i + 1) {
    //     // i*3
    //     flies.attributes.position.array[i] = 0
    //     // console.log("fly",fly.array);
    // }
    // console.log(flies.attributes.position.array);

    flymesh.position.y = Math.sin(elapsedTime * .5)
    flymesh.position.z = Math.sin(elapsedTime * .5)
    flymesh.position.z = Math.sin(elapsedTime * .5)


    // box.rotation.y += .1
    // const node = document.createTextNode(renderer.info.render.triangles)
    // document.querySelector(".triangle_content").textContent = (renderer.info.render.triangles)
    // document.querySelector(".line").textContent = (renderer.info.render.lines)
    // document.querySelector(".calls").textContent = (renderer.info.render.calls)

    stats.end()
    window.requestAnimationFrame(tick)
}

tick()
