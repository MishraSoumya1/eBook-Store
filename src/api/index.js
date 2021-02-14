import axios from "axios";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const URL = "https://api.itbook.store/1.0/new";

export const fetchProducts = () => {
  return axios
    .get(`${PROXY_URL}${URL}`)
    .then((res) => {
      if (res && res.data && res.data.books) {
        return res.data;
      } else {
        return [];
      }
    })
    .catch((err) => {
      throw new Error("Error fetching books");
    });
};
