import {computed} from 'vue';
import {useMeta} from 'vue-meta';
import {META_DEFAULT_TITLE, META_TITLE_APPEND} from "../../const/meta.const";

const {VITE_BASE_URL} = import.meta.env;

export const useGeneralMeta = () => {
  const generalMeta = computed(() => ({
    htmlAttrs: {
      lang: 'en',
      amp: false,
    },
    base: {
      href: baseUrl,
    },
    title: String(META_DEFAULT_TITLE),
    titleTemplate(chunk = '') {
      if (chunk !== META_DEFAULT_TITLE) {
        return `${chunk}${META_TITLE_APPEND}`;
      }
      return chunk;
    },
    description,
    meta: [
      {name: 'author', content: authors},
      {name: 'publisher', content: authors},
      {name: 'category', content: tags},
      {name: 'keywords', content: tags},
      {name: 'distribution', content: 'global'},
      {name: 'identifier-url', content: baseUrl},
      {'http-equiv': 'content-language', content: 'en'},
      {name: 'revisit-after', content: '1 days'},
      {name: 'language', content: 'English'},
      {name: 'copyright', content: 'RaftModding'},
      {name: 'reply-to', content: 'contact@raftmodding.com'},
    ],
    og: {
      url: window.location.href,
      type: 'website',
      tags,
      keywords: tags,
      image: baseUrl + "/logo.png",
    },
  }));

  useMeta(generalMeta);
};

const baseUrl = VITE_BASE_URL;

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

const authors = ['traxam', 'zer0', 'TeKGameR'].join(', ');
