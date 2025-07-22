import axios from "axios";

export const getCountryCallingCode = async () => {
  try {
    const res = await axios.get("https://ipapi.co/json/");
    return res.data.country_calling_code || "+1";
  } catch (e) {
    console.error("Ошибка при получении GEO:", e);
    return "+1";
  }
};