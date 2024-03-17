function createStudentCard(obj) {
  let div = document.createElement("div");
  document.body.append(div);
  let h2 = document.createElement("h2");
  h2.textContent = obj.name;
  div.append(h2);
  let span = document.createElement("span");
  span.textContent = `Возраст: ${obj.age} лет`;
  div.append(span);
}

let studentObj = {
  name: "Игорь",
  age: 17,
};

createStudentCard(studentObj);
