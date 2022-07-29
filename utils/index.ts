import { FieldsObjType } from '../types';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const parseFieldNames = (fields: string) => {
  return fields
    .split(',')
    .filter((f) => f)
    .map((f) => capitalize(f));
};

export const fieldsToArray = (fields: string) => {
  return fields.split(',').filter((f) => f);
};

export const generateFieldsString = (fieldsObj: FieldsObjType) => {
  return (
    ['name', 'email', 'website', 'twitter', 'message'] as Array<
      keyof FieldsObjType
    >
  )
    .reduce((a: string, c) => (a += fieldsObj[c] ? c + ',' : ''), '')
    .slice(0, -1); // Slice to remove comma at the end
};

export const generateFieldsObject = (fieldsString: string) => {
  return fieldsString
    .split(',')
    .filter((f) => f)
    .reduce((a, c) => ({ ...a, [c]: true }), {});
};

export const copyToClipboard = (str: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str);
  } else {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    try {
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      return Promise.resolve('Copied successfully!');
    } catch (err) {
      return Promise.reject('Failed to copy!');
    } finally {
      document.body.removeChild(el);
    }
  }
};
