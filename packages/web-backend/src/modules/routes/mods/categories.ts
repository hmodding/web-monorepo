import app from '../../app';
import { ModCategories } from '../../cfg';

app.get('/mods/categories', async (req: any, res: any) => {
  res.status(200).send(ModCategories);
});
