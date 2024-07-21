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

        this.datosTabla= [];
    }


    agregarRegistro(tipo, num, num1, respuesta, correcta){
        this.datosTabla.push({
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


let usuario;
let todosLosUsuarios = cargarUsuariosDesdeLocalStorage();

function setData() {
    localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));
}

function cargarUsuariosDesdeLocalStorage() {
    let usuarios = localStorage.getItem('usuarios');

    if (usuarios) {
        
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

    let h2NombreUsuario = document.getElementById('quien_juega');
    
    let msj = document.getElementById('mensaje');
    msj.innerHTML = '';

    if (usuarioEncontrado) {
        usuario = usuarioEncontrado;
        usuario.saludarAlUsuario();
        
        msj.innerHTML = `Bienvenido de nuevo<br><span id="quien_juega">${usuario.nombreUsuario}</span>`;
        
    } else {
        usuario = new ClassUsuario(inputNombre);
        
        todosLosUsuarios.push(usuario);
        usuario.saludarAlUsuario();
        
        msj.innerHTML = `Te has registrado correctamente<br><span id="quien_juega">${usuario.nombreUsuario}</span>`;

        setTimeout(function() {           //Mi Segunda Asincronia :DD
            Swal.fire({                   //Alerta copiar y pegar desde la documentacion :P
                title: "¿Como Jugar?",
                text: "Al escribir la respuesta puedes presionar la tecla ENTER || El boton de la derecha (si aparece)",
                icon: "info"
                }).then((result) => {
                    if (result.isConfirmed) {
                    Swal.fire({
                        title: "Vamos",
                        text: "Has entendido muy bien!",
                        icon: "success"
                    });
                    }
                });
        }, 3000);

            setData();
    }
    h2NombreUsuario.innerText = usuario.nombreUsuario;
    
    mostrarEjerciciosYOcultarRegistro()
    actualizarTabla();
}

function actualizarDatosUsuario(tipo) {
    document.getElementById(`intentos_${tipo}`).innerText = `Intentos: ${usuario.intentos[tipo]}`;
    document.getElementById(`puntos_${tipo}`).innerText = `Puntos: ${usuario.puntos[tipo]}`;
    setData()
}

let domSumasCajas = document.getElementsByClassName('sumas_caja');
let domRestasCajas = document.getElementsByClassName('resta_caja');
let domMultiplicacionesCajas = document.getElementsByClassName('multiplicacion_caja');
let domDivisionesCajas = document.getElementsByClassName('division_caja');

function crearNumerosAleatorios() {
    for (let i = 0; i < domSumasCajas.length; i++) {
        let domNumUno = domSumasCajas[i].getElementsByClassName('sumas_caja_numero')[0];
        let domNumDos = domSumasCajas[i].getElementsByClassName('sumas_caja_numeroDos')[0];
        
        let inputDomRespuesta = domSumasCajas[i].getElementsByClassName('respuesta')[0];
        
        //agregando botones para version mobile o movile?                                     |
        //antes habia agregado la tecla 'espacio' y funcionaba en pc, pero en mobile no       | 
        //asi que, hoy me dedicare a aplicar botones :D                                       |
        let sumasCajaBoton = domSumasCajas[i].getElementsByClassName('sumas_caja_boton')[0];//|
        
        domNumUno.innerText = Math.floor(Math.random() * 10) + 1;
        domNumDos.innerText = Math.floor(Math.random() * 10) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'suma');
            }
        });

        sumasCajaBoton.addEventListener('click', function () {
            comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'suma');
            sumasCajaBoton.classList.remove('solo_moviles');
            sumasCajaBoton.classList.add('ocultar');
        });
    }

    
    for (let i = 0; i < domRestasCajas.length; i++) {
        let domNumUno = domRestasCajas[i].getElementsByClassName('resta_caja_numero')[0];
        let domNumDos = domRestasCajas[i].getElementsByClassName('resta_caja_numeroDos')[0];
        
        let inputDomRespuesta = domRestasCajas[i].getElementsByClassName('respuesta')[0];

        let restaCajaBoton = domRestasCajas[i].getElementsByClassName('resta_caja_boton')[0]; //boton movile
        
        domNumUno.innerText = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'resta');
            }
        });

        restaCajaBoton.addEventListener('click', function () { // funcion boton mobile
            comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'resta');
            restaCajaBoton.classList.remove('solo_moviles');
            restaCajaBoton.classList.add('ocultar');
        });
    }

    
    for (let i = 0; i < domMultiplicacionesCajas.length; i++) {
        let domNumUno = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_numero')[0];
        let domNumDos = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_numeroDos')[0];
        
        let inputDomRespuesta = domMultiplicacionesCajas[i].getElementsByClassName('respuesta')[0];

        let multiplicacionCajaBoton = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_boton')[0]; //boton moBile
        
        domNumUno.innerText = Math.floor(Math.random() *(5 - 1 + 1)) + 1;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'multiplicacion');
            }
        });

        multiplicacionCajaBoton.addEventListener('click', function () { // funcion boton mobile
            comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'multiplicacion');
            multiplicacionCajaBoton.classList.remove('solo_moviles')
            multiplicacionCajaBoton.classList.add('ocultar');
        });
    }


    
    for (let i = 0; i < domDivisionesCajas.length; i++) {
        let domNumUno = domDivisionesCajas[i].getElementsByClassName('division_caja_numero')[0];
        let domNumDos = domDivisionesCajas[i].getElementsByClassName('division_caja_numeroDos')[0];
        
        let inputDomRespuesta = domDivisionesCajas[i].getElementsByClassName('respuesta')[0];

        let divisionCajaBoton = domDivisionesCajas[i].getElementsByClassName('division_caja_boton')[0];
        
        domNumUno.innerText = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        domNumDos.innerText = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        inputDomRespuesta.addEventListener('keypress', function (e) {  
            if (e.key === 'Enter') {
                comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'division');
            }
        });

        divisionCajaBoton.addEventListener('click', function () { // funcion boton mobvile
            comprobarRespuesta(domNumUno, domNumDos, inputDomRespuesta, 'division');
            divisionCajaBoton.classList.remove('solo_moviles');
            divisionCajaBoton.classList.add('ocultar');
        });
    }}
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
        Toastify({
            text: `Usaste tus 5 intentos para ${tipo}`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            onClick: function(){}
        }).showToast();
    } 
    actualizarTabla();
    mostrarTabla();
}



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
    if (puntosTotal >= 140) return 'A';
    if (puntosTotal >= 110) return 'B'; 
    if (puntosTotal >= 80) return 'C';
    if (puntosTotal >= 60) return 'D';
    if (puntosTotal >= 30) return 'E';
    return 'F';
}

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

            limpiarInputs()
            clonesDeNodos()
            crearNumerosAleatorios()
            setData();

            let asideTabla = document.getElementById('aside_tabla');
            asideTabla.classList.add('ocultar');
        
            let allContent = document.body.children;
            for (let i = 0; i < allContent.length; i++) {
                allContent[i].style.display = '';
            }

            for (let i = 0; i < domSumasCajas.length; i++) {//volver a mostrar los botones, hice cambios mas arriba
                                                            //para no repetir lineas, Las cajas las hice globales.
                                                            // Cambios sin errores.

                let sumasCajaBoton = domSumasCajas[i].getElementsByClassName('sumas_caja_boton')[0];
                let restaCajaBoton = domRestasCajas[i].getElementsByClassName('resta_caja_boton')[0];
                let multipliCajaBoton = domMultiplicacionesCajas[i].getElementsByClassName('multiplicacion_caja_boton')[0];
                let divisionCajaBoton = domDivisionesCajas[i].getElementsByClassName('division_caja_boton')[0];

                sumasCajaBoton.classList.remove('ocultar');
                sumasCajaBoton.classList.add('solo_moviles');
                restaCajaBoton.classList.remove('ocultar');
                restaCajaBoton.classList.add('solo_moviles');
                multipliCajaBoton.classList.remove('ocultar');
                multipliCajaBoton.classList.add('solo_moviles');
                divisionCajaBoton.classList.remove('ocultar');
                divisionCajaBoton.classList.add('solo_moviles')
            }
        }
    else{
        Toastify({
            text: `Debes acabar todos tus intentos para ReIniciar`,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            onClick: function(){}
        }).showToast();
    }
}



function limpiarInputs() {

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

/* PROYECTO FINAL
    De momento voy a parchear cosas aqui abajo :D
    Y dar estilos, nada mas... no sé que API usar.
    La del clima?.
*/

function mostrarEjerciciosYOcultarRegistro() {
    
    let cajaEjerciciosDom = document.querySelector('.ocultar');
    let cajaRegistroDom = document.getElementById('registrarUsuario');

    let allContent = cajaRegistroDom.children;
    for (let i = 0; i < allContent.length; i++) {
        if (allContent[i].id !== 'mensaje') {
            allContent[i].style.display = 'none';
        }
    }
    
    setTimeout(function() {              //Mi Primera Asincronia :DD
        cajaEjerciciosDom.id = 'ejercicios';
        
        cajaRegistroDom.removeAttribute('id');
        cajaRegistroDom.classList.add('ocultar');
        mostrarTabla();
    }, 2000);
}
// dije que dejaria los parches aqui abajo, pero algunos no se pueden: "los botones en movile"
// ya busque y es *Movile*, no _mobile_.

// Existia un error muy grave desde el primer momento en que implemente el Boton RESET
// Desde la 3ra-Entrega y esa es:
/* El oprimir Reset, jugar y apretar el boton o hacer "Enter", Quitaba Dos Intentos en lugar de Uno
    
    Depurando el codigo vi que la funcion comprobarRespuesta() se ejecutaba dos veces solamente
        despues del RESET. Despues de varios dias con esa Vill-Sombra sobre mi
        un dia cualquiera pensé, al ir a la pagina se agrega el evento Click && Enter ok todo bien
        al Resetear los agrega denuevo cierto, CLARO, desde allí comenze a jalar la cuerda.
            Primer parche fallido: antes de la linea que agrega los evento, puse un removeEvenListener
                sin exito, el error seguia (No eran los eventos xD o eso creia).
            Luego de varios cambios y nuevos errores para reparar ese Vill Error

            No queria seguir en esto y Le pregunte a chatGPT
            entre todas las soluciones que me dio, esta resulto mas facil de entender

            clonesDeNodos() Entiendo lo que hace: toma todos los input y botones
                reemplaza los mios por los Clones que no tienen eventos :D
                Claro, despues se agregan nuevamente una vez
                entiendo que al presionar Reset siempre hará clones y nunca habra eventos duplicados.

    anteriormente agrege un metodo que actualiza la pagina, pero
    encontre que esa solucion era muy ordinaria y la descarté xD

    Perdón por los comentarios, siento que tenia que documentar esto, dias y horas en un solo ERROR
    arreglado en 10 lineas -maravilloso- (aun no sé que API usar);
*/  
function clonesDeNodos() {
    let cajas = document.querySelectorAll('.respuesta, .sumas_caja_boton, .resta_caja_boton, .multiplicacion_caja_boton, .division_caja_boton');
    
    cajas.forEach(caja => {
        
        let clon = caja.cloneNode(true);
        caja.parentNode.replaceChild(clon, caja);
    });
}
