
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
// console.log('init server')
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));
console.log(bands)

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    //client.on('event', data => { /* … */ });
    client.emit('actives-bands', bands.getBands());
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

    client.on('vote-band',(payload)=>{
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('actives-bands', bands.getBands());
       // io.emit('nuevo-mensaje',payload);  //client.broadcast.emit
    });

    client.on('actives-bands',(payload)=>{
        console.log(payload);
        io.emit('nuevo-mensaje',payload);  //client.broadcast.emit
    });

    client.on('add-band',(payload)=>{
        //console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('actives-bands', bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        //console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('actives-bands', bands.getBands());
    });


});