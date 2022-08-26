import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({

  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Torus
const torusgeometry = new THREE.TorusGeometry(10, 3, 16, 120);
const material = new THREE.MeshStandardMaterial({color:0xFF6457, wireframe:true});
const torus = new THREE.Mesh(torusgeometry, material);

scene.add(torus);

//Torusknot
const tkgeometry = new THREE.TorusKnotGeometry(15, 3, 25, 10);
const Torusknot = new THREE.Mesh(tkgeometry, material);

scene.add(Torusknot);

//Cone
const conegeometry = new THREE.ConeGeometry(10, 30, 16, 40);
const cone = new THREE.Mesh(conegeometry, material);

scene.add(cone);

//Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,2,0);

const ambLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambLight);

//Stars
function addStar() {

  const geometry = new THREE.SphereGeometry(0.25, 12, 12);
  const material = new THREE.MeshToonMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x,y,z);
  scene.add(star)

}

Array(2000).fill().forEach(addStar);

//Avatar Cube
const cubeTexture = new THREE.TextureLoader().load('ts-i.png');

const cube = new THREE.Mesh(

  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:cubeTexture})

);

scene.add(cube);

const moon = new THREE.Mesh(
  
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    color:0xFF6457,
    wireframe:true,
  })

);

  scene.add(moon);

  moon.position.z = 20;
  moon.position.x = 7.5;

  Torusknot.position.z = -150;
  Torusknot.position.x = -100;
  Torusknot.position.y = 100;

  cone.position.z = -75;
  cone.position.x = -45;
  cone.position.y = -35;

  cube.position.z = -5;
  cube.position.x = 2;

//Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//Move Camera
function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.02;
  moon.rotation.y += 0.03;
  moon.rotation.z += 0.02;

  cone.rotation.x += 0.01;
  cone.rotation.z += 0.015;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera;
moveCamera();

//Object animation
function animate() {

  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.0025;
  torus.rotation.z += 0.01;

  Torusknot.rotation.x += 0.005;
  Torusknot.rotation.y += 0.0025;
  Torusknot.rotation.z += 0.005;

  moon.rotation.x += 0.005;

  cone.rotation.y += 0.03;

  //SEIZURE MACHINE || !!BE CAREFUL!! ||
  //material.color = new THREE.Color(Math.random() * 0xFFFFFF);

  renderer.render(scene, camera);

}

animate();

