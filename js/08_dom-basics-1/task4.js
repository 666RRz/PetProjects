let allStudents = [
  { name: "Валя", age: 11 },
  { name: "Таня", age: 24 },
  { name: "Рома", age: 21 },
  { name: "Надя", age: 34 },
  { name: "Антон", age: 7 },
];

function createButton() {
  let button = document.createElement("button");
  button.textContent = "Показать список";
  document.body.append(button);
  button.classList.add("button");
  button.addEventListener("click", onClick);
  button.addEventListener("click", createStudentList(allStudents));
}

function createStudentList(listArr) {
  let ul = document.createElement("ul");
  document.body.append(ul);
  for (let i = 0; i < listArr.length; ++i) {
    let li = document.createElement("li");
    ul.append(li);
    let h2 = document.createElement("h2");
    h2.textContent = listArr[i].name;
    li.append(h2);
    let span = document.createElement("span");
    span.textContent = `Возраст: ${listArr[i].age} лет`;
    li.append(span);
    ul.classList.add("display-none");
  }
}

function onClick() {
  let q = document.querySelector("ul");
  if (q.classList.contains("display-none")) {
    q.classList.remove("display-none");
    this.textContent = "Скрыть список";
  } else {
    q.classList.add("display-none");
    this.textContent = "Показать список";
  }
}

createButton();
