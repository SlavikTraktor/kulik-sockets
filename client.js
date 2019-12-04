var net = require('net');



[...new Array(15)].forEach(() => {
  const client = new net.Socket();
  client.connect(1235, '127.0.0.1', function() {
    client.write('Hello, server! Love, Client.', () => {
      client.destroy();
    });
  });
});


[...new Array(15)].forEach(() => {
  const client = new net.Socket();
  client.connect(1234, '127.0.0.1', function() {
    client.write('Hello, server! Love, Client.', () => {
      client.destroy();
    });
  });
});
