// Simple example, see optional options for more configuration.
// const pickr = Pickr.create({
//     el: '.color-picker',
//     theme: 'nano', // or 'monolith', or 'nano'
//     default: '#ff0000',

//     swatches: [
//         'rgba(244, 67, 54, 1)',
//         'rgba(233, 30, 99, 0.95)',
//         'rgba(156, 39, 176, 0.9)',
//         'rgba(103, 58, 183, 0.85)',
//         'rgba(63, 81, 181, 0.8)',
//         'rgba(33, 150, 243, 0.75)',
//         'rgba(3, 169, 244, 0.7)',
//         'rgba(0, 188, 212, 0.7)',
//         'rgba(0, 150, 136, 0.75)',
//         'rgba(76, 175, 80, 0.8)',
//         'rgba(139, 195, 74, 0.85)',
//         'rgba(205, 220, 57, 0.9)',
//         'rgba(255, 235, 59, 0.95)',
//         'rgba(255, 193, 7, 1)'
//     ],

//     components: {

//         // Main components
//         preview: true,
//         opacity: true,
//         hue: true,

//         // Input / output Options
//         interaction: {
//             hex: false,
//             rgba: false,
//             hsla: false,
//             hsva: false,
//             cmyk: false,
//             input: false,
//             clear: false,
//             save: true
//         }
//     }
// });

// pickr.on('save', (color, instance) => {
//     console.log("Saved color: ", color.toRGBA().toString(3));
// }).on('change', (color, source, instance) => {
//     console.log("Changed color: ", color.toRGBA().toString(3));
//     const rgbaColor = color.toRGBA().toString();
//     document.querySelector('h1').style.color = rgbaColor;
// });


// KRIZENI PRO CROSSING

function drawPolygon(context, x, y, radius, sides) {
    const angleStep = (2 * Math.PI) / sides;
    context.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = i * angleStep;
        const xPos = x + radius * Math.cos(angle);
        const yPos = y + radius * Math.sin(angle);
        context.lineTo(xPos, yPos);
    }
    context.closePath();
    context.stroke();
    
}


    // Function to convert HEX to RGB
function hexToRgb(hex) {
hex = hex.replace('#', '');
const r = parseInt(hex.substring(0, 2), 16);
const g = parseInt(hex.substring(2, 4), 16);
const b = parseInt(hex.substring(4, 6), 16);
return { r, g, b };
}

// Function to convert RGB to HEX
function rgbToHex(r, g, b) {
return (
'#' +
[r, g, b]
  .map((value) => value.toString(16).padStart(2, '0'))
  .join('')
  .toUpperCase()
);
}

// Function to mix two colors
function mixColors(color1, color2) {
const rgb1 = hexToRgb(color1);
const rgb2 = hexToRgb(color2);

const r = Math.round((rgb1.r + rgb2.r) / 2);
const g = Math.round((rgb1.g + rgb2.g) / 2);
const b = Math.round((rgb1.b + rgb2.b) / 2);

return rgbToHex(r, g, b);
}


function generuj(){
    // Nacte jaky n uhlenik ma vytvorit
    var N_Uhelnik1 = parseInt(document.getElementById('input1').value);
    var N_Uhelnik2= parseInt(document.getElementById('input2').value);

    //vymaze to co je v canvasu
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);


    const colorPicker1 = document.getElementById('colorPicker1');
    const colorPicker2 = document.getElementById('colorPicker2');

    const selectedColor1 = colorPicker1.value;
    const selectedColor2 = colorPicker2.value;

    drawPolygon(ctx1, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx1.fillStyle = selectedColor1;
    ctx1.fill();

    drawPolygon(ctx2, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx2.fillStyle = selectedColor2;
    ctx2.fill();
}
function ND_generuj(){
    // Nacte jaky n uhlenik ma vytvorit
    var N_Uhelnik1 = parseInt(document.getElementById('ND_input1').value);
    var N_Uhelnik2= parseInt(document.getElementById('ND_input2').value);

    //vymaze to co je v canvasu
    const canvas1 = document.getElementById('ND_canvas1');
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    const canvas2 = document.getElementById('ND_canvas2');
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);


    const colorPicker1 = document.getElementById('ND_colorPicker1');
    const colorPicker2 = document.getElementById('ND_colorPicker2');

    const selectedColor1 = colorPicker1.value;
    const selectedColor2 = colorPicker2.value;

    drawPolygon(ctx1, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx1.fillStyle = selectedColor1;
    ctx1.fill();

    drawPolygon(ctx2, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx2.fillStyle = selectedColor2;
    ctx2.fill();
}

function kriz() {
    const colorPicker1 = document.getElementById('colorPicker1');
    const colorPicker2 = document.getElementById('colorPicker2');

    const selectedColor1 = colorPicker1.value;
    const selectedColor2 = colorPicker2.value;

    var N_Uhelnik1 = parseInt(document.getElementById('input1').value);
    var N_Uhelnik2= parseInt(document.getElementById('input2').value);

    var X = (N_Uhelnik1+N_Uhelnik2)/2;
    console.log(X);

    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    
    const canvas4 = document.getElementById('canvas4');
    const ctx4 = canvas4.getContext('2d');
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

    const canvas5 = document.getElementById('canvas5');
    const ctx5 = canvas5.getContext('2d');
    ctx5.clearRect(0, 0, canvas5.width, canvas5.height);

    const canvas6 = document.getElementById('canvas6');
    const ctx6 = canvas6.getContext('2d');
    ctx6.clearRect(0, 0, canvas6.width, canvas6.height);


    //smichani barvy 

    const color1 = '#FF0000'; // Red
    const color2 = '#0000FF'; // Blue
    const mixedColor = mixColors(selectedColor1, selectedColor2);

    console.log('Mixed Color:', mixedColor); // Output: Mixed Color: #800080 (Purple)
    //prvni 9
    drawPolygon(ctx3, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx3.fillStyle = selectedColor1;
    ctx3.fill();
    // pak 3
    drawPolygon(ctx4, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx4.fillStyle = selectedColor2;
    ctx4.fill();
    //pak 3
    drawPolygon(ctx5, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx5.fillStyle = selectedColor1;
    ctx5.fill();

    //pak 1
    drawPolygon(ctx6, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx6.fillStyle = selectedColor2;
    ctx6.fill();

}
function ND_kriz() {
    const colorPicker1 = document.getElementById('ND_colorPicker1');
    const colorPicker2 = document.getElementById('ND_colorPicker2');
    console.log(colorPicker1);
    
    const selectedColor1 = colorPicker1.value;
    const selectedColor2 = colorPicker2.value;

    var N_Uhelnik1 = parseInt(document.getElementById('ND_input1').value);
    var N_Uhelnik2= parseInt(document.getElementById('ND_input2').value);

    //jelikoz pri neuplne dominanci existuje zobrazeni jedince i jako znak ktery lezi "uprostred" potrebujeme prumer mezi 1. N uhelnikem a druhym
    var smisenyN_Uhelnik = (N_Uhelnik1+N_Uhelnik2)/2;
    console.log(smisenyN_Uhelnik);

    const canvas3 = document.getElementById('ND_canvas3');
    const ctx3 = canvas3.getContext('2d');
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    const canvas4 = document.getElementById('ND_canvas4');
    const ctx4 = canvas4.getContext('2d');
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);

    const canvas5 = document.getElementById('ND_canvas5');
    const ctx5 = canvas5.getContext('2d');
    ctx5.clearRect(0, 0, canvas5.width, canvas5.height);

    const canvas6 = document.getElementById('ND_canvas6');
    const ctx6 = canvas6.getContext('2d');
    ctx6.clearRect(0, 0, canvas6.width, canvas6.height);

    const canvas7 = document.getElementById('ND_canvas7');
    const ctx7 = canvas7.getContext('2d');
    ctx7.clearRect(0, 0, canvas7.width, canvas7.height);

    const canvas8 = document.getElementById('ND_canvas8');
    const ctx8 = canvas8.getContext('2d');
    ctx8.clearRect(0, 0, canvas8.width, canvas8.height);

    const canvas9 = document.getElementById('ND_canvas9');
    const ctx9 = canvas9.getContext('2d');
    ctx9.clearRect(0, 0, canvas9.width, canvas9.height);

    const canvas10 = document.getElementById('ND_canvas10');
    const ctx10 = canvas10.getContext('2d');
    ctx10.clearRect(0, 0, canvas10.width, canvas10.height);

    const canvas11 = document.getElementById('ND_canvas11');
    const ctx11 = canvas11.getContext('2d');
    ctx11.clearRect(0, 0, canvas11.width, canvas11.height);


    //smichani barvy 
    const mixedColor = mixColors(selectedColor1, selectedColor2);

    console.log('Mixed Color:', mixedColor); // Output: Mixed Color: #800080 (Purple)
   
    drawPolygon(ctx3, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx3.fillStyle = selectedColor1;
    ctx3.fill();

    // Pak 3
    drawPolygon(ctx4, 200, 200, 100, smisenyN_Uhelnik); // Nakreslí n-úhelník
    ctx4.fillStyle = selectedColor1;
    ctx4.fill();

    // Pak 3
    drawPolygon(ctx5, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx5.fillStyle = selectedColor1;
    ctx5.fill();

    // Pak 1
    drawPolygon(ctx6, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx6.fillStyle = mixedColor;
    ctx6.fill();

    // Pak 5
    drawPolygon(ctx7, 200, 200, 100, smisenyN_Uhelnik); // Nakreslí n-úhelník
    ctx7.fillStyle = mixedColor;
    ctx7.fill();

    // Pak 4
    drawPolygon(ctx8, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx8.fillStyle = mixedColor;
    ctx8.fill();

    // Pak 5
    drawPolygon(ctx9, 200, 200, 100, N_Uhelnik1); // Nakreslí n-úhelník
    ctx9.fillStyle = selectedColor2;
    ctx9.fill();

    // Pak 2
    drawPolygon(ctx10, 200, 200, 100, smisenyN_Uhelnik); // Nakreslí n-úhelník
    ctx10.fillStyle = selectedColor2;
    ctx10.fill();

    // Pak 6
    drawPolygon(ctx11, 200, 200, 100, N_Uhelnik2); // Nakreslí n-úhelník
    ctx11.fillStyle = selectedColor2;
    ctx11.fill();

}


// Example usage
function showContent() {
// Hide all content divs
var contents = document.querySelectorAll('.body-crossing');
contents.forEach(function(content) {
  content.style.display = 'none';
});

// Get the selected option value
var selectedOption = document.getElementById('krizeniSelect').value;

// Show the corresponding content div if selected
if (selectedOption) {
  document.getElementById(selectedOption).style.display = 'flex';
}
} 

//   KODOMINANCE
var barva1 = document.getElementById("Kodominance_ColorPicker1").value;
var barva2 = document.getElementById("Kodominance_ColorPicker2").value;

document.getElementById("Kodominance_ColorPicker1").addEventListener("input", function() {
document.querySelectorAll(".prvniKolecka").forEach(el => {
  el.style.backgroundColor = this.value;
  barva1 = this.value;
}); 
});
document.getElementById("Kodominance_ColorPicker2").addEventListener("input", function() {
document.querySelectorAll(".druheKolecka").forEach(el => {
  el.style.backgroundColor = this.value;
  barva2 = this.value;
}); 
});
function krizit() {
barva1 = document.getElementById("Kodominance_ColorPicker1").value;
barva2 = document.getElementById("Kodominance_ColorPicker2").value;
        let child = document.getElementById("vysledek-kodominance");
        child.innerHTML = `
           <div class="dot prvniKolecka" style="top: 25px; left: 54px; background-color: ${barva1};"></div>
        <div class="dot druheKolecka" style="top: 60px; left: 20px; background-color: ${barva2};"></div>
        <div class="dot prvniKolecka" style="top: 50px; left: 80px; background-color: ${barva1};"></div>
        <div class="dot druheKolecka" style="top: 40px; left: 100px; background-color: ${barva2};"></div>
        <div class="dot prvniKolecka" style="top: 120px; left: 40px; background-color: ${barva1};"></div>
        <div class="dot prvniKolecka" style="top: 25px; left: 32px; background-color: ${barva1};"></div>
        <div class="dot druheKolecka" style="top: 90px; left: 90px; background-color: ${barva2};"></div>
        <div class="dot druheKolecka" style="top: 90px; left: 55px; background-color: ${barva2};"></div>
        `;
    }
function vyrobKolecka() {
let kruh1 = document.getElementById("kruh1");
// kruh1.innerHTML = ` <div class="dot red" style="top: 5px; left: 90px;"></div>
// <div class="dot red" style="top: 120px; left: 33px;"></div>
// <div class="dot red" style="top: 120px; left: 50px;"></div>
// <div class="dot red" style="top: 5px; left: 80px;"></div>`;
    kruh1.innerHTML = ` <div class="dot prvniKolecko" style="top: 67px; left: 70px;"></div>
<div class="dot prvniKolecko" style="top: 42px; left: 45px;"></div>
<div class="dot prvniKolecko" style="top: 111px; left: 34px;"></div>
<div class="dot prvniKolecko" style="top: 60px; left: 100px;"></div>`;
let kruh2 = document.getElementById("kruh2");
// kruh1.innerHTML = ` <div class="dot red" style="top: 5px; left: 90px;"></div>
// <div class="dot red" style="top: 120px; left: 33px;"></div>
// <div class="dot red" style="top: 120px; left: 50px;"></div>
// <div class="dot red" style="top: 5px; left: 80px;"></div>`;
    kruh2.innerHTML = ` <div class="dot druheKolecko" style="top: 67px; left: 70px;"></div>
<div class="dot druheKolecko" style="top: 42px; left: 45px;"></div>
<div class="dot druheKolecko" style="top: 111px; left: 34px;"></div>
<div class="dot druheKolecko" style="top: 60px; left: 100px;"></div>`;
}

// Vytisknuti PDF
async function uplnaDominancePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 1️⃣ Uložíme aktuální hodnoty
    const color1 = document.getElementById('colorPicker1').value;
    const color2 = document.getElementById('colorPicker2').value;
    const number1 = document.getElementById('input1').value;
    const number2 = document.getElementById('input2').value;

    // 2️⃣ Skryjeme inputy a místo nich zobrazíme hodnoty
    document.getElementById('colorPicker1').style.display = 'none';
    document.getElementById('colorPicker2').style.display = 'none';
    document.getElementById('input1').style.display = 'none';
    document.getElementById('input2').style.display = 'none';

    document.getElementById('colorPreview1').style.backgroundColor = color1;
    document.getElementById('colorPreview1').style.display = 'inline-block';

    document.getElementById('colorPreview2').style.backgroundColor = color2;
    document.getElementById('colorPreview2').style.display = 'inline-block';

    document.getElementById('numberText1').textContent = number1;
    document.getElementById('numberText1').style.display = 'inline-block';

    document.getElementById('numberText2').textContent = number2;
    document.getElementById('numberText2').style.display = 'inline-block';

    const element = document.getElementById('uplnaDominance'); // Vybereme hlavní obsah

    // 3️⃣ Vygenerujeme PDF
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        doc.save('polyhybridy.pdf');

        // 4️⃣ Vrátíme zpět inputy
        document.getElementById('colorPicker1').style.display = 'inline-block';
        document.getElementById('colorPicker2').style.display = 'inline-block';
        document.getElementById('input1').style.display = 'inline-block';
        document.getElementById('input2').style.display = 'inline-block';

        document.getElementById('colorPreview1').style.display = 'none';
        document.getElementById('colorPreview2').style.display = 'none';
        document.getElementById('numberText1').style.display = 'none';
        document.getElementById('numberText2').style.display = 'none';
    });
}
async function neuplnaDominancePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // 1️⃣ Uložíme aktuální hodnoty
    const color1 = document.getElementById('ND_colorPicker1').value;
    const color2 = document.getElementById('ND_colorPicker2').value;
    const number1 = document.getElementById('ND_input1').value;
    const number2 = document.getElementById('ND_input2').value;

    // 2️⃣ Skryjeme inputy a místo nich zobrazíme hodnoty
    document.getElementById('ND_colorPicker1').style.display = 'none';
    document.getElementById('ND_colorPicker2').style.display = 'none';
    document.getElementById('ND_input1').style.display = 'none';
    document.getElementById('ND_input2').style.display = 'none';

    document.getElementById('ND_colorPreview1').style.backgroundColor = color1;
    document.getElementById('ND_colorPreview1').style.display = 'inline-block';

    document.getElementById('ND_colorPreview2').style.backgroundColor = color2;
    document.getElementById('ND_colorPreview2').style.display = 'inline-block';

    document.getElementById('ND_numberText1').textContent = number1;
    document.getElementById('ND_numberText1').style.display = 'inline-block';

    document.getElementById('ND_numberText2').textContent = number2;
    document.getElementById('ND_numberText2').style.display = 'inline-block';

    // 3️⃣ Vytvoření PDF
    const element = document.getElementById('neuplnaDominance'); // Vybereme hlavní obsah
    const polyhybridDiv = document.getElementById('ND_polyhybrid');
    const vysledekDiv = document.getElementById('ND_vysledek');



    doc.setFontSize(20);
    doc.text('Neúplná dominance', 10, 20); // Hlavní nadpis

    // Převod prvního divu (Polyhybridy)
    const polyhybridCanvas = await html2canvas(polyhybridDiv, { scale: 2 });
    const polyhybridImg = polyhybridCanvas.toDataURL('image/png');
    
    let imgWidth = 190; // Max šířka PDF
    let imgHeight = (polyhybridCanvas.height * imgWidth) / polyhybridCanvas.width;
    
    if (imgHeight > 250) { imgHeight = 250; } // Pokud je moc vysoký, omezíme výšku

    doc.addImage(polyhybridImg, 'PNG', 10, 30, imgWidth, imgHeight);

    // Pokud se nevejde na jednu stránku, přidáme novou
    let yPosition = 30 + imgHeight + 10;
    if (yPosition + 100 > 277) { // Pokud se nevejde zbývající obsah
        doc.addPage();
        yPosition = 20;
    }

    // Převod druhého divu (Výsledek)
    const vysledekCanvas = await html2canvas(vysledekDiv, { scale: 2 });
    const vysledekImg = vysledekCanvas.toDataURL('image/png');

    let vysledekHeight = (vysledekCanvas.height * imgWidth) / vysledekCanvas.width;
    if (vysledekHeight > 250) { vysledekHeight = 250; }

    doc.addImage(vysledekImg, 'PNG', 10, yPosition, imgWidth, vysledekHeight);

    doc.save('neuplna_dominance.pdf');

    // 4️⃣ Vrátíme zpět inputy
    document.getElementById('ND_colorPicker1').style.display = 'inline-block';
    document.getElementById('ND_colorPicker2').style.display = 'inline-block';
    document.getElementById('ND_input1').style.display = 'inline-block';
    document.getElementById('ND_input2').style.display = 'inline-block';

    document.getElementById('ND_colorPreview1').style.display = 'none';
    document.getElementById('ND_colorPreview2').style.display = 'none';
    document.getElementById('ND_numberText1').style.display = 'none';
    document.getElementById('ND_numberText2').style.display = 'none';
}