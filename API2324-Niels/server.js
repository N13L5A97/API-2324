import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import { Liquid } from 'liquidjs';
import 'dotenv/config';

const engine = new Liquid({
  extname: '.liquid'
});
const app = new App()

app
  .use(logger())
  .listen(3000, () => console.log('Started on http://localhost:3000'))


app.get('/', async (req, res) => {
    return res.send(renderTemplate('views/index.liquid'));
});


app
  .get('/', async (req, res) => {
    try{
      res.send('Hello World!')
    } catch (error) {
      res.send(error)
    }
  })

  .get('/:movie',async (req, res) => {
    try{
      res.send(req.params)
    } catch (error) {
      res.send(error)
    }
  })


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };
  
  return engine.renderFileSync(template, templateData);
};