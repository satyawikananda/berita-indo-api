export const replaceQueryParams = (
  url: string,
  key: string,
  value: string
): string => {
  const regex = new RegExp(`([?&])${key}=.*?(&|$)`, "i");
  const separator = url.indexOf("?") !== -1 ? "&" : "?";
  if (url.match(regex)) return url.replace(regex, `$1${key}=${value}$2`);
  else return `${url}${separator}${key}=${value}`;
};
