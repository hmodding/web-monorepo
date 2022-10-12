import dayjs from 'dayjs';
import { DATE_FORMAT } from './const/formats.const';

/**
 * turns a string into a slug
 * @param str `string`
 * @returns `string`
 */
export const slugify = (str: string): string => {
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
};

export const toDateStr = (date: Date | string): string => {
  return dayjs(date).format(DATE_FORMAT);
};

/**
 * strips html content from string
 * @param html `string`
 * @returns `string`
 */
export const stripHtml = (html: string) => {
  let tmp = document.createElement('DIV');

  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText || '';
};

/**
 * transforms an object into form-data
 * @param shallowObj `Record<string, any>~
 * @returns 
 */
export const toFormData = (shallowObj: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(shallowObj).forEach((key) => {
    formData.append(key, shallowObj[key]);
  });

  return formData;
}

/**
 * replaces `null` values with `undefined`
 * @param shallowObj `Record<string, any> 
 * @returns 
 */
export const nullToUndefined = (shallowObj: Record<string, any>) => {
  if (!shallowObj) return shallowObj;
  Object.keys(shallowObj).forEach((key) => {
    if (shallowObj[key] === null) {
      shallowObj[key] = undefined;
    }
  });

  return shallowObj;
}

/**
 * replaces empty string with null
 * @param shallowObj `Record<string, any>`
 * @returns 
 */
export const emptyToNull = (shallowObj: Record<string, any>) => {
  if (!shallowObj) return shallowObj;
  Object.keys(shallowObj).forEach((key) => {
    if (shallowObj[key] === '') {
      shallowObj[key] = null;
    }
  });

  return shallowObj;
}

/**
 * contains the default title appendix
 */
const defaultTitleAppend: string = import.meta.env.VITE_TITLE_APPEND as string;

export const getTitle = (
  title: string,
  append: string = defaultTitleAppend,
) => {
  return title + (append ? append : '');
};

/**
 * helper method to set as default for method that you don't want to check for null/undefined
 */
export const doNothing = () => {};
