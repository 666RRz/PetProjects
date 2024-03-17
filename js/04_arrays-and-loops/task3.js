let arr = [];
let count = 10;

for (let i = 0; i < count; ++i) {
  arr.push(i);
  let j = Math.floor(Math.random() * arr.length);
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(arr);

let n = 5;

let found = false;

let finder = [];

for (let x = 0; x < arr.length; ++x) {
  if (arr[x] == n) {
    console.log("индекс - " + x);
    found = true;
    break;
  } else {
    console.log("индекс не найден");
  }
}
