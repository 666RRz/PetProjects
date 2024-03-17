// Массив с почтовыми адресами:
let whiteList = [
  "my-email@gmail.ru",
  "jsfunc@mail.ru",
  "annavkmail@vk.ru",
  "fullname@skill.ru",
  "goodday@day.ru",
];
// Массив с почтовыми адресами в чёрном списке:
let blackList = ["jsfunc@mail.ru", "goodday@day.ru"];

function filter(white, black) {
  let resultList = [];
  for (let i = 0; i < white.length; ++i) {
    if (black.includes(white[i])) {
      continue;
    } else {
      resultList.push(white[i]);
    }
  }
  return resultList;
}
let result = filter(whiteList, blackList);

console.log(result);
