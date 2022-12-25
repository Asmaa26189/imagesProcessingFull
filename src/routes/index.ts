// to acess access this /api to check levels of end points
import express, { Request, Response } from 'express';
// define router
const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Routes Start');
});
// Export router to use it in any import
export default routes;
