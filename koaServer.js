import Koa from 'koa';
import routers from './routers';

const app = new Koa();
const PORT = '3124';


app.listen(PORT, () => {
  console.log(`Koa server working 🚀, port:${PORT}`);
});
