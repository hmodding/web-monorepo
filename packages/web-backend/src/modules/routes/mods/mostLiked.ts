import app from '../../app';
import sequelize from '../../sequelize';

const query = `
  SELECT *,
         (SELECT COUNT(*)
          FROM "ModLikes"
          WHERE "ModLikes"."modId" = "mods"."id")::int AS likes
  FROM "mods"
  ORDER BY likes DESC, "mods".title DESC
  LIMIT 3`;

app.get('/mods/mostLiked', async (req: any, res: any) => {
  const result = await sequelize.query(query);
  res.status(200).send(result[0]);
});
