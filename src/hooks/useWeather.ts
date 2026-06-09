import axios from "axios";
import { z } from "zod";
// import { InferOutput, number, object, parse, string } from "valibot";
import { useMemo, useState } from "react";
import { SearchType } from "../types";

// Type Guard o Assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });
// type Weather = InferOutput<typeof WeatherSchema>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setNotFound(false);
    setWeather(initialState);
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios.get(geoUrl);

      // Comprobar si existe
      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${appId}`;

      // Castear el type
      // const { data: weatherData } = await axios<Weather>(weatherUrl);
      // console.log(weatherData.name);
      // console.log(weatherData.main.temp);

      // Type Guard
      // const { data: weatherData } = await axios.get(weatherUrl);
      // const result = isWeatherResponse(weatherData);

      // if (result) {
      // } else {
      //   console.log("Respuesta mal formada");
      // }

      // Zod
      const { data: weatherData } = await axios.get(weatherUrl);
      const result = Weather.safeParse(weatherData);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log("Respuesta mal formada");
      }

      // Valibot
      // const { data: weatherData } = await axios.get(weatherUrl);
      // const result = parse(WeatherSchema, weatherData);
      // if (result) {
      //   console.log(result.name);
      //   console.log(result.main.temp);
      // } else {
      //   console.log("Respuesta mal formada");
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name !== "", [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
}
