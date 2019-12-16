const tcp = require("net");
const udp = require("dgram");
const config = require("./config");

const tcpPorts = config.tcpPorts;
const udpPorts = config.udpPorts;

const packageCountOnTCPPort = new Map();
const packageCountOnUDPPort = new Map();

const subscribers = new Map();

const emitSubscrbers = () => {
  subscribers.forEach((v) => {
    v()
  })
}

tcpPorts.forEach(port => {
  packageCountOnTCPPort.set(port, 0);
  const server = tcp.createServer(function(socket) {
    socket.on("data", data => {
      const oldCount = packageCountOnTCPPort.get(port);
      packageCountOnTCPPort.set(port, oldCount + 1);
      emitSubscrbers();
      socket.write('OK');
      console.log("tcp", port, packageCountOnTCPPort.get(port));
    });
  });

  console.log("tcp listen " + port);
  server.listen(port, "127.0.0.1");
});

udpPorts.forEach(port => {
  packageCountOnUDPPort.set(port, 0);
  const server = udp.createSocket("udp4");
  server.on("message", (data, rinfo) => {
    const oldCount = packageCountOnUDPPort.get(port);
    packageCountOnUDPPort.set(port, oldCount + 1);
    emitSubscrbers();
    const resp = Buffer.from('OK');
    server.send(resp, rinfo.port, rinfo.address);
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



const subFunc = (name, cb) => {
  subscribers.set(name, cb);
}

module.exports = {
  ports: getResult,
  subscribe: subFunc,
};
