let password = "_";

let x = "-";
let y = "_";

if (password.length >= 4 && (password.includes(y) || password.includes(x))) {
  console.log("Пароль надежный");
} else {
  console.log("Пароль ненадежный");
}
