import { useState, ReactNode } from "react";
import { useQuery } from 'react-query';
import appid from './appid.txt';
import cities from './city.json';
import languages from './language.json';
import './Weather.css';

const cityArray: ReactNode[] = [];
for (let i = 0; i < cities.length; i++) {
  const option: unknown = <option value={cities[i].name} key={cities[i].name}>{cities[i].name}</option>;
  cityArray.push(option as ReactNode);
}

const languageArray: ReactNode[] = [];
for (let i = 0; i < languages.length; i++) {
  const option: unknown = <option value={languages[i].abbr} key={languages[i].abbr}>{languages[i].lang}</option>;
  languageArray.push(option as ReactNode);
}

const getAppid = async (): Promise<string> => {
  const data = await fetch(appid);
  return data.text();
};

type WeatherProps = {
  cityProps: string,
  languageProps: string
};

export default function Weather({cityProps, languageProps}: WeatherProps) {
  const [city, setCity] = useState(cityProps);
  const [language, setLanguage] = useState(languageProps);

  const fetchWeather = async () => {
    const appid = await getAppid();
    const longitude = getCoordinate().lon;
    const latitude = getCoordinate().lat;
    const language = getLanguage();
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${language}&units=metric&appid=${appid}`);
    if (res.ok){ return res.json(); }
    throw new Error(res.statusText);
  };

  const getCoordinate = () => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name === city) {
        return cities[i].coord;
      }
    }
    return cities[0].coord;
  };

  const getLanguage = (): string => {
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].abbr === language) {
        return languages[i].abbr;
      }
    }
    return languageProps;
  };

  const cityChange = () => {
    const citySelect = document.getElementById('city_select') as HTMLSelectElement;
    setCity(citySelect.value);
    alert('city changed');
  }

  const languageChange = () => {
    const langSelect = document.getElementById('lang_select') as HTMLSelectElement;
    setLanguage(langSelect.value);
    alert('language changed');
  }

  const { data } = useQuery('weather', fetchWeather);

  return (
    <div className="weather">
      <select id="city_select" onChange={cityChange}>
        {cityArray}
      </select>
      <select id="lang_select" onChange={languageChange}>
        {languageArray}
      </select>
      <h1>{data?.name}</h1>
      <figure>
        <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
        <p>{data?.weather?.[0]?.description}</p>
        <p>Temperature: {data?.main?.temp}°</p>
        <p>Feels like: {data?.main?.feels_like}°</p>
        <p>Pressure: {data?.main?.pressure} hPa</p>
        <p>Humidity: {data?.main?.humidity} %</p>
        <p>Wind speed: {data?.wind.speed} m/s</p>
        <p>Min: {data?.main?.temp_min}° ~ Max: {data?.main?.temp_max}°</p>
      </figure>
    </div>
  );
}
