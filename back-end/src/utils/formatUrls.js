import urls from '@/config/urls';

export default (url) => {
  return `${urls.backUrl}${url.split('\\').join('/').replace('../', '/')}`;
};
