import axios from 'axios';
const apiProd = 'http://164.92.67.83:4000'
const apiLocal = 'http://localhost:4000'
const realPath = apiProd;

export const getCamFourFiles = async (camStr) => {
  let camForFiles = null;
    await axios({
        method:'post',
        url: `${realPath}/wximgs/readCamImgs`,
        data: {camStr},
      }).then(function (response) {
        camForFiles = response.data;
        console.log(camForFiles);
      }).catch(function (error) {
        camForFiles = null;
        console.log('errors', error)
      })

    return camForFiles;
}

export const getReadImgfile = async (path) => {
  let weatherData = null;
    await axios({
        method:'post',
        url: `${realPath}/wximgs/readImgfile`,
        data: {path},
      }).then(function (response) {
        weatherData = response.data;
        console.log(weatherData);
      }).catch(function (error) {
        weatherData = null;
        console.log('errors', error)
      })

    return weatherData;
}

export const getWeatherData = async () => {
    let weatherData = null;
    await axios({
        method:'post',
        url: `${realPath}/wximgs/readWeatherData`,
        data: {},
      }).then(function (response) {
        weatherData = response.data;
      }).catch(function (error) {
        weatherData = null;
        console.log('errors', error)
      })

    return weatherData;
}

export const getWeatherTrends = async () => {
    let trendsData = [];
    await axios({
        method:'post',
        url: `${realPath}/wximgs/readWeadtheTrends`,
        data: {},
      }).then(function (response) {
        trendsData = response.data;
      }).catch(function (error) {
        trendsData = [];
        console.log('errors', error)
      })

    return trendsData;
}