const tcp = require("net");
const udp = require("dgram");
const config = require("./config");

const tcpPorts = config.tcpPorts;
const udpPorts = config.udpPorts;

const packageCountOnTCPPort = new Map();
const packageCountOnUDPPort = new Map();

tcpPorts.forEach(port => {
  packageCountOnTCPPort.set(port, 0);
  const server = tcp.createServer(function(socket) {
    socket.on("data", data => {
      const oldCount = packageCountOnTCPPort.get(port);
      packageCountOnTCPPort.set(port, oldCount + 1);
      console.log("tcp", port, packageCountOnTCPPort.get(port));
    });
  });

  console.log("tcp listen " + port);
  server.listen(port, "127.0.0.1");
});

udpPorts.forEach(port => {
  packageCountOnUDPPort.set(port, 0);
  const server = udp.createSocket("udp4");
  server.on("message", data => {
    const oldCount = packageCountOnUDPPort.get(port);
    packageCountOnUDPPort.set(port, oldCount + 1);
    console.log("udp", port, packageCountOnUDPPort.get(port));
  });

  console.log("udp listen " + port);
  server.bind(port);
});

const getResult = () => {
  let result = [];

  packageCountOnTCPPort.forEach((count, port) => {
    result.push({
      type: "tcp",
      port,
      count
    });
  });

  packageCountOnUDPPort.forEach((count, port) => {
    result.push({
      type: "udp",
      port,
      count
    });
  });

  return result.sort((a, b) => (b.port > a.port ? -1 : 1));
};

module.exports = {
  ports: getResult
};
