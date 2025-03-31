//Tabulka pro F1
const tabulka1 = [document.getElementById('td1'),document.getElementById('td2'), document.getElementById('td3'),document.getElementById('td4')];



//PRVNI VERZE - SPATNE Z HLEDISKA BIOLOGIE?
// function volbaAlely() {
//     // Vybrání náhodné alely z rodičů, sance je 1:1
//     const poleAlel = ["Aa", "Bb"];
//     //Chceme nahodne vybrat bud Adocument.getElementById('td1')a nebo Bb z poleAlel
//     var nahodnyOtec = poleAlel.at(Math.floor(Math.random() * 2)); // Vraci cislo od 0 do 1, Math.floor zaokrouhli na 1 nebo 0
//     var nahodnaMatka = poleAlel.at(Math.floor(Math.random() * 2));

//     // elementy <p> pro alely
//     var alelaOtec = document.getElementById("alelaOtec");
//     var alelaMatka = document.getElementById("alelaMatka")
    
//     //vraceni dvou nahodnych alel
//     alelaOtec.innerText = nahodnyOtec;
//     alelaMatka.innerText = nahodnaMatka;

//     //Kdyz si student vybere jine alely, drivejsi krizeni z tabulky vymazeme 
//     for (let i = 0; i < tabulka1.length; i++) {
//         tabulka1[i].innerText = "";
        
//     }

// }

// 
function volbaAlelyRodic() {
    // elementy <p> pro alely
    var alelaOtec = document.getElementById("alelaOtec");
    var alelaMatka = document.getElementById("alelaMatka")
    
    //vraceni dvou nahodnych alel
    alelaOtec.innerText = "A";
    alelaMatka.innerText = "a";

    //Kdyz si student vybere jine alely, drivejsi krizeni z tabulky vymazeme 
    for (let i = 0; i < tabulka1.length; i++) {
        tabulka1[i].innerText = "";
        
    }
}
// ZOBRZENI PRVNI TABULKY
function zobrazKrizeniF1() {
    var alelaOtec = document.getElementById('alelaOtec').textContent;
    var alelaMatka = document.getElementById('alelaMatka').textContent;

    // const arrOtec = [alelaOtec[0], alelaOtec[1]];
    // const arrMatka = [alelaMatka[0], alelaMatka[1]];
    
    const arrOtec = ["A", "a"];
    const arrMatka = ["A", "a"];

    var k = 0;
    for (let i = 0; i < alelaOtec.length; i++) {
        for (let j = 0; j < arrMatka.length; j++) {
            tabulka1[k].innerHTML = arrOtec[i] + arrMatka[j];
            k++;
        }
    }
}
//DRUHA TABULKA     
function showImg() {
    // Obrazky, ktere pak zobrazime v tabulce pro M2 
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');

    img1.style.display = "block";
    img2.style.display = "block";
    img3.style.display = "block";
    img4.style.display = "block";
    
}
function showContent() {
    var contents = document.querySelectorAll('.body-flashcard');
    contents.forEach(function(content) {
      content.style.display = 'none';
    });

    var selectedOption = document.getElementById('mendelSelect').value;
    console.log(selectedOption);
    
    if (selectedOption) {
      document.getElementById(selectedOption).style.display = 'flex';
    }
  }
  
