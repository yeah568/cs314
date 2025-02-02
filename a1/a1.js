/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vjan2018
//  Assignment 1 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Assignment 1 James');

//  another print example
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x6698ff); // set background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////	
// WORLD COORDINATE FRAME
/////////////////////////////////////	

var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////	
// FLOOR with texture
/////////////////////////////////////	

floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light 
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial( {color: 0xffff00} ));
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html] 
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
var mccMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
  // Cube parameters: width (x), height (y), depth (z), 
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
// using THREE.MeshFaceMaterial() in the constructor below
// causes the mesh to use the materials stored in the geometry
mcc = new THREE.Mesh( mccGeometry, mccMaterials );
mcc.position.set(-2,0,0);
scene.add( mcc );	

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:    
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
// global variables are bad
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

// second torus

const torusGeometery2 = new THREE.TorusGeometry(1.2, 0.4, 10, 20);
const torus2 = new THREE.Mesh(torusGeometry, diffuseMaterial);
torus2.position.set(4.8, 0, 0);
torus2.rotation.set(Math.PI/2, 0, 0);
scene.add(torus2);

/////////////////////////////////////
//  CUSTOM OBJECT 
////////////////////////////////////

// var geom = new THREE.Geometry(); 
// var v0 = new THREE.Vector3(0,0,0);
// var v1 = new THREE.Vector3(3,0,0);
// var v2 = new THREE.Vector3(0,3,0);
// var v3 = new THREE.Vector3(3,3,0);

// geom.vertices.push(v0);
// geom.vertices.push(v1);
// geom.vertices.push(v2);
// geom.vertices.push(v3);

// geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
// geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
// geom.computeFaceNormals();

// customObject = new THREE.Mesh( geom, diffuseMaterial2 );
// customObject.position.set(0, 0, -2);
// scene.add(customObject);

const geom = new THREE.Geometry();
const v0 = new THREE.Vector3(0, 0, 0);
const v1 = new THREE.Vector3(3, 0, 0);
const v2 = new THREE.Vector3(0, 0, 3);
const v3 = new THREE.Vector3(3, 0, 3);
const v4 = new THREE.Vector3(1.5, 1.5, 1.5);

geom.vertices.push(v0, v1, v2, v3, v4);

geom.faces.push(new THREE.Face3(0, 3, 1));
geom.faces.push(new THREE.Face3(2, 3, 0));
geom.faces.push(new THREE.Face3(1, 0, 4));
geom.faces.push(new THREE.Face3(3, 1, 4));
geom.faces.push(new THREE.Face3(2, 3, 4));
geom.faces.push(new THREE.Face3(0, 2, 4));
geom.computeFaceNormals();

const pyramidMaterial = new THREE.MeshLambertMaterial( {color: 0xff8c00, side: THREE.DoubleSide } );

const customObject = new THREE.Mesh(geom, pyramidMaterial);
customObject.position.set(0, 0, -4);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial();

// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];
})


//   NOTE:  Unfortunately, the following loading code does not easily allow for multiple 
//          instantiations of the OBJ geometry.

function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = worldFrame;
    scene.add(object);

  }, onProgress, onError);
}

  // now load the actual armadillo
loadOBJ('obj/armadillo.obj', armadilloMaterial, 1, 0,0,0, 0,Math.PI,0);

///////////////////////////////////////////////////////////////////////////////////////
// stacks on stacks of cubes
///////////////////////////////////////////////////////////////////////////////////////

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const cube1 = new THREE.Mesh(cubeGeometry, new THREE.MeshLambertMaterial( {color: 0xffffff}));
const cube2 = new THREE.Mesh(cubeGeometry, new THREE.MeshLambertMaterial( {color: 0x00ff00}));
const cube3 = new THREE.Mesh(cubeGeometry, new THREE.MeshLambertMaterial( {color: 0xffff00}));

cube1.position.set(-3, 0, -3);
cube2.position.set(-3, 1, -3);
cube3.position.set(-3, 2, -3);

cube2.rotation.y = Math.PI / 6;
cube3.rotation.y = 2 * Math.PI / 6 
scene.add(cube1, cube2, cube3);


///////////////////////////////////////////////////////////////////////////////////////
// "creative" stuff
///////////////////////////////////////////////////////////////////////////////////////
// MATERIALS
const dynamicMaterial = new THREE.ShaderMaterial({
  uniforms:{
      lightPosition:{
         type:"v3",
         value: new THREE.Vector3(0.0, 0.0, -1.0)
      }
   },
});

// LOAD SHADERS
const dynamicShaderFiles = [
  'glsl/dynamic.vs.glsl',
  'glsl/dynamic.fs.glsl'
];

new THREE.SourceLoader().load(dynamicShaderFiles, function(shaders) {
  dynamicMaterial.vertexShader = shaders['glsl/dynamic.vs.glsl'];
  dynamicMaterial.fragmentShader = shaders['glsl/dynamic.fs.glsl'];

  renderTorusKnot(dynamicMaterial);
});

function renderTorusKnot(material) {
  const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8);
  const torusKnot = new THREE.Mesh( torusKnotGeometry, material );
  torusKnot.position.set(-3, 1, 3);
  scene.add( torusKnot );
}

const rainbowMaterial = new THREE.ShaderMaterial();
const rainbowShaderFiles = [
  'glsl/rainbow.vs.glsl',
  'glsl/rainbow.fs.glsl'
];
new THREE.SourceLoader().load(rainbowShaderFiles, function(shaders) {
  rainbowMaterial.vertexShader = shaders['glsl/rainbow.vs.glsl'];
  rainbowMaterial.fragmentShader = shaders['glsl/rainbow.fs.glsl'];

  renderDodecahedron(rainbowMaterial);
});

function renderDodecahedron(material) {
  const dodecahedronGeometry = new THREE.DodecahedronGeometry();
  const dodecahedron = new THREE.Mesh( dodecahedronGeometry, material );
  dodecahedron.position.set(4, 1, 3);
  scene.add( dodecahedron );
}


const randomMaterial = new THREE.ShaderMaterial();
const randomShaderFiles = [
  'glsl/random.vs.glsl',
  'glsl/random.fs.glsl'
];
new THREE.SourceLoader().load(randomShaderFiles, function(shaders) {
  randomMaterial.vertexShader = shaders['glsl/random.vs.glsl'];
  randomMaterial.fragmentShader = shaders['glsl/random.fs.glsl'];

  renderIcosahedron(randomMaterial);
});

function renderIcosahedron(material) {
  const icosahedronGeometry = new THREE.IcosahedronGeometry();
  const icosahedron = new THREE.Mesh( icosahedronGeometry, material );
  icosahedron.position.set(1, 1, 3);
  scene.add( icosahedron );
}

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    light.position.y += 0.1;
  } else if (keyboard.pressed("S"))
    light.position.y -= 0.1;
  if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;

  light.position.x = THREE.Math.clamp(light.position.x, -5, 5);
  light.position.y = THREE.Math.clamp(light.position.y, -5, 5);
  sphere.position.set(light.position.x, light.position.y, light.position.z);
  dynamicMaterial.uniforms.lightPosition.value = new THREE.Vector3(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();

