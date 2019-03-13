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
