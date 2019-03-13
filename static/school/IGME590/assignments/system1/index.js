const lSystem = require('./lSystem.js');
const turtle = require('./turtle.js');

window.addEventListener('load', function () {
    let input = lSystem.init();
})
window.onload = function() {
    console.log("lSystem included", lSystem);
    console.log("turtle included", turtle);
}
