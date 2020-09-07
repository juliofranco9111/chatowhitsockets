const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require ('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    let clientId = client.id;
       

    //    console.log('Usuario conectado');
    client.on('entrarChat', (data, callback) => {

        let nombre = data.nombre;
        let sala = data.sala;

        //console.log(data);
        if (!nombre || !sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            })
        }

        //asigno la sala
        client.join(sala);


        usuarios.agregarPersona(clientId, nombre, sala);


        client.broadcast.to(sala).emit('crearMensaje', crearMensaje('Administrador',`${nombre} se unió al chat`));

        client.broadcast.to(sala).emit('listaPersonas', usuarios.getPersonasPorSala(sala));
        
        callback(usuarios.getPersonasPorSala(sala));

    });

    client.on('crearMensaje', (data)=>{
        
        let persona = usuarios.getPersona(clientId);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);


        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    })

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(clientId);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador',`${personaBorrada.nombre} abandonó el chat`) );

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    });


    client.on('mensajePrivado', data =>{

        let persona = usuarios.getPersona(client.id);
        // to es para enviar mensaje privado y para es el nombre que le dimos a data.para
        // se prueba con consola del navegador asi: socket.emit('mensajePrivado',{mensaje:'hola a todos', para: '0Y5nb3Mz3X6JaC1oAAAD'});
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });



});