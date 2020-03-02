
/* eslint-disable no-console */
const net = require('net');
const { getOrRegister } = require('./controllers/addressController');
const { retrieveAddressFromSocketData, linkSockets } = require('./utils/socket');

const server = net.createServer();
const PORT = 8124;

server.on('error', (err) => {
  console.log('SERVER ERROR');
  console.log(err);
});


// When there is a connection to the server: anytime a user wants to use the internet 
// since the proxy server has been setup.
server.on('connection', (clientToProxySocket) => {
  console.log('New connecteds')
  // When a socket has been created between the client and the proxy
  // Let's retrieve and forward the data to the expected address.
  clientToProxySocket.once('data', async (data) => {
    console.log('once data')
    const fullAddress = await retrieveAddressFromSocketData(data);
    if (!fullAddress.valid) {console.log('NOT VALID', fullAddress)}
    if (!fullAddress.valid) return;
    console.log(fullAddress.subdomain === '' ? fullAddress.domain : [fullAddress.subdomain, fullAddress.domain].join('.'));
    //We register the address in our database
    const dbAddress = await getOrRegister(fullAddress).catch(err => console.log('GETORREGISTERERROR', err));
    // We create the forwarding socket, that will send data to the requested address
    try {
      if (dbAddress.blocked) {
        console.log("THIS IS BLOCKED", dbAddress.domain);
        return;
      }
    } catch (e) {
      console.log('Blocked erro', e);
      console.log(dbAddress);
      console.log(fullAddress);
    }
    const proxyToServerSocket = await net.createConnection({
      host: fullAddress.subdomain === '' ? fullAddress.domain : [fullAddress.subdomain, fullAddress.domain].join('.'),
      port: fullAddress.port,
    });
    await linkSockets(proxyToServerSocket, clientToProxySocket, fullAddress.https, data);
  });
  clientToProxySocket.on('error', err => {
    console.log(err);
  });
});

server.on('close', () => {
  // eslint-disable-next-line no-console
  console.log('Client Disconnected');
});
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});
