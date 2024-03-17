// ЗадачаN2

let first = 4.345;
let second = 2.12743;

let presition = 2;

let resultA = Math.round(first * Math.pow(10, presition));
let resultB = Math.round(second * Math.pow(10, presition));

console.log("Полученные числа");
console.log(resultA);
console.log(resultB);

console.log("Сравнения:");

console.log(resultA === resultB);
console.log(resultA !== resultB);
console.log(resultA > resultB);
console.log(resultA < resultB);
