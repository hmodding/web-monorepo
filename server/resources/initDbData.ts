import bcrypt from 'bcryptjs';
import { Role } from '../src/cfg';
import {
  launcherVersionModel,
  loaderVersionModel,
  modModel,
  raftVersionModel,
  userModel,
  userPrivilegeModel,
} from '../src/models';

export const initDbData = async () => {
  userModel.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      username: 'admin',
      password: bcrypt.hashSync('admin'),
      email: 'admin@raftmodding.com',
      role: Role.Admin,
    },
  });

  userPrivilegeModel.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      username: 'admin',
      role: Role.Admin,
    },
  });

  raftVersionModel.findOrCreate({
    where: { version: '1.0' },
    defaults: {
      version: '1.0',
      title: 'The Final Chapter',
      buildId: 8972572,
      releasedAt: '2022-06-20',
    },
  });

  raftVersionModel
    .findOrCreate({
      where: { version: '1.0-hotfix-1' },
      defaults: {
        version: '1.0-hotfix-1',
        title: 'The Final Chapter Hotfix #1',
        buildId: 8973125,
        releasedAt: '2022-06-21',
      },
    })
    .then(() => {
      //wait for transaction of second raftVersion to be finished
      loaderVersionModel.findOrCreate({
        where: { rmlVersion: '6.2.4' },
        defaults: {
          rmlVersion: '6.2.4',
          raftVersionId: 2,
          readme:
            ' - Fixed audio for Raft Update 1.08 (working on an auto updater)',
          timestamp: Date.now(),
        },
      });
    });

  launcherVersionModel.findOrCreate({
    where: { version: '1.6' },
    defaults: {
      version: '1.6',
      timestamp: Date.now(),
      downloadUrl: '/launcher/1.6/RMLLauncher.ex',
      downloadCount: 922,
      changelog:
        '- Fixed multiple crash on start. \
          - The launcher will now check if you have missing files when you start the game.\
          - Fixed an issue where the launcher would take too much ram if you keep it running.\
          - Fixed an issue with the fonts.\
          - New autoupdater! The launcher will now properly auto update without ANY problem.\
          - Many more bugfixes.',
    },
  });

  modModel.findOrCreate({
    where: { id: 'my-example-mod' },
    defaults: {
      id: 'my-example-mod',
      title: 'My Example Mod',
      description: 'LOREM IPSUM',
      readme:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
        Vestibulum ut ligula lectus. In a est ex. Maecenas feugiat magna ac tristique gravida. Maecenas sodales sollicitudin tellus. \
        Pellentesque quis quam sed nibh ullamcorper pharetra a eu augue. Vivamus fermentum mi ex, a placerat tortor dictum non. \
        Maecenas aliquet bibendum nibh, vel mattis massa iaculis ac. In vel est lectus. Nam posuere lacus et tincidunt ullamcorper. \
        Morbi quis varius enim. Donec varius lectus vitae porttitor vehicula. Curabitur metus quam, cursus eget lorem ornare, sodales auctor ex. \
        Aenean mauris mauris, aliquet eleifend risus in, rutrum venenatis est. Nulla pretium faucibus erat eu efficitur. \
        Suspendisse rutrum elit vitae aliquam iaculis. ',
      category: 'Fun',
      author: 'admin',
      bannerImageUrl: 'http://localhost:3000/src/assets/images/raftmodding.png',
      iconImageUrl: 'http://localhost:3000/src/assets/images/raftmodding.png',
    },
  });
};
