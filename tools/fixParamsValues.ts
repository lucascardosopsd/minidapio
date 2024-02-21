import { isInt } from "./numberType";

export const fixParamsValues = (params: {
  [key: string]: string;
}): { [key: string]: string | number | boolean } => {
  let obj: { [key: string]: string | number | boolean } = {};

  //@ts-ignore
  Object.entries(params).forEach(([key, value]: [string, string]) => {
    if (value) {
      obj[key] = value;

      if (!isNaN(parseFloat(value))) {
        if (isInt(parseFloat(value))) {
          obj[key] = parseInt(value);
        } else {
          obj[key] = parseFloat(value);
        }
      }

      if (value == "false") obj[key] = false;

      if (value == "true") obj[key] = true;
    }
  });

  return obj;
};
