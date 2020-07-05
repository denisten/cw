const width = 1000;
const height = 660;
const left = window.innerWidth / 2 - width / 2;
const top = window.innerHeight / 2 - height / 2;

export const windowOpen = (link: string) => {
  const linkWindow = window.open(
    undefined,
    '',
    `height=${height},width=${width},left=${left}, top=${top}`
  );

  if (linkWindow) {
    linkWindow.location.href = link;
  }
};
