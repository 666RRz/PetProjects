let objects = [
  { name: "Василий", surname: "Васильев" },
  { name: "Иван", surname: "Иванов" },
  { name: "Пётр", surname: "Петров" },
];

function filter(object, key, value) {
  let newOne = [];
  for (let i = 0; i < object.length; ++i) {
    if (object[i][key] === value) newOne.push(object[i]);
  }
  return newOne;
}
let result = filter(objects, "name", "Пётр");
console.log(result);
