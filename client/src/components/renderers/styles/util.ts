import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';
import { Styles } from './styles';

export const classes = (strings: TemplateStringsArray, ...variables: any[]) => {
  return strings
    .reduce((acc, curr, index) => {
      return `${acc}${curr}${variables[index] || ''}`;
    }, '')
    .trim();
};

/**
 * Helper function to merge two styles definitions. The contained classes will be combined, not overwritten.
 *
 * Example usage:
 * ```ts
 * const myStyles = mergeStyles(defaultStyles, { control: { root: 'mycontrol' } });
 * ```
 */
export const mergeStyles = (
  stylesA: Partial<Styles>,
  stylesB: Partial<Styles>,
): Partial<Styles> => {
  const styles = cloneDeep(stylesA);
  mergeWith(
    styles,
    stylesB,
    (aValue: Partial<Styles>, bValue: Partial<Styles>) => {
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return `${aValue} ${bValue}`;
      }
      return undefined;
    },
  );
  return styles;
};

export function toBase64(file: File) {
  const prefix = 'data:application/octet-stream;base64,';
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const base64 = reader.result as string;
      return resolve(base64.replace(prefix, ''));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
