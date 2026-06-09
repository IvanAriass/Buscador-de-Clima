import { formatTemp } from "../../helpers";
import { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weater: Weather;
};

export default function WeatherDetail({ weater }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2>{weater.name}</h2>
      <p className={styles.current}>{formatTemp(weater.main.temp)}ºC</p>
      <div className={styles.temperatures}>
        <p>Mín <span>{formatTemp(weater.main.temp_min)}ºC</span></p>
        <p>Máx <span>{formatTemp(weater.main.temp_max)}ºC</span></p>
      </div>
    </div>
  );
}
