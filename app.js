//Global selection and variables
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2')
let initialColors;

//Event listeners
sliders.forEach(slider => {
    slider.addEventListener('input', hslControls);
})

//Functions

//Color Generator
function generateHex() {
    // const hexColor = chroma.random();
    return chroma.random();
}

let randonHex = generateHex();
console.log(randonHex);

function randomColors() {
    colorDivs.forEach((div, index) => {
        console.log(div.children[0]);
        const hexText = div.children[0];
        const randomColor = generateHex();

        //Add the color to the background
        div.style.background = randomColor;
        hexText.innerText = randomColor;
        //Check for contrast
        cheackTextConstract(randomColor, hexText);

        //Initial Colorize Sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        console.log(sliders);

        const hue = sliders[0];
        const brigthness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brigthness, saturation);
    })
}
randomColors();

function cheackTextConstract(color, text) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5) {
        text.style.color = 'black';
    } else {
        text.style.color = 'white';
    }
}

function colorizeSliders(color, hue, brightness, saturation) {
    //Scale Saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);
    //Scale Brigthness
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(['black', midBright, 'white']);
    //Scale Hue
    // const hueColors = color.set('hsl.l', 1);

    //Update Input Colors
    saturation.style.background = `linear-gradient(to right,${scaleSat(0)},${scaleSat(1)})`;
    brightness.style.background = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;
    hue.style.background = `linear-gradient(to right,hsl(0, 100%, 45%),hsl(30, 100%, 45%),hsl(60, 100%, 45%),hsl(90, 100%, 45%),hsl(120, 100%, 45%),hsl(150, 100%, 45%),
    hsl(180, 100%, 45%),hsl(210, 100%, 45%),hsl(270, 100%, 45%),hsl(300, 100%, 45%),hsl(330, 100%, 45%),hsl(360, 100%, 45%))`;
}

function hslControls(event) {
    const index = event.target.getAttribute('data-hue') ||
        event.target.getAttribute('data-bright') ||
        event.target.getAttribute('data-sat');
    // console.log(index);

    let sliders = event.target.parentElement.querySelectorAll('input[type=range]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = colorDivs[index].querySelector('h2').innerText;
    // console.log(bgColor);

    let color = chroma(bgColor)
        .set("hsl.s", saturation.value)
        .set("hsl.l", brightness.value)
        .set("hsl.h", hue.value)

    colorDivs[index].style.background = color;
}