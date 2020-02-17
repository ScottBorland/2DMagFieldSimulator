

northPoles = [];
southPoles = [];
particles = [];

var showDir = false;
var proximity = 50;
var randomDispersion = false;

var counter = 0;
//scalers
var strengthScaler = 50;
var distanceScaler = 500;
var velMultiplier = 1;

var northPolesToSpawn = 2;
var southPolesToSpawn = 4;

var r;
var g;
var b;

//perlin noise variables
var xr = 0.0;
var xg = 100.0;
var xb = 2000.0;

//arbitrary values
var iR = 1000;
var iB = 100;
var iG = 1;

//rate at which perlin noise function is looped through
var speed = 0.04;

var universeSizeX = 200;
var universeSizeY = 100;
var universeSizeZ = 100;

var showPoles = true;

let scene, camera, renderer, sphere, controls;

function setup(){
  // northPoles.push(new northPole(0, 0, 0, 40));
  // southPoles.push(new southPole(80, 60, 120, 30));
  // northPoles.push(new northPole(50, 20, 50, 20));
  // southPoles.push(new southPole(200, 60, 10, 40));
  // particles.push(new particle(10, 10, 10));
  // particles.push(new particle(30, 10, 20));

  // northPoles.push(new northPole(-40, 0, 0, 40));
  // southPoles.push(new southPole(-80, 0, 0, 40));
  // northPoles.push(new northPole(80, 0, 0, 40));
  // southPoles.push(new southPole(40, 0, 0, 40));
  randomlySpawnPoles();

  renderPoles();
  spawnParticlesAroundNorthPoles();
}

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true});

  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  //scene.background = new THREE.Color("rgb(255, 255, 255)");

  camera.position.z = 100;
  controls.enableKeys = true;
  controls.keys = {
	LEFT: 37, //left arrow
	UP: 38, // up arrow
	RIGHT: 39, // right arrow
	BOTTOM: 40 // down arrow
  }
  controls.zoomSpeed = 2.5;
  controls.keyPanSpeed = 25;
  controls.update();
}


window.addEventListener('resize', onWindowResize, false);

init();
animate();

function animate(){
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
function draw(){
  // for(var i = northPoles.length -1; i >= 0; i--){
  //     northPoles[i].display();
  //     }
  // for(var i = southPoles.length -1; i >= 0; i--){
  //     southPoles[i].display()
  //    }
  for(var i = particles.length -1; i >= 0; i--){
        if(particles[i].finished == false){
            particles[i].update();
            particles[i].behaviours();
            particles[i].show();
         }
      }
  //perlin noise
  var rx = xr + iR;
  var gx = xg + iG;
  var bx = xb + iB;
  //change these values to tint the colour
  r = map(noise(rx, 1), 0, 1, 0, 255);
  g = map(noise(gx, 1), 0, 1, 0, 255);
  b = map(noise(bx, 1), 0, 1, 0, 255);
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);

  xr += speed;
  xg += speed;
  xb += speed;
  counter ++;
  // if(counter % 10 == 0){
  // spawnParticle();
  // }
}

function randomlySpawnPoles(){
  for(var i = 0; i < northPolesToSpawn; i++){
  var randX = random(-universeSizeX + 50, universeSizeX - 50);
  var randY = random(-universeSizeY + 50, universeSizeY - 50);
  var randZ = random(-universeSizeZ + 50, universeSizeZ - 50);
  northPoles.push(new northPole(randX, randY, randZ, 40));
  }
  for(var i = 0; i < southPolesToSpawn; i++){
  var randX = random(-universeSizeX + 50, universeSizeX - 50);
  var randY = random(-universeSizeY + 50, universeSizeY - 50);
  var randZ = random(-universeSizeZ + 50, universeSizeZ - 50);
  southPoles.push(new southPole(randX, randY, randZ, 40));
  }
}

function renderPoles(){
  for(var i = northPoles.length -1; i >= 0; i--){
      northPoles[i].display();
      }
  for(var i = southPoles.length -1; i >= 0; i--){
      southPoles[i].display()
     }
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function spawnParticlesAroundNorthPoles(){
  for(var i = 0; i < northPoles.length; i++){
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y - 10, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y - 10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y - 10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x +10, northPoles[i].y + 10, northPoles[i].z + 10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x +10, northPoles[i].y +10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x +10, northPoles[i].y +10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x +10, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x + 10, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);

    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y - 10, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y - 10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y - 10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x -10, northPoles[i].y + 10, northPoles[i].z + 10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x -10, northPoles[i].y +10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x -10, northPoles[i].y +10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x -10, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x - 10, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);

    var newParticle = new particle(northPoles[i].x, northPoles[i].y - 10, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y - 10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y - 10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y + 10, northPoles[i].z + 10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y +10, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y +10, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y, northPoles[i].z -10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y, northPoles[i].z +10);
    particles.push(newParticle);
    var newParticle = new particle(northPoles[i].x, northPoles[i].y, northPoles[i].z);
    particles.push(newParticle);

  }
}

function disperseParticles(){
var particlePositions = [];
for(var i = -universeSizeX; i < universeSizeX; i += proximity){
  for(var j = -universeSizeY; j < universeSizeY; j += proximity){
    for(var k = -universeSizeZ; k < universeSizeZ; k+= proximity){
      newPos = createVector(i, j, k);
      particlePositions.push(newPos);
    }
  }
}

for(var l = 0; l < particlePositions.length; l++){
  var newParticle = new particle(particlePositions[l].x, particlePositions[l].y, particlePositions[l].z);
  particles.push(newParticle);
  }
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

function spawnParticle(){
  let newparticle = new particle(random(-universeSize / 2, universeSize), random(-universeSize / 2, universeSize), random(-universeSize / 2, universeSize / 2));
  particles.push(newparticle);
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

function mouseReleased(){
    for(var i = 0; i < northPoles.length; i++){
      northPoles[i].dragging = false;
    }
    for(var i = 0; i < southPoles.length; i++){
        southPoles[i].dragging = false;
    }
    mouseDragging = false;
}
