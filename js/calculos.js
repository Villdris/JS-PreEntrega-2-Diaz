//Sinceramente no supe como implementar un objeto en alguna de las operaciones.
//Al ver la clase de objetos otravez, pensé en crear un constructor con todas las operaciones.
//De esta forma, solo tengo que llamarlas... La varieble es "resultados" ese es el objeto.
//De momento es solo un objeto, ya que está dentro de funciones, vive y muere dentro de las funciones.
//y tambien sé, que no hace falta explicarle esto, con solo verlo ya sabe lo que pasa.
//es para que usted sepa que yo sé  :D :D :D
class ClassCalculos {
    constructor (num,num1){
        this.num= num;
        this.num1= num1;
    }
    
    sumar(){
        return this.num+this.num1;
    }
    restar(){
        return this.num - this.num1
    }
    multiplicar(){
        return this.num* this.num1
    }
    dividir(){
        return this.num / this.num1
    }
    elResto(){
        return this.num % this.num1
    }
    factores(){ // aquí tenia un error y tarde un monton, me recomí la cabeza
                // y era que, olvidé poner this. antes de num :c AHORA FUNCIONA!!
        let arrayFactores = [];
        
        for (let i = 1; i <= this.num; i++){

            let buscando = this.num % i;
    
            if (buscando === 0){
                arrayFactores.push(i);
            }
        } return arrayFactores.join(' - ');
    }
}

function funcionSumar(){
    alert('Has elegido Sumar dos numeros');

    //cambie todos los parseFloat por parseInt
    //al ser una web para niños, solo deberian ser numeros enteros
    //no habian tantos parseFloat xD
    let num = parseInt(prompt('Primer numero a sumar'));
    let num1 = parseInt(prompt('Segundo numero a sumar'));

    if (isNaN(num) || isNaN(num1)){
        alert('-ERROR: No es un numero');
    } else{
        let resultado = new ClassCalculos(num,num1)
        alert('Tus Numeros '+num+' y '+num1+' Suman '+resultado.sumar());
    }
}

function funcionRestar(){
    alert('Has elegido Restar dos numeros');

    let num = parseInt(prompt('Primer numero a Restar'));
    let num1 = parseInt(prompt('Segundo numero a Restar'));
    
    if (isNaN(num) || isNaN(num1)){
        alert('-ERROR- *Eso no es un numero*');
    } else{
        let resultado = new ClassCalculos(num,num1)
        alert('Tus Numeros '+num+' y '+num1+' Restan '+resultado.restar());
    }
}

function funcionMultiplicar(){
    alert('Vamos a Multiplicar');
    
    let num = parseInt(prompt('Dame un numero'));
    let num1 = parseInt(prompt('Dame otro'));

    if (isNaN(num) || isNaN(num1)){
        alert('Esto no es Algebra. Menos 10 puntos');
    } else{
        let resultado = new ClassCalculos(num,num1);
        alert('La Multiplicación de '+num+' por '+num1+' son '+resultado.multiplicar());
    }
}

function funcionDividir(){
    alert('A dividir entonces');
    
    let num = parseInt(prompt('Numerito? Por Favor.'));
    let num1 = parseInt(prompt('Me da Otro?.'));

    if (isNaN(num) || isNaN(num1)){
        alert('ERROR--Letra Detectada--ERROR');
    } else if (num === 0 || num1 === 0) {
        alert('No puedes dividir entre Cero, por que es Infinito');
    } else{
        let resultado = new ClassCalculos(num,num1);
        alert('La Division de '+num+' partido en '+num1+' dan '+Math.trunc(resultado.dividir())+
                ' y sobran '+resultado.elResto());
    }
}
// Por razones que desconozco, comenzó a realizar mal las divisiones
//  Ej: 15 / 2 = 7.5 Esto es Imposible, asi que use math.trunc para eliminar los decimales
// RARO CIERTO O.O

function funcionFactores(){
    alert('Has elegido encontrar Factores');

    let num = parseInt(prompt('Ingresa un numero "De Preferencia: no mas de 7 Digitos"'));
    
    if (num === 0){
        alert('¡¿Como va a tener Factores el Cero?!, menos 0.000 Puntos');
    } else if (isNaN(num)) {
        alert('!!NO LETRAS, SOLO NUMEROS, NUMEROS¡¡');
    } else{
        
        let resultados = new ClassCalculos(num);
        alert('Los Factores de '+num+' son '+resultados.factores())
    }
}
// Me falta el Array con un fitro... se me ocurre un sistema de notas
// Que que me diga la nota mas alta, la mas baja y un promedio