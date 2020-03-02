import * as net from 'net';
const server = net.createServer();
import * as dns from 'dns';
server.on('error', err => {
  console.log('SERVER ERROR');
  console.log(err);
});
server.on('connection', clientToProxySocket => {
  console.log('Client Connected To Proxy'); // We need only the data once, the starting packet

  clientToProxySocket.once('data', async data => {
    let isTLSConnection = data.toString().indexOf('CONNECT') !== -1; //Considering Port as 80 by default 

    let serverPort = 80;
    let serverAddress;

    if (isTLSConnection) {
      // Port changed to 443, parsing the host from CONNECT 
      serverPort = 443;
      serverAddress = data.toString().split('CONNECT ')[1].split(' ')[0].split(':')[0];
    } else {
      // Parsing HOST from HTTP
      serverAddress = data.toString().split('Host: ')[1].split('\r\n')[0];
    }

    console.log('❤');
    console.log(serverAddress);
    const lookup = await dnsLookup(serverAddress).catch(err => 'error');
    console.log('lookup' + '🚀', lookup); // return if the address is not valid, for instance google chrome search bar

    if (lookup === 'error') {
      console.log('WROND ADDRESS🎌🎌🎌🎌 ');
      return;
    }

    if (serverAddress.includes('t.co')) return;
    if (serverAddress.includes('t.co')) return;
    console.log(serverAddress.includes('twitter'));
    if (serverAddress.includes('twitter')) return;
    if (serverAddress.includes('twimg')) return;
    let proxyToServerSocket = net.createConnection({
      host: serverAddress,
      port: serverPort
    }, () => {
      console.log('PROXY TO SERVER SET UP');

      if (isTLSConnection) {
        //Send Back OK to HTTPS CONNECT Request
        clientToProxySocket.on('err', err => console.log(err));
        clientToProxySocket.write('HTTP/1.1 200 OK\r\n\n');
      } else {
        proxyToServerSocket.write(data);
      } // Piping the sockets


      proxyToServerSocket.on('err', err => console.log(err));
      clientToProxySocket.pipe(proxyToServerSocket);
      proxyToServerSocket.pipe(clientToProxySocket);
      proxyToServerSocket.on('error', err => {
        console.log('PROXY TO SERVER ERROR');
        console.log(err);
      });
    });
    clientToProxySocket.on('error', err => {
      console.log('CLIENT TO PROXY ERROR');
      console.log(err);
    });
  });
});

dnsLookup = url => {
  return new Promise((res, rej) => {
    dns.lookup(url, (err, address, family) => {
      if (err) return rej(err);else return res(address);
    });
  });
};

server.on('close', () => {
  console.log('Client Disconnected');
});
server.listen(8124, () => {
  console.log('Server runnig at http://localhost:' + 8124);
});
