const tcp = require("net");
const udp = require("dgram");
const config = require("./config");

function sendCountToTCPPort(count, port) {
  [...new Array(count)].forEach(() => {
    const client = new tcp.Socket();

    client.connect(port, "127.0.0.1", function() {
      client.write("Hello, server! Love, Client.");
    });

    client.on('data', (data) => {
      console.log(`TCP ${port} ${data.toString()}`);
      client.destroy();
    })
  });
}

function sendCountToUDPPort(count, port) {
  [...new Array(count)].forEach(() => {
    const client = udp.createSocket("udp4");
    const data = Buffer.from("Hello, server! Love, Client.");

    client.send(data, port, "127.0.0.1");

    client.on("message", (data) => {
      console.log(`UDP ${port} ${data.toString()}`);
      client.close();
    })
  });
}

const maximumMessagesCount = 4;

config.tcpPorts.forEach(port => {
  sendCountToTCPPort(Math.ceil(Math.random() * maximumMessagesCount), port);
});

config.udpPorts.forEach(port => {
  sendCountToUDPPort(Math.ceil(Math.random() * maximumMessagesCount), port);
});
