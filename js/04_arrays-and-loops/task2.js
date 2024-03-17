let arr = [];
let count = 10;

for (let i = 1; i < count + 1; ++i) {
  arr.push(i);
}

console.log("Упорядоченный массив: " + arr);

for (let x = 0; x < count; ++x) {
  let j = Math.floor(Math.random() * arr.length);
  let temp = arr[x];
  arr[x] = arr[j];
  arr[j] = temp;
}

console.log("Перемешанный массив: " + arr);
