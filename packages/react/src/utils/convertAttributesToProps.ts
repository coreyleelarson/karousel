import { convertStyleStringToObj } from "@karousel/core";

const propDictionary = {
  'class': 'className',
  'onclick': 'onClick',
};

export const convertAttributesToProps = (attributes: Record<string, any>): Record<string, any> => {
  const props = {};

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'style') {
      props[key] = convertStyleStringToObj(value);
    } else if (propDictionary[key]) {
      props[propDictionary[key]] = value;
    } else {
      props[key] = value;
    }
  }

  return props;
};