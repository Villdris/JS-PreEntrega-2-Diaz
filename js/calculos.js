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
        Toastify({
            text: `Hola ${this.nombreUsuario}`,
            duration: 3000,
            gravity: "center",
            position: "center",
            stopOnFocus: true,
        }).showToast();
    }

    getDatos(){
        console.log(`Usuario = ${this.nombreUsuario}
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

    if (usuarios) {  // esta solución me la dio ChatGPT, sé lo que hace
                    //crea a los usuarios desde el constructor (detalle que no pasó por mi mente)
                    // con la info del localStorage... mejor preguntar que quedar pegado horas
                    // cierto?  (me imagino a los pobre programadores de antaño sin esta herramienta)
        let usuariosDelLocal = JSON.parse(usuarios).map(user => {
            let usuario = new ClassUsuario(user.nombreUsuario);
            usuario.puntos = user.puntos;
            usuario.intentos = user.intentos;
            usuario.registros = user.registros;
            return usuario;
        
        });
        return usuariosDelLocal;
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

    actualizarTabla();
    mostrarTabla();

}

function actualizarDatosUsuario(tipo) {
    document.getElementById(`intentos_${tipo}`).innerText = `Intentos: ${usuario.intentos[tipo]}`;
    document.getElementById(`puntos_${tipo}`).innerText = `Puntos: ${usuario.puntos[tipo]}`;
    setData()
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
        }); //lo probe en mi celular, pero no tiene boton ENTER ja ja ja :cccc 
            //es decir, para moviles no sirve "xD o xC"
            // lo parcheare con un "Enter || Click" y crear la funtion para eso :cccc
            //seguramente para la entregaFinal ya este arreglado ahora no hay tiempo para eso :x
    }
}
crearNumerosAleatorios()



function comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, tipo) {
    let num = parseInt(domNumUno.innerText);
    let num1 = parseInt(domNumDos.innerText);
    
    let respuestaAlumno = parseInt(inputDomRespuesta.value);
    let correcta = false;
    
    if (tipo === 'suma'){
        correcta = (num + num1 === respuestaAlumno);
    }
    if (tipo === 'resta'){
        correcta = (num - num1 === respuestaAlumno);
    }
    if (tipo === 'multiplicacion'){
        correcta = (num * num1 === respuestaAlumno);
    }
    if (tipo === 'division'){
        correcta = (Math.trunc(num / num1) === respuestaAlumno);
    }


    if(usuario.intentos[tipo] > 0 && usuario.intentos[tipo] <= 5){
        if (correcta) {
            usuario.puntos[tipo] += 10;
            usuario.intentos[tipo]--;
            inputDomRespuesta.disabled = true;
            inputDomRespuesta.classList.add('correcto');
        } else {
            usuario.intentos[tipo]--;
            inputDomRespuesta.classList.add('incorrecto');
            inputDomRespuesta.disabled = true;
        }
        usuario.agregarRegistro(tipo, num, num1, respuestaAlumno, correcta);
        
        actualizarDatosUsuario(tipo);

    } else {
        Toastify({                     //hice un copiar y pegar e.e desde la documentacion 
            text: `Usaste tus 5 intentos para ${tipo}`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
        }).showToast();
    } 
    actualizarTabla();
    mostrarTabla();
}





//filtros de la 2da entrega.... tengo que hacerles DOM a esto tambien? x.x *se muere*
// tengo pensado hacer una tabla estilo resident evil-mercenarios
// donde al final te dice todo de todo y una nota S+/S/A/B/C/D/E
// bueno, me quedan 2 dias :o  // me queda uno, y estoy parcheando cosas :P
function actualizarTabla() {

    document.getElementById('punto_suma').innerText = usuario.puntos.suma;
    document.getElementById('punto_resta').innerText = usuario.puntos.resta;
    document.getElementById('punto_multiplicacion').innerText = usuario.puntos.multiplicacion;
    document.getElementById('punto_division').innerText = usuario.puntos.division;

    document.getElementById('calificacion_suma').innerText = obtenerCalificacion(usuario.puntos.suma);
    document.getElementById('calificacion_resta').innerText = obtenerCalificacion(usuario.puntos.resta);
    document.getElementById('calificacion_multiplicacion').innerText = obtenerCalificacion(usuario.puntos.multiplicacion);
    document.getElementById('calificacion_division').innerText = obtenerCalificacion(usuario.puntos.division);

    let puntosTotal = usuario.puntos.suma + usuario.puntos.resta + usuario.puntos.multiplicacion + usuario.puntos.division;
    document.getElementById('puntos_total').innerText = puntosTotal;

    document.getElementById('calificacion_total').innerText = obtenerCalificacionTotal(puntosTotal);
}

function obtenerCalificacion(puntos) {
    if (puntos >= 50) return 'S';
    if (puntos >= 40) return 'A';
    if (puntos >= 30) return 'B';
    if (puntos >= 20) return 'C';
    if (puntos >= 10) return 'D';
    if (puntos >= 0) return 'F';
}

function obtenerCalificacionTotal(puntosTotal) {
    if (puntosTotal >= 200) return 'S+';
    if (puntosTotal >= 170) return 'S';
    if (puntosTotal >= 140) return 'A'; // se preguntara de donde saqué estos numeros
    if (puntosTotal >= 110) return 'B'; // son 200(puntosmaximos) dividido en cada letra 7
    if (puntosTotal >= 80) return 'C';  // y redondeado ??5 hacia arriba y menos hacia abajo :D 
    if (puntosTotal >= 60) return 'D';
    if (puntosTotal >= 30) return 'E';
    return 'F';
}
//Filtro de la 2da entrega sin ninguna funcion actual ABAJO
/* function filterCorrectas(objRegistro){
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
    console.log(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`);
    alert(`Tienes ${respuestasIncorrectas.length} respuestas erroneas`);
}
function tipoDeOperacionBotton(tipo=prompt('Escribe "suma, resta, multiplicacion, division" para filtrar por tipo')){
    
    let respuestasPorTipo = usuario.registros.filter(filterPorTipo(tipo));
    
    respuestasPorTipo.forEach((respuestasPorTipo)=>
        alert(`Operacion: ${respuestasPorTipo.tipo}
        numero ${respuestasPorTipo.num}
        numero ${respuestasPorTipo.num1}
        Respuesta del Usuario: ${respuestasPorTipo.respuesta}
        ¿Fue correcta?: ${respuestasPorTipo.correcta}`))
} */
//Filtro de la 2da entrega sin ninguna funcion actual ARRIBA

function reset(){
    if(usuario.intentos.suma === 0 && usuario.intentos.resta === 0
        && usuario.intentos.multiplicacion === 0 && usuario.intentos.division === 0){
            
            usuario.intentos.suma = 5;
            usuario.intentos.resta = 5;
            usuario.intentos.multiplicacion = 5;
            usuario.intentos.division = 5;

            usuario.puntos.suma = 0;
            usuario.puntos.resta = 0;
            usuario.puntos.multiplicacion = 0;
            usuario.puntos.division = 0;

            Toastify({
                text: `Datos reiniciados`,
                duration: 3000,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
            }).showToast();
            
            actualizarDatosUsuario('suma');
            actualizarDatosUsuario('resta');
            actualizarDatosUsuario('multiplicacion');
            actualizarDatosUsuario('division');

            usuario.registros= [];
            limpiarInputs()
            crearNumerosAleatorios()
            setData();

            //Terminando la tabla :D uffff, ya no quiero mas Dom, me faltan 4 horas para entregar :CC
            let asideTabla = document.getElementById('aside_tabla');
            asideTabla.classList.add('ocultar');
        
            let allContent = document.body.children;
            for (let i = 0; i < allContent.length; i++) {
                allContent[i].style.display = '';
            }
        }
    else{
        Toastify({
            text: `Debes acabar todos tus intentos para ReIniciar`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function(){} // Callback after click
        }).showToast();
    }
}



function limpiarInputs() {          // es complicado ordenar el codigo y que otros lo entiendan
                                    // este es un parche pero, lo dejo aqui
    const inputs = document.querySelectorAll('.respuesta');
    inputs.forEach(input => {
        input.value = '';
        input.disabled = false;
        input.classList.remove('correcto', 'incorrecto');
    });
}
limpiarInputs()



function mostrarTabla(){
    if(usuario.intentos.suma === 0 && usuario.intentos.resta === 0
        && usuario.intentos.multiplicacion === 0 && usuario.intentos.division === 0){

        actualizarTabla();

        let asideTabla = document.getElementById('aside_tabla');
        asideTabla.classList.remove('ocultar');
        console.log(asideTabla);

        let allContent = document.body.children;
        for (let i = 0; i < allContent.length; i++) {
            if (allContent[i].id !== 'aside_tabla') {
                allContent[i].style.display = 'none';
            }
        }
    }
}

//Al Final, no usé los filtros de la 2da entrega
//todos los datos que queria estan en el constructor del usuario :D
// Sobraban para hacer la tabla, no eran necesarios. me da pena borrarlos xD
// Son como una parte de mi ja jja (mejor las dejo, me pueden servir para otra funcion)