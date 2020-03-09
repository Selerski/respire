const notBlockedMock = { 
  "_id" : "5e60d375fb3e7ee27fb55241", 
  "blockedStatus" : "notBlocked",
  "https" : true, 
  "port" : 443,
  "domain" : "dropbox.com", 
  "subdomains" : [ 
    { "ips" : [ "162.125.19.131" ], "_id" : "5e60d375fb3e7ee27fb55242", "name" : "bolt" }, 
    { "ips" : [ "3.92.168.117" ], "_id" : "5e60d5177ed86ee485b83e61", "name" : "dl-debug" }, 
  ],
  save: () => {},
};

const blockedMock = { 
  "_id" : "5e60d379fb3e7ee27fb55243", 
  "blockedStatus" : "Blocked", 
  "https" : true, 
  "port" : 443, 
  "domain" : "twitter.com", 
  "subdomains" : 
  [ 
    { "ips" : [ "104.244.42.2" ], "_id" : "5e60d379fb3e7ee27fb55244", "name" : "api" } 
  ],
  save: () => {},
}

const mockDB = {
  find: () => [blockedMock, notBlockedMock],
  findById: (id) => notBlockedMock,
  save: () => {},
}

module.exports = { notBlockedMock, blockedMock, mockDB }