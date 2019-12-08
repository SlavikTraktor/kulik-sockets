var tcp = require('net');
var udp = require('dgram');

function sendCountToTCPPort(count, port) {
  [...new Array(count)].forEach(() => {
    const client = new tcp.Socket();

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

function sendCountToUDPPort(count, port) {
  [...new Array(count)].forEach(() => {
    var client = udp.createSocket('udp4');
    var data = Buffer.from('Hello, server! Love, Client.');

    client.send(data, port, '127.0.0.1', function(err){
      client.close();
    });
  });
}


sendCountToTCPPort(6, 1234);
// sendCountToUDPPort(2, 1232);