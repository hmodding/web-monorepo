import { hashSync } from 'bcryptjs';
import { DeepPartial } from 'typeorm';
import { LauncherVersion } from '../../src/entities/LauncherVersion';
import { LoaderVersion } from '../../src/entities/LoaderVersion';
import { Mod } from '../../src/entities/Mod';
import { RaftVersion } from '../../src/entities/RaftVersion';
import { User } from '../../src/entities/User';
import { UserPrivilege } from '../../src/entities/UserPrivilege';

export const saveExampleDbData = async () => {
  const user1: DeepPartial<User> = {
    username: 'admin',
    password: hashSync('admin'),
    email: 'admin@raftmodding.com',
    role: 'admin',
  };
  if (!(await User.findOneBy({ username: user1.username }))) {
    await User.save(User.create(user1 as any));
  }

  const userPrivilege1: DeepPartial<User> = {
    username: 'admin',
    role: 'admin',
  };
  if (!(await UserPrivilege.findOneBy({ username: userPrivilege1.username }))) {
    await UserPrivilege.save(User.create(userPrivilege1 as any));
  }

  const raftVersion1: DeepPartial<RaftVersion> = {
    version: '1.0',
    title: 'The Final Chapter',
    buildId: 8972572,
    releasedAt: new Date('2022-06-20'),
  };
  if (!(await RaftVersion.findOneBy({ version: raftVersion1.version }))) {
    await RaftVersion.save(RaftVersion.create(raftVersion1 as any));
  }

  const raftVersion2: DeepPartial<RaftVersion> = {
    version: '1.0-hotfix-1',
    title: 'The Final Chapter Hotfix #1',
    buildId: 8973125,
    releasedAt: new Date('2022-06-21'),
  };
  if (!(await RaftVersion.findOneBy({ version: raftVersion2.version }))) {
    await RaftVersion.save(RaftVersion.create(raftVersion2 as any));
  }

  const loaderVersion1: DeepPartial<LoaderVersion> = {
    rmlVersion: '6.2.4',
    raftVersionId: 2,
    readme: ' - Fixed audio for Raft Update 1.08 (working on an auto updater)',
    timestamp: new Date(),
  };
  if (
    !(await LoaderVersion.findOneBy({ rmlVersion: loaderVersion1.rmlVersion }))
  ) {
    await LoaderVersion.save(LoaderVersion.create(loaderVersion1));
  }

  const launcherVersion1: DeepPartial<LauncherVersion> = {
    version: '1.6',
    timestamp: new Date(),
    downloadUrl: '/launcher/1.6/RMLLauncher.ex',
    downloadCount: 922,
    changelog:
      '- Fixed multiple crash on start. \
          - The launcher will now check if you have missing files when you start the game.\
          - Fixed an issue where the launcher would take too much ram if you keep it running.\
          - Fixed an issue with the fonts.\
          - New autoupdater! The launcher will now properly auto update without ANY problem.\
          - Many more bugfixes.',
  };
  if (
    !(await LauncherVersion.findOneBy({ version: launcherVersion1.version }))
  ) {
    await LauncherVersion.save(LauncherVersion.create(launcherVersion1 as any));
  }

  const mod1: DeepPartial<Mod> = {
    id: 'my-01-example-mod',
    title: 'My 01 Example Mod',
    description: 'LOREM 01 IPSUM',
    readme:
      '01 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod1.id }))) {
    await Mod.save(Mod.create(mod1));
  }

  const mod2: DeepPartial<Mod> = {
    id: 'my-02-example-mod',
    title: 'My 02 Example Mod',
    description: 'LOREM 02 IPSUM',
    readme:
      '02 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod2.id }))) {
    await Mod.save(Mod.create(mod2));
  }

  const mod3: DeepPartial<Mod> = {
    id: 'my-03-example-mod',
    title: 'My 03 Example Mod',
    description: 'LOREM 03 IPSUM',
    readme:
      '03 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod3.id }))) {
    await Mod.save(Mod.create(mod3));
  }

  const mod4: DeepPartial<Mod> = {
    id: 'my-04-example-mod',
    title: 'My 04 Example Mod',
    description: 'LOREM 04 IPSUM',
    readme:
      '04 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod4.id }))) {
    await Mod.save(Mod.create(mod4));
  }

  const mod5: DeepPartial<Mod> = {
    id: 'my-05-example-mod',
    title: 'My 05 Example Mod',
    description: 'LOREM 05 IPSUM',
    readme:
      '05 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod5.id }))) {
    await Mod.save(Mod.create(mod5));
  }

  const mod6: DeepPartial<Mod> = {
    id: 'my-06-example-mod',
    title: 'My 06 Example Mod',
    description: 'LOREM 06 IPSUM',
    readme:
      '06 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod6.id }))) {
    await Mod.save(Mod.create(mod6));
  }

  const mod7: DeepPartial<Mod> = {
    id: 'my-07-example-mod',
    title: 'My 07 Example Mod',
    description: 'LOREM 07 IPSUM',
    readme:
      '07 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ex luctus turpis vestibulum pharetra a malesuada nulla. \
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
  };
  if (!(await Mod.findOneBy({ id: mod7.id }))) {
    await Mod.save(Mod.create(mod7));
  }
};
