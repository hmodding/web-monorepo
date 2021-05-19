import discordAuthenticator from '../../authenticators/DiscordAuthenticator';
import router from '../router';

router.post('/auth/discord', async (req: any, res: any) => {
  const { code } = req.body;

  try {
    const authData = await discordAuthenticator.getAuthenticationData(code);
    const userData = await discordAuthenticator.getUserData(
      authData.token_type,
      authData.access_token,
    );

    return res.status(200).send({ authData, userData }); //TODO: do not send!
  } catch (e) {
    console.warn('discord auth error: ', e);
    return res.status(403).send({ error: 'discord authentication failed!', e }); //TODO: do not send e
  }
});
