/* eslint-disable prefer-destructuring */

import net from 'net';
import * as dns from 'dns';

const server = net.createServer();
const PORT = 8124;

server.on('error', (err) => {
  console.log('SERVER ERROR');
  console.log(err);
});


server.on('connection', (clientToProxySocket) => {
  console.log('Client Connected To Proxy'); // eslint-disable-line no-console
  // We need only the data once, the starting packet

  clientToProxySocket.once('data', async (data) => {
    const isTLSConnection = data.toString().indexOf('CONNECT') !== -1;
    // Considering Port as 80 by default
    let serverPort:number = 80;
    let serverAddress:string;

    if (isTLSConnection) {
      // Port changed to 443, parsing the host from CONNECT
      serverPort = 443;
      serverAddress = data.toString()
        .split('CONNECT ')[1]
        .split(' ')[0]
        .split(':')[0];
    } else {
      // Parsing HOST from HTTP
      serverAddress = data.toString()
        .split('Host: ')[1].split('\r\n')[0];
    }
    // console.log('❤');
    // console.log(serverAddress);
    const lookup = await dnsLookup(serverAddress).catch(err => ('error'));
    // console.log('lookup' + '🚀'  , lookup);


    // return if the address is not valid, for instance google chrome search bar
    if (lookup === 'error') {
      console.log('WROND ADDRESS🎌🎌🎌🎌 ');
      return; 
    }

    const proxyToServerSocket = net.createConnection({
      host: serverAddress,
      port: serverPort
    }, () => {
      console.log('PROXY TO SERVER SET UP');
      if (isTLSConnection) {
        //Send Back OK to HTTPS CONNECT Request
        clientToProxySocket.on('err', (err) => console.log(err));
        clientToProxySocket.write('HTTP/1.1 200 OK\r\n\n');
      } else {
        proxyToServerSocket.write(data);
      }
      // Piping the sockets
      proxyToServerSocket.on('err', (err) => console.log(err));
      clientToProxySocket.pipe(proxyToServerSocket);
      proxyToServerSocket.pipe(clientToProxySocket);
      proxyToServerSocket.on('error', (err) => {
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


const dnsLookup = (url: string) => {
  return new Promise ((res,rej) => {
    dns.lookup(url, (err, address: string, family) => {
      if (err) return rej(err);
      else return res(address);
    });
  });
};

server.on('close', () => {
  // eslint-disable-next-line no-console
  console.log('Client Disconnected');
});
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
  setInterval( () => server.getConnections((err,count) => {
    console.log("There is as many connections open!!!: " + count)
  }), 3000)
});
