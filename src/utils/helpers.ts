import CONFIGS from '../configs';

export const imageUrl = (path: string) => {
  let result = path;
  if (path && !path?.includes(CONFIGS.BASE_URL || '')) {
    result = `${CONFIGS.BASE_URL}/${path}`;
  }
  return result;
};
