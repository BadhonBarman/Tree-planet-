const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight,
  0.1,1000);

camera.position.set(15,50,15)

// const axes = new THREE.AxesHelper(100);
// scene.add(axes);


// const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 );
// const boxmaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh( boxgeometry, boxmaterial );
// scene.add(cube);
// cube.position.set(0,3,0);





var radius = 35;
var treeAmount = 200; 

function planet(r) {
  const circlegeometry = new THREE.SphereGeometry(r,100,100);
  const circlematerial = new THREE.MeshBasicMaterial( { color: 0x634b35, wireframe:false } );
  const circle = new THREE.Mesh( circlegeometry, circlematerial );
  circle.position.set(0,0,0);
  scene.add(circle);
}


// Create lights, add lights to scene
var light1 = new THREE.DirectionalLight( 0xDDEED3, 1 );
var light2 = new THREE.AmbientLight(0x7D7D7D);
light1.position.set( 0, 0, 1 );

scene.add(light1);
scene.add(light2);


function trees(angles) {
  geometry = new THREE.BoxGeometry( 0.5,0.7,0.5 );
  var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
  var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
  var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
  var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );
  var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  geometry = new THREE.BoxGeometry( 0.5,0.7,0.5 );
  var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
  var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
  var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
  var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

  var stem = new THREE.Mesh(cubeGeometry, stemMaterial );
  stem.position.set(0, radius + 0.75, 0 );
  stem.scale.set( 0.3, 1.5, 0.3 );

  var leaveDark = new THREE.Mesh(cubeGeometry, leaveDarkMaterial );
  leaveDark.position.set( 0, radius + 1.2, 0 );
  leaveDark.scale.set( 1, 2, 1 );

  var leaveLight = new THREE.Mesh(cubeGeometry, leaveLightMaterial );
  leaveLight.position.set( 0, radius + 1.2, 0 );
  leaveLight.scale.set( 1.4, 0.5, 1.4 );

  var tree = new THREE.Group();
  tree.add( leaveDark );
  tree.add( leaveLight );
  tree.add( stem );  

  tree.rotation.set(angles[0], angles[1], angles[2])
  return tree

};

// Generate a random angle triple from [0, 5PI2
function randomAngleTriple() {
  return [
    5 * Math.PI * Math.random(),
    5 * Math.PI * Math.random(),
    5 * Math.PI * Math.random()
  ]
}

function growTrees(n) {
  for (var i = 0; i < n; i++) {
    scene.add(trees(randomAngleTriple()))
  }
}


function init() {
  // Orbital controls (rotation)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();
  planet(radius);
  growTrees(treeAmount);
}


function animate() {
  requestAnimationFrame(animate);
  controls.update() ;
  renderer.render(scene, camera);
};

// responsive 
window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();
