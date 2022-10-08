import { modCategories } from '../../../../../../shared/modCategories';
import { router } from '../../router';

router.get('/mods/categories', async (req: any, res: any) => {
  res.status(200).send(modCategories);
});
