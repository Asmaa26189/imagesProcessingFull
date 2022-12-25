// main index
// all imports used
import express, { Response, Request } from 'express';
import routes from './routes/index';
import images from './routes/api/images';
import logger from './middleware/logger';

// define express
const app = express();
//define port
const port = 3000;

// app use some routers
app.use('/api', routes);
app.use('/images', images);

// main page and first accessed one
app.get('/', logger, (req: Request, res: Response): void => {
  // define link
  const href =
    '<a href="/images?filename=img1&width=200&height=700">Go To Image Resizing Example</a><br/>';
  const htmlData: string =
    ('<div style="text-align:center;"><h1>Mai Page</h1><br/>' +
      href +
      '<h3>current images names in full path (img1,img2,img3,img4)</h3>' +
      '</div>') as unknown as string;
  // send html simple interface
  res.send(htmlData);
});
// app listen to defined port
app.listen(port, () => {
  // first run after server start
  console.log('Server Started');
});
// Export express to use it in any import
export default app;
