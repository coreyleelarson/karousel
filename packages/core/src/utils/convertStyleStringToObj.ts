export const convertStyleStringToObj = (style) =>
  style
    .split(';')
    .reduce((obj, selector) => {
      const [key, value] = selector.split(':');
      obj[key] = value;
      return obj;
    }, {});
  