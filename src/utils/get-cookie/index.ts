export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([$?*|{}\[\]\\\/^])/g, '\\$1') + '=([^;]*)'
    )
  );
  const firstMatchIdx = 1;
  return matches ? decodeURIComponent(matches[firstMatchIdx]) : undefined;
};
