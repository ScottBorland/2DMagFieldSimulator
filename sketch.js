

northPoles = [];
southPoles = [];
particles = [];

var showDir = false;
var proximity = 10;
var randomDispersion = false;

var mouseDragging = false;

var counter = 0;
//scalers
var strengthScaler = 50;
var distanceScaler = 500;
var velMultiplier = 10;

var showPoles = true;

let scene, camera, renderer, sphere, controls;

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true});

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls( camera, renderer.domElement );

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  //const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
  const texture = new THREE.TextureLoader().load('textures/MilkyWay/dark-s_pz.jpg');
  const material = new THREE.MeshBasicMaterial({map : texture});

  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 100;
  //controls.update();
}

function draw(){
  sphere.position.x = 100;
  sphere.position.y = 0;
  sphere.position.z = 0;
}

function setup() {
  window.addEventListener('resize', onWindowResize, false);

  init();
  animate();
}

function animate(){
  requestAnimationFrame(animate);

  //controls.update();

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}
// function draw(){
// window.addEventListener('resize', onWindowResize, false);
//
// init();
// animate();
// }

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function showPolesFn(){
  if(showPoles) showPoles = false;
  else if(!showPoles) {
    showPoles = true;
    for(var i = 0; i < northPoles.length; i++){
      northPoles[i].erased = false;
    }
    for(var i = 0; i < southPoles.length; i++){
      southPoles[i].erased = false;
    }
  }
}

function disperseParticles(){
  var particlePositions = [];
  if(randomDispersion == false){
  for(var i = 10; i < windowWidth - 10; i += proximity){
    for(var j = 10; j < windowHeight -10; j += proximity){
      newPos = createVector(i, j);
      particlePositions.push(newPos);
      //console.log(particlePositions);
    }
  }
}else{
  for(var i = 0; i < 10000; i ++){
    newPos = createVector(random(windowWidth), random(windowHeight));
    particlePositions.push(newPos);
  }
}
  for(var k = 0; k < particlePositions.length; k++){
    var newParticle = new particle(particlePositions[k].x, particlePositions[k].y);
    particles.push(newParticle);
  }
}

function roundVector(vector){
  let x = vector.x;
  let y = vector.y;
  x = Number(x.toFixed(2));
  y = Number(y.toFixed(2));
  return createVector(x, y);
}


function paintPicture(n, s){
  clearCanvas();
  showPoles = false;
  for(var i = 0; i < n; i++){
    northPoles.push(new northPole(random(windowWidth), random(windowHeight), random(400)));
  }
  for(var i = 0; i < s; i++){
    southPoles.push(new southPole(random(windowWidth), random(windowHeight), random(400)));
  }
  disperseParticles();
}

// function draw() {
//
//     if(EditMode){
//       background(backgroundColour);
//     }
//
//     for(var i = northPoles.length -1; i >= 0; i--){
//     northPoles[i].display();
//     northPoles[i].drag();
//     }
//     for(var i = southPoles.length -1; i >= 0; i--){
//     southPoles[i].display();
//     southPoles[i].drag();
//     }
//     for(var i = particles.length -1; i >= 0; i--){
//
//    if(particles[i].finished == false){
//           particles[i].update();
//           particles[i].behaviours();
//         particles[i].show();
//     }
//     counter++;
//     if(counter > 100){
//         counter = 0;
//     }
//     if(particles[i].finished == true){
//       particles.splice(i, 1);
//     }
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth -15, windowHeight - 200);
}

function clearTrails(){
    particles.splice(0, particles.length);
    background(backgroundColour);
}

function clearCanvas(){
    northPoles.splice(0, northPoles.length);
    southPoles.splice(0, southPoles.length);
    particles.splice(0, particles.length);
    background(backgroundColour);
}

function showDirection(){
  showDir = (showDir == true) ? (showDir = false) : (showDir = true);
}

function addNorth(){
    northPoles.push(new northPole(windowWidth / 2 + random(50), (windowHeight -200) / 2 + random(50), 20));
}

function addSouth(){
    southPoles.push(new southPole(windowWidth /2 + random(50), (windowHeight -200) / 2 + random(50), 20));
}

function preset1(){
    clearCanvas();
    northPoles[0] = new northPole(windowWidth / 4 +220, windowHeight / 2 - 100, 100);
    southPoles[0] = new southPole(windowWidth / 1.47  - 100, windowHeight / 2 - 100, 100);
}

function preset2(){
    clearCanvas();
    northPoles[0] = new northPole(windowWidth / 4 +220, windowHeight / 2 - 100, 100);
    northPoles[1] = new northPole(windowWidth / 1.47  - 100, windowHeight / 2 - 100, 100);
}

function mouseReleased(){
    for(var i = 0; i < northPoles.length; i++){
      northPoles[i].dragging = false;
    }
    for(var i = 0; i < southPoles.length; i++){
        southPoles[i].dragging = false;
    }
    mouseDragging = false;
}
