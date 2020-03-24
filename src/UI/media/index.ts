enum Size {
  MOBILE_S = '320px',
  MOBILE_M = '375px',
  MOBILE_L = '425px',
  TABLET = '768px',
  LAPTOP = '1024px',
  LAPTOP_S = '1366px',
  LAPTOP_M = '1440px',
  LAPTOP_L = '1620px',
  DESCTOP = '1920px',
  DESCTOP_MAX = '2560px',
}

export const device = {
  mobileS: `(max-width: ${Size.MOBILE_S})`,
  mobileM: `(max-width: ${Size.MOBILE_M})`,
  mobileL: `(max-width: ${Size.MOBILE_L})`,
  tablet: `(max-width: ${Size.TABLET})`,
  laptop: `(max-width: ${Size.LAPTOP})`,
  laptopS: `(max-width: ${Size.LAPTOP_S})`,
  laptopM: `(max-width: ${Size.LAPTOP_M})`,
  laptopL: `(max-width: ${Size.LAPTOP_L})`,
  desctop: `(max-width: ${Size.DESCTOP})`,
  desctopMax: `(max-width: ${Size.DESCTOP_MAX})`,
};
