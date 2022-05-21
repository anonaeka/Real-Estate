import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      "X-RapidAPI-Key": "1b3946dd37mshd91ac3ea5869bdbp121b02jsn76f62d8771d7",
    },
  });

  return data;
};
