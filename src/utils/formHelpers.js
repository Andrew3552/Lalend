// Получение параметра из URL
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Получить IP и город
export async function getIpData() {
  try {
    const { ip, country, city } = await (
      await fetch("https://ipinfo.io/json")
    ).json();
    return { ip, countryCode: country.toLowerCase(), city };
  } catch (e) {
    console.warn("Ошибка получения IP:", e);
    return { ip: "111.111.111.111", countryCode: "", city: "" };
  }
}

// Генерация уникального eventID
export function createEventID() {
  const eID = new Date().getTime();
  document.cookie = `eventID=${eID}; path=/`;
  return eID;
}
