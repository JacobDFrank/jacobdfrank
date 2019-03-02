// gulp watch --cwd school/IGME590/assignments/CyclicAutomata

var width = window.innerWidth;
var height = window.innerHeight;

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane;
var rt1, rt2; // render targets
var uniforms1, renderer;

var clock;
var clockSpeed = 1.0;

var mesh, material;

//dat.gui stuff
var params = {
    shaderVariation: 'fragmentShaderDefault',
    shaderChoice: '1'
};

// var fragShaderString = document.getElementById(params.shaderVariation).textContent;

var gui = new dat.GUI();

// var controller =
// gui.add(params, 'shaderVariation', {
//     'Default': 'fragmentShaderDefault',
//     'Paint': 'fragmentShaderPaint',
//     'Rain': 'fragmentShaderRain',
//     'Rows': 'fragmentShaderRows',
//     'Moths': 'fragmentShaderMoths',
//     'Diagonal': 'fragmentShaderDiagMoths',
//     'DownRain': 'fragmentShaderDownRain',
// });

var shaderController = gui.add(params, 'shaderChoice', {
    'Default': '1',
    'Upwards': '2',
    'Diag': '3',
    'Moths': '4',
    'Rows': '5',
    'Columns': '6',
    'Wind': '7',
});

// controller.onChange(function(value) {
//     material.fragmentShader = document.getElementById(params.shaderVariation).textContent;
//     material.needsUpdate = true;
// });

// controller.onChange(function(value) {
//     material.fragmentShader = document.getElementById(params.shaderVariation).textContent;
//     material.needsUpdate = true;
// });

clock = new THREE.Clock();

init();
animate();

function setupScreen() {
    uniforms1 = {
        time: {
            value: 0.0
        },
        resolution: {
            value: new THREE.Vector2()
        },
        tPrev: {
            value: rt1
        },
        cellForm: {
            value: 1
        }
    };

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 3);

    camera.position.z = 1;

    var geometry = new THREE.PlaneGeometry(2, 2, 1);

    // Needed to render texture to screen and used for input later
    // rt1 & rt2
    rt1 = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter, //pixelates as you scale up
        magFilter: THREE.NearestFilter, //pixelates as you scale up
    });
    rt2 = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter, //pixelates as you scale up
        magFilter: THREE.LinearFilter, //pixelates as you scale up
    });

    material = new THREE.ShaderMaterial({
        uniforms: uniforms1,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById(params.shaderVariation).textContent
    });
    mesh = (new THREE.Mesh(geometry, material));

    scene.add(mesh);
}

function init() {
    setupScreen();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // sending the resolution to the canvas for render
    var canvas = renderer.domElement;

    // Setting the uniform vector equal to the correct canvas height and width
    uniforms1.resolution.value.x = canvas.width;
    uniforms1.resolution.value.y = canvas.height;

    document.body.appendChild(renderer.domElement);
    //adding the canvas element to the dom
}

function render() {
    renderer.render(scene, camera);
    renderer.render(scene, camera, rt1, true);

    // using it as input
    var temp = rt2;
    rt2 = rt1;
    rt1 = temp
    uniforms1.tPrev.value = rt2;
}
console.log(params.shaderChoice + 'test');
// animate sequence
function animate() {
    requestAnimationFrame(animate);

    uniforms1.cellForm.value = params.shaderChoice;
    uniforms1.time.value += clockSpeed * clock.getDelta(); //updating the unforms
    render();
}
