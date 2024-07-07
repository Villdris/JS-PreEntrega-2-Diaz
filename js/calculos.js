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
    factores(){ 

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

// decidí crear un constructor para usuarios, con sus registros y todo que ya creé
// para facilitar agregar dom y Storage
//reOrdenare el codigo para que sea facil de entender

/* al ir haciendo el codigo a medida que le agrego cosas queda mal
    crear una funcion abajo y luego llamarla mas arriba es una llamada al caos MUAJAJA
*/

class ClassUsuario {
    
    constructor(nombreUsuario){
        this.nombreUsuario = nombreUsuario;
        
        this.puntos={
            suma: 0,
            resta: 0,
            multiplicacion: 0,
            division:0,
        }

        this.intentos= {
            suma: 5,
            resta: 5,
            multiplicacion: 5,
            division: 5,
        }

        this.registros= [];
    }


    agregarRegistro(tipo, num, num1, respuesta, correcta){
        this.registros.push({
            tipo: tipo,
            num: num,
            num1: num1,
            respuesta: respuesta,
            correcta: correcta,
        })
        setData();
    }

    saludarAlUsuario(){
        alert(`Hola ${this.nombreUsuario}`);
    }

    getDatos(){
        alert(`Usuario = ${this.nombreUsuario}
            --Puntos--
                Suma: ${this.puntos.suma}
                Resta: ${this.puntos.resta}
                Multiplicacion: ${this.puntos.multiplicacion}
                Division: ${this.puntos.division}`)
    }

}



//Quize hacer el Dom primero, pero se me complico un monton hacer que el registro funcione
//Asi que me dedique a hacer el Storage que fue mas facil, tuve problemas con la carga de usuarios
//Ahora ya no c:

let usuario;
let todosLosUsuarios = cargarUsuariosDesdeLocalStorage();

function setData() {
    localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));
}

function cargarUsuariosDesdeLocalStorage() {
    let usuarios = localStorage.getItem('usuarios');

    if (usuarios) {
        
        let usuariosParseados = JSON.parse(usuarios).map(user => {
            let usuario = new ClassUsuario(user.nombreUsuario);
            usuario.puntos = user.puntos;
            usuario.intentos = user.intentos;
            usuario.registros = user.registros;
            return usuario;
        });
        return usuariosParseados;
    } else {
        return [];
    }
}

function registrarUsuario() {
    let inputNombre = document.getElementById("nombreUsuario").value;
    
    let usuarioEncontrado = todosLosUsuarios.find(usuario => usuario.nombreUsuario === inputNombre);
    
    let msj = document.getElementById('mensaje');
    msj.innerHTML = '';

    if (usuarioEncontrado) {
        usuario = usuarioEncontrado;
        usuario.saludarAlUsuario();
        
        msj.innerHTML = `Bienvenido de nuevo, ${usuario.nombreUsuario}`;
    } else {
        usuario = new ClassUsuario(inputNombre);
        
        todosLosUsuarios.push(usuario);
        usuario.saludarAlUsuario();
        
        msj.innerHTML = `Hola ${usuario.nombreUsuario}, te has registrado correctamente`;
        setData();
    }
}

//Terminado el Storage ;D 
// ahora el Dom *calavera*
function crearNumerosAleatorios() {
    
    let domSumasCajas = document.getElementsByClassName('sumas_caja');
    
    for (let i = 0; i < domSumasCajas.length; i++) {
        let domNumUno = domSumasCajas[i].getElementsByClassName('sumas_caja_numero')[0];
        let domNumDos = domSumasCajas[i].getElementsByClassName('sumas_caja_numeroDos')[0];
        
        let inputDomRespuesta = domSumasCajas[i].getElementsByClassName('respuesta')[0];
        
        domNumUno.innerText = Math.floor(Math.random() * 10) + 1;
        domNumDos.innerText = Math.floor(Math.random() * 10) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'suma');
            }
        });
    }

    //ahora entiendo por que inventarios React :ccccc X.X

    let domRestasCajas = document.getElementsByClassName('resta_caja');
    
    for (let i = 0; i < domRestasCajas.length; i++) {
        let domNumUno = domRestasCajas[i].getElementsByClassName('resta_caja_numero')[0];
        let domNumDos = domRestasCajas[i].getElementsByClassName('resta_caja_numeroDos')[0];
        
        let inputDomRespuesta = domRestasCajas[i].getElementsByClassName('respuesta')[0];
        
        domNumUno.innerText = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'resta');
            }
        });
    }


    let domMultiplicacionesCajas = document.getElementsByClassName('multiplicacion_caja');
    
    for (let i = 0; i < domMultiplicacionesCajas.length; i++) {
        let domNumUno = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_numero')[0];
        let domNumDos = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_numeroDos')[0];
        
        let inputDomRespuesta = domMultiplicacionesCajas[i].getElementsByClassName('respuesta')[0];
        
        domNumUno.innerText = Math.floor(Math.random() *(5 - 1 + 1)) + 1;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'multiplicacion');
            }
        });
    }


    let domDivisionesCajas = document.getElementsByClassName('division_caja');
    
    for (let i = 0; i < domDivisionesCajas.length; i++) {
        let domNumUno = domDivisionesCajas[i].getElementsByClassName('division_caja_numero')[0];
        let domNumDos = domDivisionesCajas[i].getElementsByClassName('division_caja_numeroDos')[0];
        
        let inputDomRespuesta = domDivisionesCajas[i].getElementsByClassName('respuesta')[0];
        
        domNumUno.innerText = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'division');
            }
        });
    }
}
crearNumerosAleatorios()



function comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, tipo) {
    let num = parseInt(domNumUno.innerText);
    let num1 = parseInt(domNumDos.innerText);
    
    let respuestaAlumno = parseInt(inputDomRespuesta.value);
    let correcta = false;
    
    switch (tipo) {
        case 'suma':
            correcta = (num + num1 === respuestaAlumno);
            break;
        case 'resta':
            correcta = (num - num1 === respuestaAlumno);
            break;
        case 'multiplicacion':
            correcta = (num * num1 === respuestaAlumno);
            break;
        case 'division':
            correcta = (Math.trunc(num / num1) === respuestaAlumno);
            break;
    }

    if (correcta) {
        usuario.puntos[tipo] += 10;
        usuario.intentos[tipo]--;
        inputDomRespuesta.disabled = true;
        inputDomRespuesta.classList.add('correcto');
    } else {
        usuario.intentos[tipo]--;
        inputDomRespuesta.classList.add('incorrecto');
    }
    usuario.agregarRegistro(tipo, num, num1, respuestaAlumno, correcta);
    actualizarDatosUsuario(tipo);

    if (usuario.intentos[tipo] === 0) {
        bloquearEjercicios(tipo);
    }
}

function actualizarDatosUsuario(tipo) {
    let intentosDom = document.getElementById(`intentos_${tipo}`);
    let puntosDom = document.getElementById(`puntos_${tipo}`);
    
    intentosDom.innerText = `Intentos: ${usuario.intentos[tipo]}`;
    puntosDom.innerText = `Puntos: ${usuario.puntos[tipo]}`;
}

function bloquearEjercicios(tipo) {
    let inputs = document.getElementsByClassName(`${tipo}_caja`).getElementsByClassName('respuesta');
    for (let input of inputs) {
        input.disabled = true;
    }
}



function ejerciciosSuma() {

    if(usuario.intentos.suma <= 5 && usuario.intentos.suma > 0){
        alert(`Es tu Turno de Sumar :D`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 10) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num}+${num1} =`))

        if(num+num1 === respuestaAlumno){

            usuario.puntos.suma+=10;
            usuario.intentos.suma--

            alert(`Genial, has acertado: +10 puntos
                Intentos: ${usuario.intentos.suma}
                Puntos: ${usuario.puntos.suma}`);

                usuario.agregarRegistro('suma', num, num1, respuestaAlumno, true);

            ejerciciosSuma();
        } 
        else if(num+num1!==respuestaAlumno){
            usuario.intentos.suma--
            
            alert(`Oh! esa no era
                Intentos: ${usuario.intentos.suma}
                Puntos: ${usuario.puntos.suma}`);

            usuario.agregarRegistro('suma', num, num1, respuestaAlumno, false);

            ejerciciosSuma()
        }
    }
    else{
        return alert(`Usaste tus 5 intentos para sumar`);
    } 
}

function ejerciciosResta() {

    if(usuario.intentos.resta <= 5 && usuario.intentos.resta > 0){
        alert(`Ahora a Restar`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 5) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num}-${num1} =`))

        if(num-num1 === respuestaAlumno){

            usuario.puntos.resta+=10;
            usuario.intentos.resta--;

            alert(`Que Bien, Es Correcto: +10 puntos
                Intentos: ${usuario.intentos.resta}
                Puntos: ${usuario.puntos.resta}`);

            usuario.agregarRegistro('resta', num, num1, respuestaAlumno, true);

            ejerciciosResta()
        } 
        else if(num-num1!==respuestaAlumno){
            usuario.intentos.resta--
            
            alert(`Intentemos De Nuevo
                Intentos: ${usuario.intentos.resta}
                Puntos: ${usuario.puntos.resta}`)

                usuario.agregarRegistro('resta', num, num1, respuestaAlumno, false)

            ejerciciosResta()
        }
    }
    else{
        return alert(`Usaste tus 5 intentos para Restar`);
    } 
}

function ejerciciosMultiplicar() {

    if(usuario.intentos.multiplicacion <= 5 && usuario.intentos.multiplicacion > 0){
        alert(`Vas a Multiplicar :D`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 10) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num} X ${num1} =`))

        if(num*num1 === respuestaAlumno){

            usuario.puntos.multiplicacion+=10;
            usuario.intentos.multiplicacion--

            alert(`Maravilloso, es correcta: +10 puntos
                Intentos: ${usuario.intentos.multiplicacion}
                Puntos: ${usuario.puntos.multiplicacion}`);

                usuario.agregarRegistro('multiplicar', num, num1, respuestaAlumno, true);

                ejerciciosMultiplicar()
        } 
        else if(num*num1!==respuestaAlumno){
            usuario.intentos.multiplicacion--
            
            alert(`Intentemos De Nuevo
                Intentos: ${usuario.intentos.multiplicacion}
                Puntos: ${usuario.puntos.multiplicacion}`)

                usuario.agregarRegistro('multiplicar', num, num1, respuestaAlumno, false)

                ejerciciosMultiplicar()
        }
    }
    else{
        return alert(`Usaste tus 5 intentos para Multiplicar`);
    } 
}

function ejerciciosDividir() {

    if(usuario.intentos.division <= 5 && usuario.intentos.division > 0){
        alert(`A partir, a Dividir`);

        let num = Math.floor(Math.random() * 10) + 1;
        let num1 = Math.floor(Math.random() * 4) + 1;
        let respuestaAlumno = parseInt(prompt(`Resuelve Esto: ${num} / ${num1} =`))

        if(Math.trunc(num/num1) === respuestaAlumno){

            usuario.puntos.division+=10;
            usuario.intentos.division--

            alert(`Bravoo, es correcta: +10 puntos
                Intentos: ${usuario.intentos.division}
                Puntos: ${usuario.puntos.division}`);

                usuario.agregarRegistro('dividir', num, num1, respuestaAlumno, true)

                ejerciciosDividir()
        } 
        else if(num*num1!==respuestaAlumno){
            usuario.intentos.division--
            
            alert(`Intentemos De Nuevo
                Intentos: ${usuario.intentos.division}
                Puntos: ${usuario.puntos.division}`)

            usuario.agregarRegistro('dividir', num, num1, respuestaAlumno, false)

            ejerciciosDividir()
        }
    }
    else{
        return alert(`Se acabaron tus intentos`);
    } 
}


function filterCorrectas(objRegistro){
    return objRegistro.correcta === true;
}     

function correctasBotton(){

    let respuestasCorrectas = usuario.registros.filter(filterCorrectas);

    console.log(`Tienes ${respuestasCorrectas.length} respuestas Correctas`);
    alert(`Tienes ${respuestasCorrectas.length} respuestas Correctas`);
}


function filterIncorrectas(objRegistros){
    return objRegistros.correcta === false;
}

function incorrectasBotton(){

    let respuestasIncorrectas = usuario.registros.filter(filterIncorrectas);

    console.log(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`)
    alert(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`)
}

function filterPorTipo(tipo){
    return function (objRegistros){
            return objRegistros.tipo === tipo;
    }
}

function tipoDeOperacionBotton(tipo=prompt('Escribe "suma, resta, multiplicacion, division" para filtrar por tipo')){
    
    let respuestasPorTipo = usuario.registros.filter(filterPorTipo(tipo));
    
    respuestasPorTipo.forEach((respuestasPorTipo)=>
        alert(`Operacion: ${respuestasPorTipo.tipo}
        numero ${respuestasPorTipo.num}
        numero ${respuestasPorTipo.num1}
        Respuesta del Usuario: ${respuestasPorTipo.respuesta}
        ¿Fue correcta?: ${respuestasPorTipo.correcta}`))
}