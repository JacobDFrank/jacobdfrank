(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    turt = turtle.create(ctx, 0, canvas.height / 2);

    canvas.width = 100;

    let input = lSystem.init();

    render(input);
})

let render = function(input) {

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.rotate(10 * Math.PI / 180);
    for (let alpha = 0; alpha < 1500; alpha++) {
        ctx.strokeStyle = "#DB4444";
        for (let alpha = 0; alpha < input.length; alpha++) {
            let letter = input.charAt(alpha);

            switch (letter) {
                case 'F':
                    turt.penDown();
                    turt.move(10);
                    turt.penUp();
                    break;
                case '[':
                    turt.push();
                    break;
                case ']':
                    turt.pop();
                    break;
                case '+':
                    turt.rotate(2.7 * Math.PI / 180 * Math.random() * alpha);
                    break;
                case '-':
                    turt.rotate(-2.7 * Math.PI / 180 * Math.random() * alpha)
                    break;
            }
        }
        ctx.strokeStyle = "#dbba44";
        for (let alpha = 0; alpha < input.length; alpha++) {
            let letter = input.charAt(alpha);

            switch (letter) {
                case 'F':
                    turt.penDown();
                    turt.move(10);
                    turt.penUp();
                    break;
                case '[':
                    turt.push();
                    break;
                case ']':
                    turt.pop();
                    break;
                case '+':
                    turt.rotate(2.7 * Math.PI / 180 * Math.random() * alpha);
                    break;
                case '-':
                    turt.rotate(-2.7 * Math.PI / 180 * Math.random() * alpha)
                    break;
            }
        }
        ctx.strokeStyle = "#4c44db";
        for (let alpha = 0; alpha < input.length; alpha++) {
            let letter = input.charAt(alpha);

            switch (letter) {
                case 'F':
                    turt.penDown();
                    turt.move(10);
                    turt.penUp();
                    break;
                case '[':
                    turt.push();
                    break;
                case ']':
                    turt.pop();
                    break;
                case '+':
                    turt.rotate(2.7 * Math.PI / 180 * Math.random() * alpha);
                    break;
                case '-':
                    turt.rotate(-2.7 * Math.PI / 180 * Math.random() * alpha)
                    break;
            }
        }
        ctx.strokeStyle = "#394f4a";
        for (let alpha = 0; alpha < input.length; alpha++) {
            let letter = input.charAt(alpha);

            switch (letter) {
                case 'F':
                    turt.penDown();
                    turt.move(10);
                    turt.penUp();
                    break;
                case '[':
                    turt.push();
                    break;
                case ']':
                    turt.pop();
                    break;
                case '+':
                    turt.rotate(2.7 * Math.PI / 180 * Math.random() * alpha);
                    break;
                case '-':
                    turt.rotate(-2.7 * Math.PI / 180 * Math.random() * alpha)
                    break;
            }
        }


    }
}

},{"./lSystem.js":2,"./turtle.js":3}],2:[function(require,module,exports){
const lSystem = {
    input: "",
    axiom: "Q",
    ruleset: [],
    init: function() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = 3000;
        this.canvas.height = 3000;

        this.input = this.axiom;


        this.ruleset[0] = {
            a: "Q"

                ,
            b: "F-[[Q]+Q]+F[+FQ]-Q"
        };

        this.ruleset[1] = {
            a: "F"

                ,
            b: "FF"
        };

        this.ruleset[2] = {
            a: "[-"

                ,
            b: "[+FF]"
        };
        this.ruleset[2] = {
            a: "[+"

                ,
            b: "[-FF]"
        };


        for (let alpha = 0; alpha < 3; alpha++) {
            this.create();
        }
        return this.input;
    },
    create: function() {
        let nextinput = "";

        for (let alpha = 0; alpha < this.input.length; alpha++) {
            let found = false;
            let current = this.input.charAt(alpha);
            for (let beta = 0; beta < this.ruleset.length; beta++) {
                if (current == this.ruleset[beta].a) {
                    found = true;
                    nextinput += this.ruleset[beta].b;
                    break;
                }
            }
            if (!found) {
                nextinput += current;
            }
        }
        this.input = nextinput;
    },
    draw: function() {
        for (let alpha = 0; alpha < this.input.length; alpha++) {
            let current = this.input.charAt(alpha);
        }
    }
}

module.exports = lSystem;

},{}],3:[function(require,module,exports){

    // pass in canvas context, a starting x and a starting y position
const Turtle = {
    create(canvas, startX, startY) {
            const turtle = Object.create(this)
            Object.assign(turtle, {
                canvas
                , weight: 1
                    , color: 'red'
                    , pos: Vec2(startX, startY)
                    , dir: Vec2(1, 0)
                    , pen: 1
                    , posArray: []
                    , dirArray: []
            , })
            turtle.canvas.moveTo(turtle.pos.x, turtle.pos.y)
            return turtle
        }
        , penUp() {
            this.pen = 0
        }
        , penDown() {
            this.pen = 1
        }
        , push() {
            this.posArray.push(this.pos.clone())
            this.dirArray.push(this.dir.clone())
        }
        , pop() {
            this.pos = this.posArray.pop()
            this.dir = this.dirArray.pop()
            this.canvas.moveTo(this.pos.x, this.pos.y)
        }
        , // THIS IS IN RADIANS!!!
        rotate(amt) {
            this.dir.rotate(amt)
        }
        , move(amt) {
            if (this.pen) this.canvas.beginPath()
            this.canvas.moveTo(this.pos.x, this.pos.y)
            this.pos.x += this.dir.x * amt
            this.pos.y += this.dir.y * amt
            if (this.pen) {
                this.canvas.lineTo(this.pos.x, this.pos.y)
                this.canvas.lineWidth = this.weight
                this.canvas.stroke()
                this.canvas.closePath()
            }
            else {
                this.moveTo(this.pos.x, this.pos.y)
            }
        }
}
module.exports = Turtle

},{}]},{},[1]);
