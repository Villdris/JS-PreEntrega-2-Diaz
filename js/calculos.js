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

let PuntosNota = {
    suma:0,
    resta:0,
    multiplicar:0,
    dividir:0
};

let intentos = {
    suma:3,
    resta:3,
    multiplicar:3,
    dividir:3
}

let registros = [];

function ejerciciosSuma() {
        
    if(intentos.suma <= 3 && intentos.suma > 0){
        alert(`Es tu Turno de Sumar :D`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 10) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num}+${num1} =`))

        if(num+num1 === respuestaAlumno){
            
            PuntosNota.suma+=10;
            intentos.suma--

            alert(`Genial, has acertado: +10 puntos
                Intentos: ${intentos.suma}
                Puntos: ${PuntosNota.suma}`);

            registrar('suma', num, num1, respuestaAlumno, true)
            
            ejerciciosSuma();
        } 
        else if(num+num1!==respuestaAlumno){
            intentos.suma--
            alert(`Oh! esa no era
                Intentos: ${intentos.suma}
                Puntos: ${PuntosNota.suma}`);

            registrar('suma', num, num1, respuestaAlumno, false)
            
            ejerciciosSuma()
        }
    }
    else{
        return alert(`Usaste tus 3 intentos para sumar`);
    } 
}
// mientras hago esto, no tiene sentido un sistema de notas con un filtro o buscador
//se me ocurre un array que registre los datos de cada operacion
// y mostrar todos los ejercicios y filtrarlos por tipoDeOperacion o mostras las correctas e incorrectas.
function ejerciciosResta() {
        
    if(intentos.resta <= 3 && intentos.resta > 0){
        alert(`Ahora a Restar`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 5) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num}-${num1} =`))

        if(num-num1 === respuestaAlumno){
            
            PuntosNota.resta+=10;
            intentos.resta--

            alert(`Que Bien, Es Correcto: +10 puntos
                Intentos: ${intentos.resta}
                Puntos: ${PuntosNota.resta}`);

            registrar('resta', num, num1, respuestaAlumno, true);
            
            ejerciciosResta()
        } 
        else if(num-num1!==respuestaAlumno){
            intentos.resta--
            alert(`Intentemos De Nuevo
                Intentos: ${intentos.resta}
                Puntos: ${PuntosNota.resta}`)

                registrar('resta', num, num1, respuestaAlumno, false)

            ejerciciosResta()
        }
    }
    else{
        return alert(`Usaste tus 3 intentos para Restar`);
    } 
}

function ejerciciosMultiplicar() {
        
    if(intentos.multiplicar <= 3 && intentos.multiplicar > 0){
        alert(`Vas a Multiplicar :D`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 10) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num} X ${num1} =`))

        if(num*num1 === respuestaAlumno){
            
            PuntosNota.multiplicar+=10;
            intentos.multiplicar--

            alert(`Maravilloso, es correcta: +10 puntos
                Intentos: ${intentos.resta}
                Puntos: ${PuntosNota.resta}`);

                registrar('multiplicar', num, num1, respuestaAlumno, true);

                ejerciciosMultiplicar()
        } 
        else if(num*num1!==respuestaAlumno){
            intentos.multiplicar--
            alert(`Intentemos De Nuevo
                Intentos: ${intentos.multiplicar}
                Puntos: ${PuntosNota.multiplicar}`)

                registrar('multiplicar', num, num1, respuestaAlumno, false)

                ejerciciosMultiplicar()
        }
    }
    else{
        return alert(`Usaste tus 3 intentos para Multiplicar`);
    } 
}

function ejerciciosDividir() {
        
    if(intentos.dividir <= 3 && intentos.dividir > 0){
        alert(`A partir, a Dividir`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 4) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num} / ${num1} =`))
        
        if(Math.trunc(num/num1) === respuestaAlumno){   //algunos resultados daban decimales 
                                                        // y eso es imposible Math.trunch otravez
            PuntosNota.dividir+=10;
            intentos.dividir--

            alert(`Bravoo, es correcta: +10 puntos
                Intentos: ${intentos.dividir}
                Puntos: ${PuntosNota.dividir}`);

                registrar('dividir', num, num1, respuestaAlumno, true)

                ejerciciosDividir()
        } 
        else if(num*num1!==respuestaAlumno){
            intentos.dividir--
            alert(`Intentemos De Nuevo
                Intentos: ${intentos.dividir}
                Puntos: ${PuntosNota.dividir}`)

            registrar('dividir', num, num1, respuestaAlumno, false)

            ejerciciosDividir()
        }
    }
    else{
        return alert(`Se acabaron tus intentos`);
    } 
}
// Aun me falta el array con find o filter, haber que sale :P
// na na, dificil, volvere a ver la clase donde explica eso xD

// ok ok, mas claro, un poco, creare el array "registros, y .pusheare los datos"

// let registros = [];

function registrar(tipo, num, num1, respuesta, bienOMal){
    
    registros.push({
        tipo: tipo,
        num: num,
        num1: num1,
        respuesta: respuesta,
        bienOMal: bienOMal, //true == bien -- false == mal
    })
}
function filterCorrectas(objRegistro){      // otra media hora perdida xc
    return objRegistro.bienOMal === true;   // en lugar de poner "objRegistro.bienOMal" en return
                                            // puse "registro.bienOMal", llamando directamante a la variable
}                                           // y no sabia que pasaba, si en mi mente el codigo corria bien ja ja      

let respuestasCorrectas = registros.filter(filterCorrectas);

function correctasBotton(){

    //respuestasCorrectas = registros.filter(filterCorrectas);
    
    console.log(`Tienes ${respuestasCorrectas.length} respuestas Correctas`); //ERROR ERROR esto no hace lo que tiene que hacer
    alert(`Tienes ${respuestasCorrectas.length} respuestas Correctas`);       //ERROR ERROR esto no hace lo que tiene que hacer

    console.log(`Tienes ${registros.filter(filterCorrectas).length} respuestas Correctas`)
    alert(`Tienes ${registros.filter(filterCorrectas).length} respuestas Correctas`)

    // me corrompí y le pregunte a chatGTP y es una bobada
    // la variable let "respuestasCorrectas" debe estar dentro de la funcion para que se actualize
    // eso me dijo chatGPT, pero no entiendo, porque dan resultados diferentes
    // si ambos console.log() y ambas alert() estan dentro del mismo boton/funcion
    //le dejo la solucion comentada, para que vea :D
    console.log(respuestasCorrectas)
}

//otro filter pero de respuestasIncorrectas, (llevo en mi corazón lecciones de errores del primer filter T.T)

function filterIncorrectas(objRegistros){
    return objRegistros.bienOMal === false;
}

function incorrectasBotton(){

    let respuestasIncorrectas = registros.filter(filterIncorrectas);

    console.log(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`)
    alert(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`)

    console.log(respuestasIncorrectas);
}


//Otro filtro ...este no me costó tanto, y eso que esta mas trabajado
// 3 horas haciendo este filtroPorTipo
function filterPorTipo(tipo){
    return function (objRegistros){
            return objRegistros.tipo === tipo;
    }
}

function tipoDeOperacionBotton(tipo=prompt('Escribe "suma, resta, multiplicar, dividir" para filtrar por tipo')){
    
    let respuestasPorTipo = registros.filter(filterPorTipo(tipo));
    
    respuestasPorTipo.forEach((respuestasPorTipo)=>
        alert(`Operacion: ${respuestasPorTipo.tipo}
        numero ${respuestasPorTipo.num}
        numero ${respuestasPorTipo.num1}
        Respuesta del Usuario: ${respuestasPorTipo.respuesta}
        ¿Fue correcta?: ${respuestasPorTipo.bienOMal}`))
}

// Los comentarios serán borrados en la terceraEntrega
// y habrán nuevos comentarios en al terceraEntrega :D