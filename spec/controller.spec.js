const mocks = require('./mocks');
const { getAddresses, getAddress, blockAddress } = require('../controllers/addressController');

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

  it("correctly unblocks a given address");

  it("blocks an address by time");

  it("creates an address");

  it("unregisters blocks that are expired");

})