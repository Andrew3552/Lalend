export function transliterateAndAppendRandom(text) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d",
    е: "e", ё: "e", ж: "zh", з: "z", и: "i",
    й: "y", к: "k", л: "l", м: "m", н: "n",
    о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
    ш: "sh", щ: "sch", ь: "", ы: "y", ъ: "",
    э: "e", ю: "yu", я: "ya",

    // латиница
    a: "a", b: "b", c: "c", d: "d", e: "e",
    f: "f", g: "g", h: "h", i: "i", j: "j",
    k: "k", l: "l", m: "m", n: "n", o: "o",
    p: "p", q: "q", r: "r", s: "s", t: "t",
    u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",
    " ": "",
  };

  const domains = ["gmail.com", "yandex.ru", "mail.ru", "rambler.ru"];

  const translit = text
    .toLowerCase()
    .split("")
    .map((char) => map[char] || char)
    .join("");

  const randomNumber = Math.floor(Math.random() * 1000);
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  return `${translit}${randomNumber}@${randomDomain}`;
}
