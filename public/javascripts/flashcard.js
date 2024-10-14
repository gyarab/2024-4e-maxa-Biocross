function volbaAlely() {
    // Vybrání náhodné alely z rodičů, sance je 1:1
    const poleAlel = ["Aa", "Ba"];
    //Chceme nahodne vybrat bud Aa nebo Bb z poleAlel
    var alelaOtec = poleAlel.at(Math.floor(Math.random() * 2)); // Vraci cislo od 0 do 1, Math.floor zaokrouhli na 1 nebo 0
    var alelaMatka = poleAlel.at(Math.floor(Math.random() * 2));
    
    document.getElementById("alelaOtec").innerText = alelaOtec;
    document.getElementById("alelaMatka").innerText = alelaMatka;

    // TO JE TA ANIMACE VYMAZAT
    // document.getElementById("alelaOtec").classList.toggle("move");
    // document.getElementById("alelaMatka").classList.toggle("move");

}
