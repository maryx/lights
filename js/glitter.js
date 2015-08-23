const COLS = 100; // x, the horizontal default 100
const ROWS = 50; // y, the vertical default 40
const SEED_FREQUENCY = 3; // default 3
const RENDER_RATE = 1000;
const ALGORITHM_NUM = getRandomNumber();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.noZoom = true;
const mouse = new THREE.Vector2();
const clock = new THREE.Clock();

function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
        
window.addEventListener( 'mousemove', onMouseMove, false );

var light = new THREE.HemisphereLight(0xffffff, 0x555555, 1);
light.position.set(100, 10, 100).normalize();
scene.add(light)

const cubeGeometry = new THREE.OctahedronGeometry(0.5, 0);

var cubes = [];
for (var i = 0; i < COLS; i++) {
    var cubeCol = [];
    for (var j = 0; j < ROWS; j++) {
        var material = new THREE.MeshPhongMaterial({color: getColor(i),
                                                    specular: 0x000000,
                                                    emissive: 0x000000,
                                                    shininess: 100,
                                                    envMaps: 'refraction',
                                                   });
        var cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.x = i;
        cube.position.y = j;
        cube.position.z = getRandomNumber(); // This does the tilting
        cubeCol.push(cube);
    }
    cubes.push(cubeCol);
}

cubes.forEach(function(cubeCol) {
    cubeCol.forEach(function(cube) {
        scene.add(cube);
    });
});

camera.position.z = 50;
camera.position.y = 30;
camera.position.x = 50;

function scroll(event) {
    event.preventDefault();
    camera.position.x += event.deltaX/100
    camera.position.z += event.deltaY/100;

    if (camera.position.x <= 0) {
        camera.position.x = 99;
    }
    else if (camera.position.x >= 100) {
        camera.position.x = 1
    }
    else if (camera.position.z <= 25) {
        camera.position.z = 74;
    }
    else if (camera.position.z >= 75) {
        camera.position.z = 26
    }
    return;

};

var algorithm = function(){
    return;
    // if (ALGORITHM_NUM % 2 === 0) {
    //    return gameOfLife();
    // } else {
    //     return onOff();
    // }
};

// Updates logic
setInterval(function(){
    algorithm();
}, RENDER_RATE);

setInterval(function() {
    newCubes.forEach(function(newCube) {
        if (newCube.position.x > 100 || newCube.position.x < 0
            || newCube.position.y > 100 || newCube.position.y < 0
            || newCube.position.z > 100 || newCube.position.z < 0
            || Math.abs(newCube.oldPositionX - newCube.position.x) > 5) {
            scene.remove(newCube);
        } else {
            newCube.translateX(sign());
            newCube.translateY(sign());
            newCube.translateZ(sign());
            newCube.material.color = getRGBColor();
        }
    });
}, 100);

var INTERSECTED;
var newCubes = []; // Always have at most 2 sets of sparkles going on

function sparkle() {
    if (newCubes.length < 20) {
        var littleGeometry = new THREE.OctahedronGeometry(0.2, 0);
        var material = new THREE.MeshBasicMaterial();
        for (var i = 0; i < 10; i++) {
            var newCube = new THREE.Mesh(littleGeometry, material);
            newCube.oldPositionX = INTERSECTED.position.x; // Use this to determine when to kill cube
            newCube.position.x = INTERSECTED.position.x;
            newCube.position.y = INTERSECTED.position.y;
            newCube.position.z = INTERSECTED.position.z;
            newCubes.push(newCube);
            scene.add(newCube);
        }
    } else if (newCubes.length === 20) {
        for (var i = 0; i < 10; i++) {
            var newCube = newCubes[i];
            newCube.oldPositionX = INTERSECTED.position.x; // Use this to determine when to kill cube
            newCube.position.x = INTERSECTED.position.x;
            newCube.position.y = INTERSECTED.position.y;
            newCube.position.z = INTERSECTED.position.z;
            scene.add(newCube);
        }
    }
    return;
}

function getRGBColor() {
    return {r: Math.random(), b: Math.random(), g: Math.random()};
}

const render = function () {
    camera.updateMatrixWorld();
    // find intersections
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            INTERSECTED.material.color = getRGBColor();
            sparkle();
        }
    } else {
        INTERSECTED = null;
    }
    // May need renderer.clear();
    // renderer.clear();
    cubes.forEach(function(cubeCol) {
        cubeCol.forEach(function(cube) {
            cube.rotation.x += getRandomNumber() * 0.0001;
            cube.rotation.y += 0.0006;
            cube.rotation.z += 0.0006;
        });
    });
    
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};


onOff(SEED_FREQUENCY); // Get a random alignment first
document.addEventListener('wheel', scroll, false);
render();

function sign() {
    if (getRandomNumber() % 2 === 0) return 1; return -1;
}

/*********************
***   ALGORITHMS   ***
*********************/

// Just shows all of them
function all() {
    return;
}
// See https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
function gameOfLife() {
    cubes.forEach(function(cubeCol) {
        cubeCol.forEach(function(cube) {
            cube.wasVisible = cube.material.visible;
        });
    });
    cubes.forEach(function(cubeCol) {
        cubeCol.forEach(function(cube) {
            var x = cube.position.x;
            var y = cube.position.y;
            var liveCells = getNorth(x, y) + getNorthEast(x, y) +
                getEast(x, y) + getSouthEast(x, y) +
                getSouth(x, y) + getSouthWest(x, y) +
                getWest(x, y) + getNorthWest(x, y);
            if (cube.material.visible && (liveCells < 2 || liveCells > 3)) { // live cell
                cube.material.visible = false;
            } else if (!cube.material.visible && liveCells === 3) { // dead cell
                cube.material.visible = true;
            }
        });
    });
}

function seed() {
    cubes.forEach(function(cubeCol) {
        cubeCol.forEach(function(cube) {
            if (cube.position.x === 0 && cube.position.y === 38) {
                cube.material.visible = true;
            }
            else if (cube.position.x === 1 && cube.position.y === 37) {
                cube.material.visible = true;
            }
            else if (cube.position.x === 2 && cube.position.y === 37) {
                cube.material.visible = true;
            }
            else if (cube.position.x === 2 && cube.position.y === 38) {
                cube.material.visible = true;
            }
            else if (cube.position.x === 2 && cube.position.y === 39) {
                cube.material.visible = true;
            }

            else {
                cube.material.visible = false;
            }
        });
    });
}

// Simply renders about SEED_FREQUENCY% on at random
function onOff(seed) {
    if (seed === undefined) {
        seed = 2;
    }
    cubes.forEach(function(cubeCol) {
        cubeCol.forEach(function(cube) {
            if (getRandomNumber() % seed === 0) {
                cube.material.visible = true;
            } else {
                cube.material.visible = false;
            }
        });
    });
}

// returns 1 if the light is visible; else returns 0;
// x is the column. y is the row
function getNorth(x, y) {
    if (y-1 < 0) {
        return false;
    }
    return (cubes[x][y-1].wasVisible);
}

function getNorthEast(x, y) {
    if (x+1 >= COLS || y-1 < 0) {
        return false;
    }
    return (cubes[x+1][y-1].wasVisible);
}

function getEast(x, y) {
    if (x+1 >= COLS) {
        return false;
    }
    return (cubes[x+1][y].wasVisible);
}

function getSouthEast(x, y) {
    if (x+1 >= COLS || y+1 >= ROWS) {
        return false
    }
    return (cubes[x+1][y+1].wasVisible);
}

function getSouth(x, y) {
    if (y+1 >= ROWS) {
        return false;
    }
    return (cubes[x][y+1].wasVisible);
}

function getSouthWest(x, y) {
    if (x-1 < 0 || y+1 >= ROWS) {
        return false;
    }
    return (cubes[x-1][y+1].wasVisible);
}

function getWest(x, y) {
    if (x-1 < 0) {
        return false;
    }
    return (cubes[x-1][y].wasVisible);
}

function getNorthWest(x, y) {
    if (x-1 < 0 || y-1 < 0) {
        return false;
    }
    return (cubes[x-1][y-1].wasVisible);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function getColor(i) {
    //    return 0xffb900;
//    return 0x69696;
    return Math.floor(16777215 * Math.random());
    // switch (i % 10) {
    // case 0: return 0xFF5566;
    // case 1: return 0xFF6666;
    // case 2: return 0xFF6677;
    // case 3: return 0xFF7777;
    // case 4: return 0xFF7788;
    // case 5: return 0xFF8888;
    // case 6: return 0xFF8899;
    // case 7: return 0xFF9999;
    // case 8: return 0xFFAAAA;
    // case 9: return 0xFFAABB;
    // default: return 0xFF5566;
    // }
};
