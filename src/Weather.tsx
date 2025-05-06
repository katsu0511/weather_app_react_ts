import { useState } from "react";
import { useQuery } from 'react-query';
import appid from './appid.txt';
import cities from './city.json';
import languages from './language.json';
// import './Weather.css';

const cityArray = [];
for (let i = 0; i < cities.length; i++) {
  cityArray.push(<option value={cities[i].name} key={cities[i].name}>{cities[i].name}</option>);
}

const languageArray = [];
for (let i = 0; i < languages.length; i++) {
  languageArray.push(<option value={languages[i].abbr} key={languages[i].abbr}>{languages[i].lang}</option>);
}

const getAppid = async () => {
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

  return (
    <div className="weather">
      <p>Weather</p>
    </div>
  );
}
