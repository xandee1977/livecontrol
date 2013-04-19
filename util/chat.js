// Inicia o protocolo net
net = require("net");

// Lista de usuarios conectados
var sockets = [];

var s = net.createServer(function(socket){
  sockets.push(socket);

  // Escreve os dados escritos
  socket.on('data', function(data){
    for( var i=0; i<sockets.length; i++) {
      // Evita que seja retornada a frase de quem escreveu
      if(sockets[i] == socket) continue;
      sockets[i].write(data);
    }
  });

  // Retira da lista quando a pessoa 
  socket.on('end', function(){
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });

});

// Inicia a escuta da porta
s.listen(8000);