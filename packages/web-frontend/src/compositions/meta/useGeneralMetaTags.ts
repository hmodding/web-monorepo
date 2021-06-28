import { useMeta } from 'vue-meta';
import logoPng from '../../assets/images/logo.png';

export function useGeneralMetaTags() {
  useMeta({
    htmlAttrs: {
      lang: 'en',
      amp: false,
    },
    base: {
      href: baseUrl,
    },
    title,
    description,
    meta: [
      { property: 'author', content: authors },
      {
        property: 'publisher',
        content: authors,
      },
      { property: 'category', content: tags },
      { property: 'distribution', content: 'global' },
      { property: 'keywords', content: tags },
      { property: 'identifier-url', content: baseUrl },
      { property: 'content-language', content: 'en' },
      { property: 'revisit-after', content: '1 days' },
    ],
    og: {
      title,
      description,
      tags,
      keywords: tags,
      image: baseUrl + logoPng,
    },
    twitter: {
      title,
    },
  });
}

const baseUrl = 'http://localhost:3000';

const title =
  'RaftModding - The largest community for mods, scripts and utilities for Raft!';

const description = `Welcome to RaftModding! The largest community for mods, scripts and utilities for Raft!

We are a modding community that has created a Modloader to make gameplay more exciting, so if you want to play with some mods or create your own then visit our website!

Raft Modding groups all the mods, bugfixes, utilities and scripts to download to modify Raft on PC!

(*) Mods allow you to modify your Raft by adding new and varied features, more or less crazy.`;

const tags = [
  'RaftModding',
  'Raft-Modding',
  'Raft Modding',
  'Raft',
  'Modding',
  'Mods',
  'Mods Raft',
  'Raft Mods',
  'raftmods',
  'Raft-Mods',
  'rml',
  'RaftModLoader',
  'ModLoader',
  'Unity',
  'Unity3D',
  'CSharp',
  'C#',
  'Sharp',
  'C++',
  'Modifications',
  'Game',
  'HyTeKGames',
  'traxam',
  'zer0',
  'Survival',
].join(', ');

const authors = ['traxram', 'zer0', 'TeKGameR'].join(', ');

export default useGeneralMetaTags;
