import axios from 'axios';
const BASE_URI = 'https://hn.algolia.com/api/v1/search';

export const getFrontPageDetails = (page) =>
  axios.get(BASE_URI, {
    params: {
      tags: 'front_page',
      page: page
    }
  });
