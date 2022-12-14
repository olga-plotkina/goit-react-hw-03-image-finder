// import Notiflix from 'notiflix';
import { api } from './api';

export const getCurrentPicture = async (q, page) => {
  const response = await api.get('', {
    params: {
      q,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    },
  });
  return response;
};
