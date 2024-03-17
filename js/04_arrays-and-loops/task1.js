let a = [];

let n = -3;
let m = -10;

let count = 42;

for (i = 0; i < count; ++i) {
  a.push(Math.round(Math.random() * (m - n)));
}

console.log(a);
