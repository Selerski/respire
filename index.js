/* eslint-disable no-console */
const net = require('net');
const http = require('http');
const {
  getOrRegister,
  unblockAddress,
  unBlockExpiredAddress
} = require('./controllers/addressController');
const {
  retrieveAddressFromSocketData,
  linkSockets
} = require('./utils/socket');

const server = net.createServer();
const PORT = 8124;

server.on('error', err => {
  console.log('SERVER ERROR');
  console.log(err);
});

const QueuedAddresses = new Map();
// When there is a connection to the server: anytime a user wants to use the internet
// since the proxy server has been setup.
server.on('connection', clientToProxySocket => {
  // console.log('New connection established');
  // When a socket has been created between the client and the proxy
  // Let's retrieve and forward the data to the expected address.
  clientToProxySocket.once('data', async data => {
    const fullAddress = await retrieveAddressFromSocketData(data);
    if (!fullAddress.valid) {
      // console.log('NOT VALID', fullAddress);
      return;
    }

    // console.log(
    //   fullAddress.subdomain === ''
    //     ? fullAddress.domain
    //     : [fullAddress.subdomain, fullAddress.domain].join('.')
    // );
    //We register the address in our database
    // We create the forwarding socket, that will send data to the requested address
    if (QueuedAddresses.get(QueuedAddresses.domain)) return;
    QueuedAddresses.set(QueuedAddresses.domain, true);

    const dbAddress = await getOrRegister(fullAddress).catch(err => 
      console.log(err)
      );    
    QueuedAddresses.set(QueuedAddresses.domain, false);
    if (dbAddress.blockedStatus === 'Blocked') {
      // console.log('THIS IS BLOCKED', dbAddress.domain);
      return;
    }
    if (dbAddress.blockedStatus === 'timeBlocked') {
      const timeSinceBlock = Date.now() - dbAddress.blockedDate;
      if (timeSinceBlock < dbAddress.blockedTimePeriod) {
        // console.log(
        //   `This domain has been blocked, ${(dbAddress.blockedTimePeriod -
        //     timeSinceBlock) /
        //     1000} secs remaining`
        // );
        return;
      }
    }
    const proxyToServerSocket = await net.createConnection({
      host:
        fullAddress.subdomain === ''
          ? fullAddress.domain
          : [fullAddress.subdomain, fullAddress.domain].join('.'),
      port: fullAddress.port
    });
    await linkSockets(
      proxyToServerSocket,
      clientToProxySocket,
      fullAddress.https,
      data
    );
  });
  clientToProxySocket.on('error', err => {
    console.log(err);
  });
});

setInterval(unBlockExpiredAddress, 1000);

server.on('close', () => {
  // eslint-disable-next-line no-console
  console.log('Client Disconnected');
});
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
  // http.get('http://blog.q5b.elia');
});
