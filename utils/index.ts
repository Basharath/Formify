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

export const generateFieldsString = (fieldsObj: FieldsObjType) => {
  return (
    ['name', 'email', 'website', 'twitter', 'message'] as Array<
      keyof FieldsObjType
    >
  )
    .reduce((a: string, c) => (a += fieldsObj[c] ? c + ',' : ''), '')
    .slice(0, -1); // Slice to remove comma at the end
};
