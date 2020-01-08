/**
 * @deprecated
 */
const formatIfArray = (value: string | string[]) =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`).toString()}]` : `"${value}"`;

export default formatIfArray;
