newColor()

const sliderWrappers = document.getElementsByClassName("slider-wrapper");
for (let wrapper of sliderWrappers) { // no clue how let works
    wrapper.firstElementChild.oninput = function() {
        wrapper.lastElementChild.innerHTML = this.value;
    }
}

function newColor() {
    const tile = document.getElementById("color-tile");
    const color = hslToRgb(Math.random(), Math.random(), Math.random());
    tile.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
}
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function submit() {
    const tile = document.getElementById("color-tile");
    const targetColor = tile.style.backgroundColor;

    var answer = []
    const sliders = document.getElementsByClassName("slider");
    for (let slider of sliders) {
        answer.push(slider.value);
    }
    const answerColor = `rgb(${answer[0]}, ${answer[1]}, ${answer[2]})`;

    const logText = document.getElementById("results-log");

    var accuracy = 0; //solve for accuracy here

    logText.innerHTML += `${targetColor}`;
    const targetTile = colorTile(targetColor);
    logText.append(targetTile);

    logText.innerHTML += ` vs ${answerColor}`;
    const answerTile = colorTile(answerColor);
    logText.append(answerTile);

    logText.innerHTML += ` acc: ${accuracy}`;
    logText.innerHTML += "<br>";
    newColor();
}

function colorTile(color) {
    const tile = document.createElement('img');
    tile.style.backgroundColor = color;
    tile.style.border = "1px solid gray"
    tile.style.display = "inline-block";
    tile.style.verticalAlign = "middle";
    tile.style.width = "15px", tile.style.height = "15px";
    return tile;
}

function reset() {
    const logText = document.getElementById("results-log");
    logText.innerHTML = "";
    newColor();
}