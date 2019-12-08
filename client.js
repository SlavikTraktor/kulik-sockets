var net = require('net');

function sendCountToTCPPort(count, port) {
  [...new Array(count)].forEach(() => {
    const client = new net.Socket();

    client.connect(port, '127.0.0.1', function() {
      client.write('Hello, server! Love, Client.', () => {
        client.destroy();
      });
      
      
    });

    // client.on('data', () => {
    //   client.destroy();
    // })
  });
}


sendCountToTCPPort(1, 1235);