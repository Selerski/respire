const mocks = require('./mocks');
const { getAddresses, 
        getAddress, 
        blockAddress, 
        unblockAddress,
        timeBlockAddress } = require('../controllers/addressController');

describe("AddressController", function () {
  it("gets all addresses", async function () {

    let mockCtx = {};
    await getAddresses(mocks.mockDB, mockCtx);
    expect(mockCtx.body).toEqual([mocks.blockedMock, mocks.notBlockedMock]);

  });

  it("gets a single address", async function () {

    let mockCtx = {params: {id: mocks.notBlockedMock.id}};
    await getAddress(mocks.mockDB, mockCtx);
    expect(mockCtx.body).toEqual(mocks.notBlockedMock);

  });

  it("correctly blocks a given address", async function () {

    let mockCtx = {params: {id: mocks.notBlockedMock.id}};
    await blockAddress(mocks.mockDB, mockCtx);
    expect(mockCtx.body.blockedStatus).toEqual('Blocked');
    mocks.notBlockedMock.blockedStatus = 'notBlocked';

  });

  it("correctly unblocks a given address", async function () {

    let mockCtx = { params: {id: '1'}};
    await unblockAddress({findById: () => mocks.blockedMock}, mockCtx);
    expect(mockCtx.body.blockedStatus).toEqual('notBlocked');
    mocks.blockedMock.blockedStatus = 'Blocked';
  });

  it("blocks an address by time", async function () {

    let timedMock = { save: () => {} };
    let mockCtx = { params: {id: '1'}, query: { time: '60'}}
    
    await timeBlockAddress({findById: () => timedMock}, 1583507446982, mockCtx);
    
    expect(mockCtx.body.blockedStatus).toEqual('timeBlocked');
    expect(mockCtx.body.blockedDate).toEqual(1583507446982);
    expect(mockCtx.body.blockedTimePeriod).toEqual('60');
    
    timedMock = { save: () => {} };
  });

  // it("creates an address");

  // it("unregisters blocks that are expired");

})