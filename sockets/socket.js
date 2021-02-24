
const {io} = require('../index');
const {comprobarJWT} = require('../helpers/jwt');
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controlers/socket');
// console.log('init server')


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    // Verificar autenticacion
    if( !valido) {return client.disconnect()};

    // Cliente autenticado
    usuarioConectado(uid);
    
    // Ingresar usuario a una sala especifica
    // sala global - todos los dispositivos conectados , client.id
    client.join(uid);

    // escuchar mensaje personal
    client.on('mensaje-personal', async (payload)=>{
        //console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });


    //client.to(uid).emit('');
    
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload);

        io.emit('mensaje',{admin: 'Nuevo mensaje'});
    });

    // client.on('emitir-mensaje',(payload)=>{
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje',payload);  //client.broadcast.emit
    // });    
    }
);