// ЗадачаN3

let n = -1000;
let m = 1000;

let range = Math.abs(n - m);

let NumberInRange = Math.round(Math.random() * range);

let min = Math.min(n, m);

console.log("Полученные сравнения:");

console.log(n);
console.log(m);

console.log("Рандомное число: ");

console.log(min + NumberInRange);

console.log(n > m);
console.log(n < m);
console.log(n >= m);
console.log(n <= m);
console.log(n === m);
console.log(n !== m);
