const COLS = 100; // x, default 100
const ROWS = 120; // z, default 100
const LIGHT_HEIGHT = 200;
const RENDER_RATE = 500;
const SEED_FREQUENCY = 3; // default 3
const ALGORITHM_NUM = getRandomNumber();
const ROW_PADDING = 5;
const PADDING = 70;
const BUILDING_DEPTH = 40;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new THREE.OrbitControls(camera, renderer.domElement);

var concreteMaterial = new THREE.MeshBasicMaterial({color: 0x302b1e});

var roofGeometry = new THREE.BoxGeometry(COLS+PADDING, BUILDING_DEPTH, ROWS+ROW_PADDING);
var roof = new THREE.Mesh(roofGeometry, concreteMaterial);
roof.position.x = COLS/2;
roof.position.y = LIGHT_HEIGHT + BUILDING_DEPTH/2;
roof.position.z = ROWS/2;
scene.add(roof);

var sideGeometry = new THREE.BoxGeometry(30, LIGHT_HEIGHT, 20);
var leftSide = new THREE.Mesh(sideGeometry, concreteMaterial);
leftSide.position.x = -5;
leftSide.position.y = LIGHT_HEIGHT/2 + 30;
leftSide.position.z = ROWS;
scene.add(leftSide);

var rightSide = new THREE.Mesh(sideGeometry, concreteMaterial);
rightSide.position.x = COLS + 5;
rightSide.position.y = LIGHT_HEIGHT/2 + 30;
rightSide.position.z = ROWS;
scene.add(rightSide);

var backGeometry = new THREE.BoxGeometry(COLS+PADDING, LIGHT_HEIGHT+BUILDING_DEPTH, 100);
var back = new THREE.Mesh(backGeometry, concreteMaterial);
back.position.x = COLS/2;
back.position.y = 150;
back.position.z = ROWS-200;
scene.add(back);


const geometry = new THREE.OctahedronGeometry(0.3, 0);
var lights = [];
for (var i = 0; i < COLS; i++) {
    var lightCol = [];
    for (var j = 0; j < ROWS; j++) {
        var material = new THREE.PointCloudMaterial( { color: getColor(i), opacity: 0.6 } );
        var light = new THREE.Mesh(geometry, material);
        light.position.x = i;
        light.position.y = LIGHT_HEIGHT;
        light.position.z = j;
        lightCol.push(light);
    }
    lights.push(lightCol);
}

lights.forEach(function(lightCol) {
    lightCol.forEach(function(light) {
        scene.add(light);
    });
});

camera.position.z = 500;
camera.position.y = 30;
camera.position.x = 50;

var algorithm = function(){
    return;
//    return gameOfLife();
    // if (ALGORITHM_NUM % 2 === 0) {
    //     return gameOfLife();
    // } else {
    //     return onOff();
    // }
};

setInterval(function(){
    algorithm();
}, RENDER_RATE);

const render = function () {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

//gliderGun();
onOff(SEED_FREQUENCY); // Get a random alignment first
render();

function gliderGun() {
    lights.forEach(function(lightCol) {
        lightCol.forEach(function(light) {
            // First square
            if (light.position.x === 1 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 1 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 2 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 2 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }

            // Circle thing
            else if (light.position.x === 11 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 11 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 11 && light.position.y === ROWS-7) {
                light.material.visible = true;
            }
            else if (light.position.x === 12 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            else if (light.position.x === 12 && light.position.y === ROWS-8) {
                light.material.visible = true;
            }
            else if (light.position.x === 13 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 13 && light.position.y === ROWS-9) {
                light.material.visible = true;
            }
            else if (light.position.x === 14 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 14 && light.position.y === ROWS-9) {
                light.material.visible = true;
            }
            else if (light.position.x === 15 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 16 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            else if (light.position.x === 16 && light.position.y === ROWS-8) {
                light.material.visible = true;
            }
            else if (light.position.x === 17 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 17 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 17 && light.position.y === ROWS-7) {
                light.material.visible = true;
            }
            else if (light.position.x === 18 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }

            // Glider thing
            else if (light.position.x === 21 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 21 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            else if (light.position.x === 21 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 22 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 22 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            else if (light.position.x === 22 && light.position.y === ROWS-5) {
                light.material.visible = true;
            }
            else if (light.position.x === 23 && light.position.y === ROWS-2) {
                light.material.visible = true;
            }
            else if (light.position.x === 23 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 25 && light.position.y === ROWS-1) {
                light.material.visible = true;
            }
            else if (light.position.x === 25 && light.position.y === ROWS-2) {
                light.material.visible = true;
            }
            else if (light.position.x === 25 && light.position.y === ROWS-6) {
                light.material.visible = true;
            }
            else if (light.position.x === 25 && light.position.y === ROWS-7) {
                light.material.visible = true;
            }

            // Last square
            else if (light.position.x === 35 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 35 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            else if (light.position.x === 36 && light.position.y === ROWS-3) {
                light.material.visible = true;
            }
            else if (light.position.x === 36 && light.position.y === ROWS-4) {
                light.material.visible = true;
            }
            
            else {
                light.material.visible = false;
            }
        });
    });
}

// See https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
function gameOfLife() {
    lights.forEach(function(lightCol) {
        lightCol.forEach(function(light) {
            light.wasVisible = light.material.visible;
        });
    });
    lights.forEach(function(lightCol) {
        lightCol.forEach(function(light) {
            var x = light.position.x;
            var y = light.position.y;
            var liveCells = getNorth(x, y) + getNorthEast(x, y) +
                getEast(x, y) + getSouthEast(x, y) +
                getSouth(x, y) + getSouthWest(x, y) +
                getWest(x, y) + getNorthWest(x, y);
            if (light.material.visible && (liveCells < 2 || liveCells > 3)) { // live cell
                light.material.visible = false;
            } else if (!light.material.visible && liveCells === 3) { // dead cell
                light.material.visible = true;
            }
        });
    });
}

function seed() {
    lights.forEach(function(lightCol) {
        lightCol.forEach(function(light) {
            if (light.position.x === 0 && light.position.y === 38) {
                light.material.visible = true;
            }
            else if (light.position.x === 1 && light.position.y === 37) {
                light.material.visible = true;
            }
            else if (light.position.x === 2 && light.position.y === 37) {
                light.material.visible = true;
            }
            else if (light.position.x === 2 && light.position.y === 38) {
                light.material.visible = true;
            }
            else if (light.position.x === 2 && light.position.y === 39) {
                light.material.visible = true;
            }

            else {
                light.material.visible = false;
            }
        });
    });
}

// Simply renders about SEED_FREQUENCY% on at random
function onOff(seed) {
    if (seed === undefined) {
        seed = 2;
    }
    lights.forEach(function(lightCol) {
        lightCol.forEach(function(light) {
            if (getRandomNumber() % seed === 0) {
                light.material.visible = true;
            } else {
                light.material.visible = false;
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
    return (lights[x][y-1].wasVisible);
}

function getNorthEast(x, y) {
    if (x+1 >= COLS || y-1 < 0) {
        return false;
    }
    return (lights[x+1][y-1].wasVisible);
}

function getEast(x, y) {
    if (x+1 >= COLS) {
        return false;
    }
    return (lights[x+1][y].wasVisible);
}

function getSouthEast(x, y) {
    if (x+1 >= COLS || y+1 >= ROWS) {
        return false
    }
    return (lights[x+1][y+1].wasVisible);
}

function getSouth(x, y) {
    if (y+1 >= ROWS) {
        return false;
    }
    return (lights[x][y+1].wasVisible);
}

function getSouthWest(x, y) {
    if (x-1 < 0 || y+1 >= ROWS) {
        return false;
    }
    return (lights[x-1][y+1].wasVisible);
}

function getWest(x, y) {
    if (x-1 < 0) {
        return false;
    }
    return (lights[x-1][y].wasVisible);
}

function getNorthWest(x, y) {
    if (x-1 < 0 || y-1 < 0) {
        return false;
    }
    return (lights[x-1][y-1].wasVisible);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function getColor(i) {
    return 0xffb900;
//    return Math.floor(16777215 * Math.random());
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
