function funcionSumarRestar(){
    alert('Has elegido Suma y Resta');

    let numSum0 = parseFloat(prompt('ingresa un Numero'));
    let numSum1 = parseFloat(prompt('Ahora Otro'));
    
    if (isNaN(numSum0) || isNaN(numSum1)){
        alert('Eso no es un numero. Menos 10 puntos');
    } else{
        let resultadoSuma = numSum0 + numSum1;
        let resultadoResta = numSum0 - numSum1;
        alert('Tus Numeros '+numSum0+' y '+numSum1+' Suman '+resultadoSuma);
        alert('La Resta de '+numSum0+' y '+numSum1+' Dan '+resultadoResta);
    }
}

function funcionMultiplicar(){
    alert('Vamos a Multiplicar');
    
    let numMulti0 = parseFloat(prompt('Dame un numero'));
    let numMulti1 = parseFloat(prompt('Dame otro'));

    if (isNaN(numMulti0) || isNaN(numMulti1)){
        alert('Eso no es un numero. Menos 10 puntos');
    } else{
        let resultadoMulti = numMulti0 * numMulti1;
        alert('La Multiplicación de '+numMulti0+' por '+numMulti1+' son '+resultadoMulti);
    }
}

function funcionDividir(){
    alert('A dividir entonces');
    
    let numDiv0 = parseFloat(prompt('Numerito? Por Favor.'));
    let numDiv1 = parseFloat(prompt('Me da Otro?.'));

    if (isNaN(numDiv0) || isNaN(numDiv1)){
        alert('Eso no es un numero. Menos 10 puntos');
    } else if (numDiv0 === 0 || numDiv1 === 0) {
        alert('Quieres destruir tu PC? No puedes dividir entre Cero, por que es Infinito');
    } else{
        let resultadoDiv = numDiv0 / numDiv1;
        alert('Tu Division de '+numDiv0+' partido en '+numDiv1+' dan '+resultadoDiv);
    }
}

function funcionFactores(){
    alert('Has elegido encontrar Factores');

    let numFac0 = parseFloat(prompt('Ingresa un numero "De Preferencia un numero Grande"'));

    if (numFac0 === 0){
        alert('¡¿Como va a tener Factorial el Cero?!, menos 0.000 Puntos');
    } else if (isNaN(numFac0)) {
        alert('!!NO LETRAS, SOLO NUMEROS, NUMEROS¡¡');
    } else {
        alert('ZzzzzzzZZ Continuara...')
    }
}