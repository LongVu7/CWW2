import axios from 'axios';

const baseURL = 'http://localhost:3000/words/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.log(error);
  });

export const api = {
  getWord: handleError(async id => {
    try {
        const res = await axios.get(baseURL + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
  }),
  getWords: handleError(async () => {
    try{
        const res = await axios.get(baseURL);
        return res.data;
    } catch (error) {
        console.log(error);
    }
  }),
  deleteWord: handleError(async id => {
    try{
        const res = await axios.delete(baseURL + id);
        return res.data;
    } catch (error) {
        console.log(error);
    }
  }),
  createWord: handleError(async payload => {
    try{
        const res = await axios.post(baseURL, payload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
  }),
  updateWord: handleError(async payload => {
    try{
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
  })
};