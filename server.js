var net = require('net');

const tcpPorts = [

];

const udpPorts = [

];


let ports = [
  {
    port: 1234,
    count: 0
  },
  {
    port: 1235,
    count: 0
  },
]

ports.forEach((v, i) => {
  var server = net.createServer(function(socket) {
    socket.on('data', (data) => {
      ports[i] = {
        ...ports[i],
        count: ports[i].count+1
      }
      console.log(data.toString());
      console.log(ports[i]);
    })
    socket.write('Echo server\r\n');
    //socket.pipe(socket);
  });

  console.log('listen ' + v.port);
  server.listen(v.port, '127.0.0.1');
});