const lSystem = {
    input: "",
    ruleset: [],
    axiom: "AA",
    init: function() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.input = this.axiom;

        this.ruleset[0] = {
            a: "A",
            b: "BBA"
        };

        this.ruleset[1] = {
            a: "A",
            b: "AA"
        };

        this.ruleset[2] = {
            a: "A",
            b: "ABA"
        };

        for (let alpha = 0; alpha < 20; alpha++) {
            this.create();
        }
        return this.input;
    },
    create: function() {
        let nextinput = "", found = false;
        for (let alpha = 1; alpha < this.input.length; alpha++) {
            let current = this.input.charAt(alpha);
            for (let beta = 0; beta < this.ruleset.length; beta++) {
                if (current == this.ruleset[beta].a) {
                    nextinput += this.ruleset[beta].b;
                    found = true;
                    break;
                }
            }
            if (!found) {
                nextinput += current;
            }
        }
        this.input = nextinput;
        console.log(this.input);
        this.animate();
    },
    animate: function() {
        for (let alpha = 0; alpha < this.input.length; alpha++) {
            let current = this.input.charAt(alpha);

            this.ctx.beginPath();
            this.ctx.arc(alpha * 3, this.input.length / alpha * 30, 1, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
}

module.exports = lSystem;
