import dayjs from 'dayjs';
import { Mod, ModVersion } from './@types';
import { DATE_FORMAT } from './const';

export function slugify(str: string): string {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function toDateStr(date: Date | string): string {
  return dayjs(date).format(DATE_FORMAT);
}

export function stripHtml(html) {
  let tmp = document.createElement('DIV');

  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText || '';
}

export function toFormData(shallowObj: object) {
  const formData = new FormData();

  Object.keys(shallowObj).forEach((key) => {
    formData.append(key, shallowObj[key]);
  });

  return formData;
}

export function nullToUndefined(shallowObj: object) {
  if (!shallowObj) return shallowObj;
  Object.keys(shallowObj).forEach((key) => {
    if (shallowObj[key] === null) {
      shallowObj[key] = undefined;
    }
  });

  return shallowObj;
}

export function emptyToNull(shallowObj: object) {
  if (!shallowObj) return shallowObj;
  Object.keys(shallowObj).forEach((key) => {
    if (shallowObj[key] === '') {
      shallowObj[key] = null;
    }
  });

  return shallowObj;
}

const defaultTitleAppend: string = import.meta.env.VITE_TITLE_APPEND as string;

export function setDocumentTitle(
  title: string,
  append: string = defaultTitleAppend,
): void {
  document.title = title + (append ? append : '');
}

/**
 * Sorts an array of mod versions in the usual order (latest releases first).
 * @param versions the array to sort.
 * @returns a sorted shallow copy of the array.
 */
export function sortModVersions(versions: ModVersion[]): ModVersion[] {
  if (!versions) return versions;

  return versions.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })
}

/**
 * Sorts the versions of a mod. The versions array of the mod will be replaced.
 * @param mod the mod whose versions to sort.
 */
export function sortModVersionsInMod(mod: Mod): void {
  mod.versions = sortModVersions(mod.versions);
}

/**
 * Sorts the versions of an array of mods.
 * @param mods the mods whose versions will be sorted.
 */
export function sortModVersionsInMods(mods: Mod[]): void {
  for (const mod of mods) {
    sortModVersionsInMod(mod);
  }
}
