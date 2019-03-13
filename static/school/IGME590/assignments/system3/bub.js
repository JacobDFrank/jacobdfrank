console.log('script loaded');

let showT;
let canvasScaled = false;
let ungulator = 2;
let wavelength = .3;
let radius = 100;
let animate;

const canvas = document.getElementById('bubble');
const ctx = canvas.getContext('2d');
const POLY = 20;
const STEP = 3*Math.PI/POLY;
const LENGTH = 2 * Math.PI;
const CENTER = {
  x: canvas.width/4,
  y: canvas.height/4
};

const canvasImages = {
  'khromaImg': document.createElement('canvas'),
  'floodhelpImg': document.createElement('canvas'),
  'romeImg': document.createElement('canvas'),
  'eonImg': document.createElement('canvas'),
};

var bindEvents = function() {

  document.querySelectorAll('[data-teaser]').forEach(function(teaser) {
    const canvas = document.getElementById('bubble');
    teaser.onmouseenter = function() {
      const src = teaser.getAttribute('data-teaser');
      const freq = teaser.getAttribute('data-freq');
      canvas.classList.add('tease');
      wavelength = +freq;

      let steps = 30;
      let count = 0;
      function tick() {
        if(count < steps) {
          ungulator += 5/steps;
          count++;
          requestAnimationFrame(tick);
        }
    	}
    	tick();

      initCanvas(canvasImages[src]);
    };
    teaser.onmouseleave = function() {
      let steps = 30;
      let count = 0;
      canvas.classList.remove('tease');
      wavelength = 1;

      function tick() {
        if(count < steps) {
          ungulator -= 5/steps;
          count++;
          requestAnimationFrame(tick);
        }
    	}
    	tick();

      initCanvas(false);
    };
  });
};

var initCanvas = function(image) {
  let dpr = window.devicePixelRatio || 1;
  let startingTheta = 0;
  let count = 0;
  let colors = ['#C54143', '#F8F8F8'];
  var dataSine = [];
  cancelAnimationFrame(animate);

  if(window.devicePixelRatio === 1) {
    dpr = 2;
  }

  if(!canvasScaled) {
    ctx.scale(dpr,dpr);
    canvasScaled = true;
  }

  if(image) {
    ctx.fillStyle = ctx.createPattern(image, 'no-repeat');
  }
  else {
    let myGrad = ctx.createRadialGradient(canvas.width/4, canvas.height/4, canvas.height/4, canvas.width/4, canvas.height/1.5, 0);
    myGrad.addColorStop(1, colors[0]);
    myGrad.addColorStop(0, colors[1]);
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = myGrad;
  }

  var draw = function() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    let rotation = count*0.1;
    dataSine.length = 0;

    for(let i = 0; i < POLY; i++) {
      dataSine.push(Math.sin((i/wavelength + rotation))*ungulator);
    }

    for(let theta = startingTheta;  theta < LENGTH;  theta += STEP) {
      let point = dataSine[(theta/STEP).toFixed(0)];
      let x = CENTER.x + (radius + point) * Math.cos(theta);
      let y = CENTER.y + (radius + point) * Math.sin(theta);
      ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fill();
  	ctx.stroke();

    count++;
    animate = requestAnimationFrame(draw);
  };
  draw();
};

var preLoadCanvasImages = function() {
  const images = [
    {
      el: canvasImages.khromaImg,
      src: 'khroma_teaser-copy'
    },
    {
      el: canvasImages.floodhelpImg,
      src: 'fh_teaser-copy'
    },
    {
      el: canvasImages.romeImg,
      src: 'rome_dusk_med-copy2'
    },
    {
      el: canvasImages.eonImg,
      src: 'eon_teaser-copy'
    }
  ];
  images.forEach(function(image){
    const size = 2560;
    var img = new Image();
    var tempTx = image.el.getContext('2d');
    img.src = `assets/images/${image.src}.png`;
    img.addEventListener('load', function() {
        image.el.width = size;
        image.el.height = size;
        tempTx.drawImage(img, 0, 0, img.width, img.height, 0, 0, size/8, size/8);
    }, true);
    image.el.setAttribute('style', 'visibility: hidden; position: absolute; left: -9999em;');
    document.body.appendChild(image.el);
    image.el.setAttribute('style', 'display: none');
  });

};

var init = function() {
  if(document.querySelector('canvas')){

    preLoadCanvasImages();
    initCanvas(false, 1);
  }
  bindEvents();
};

init();
