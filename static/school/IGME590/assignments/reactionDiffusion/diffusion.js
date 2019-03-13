    console.log("diffusion running");

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let width = canvas.width = 200;
    let height = canvas.height = 200;

    let fps = 0;

    let page = {}
    page.x = width / 2;
    page.y = height / 2;


    // diffusion parameters
    let t = 1,
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

    function render() {
        window.requestAnimationFrame(render);
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
        let imgData = ctx.getImageData(0, 0, width, height);
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
        ctx.putImageData(imgData, 0, 0);

        swap();

    }

    window.requestAnimationFrame(render);



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
