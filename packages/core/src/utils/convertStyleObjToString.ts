export const convertStyleObjToString = (style: any) =>
  Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';');