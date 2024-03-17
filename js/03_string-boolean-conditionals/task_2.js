let userName = "ивАн";
let userSurname = "шмЕлЕв";

let firstLetter = userName.substring(0, 1);
let leastName = userName.substring(1);

let first = firstLetter.toUpperCase();
let second = leastName.toLowerCase();

//

let firstLetterSurname = userSurname.substring(0, 1);
let leastNameSurname = userSurname.substring(1);

let finalLetterSurname = firstLetterSurname.toUpperCase();
let finalWordSurname = leastNameSurname.toUpperCase();

let firstSurname = first + second;
let secondSurname = finalLetterSurname + finalWordSurname;

console.log(
  firstSurname === userName && secondSurname === userSurname
    ? "Имя осталось без изменений"
    : "Имя было преобразовано"
);
