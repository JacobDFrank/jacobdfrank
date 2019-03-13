const lSystem = require('./lSystem.js');
const turtle = require('./turtle.js');

let canvas, ctx, turt;

window.onload = function() {
    console.log("lSystem included", lSystem);
    console.log("turtle included", turtle);
}

window.addEventListener('load', function() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    turt = turtle.create(ctx, 0, canvas.height / 1.5);

    let input = lSystem.init();

    render(input);
})

let render = function(input) {

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.rotate(-10*Math.PI/180);

    ctx.strokeStyle = "#DB4444";
    for (let alpha = 0; alpha < input.length; alpha++) {
        let letter = input.charAt(alpha);

        switch (letter) {
            case 'F':
                turt.penDown();
                turt.move(1);
                turt.penUp();
                break;
            case '[':
                turt.push();
                break;
            case ']':
                turt.pop();
                break;
            case '+':
                turt.rotate(20.7 * Math.PI / 180 * Math.random() * alpha);
                break;
            case '-':
                turt.rotate(-20.7 * Math.PI / 180 * Math.random() * alpha)
                break;
        }
    }


}
