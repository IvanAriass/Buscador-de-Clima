export const formatTemp = (temp: number) : number=> {
    const kelvin = 273.15;
    const celsius = (temp - kelvin);
    return parseInt(celsius.toString());
};