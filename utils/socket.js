/* eslint-disable prefer-destructuring */
const dns = require('dns');

exports.retrieveAddressFromSocketData = async (data) => {
  let isTLSConnection = data.toString().indexOf('CONNECT') !== -1;
  let port = 80;
  let host;
  let valid = true;

  if (isTLSConnection) {
    // Port changed to 443, parsing the host from CONNECT
    port = 443;
    host = data.toString()
      .split('CONNECT ')[1]
      .split(' ')[0]
      .split(':')[0];
  } else {
    // Parsing HOST from HTTP
    host = data.toString()
      .split('Host: ')[1].split('\r\n')[0];
  }
  const lookup = await dnsLookup(host).catch(() => { valid = false; });
  if (host.split(':')[0] === 'localhost') {
    host = host.split(':')[0];
    port = host.split(':')[1];
    isTLSConnection = false;
  }
  const ip = lookup;
  let [geo, domain, ...subdomain] = host.slice().split('.').reverse();
  subdomain = subdomain.length === 0 ? '' : subdomain.join('.');
  domain = [domain,geo].join('.');
  console.log('domain', domain);
  console.log('geo', geo);
  if (subdomain === "www.") console.log("HAAAAAAAAAAAAAAAAAAAAAH");
  return {
    https: isTLSConnection, port, ip, valid, domain, subdomain,
  };
};

exports.linkSockets = async (proxyToServerSocket, clientToProxySocket, https, data) => {
  if (https) {
    // Send Back OK to HTTPS CONNECT Request
    clientToProxySocket.on('err', (err) => console.log(err));
    clientToProxySocket.write('HTTP/1.1 200 OK\r\n\n');
  } else {
    proxyToServerSocket.write(data);
  }
  // Piping the sockets
  proxyToServerSocket.on('err', (err) => console.log(err));
  clientToProxySocket.pipe(proxyToServerSocket);
  proxyToServerSocket.pipe(clientToProxySocket);
  // if (BLOCKED.filter((value) => fullAddress.host.split('.').includes(value)).length !== 0) {
  //   proxyToServerSocket.pause();
  //   setTimeout(() => proxyToServerSocket.resume(),10000);
  // }
  proxyToServerSocket.on('error', (err) => {
  // console.log('PROXY TO SERVER ERROR');
    // console.log(err);
  });
};

const dnsLookup = (url) => new Promise((res,rej) => {
  dns.lookup(url, (err, address, family) => {
    if (err) return rej(err);
    return res(address);
  });
});
