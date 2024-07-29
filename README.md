# Segunda Entrega Para CoderHouse "JavaScript".  
De momento, es muy simple todo, cálculos muy básicos.  Mi intención a futuro, es hacer una página interactiva para niños muy linda y llamativa, con explicaciones matemáticas luego los Ejercicios interactivos... Vamos, en mi mente brilla jaja.  

### Respecto a lo técnico.  Cumple con lo pedido para la primera entrega:  
Tiene Variables y Condicionales If- else if- else.  
Todas son funciones, nada esta suelto.  
Y un solo bucle, que sirve para buscar Factores.  
Como Extra, agregué Botones para cada Operación en HTML.

### Segunda Entrega:  
Estructura HTML basica, con botones anchada a las funciones y filtros :D
Tiene las variables y funciones esenciales para el correcto funcionamiento, nada sobra (faltan para lo que quiero hacer al final, claro).
Tiene una class, objetos y arrays necesarios.
METODOS DE BUSQUEDA: tiene 3 .filter() y un forEach, pensé en agregar un .find() pero no tiene mucho sentido agregarlo, asi que hice 3 .filter() para compensar asi el tutor no me baja puntos :D.

El primer .filter() tiene un error,sé como arreglarlo pero no lo e quitado para que vea esa anomalia. No me quite puntos por eso :c

---- GithubPages: https://villdris.github.io/JS-PreEntrega-2-Diaz/ ----

### Tercera Entrega:
Todo lo anterior   
hago este READMI a las 22.20 y debo entregar a las 22.59 (horaChile).    
Todo funciona correcto en PC, para movil lo haré despues, no tengo tiempo :P   
Fue dificil, morí y reviví muchas veces, tuve errores muy tontos, tenia IDs duplicados y yo revisando el JS buscando que pasaba por horas, y el ver el html con detenimiento, claro, tenia ID iguales.
Algunas funciones me las sugirió mi sobrina de 8 años que son:  
Limpiar los inputs al actualizar la pagina, ya que, ella creia que las respuesta ya estaban escritas, cuando en realidad eran las respuestas anteriores, y eso no deberian estar. (yo como adulto, no me percate de ello).
Segun mi criterio,esta entrega cumple con todo lo pedido:  
1-El storage y Json van de la mano asi que, este aspecto esta correcto.  
2-El DOM para que nombrarlo, habian cosas que no sabia, busque por youtube y me aclaro muchas cosas que en la clase no se vieron, se pueden apreciar en mi codigo que hay metodos que no enseñaron en clase.  
3-Los eventos, solo tiene Tres: Dos botones (registrar-Reset) y el ENTER para comprobar la respuesta.
    
el codigo se entiende bien, las funciones tienen un nombre muy aclarativo y algunos detalles estan comentados en el codigo.

---- GithubPages: https://villdris.github.io/JS-PreEntrega-2-Diaz/ ----   

### (NUEVO) Proyecto-Final  

Según la última clase, estos eran los requisitos:  

1-Librería de uso relevante: Utilicé SweetAlert para los que recién se registran, aparece una vez nada más.   
Toastify que solo notifica eventos importantes, como: Saludar cada vez que se entra, te avisa cuando te quedas sin intentos al jugar y al hacer reset nos dará un aviso :D.   
   
2-Manejo de promesas con fetch: Aquí llamé a dos apis, una de trivia " https://www.quiz-contest.xyz/ " (fue la primera que me salió en Google) solo posee diez preguntas por link, así que solo utilicé tres al azar cada vez que se recarga la página.   
Y la pokeApi, al acabar los intentos aparecerá una tabla con un pokemon aleatorio como recompensa (mi sobrina feliz :D).  

3-Datos desde un JSON local o una api externa: Todos los datos JSON de ambas apis las manejé dentro de una función en fetch.