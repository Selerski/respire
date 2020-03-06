const mocks = require('./mocks');
const { getAddresses } = require('../controllers/addressController');

describe("AddressController", function () {
  it("gets all addresses", async function () {

    let mockCtx = {}
    await getAddresses(mocks.mockDB, mockCtx);
    expect(mockCtx.body).toEqual([mocks.blockedMock, mocks.notBlockedMock]);

  });

  it("gets a single address");

  it("correctly blocks a given address");

  it("correctly unblocks a given address");

  it("blocks an address by time");

  it("creates an address");

  it("unregisters blocks that are expired");

})