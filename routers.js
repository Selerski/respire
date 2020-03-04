const Router = require('koa-router');
const { getAddresses, blockAddress, timeBlockAddress, getAddress, unblockAddress } = require('./controllers/addressController');

const router = new Router();
router.get('/addresses', getAddresses);
router.get('/addresses/:id', getAddress);
router.put('/addresses/:id/block', blockAddress);
router.put('/addresses/:id/timeblock', timeBlockAddress);
router.put('/addresses/:id/unblock', unblockAddress);

module.exports = router;