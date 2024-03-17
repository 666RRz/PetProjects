// Обязательная часть задания
let user1 = {
  name: "Игорь",
  age: 17,
};

let user2 = {
  name: "Оля",
  age: 21,
};

function getOlderUser(userOne, userTwo) {
  if (userOne.age > userTwo.age) {
    console.log(userOne.name);
  } else if (userOne.age <= userTwo.age) {
    console.log(userTwo.name);
  }
}

getOlderUser(user1, user2);

console.log(
  "Task 2 --------------------------------------------------------------------------------------------------------"
);

let allUsers = [
  { name: "Валя", age: 11 },
  { name: "Таня", age: 24 },
  { name: "Рома", age: 21 },
  { name: "Надя", age: 34 },
  { name: "Антон", age: 7 },
];

let maxAge = allUsers[0].age;
let maxAgeUser = allUsers[0];

for (let i = 1; i < allUsers.length; i++) {
  if (allUsers[i].age > maxAge) {
    maxAge = allUsers[i].age;
    maxAgeUser = allUsers[i];
  }
}

console.log("Имя человека с самым большим возрастом:", maxAgeUser.name);
console.log("Возраст:", maxAgeUser.age);
