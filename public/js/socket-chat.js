var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre')||!params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son obligatorios');
};

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario,function(respuesta){
        console.log('Usuarios conectados: ',respuesta);
    });


});


socket.on('disconnect', function () {

    console.log('Se perdió la conexión con el servidor');

});

//Enviar informacion
/* socket.emit('crearMensaje',function(){

}) */



// Escuchar información
socket.on('crearMensaje', function (respuesta) {

    console.log('Servidor:', respuesta);

});

//Escuchar cambios de usuarios
//Cuando entran o salen

socket.on('listaPersonas', function (personasPorSala) {

    console.log(personasPorSala);

});

//Mensajes privados
socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje privado: ', mensaje)
})