function getAge(year) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let myAge = currentYear - year;
  return myAge;
}

getAge(1995);
