    console.log("diffusion running");

    canvas = document.getElementById('gl');
    canvas.width = canvas.height = 256;
    gl = canvas.getContext('webgl');

    textureCanvas = document.getElementById('texture');
    textureCanvas.width = textureCanvas.height = 256;
    textureCtx = textureCanvas.getContext('2d');


    // textureCanvas.style.display ='none';

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let width = canvas.width;
    let height = canvas.height;

    // define drawing area of canvas. bottom corner, width / height
    gl.viewport(0, 0, gl.drawingBufferWidth * 2, gl.drawingBufferHeight * 2);
    // create a buffer object to store vertices
    buffer = gl.createBuffer();
    // point buffer at graphic context's ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    var triangles = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    // initialize memory for buffer and populate it. Give
    // WebGL hint contents will not change dynamically.
    gl.bufferData(gl.ARRAY_BUFFER, triangles, gl.STATIC_DRAW);

    let fps = 0;

    let page = {};
    page.x = width / 2;
    page.y = height / 2;


    // diffusion parameters
    let t = 2,
        dA = 1,
        dB = .5,
        feed = .055,
        k = 0.061;

    let grid = [],
        next = [];


    let radianConvert = Math.PI / 180;


    //make grid
    for (let x = 0; x < width; x += 1) {
        grid[x] = [];
        next[x] = [];
        for (let y = 0; y < height; y += 1) {
            grid[x][y] = [];
            grid[x][y][0] = 1;
            grid[x][y][1] = 0;

            next[x][y] = [];
            next[x][y][0] = 1;
            next[x][y][1] = 0;
        }
    }
    //diffuse
    for (let r = 0; r < 1; r++) {
        for (let i = 0; i < 360; i += 30) {
            // Size in grid
            for (let j = 20; j < 35; j++) {
                let x = Math.floor(page.x + j * Math.cos(i * radianConvert));
                let y = Math.floor(page.y + j * Math.sin(i * radianConvert));
                grid[x][y][1] = 1;
            }
        }
    }

    function canvasDraw() {
        window.requestAnimationFrame(canvasDraw);
        fps = fps + 2000;

        for (let x = 1; x < width - 1; x += 1) {
            for (let y = 1; y < height - 1; y += 1) {

                let a = grid[x][y][0];
                let b = grid[x][y][1];
                next[x][y][0] = (a + (dA * laplace(x, y, 0)) - (a * b * b) + (feed * (1 - a))) * t;
                next[x][y][1] = (b + (dB * laplace(x, y, 1)) + (a * b * b) - ((k + feed) * b)) * t;

            }

        }

        // https://www.w3schools.com/tags/canvas_createimagedata.asp
        let imgData = textureCtx.getImageData(0, 0, width, height);
        for (let x = 1; x < width - 1; x += 1) {
            for (let y = 1; y < height - 1; y += 1) {

                let colorMorph = Math.floor((next[x][y][0] - next[x][y][1]) * 255);

                let red = (155 - colorMorph);
                let green = (65 - colorMorph);
                let blue = (255 - colorMorph);

                let i = (x + y * width) * 4;

                imgData.data[i + 0] = blue;
                imgData.data[i + 1] = green;
                imgData.data[i + 2] = red;
                imgData.data[i + 3] = 255;
            }
        }
        textureCtx.putImageData(imgData, 0, 0);

        swap();

    }

    window.requestAnimationFrame(canvasDraw);



    function laplace(x, y, zo) {

        let m = 0.2;
        let r = 0.0499;
        let sum = 0;

        sum += grid[x][y][zo] * -1;
        sum += grid[x - 1][y][zo] * m;
        sum += grid[x + 1][y][zo] * m;
        sum += grid[x][y + 1][zo] * m;
        sum += grid[x][y - 1][zo] * m;
        sum += grid[x - 1][y - 1][zo] * r;
        sum += grid[x + 1][y - 1][zo] * r;
        sum += grid[x - 1][y + 1][zo] * r;
        sum += grid[x + 1][y + 1][zo] * r;

        return sum;
    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function swap() {
        let temp = grid;
        grid = next;
        next = temp;
    }



    function randomIntFromInterval(mn, mx) {
        return Math.floor(Math.random() * (mx - mn + 1) + mn);
    }

    vertexSource = document.getElementById('vertex').text;
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    // create fragment shader
    fragmentSource = document.getElementById('fragment').text;
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    // create shader program
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);


    var position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    program.textureCoordAttribute = gl.getAttribLocation(program, 'aTextureCoord');
    gl.enableVertexAttribArray(program.textureCoordAttribute);
    gl.vertexAttribPointer(program.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    // the sampler will automatically pass in the bound texture
    program.samplerUniform = gl.getUniformLocation(program, 'uSampler');
    gl.uniform1i(program.samplerUniform, 0);

    texture = gl.createTexture();


    getTexture = function() {
            // canvas draws with the upper-left hand corner as {0,0}, while WebGL
            // draws with the lower-left corner at {0,0}. Therefore we need to flip
            // the y-axis when we read in our canvas pixel data.
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
            // use linear interpolation to generate sub-pixel data
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            };


            webglSetup = function() {
                // sets default background color
                gl.clearColor(1.0, 1.0, 1.0, 1.0);
                // clear color buffer
                gl.clear(gl.COLOR_BUFFER_BIT);
            }

            render = function() {
                window.requestAnimationFrame(render, canvas);
                webglSetup();
                // this is your draw method...
                canvasDraw();
                getTexture();
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }
