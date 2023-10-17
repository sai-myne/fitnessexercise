import { API_KEY } from "../key";

export const exerciseOptions = {
  method: 'GET',  
  params: {limit: '100'},  
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const responses = await fetch(url, options)
  const data = await responses.json()
  // console.log(data)
  return data
}