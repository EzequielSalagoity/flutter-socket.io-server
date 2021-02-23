
const {io} = require('../index');
// console.log('init server')


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(payload)=>{
        console.log('Mensaje',payload);

        io.emit('mensaje',{admin: 'Nuevo mensaje'});
    });

    // client.on('emitir-mensaje',(payload)=>{
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje',payload);  //client.broadcast.emit
    // });    


});