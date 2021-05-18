import sequelize from '../../sequelize';
import router from '../router';

router.get('/mods/mostLiked', async (req: any, res: any) => {
  const result = await sequelize.query(getQuery());
  res.status(200).send(result[0]);
});

function getQuery() {
  return `
  SELECT *,
         (SELECT COUNT(*)
          FROM "ModLikes"
          WHERE "ModLikes"."modId" = "mods"."id")::int AS likes
  FROM "mods"
  ORDER BY likes DESC, "mods".title DESC
  LIMIT 3`;
}
