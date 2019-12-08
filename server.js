var net = require('net');

const tcpPorts = [1234, 1235];

const udpPorts = [1231, 1232];

const packageCountOnPort = new Map();

tcpPorts.forEach(v => {
  packageCountOnPort.set(v, 0);
});

tcpPorts.forEach((port) => {
  const server = net.createServer(function(socket) {
    socket.on('data', data => {
      const oldCount = packageCountOnPort.get(port);
      packageCountOnPort.set(port, oldCount + 1);
      console.log(data.toString(), packageCountOnPort.get(port));
    });
  });

  console.log('listen ' + port);
  server.listen(port, '127.0.0.1');
});
