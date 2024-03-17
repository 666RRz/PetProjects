const { existsSync, readFileSync, writeFileSync } = require("fs");
const { createServer } = require("http");

const DB_FILE = process.env.DB_FILE || "./db.json";
const PORT = process.env.PORT || 3000;
const URI_PREFIX = "/api/students";

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

function drainJson(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
}

function makeStudentFromData(data) {
  const errors = [];

  function asString(v) {
    return (v && String(v).trim()) || "";
  }

  const student = {
    name: asString(data.name),
    surname: asString(data.surname),
    lastname: asString(data.lastname),
    birthday: asString(data.birthday),
    studyStart: asString(data.studyStart),
    endStudy: asString(data.endStudy),
    faculty: asString(data.faculty),
    gender: asString(data.gender),
    about: asString(data.about),
  };

  if (!student.name) errors.push({ field: "name", message: "Не указано имя" });
  if (!student.gender)
    errors.push({
      field: "gender",
      message: "Не указан пол (мужской/женский)",
    });
  if (!student.endStudy)
    errors.push({ field: "endStudy", message: "Не указан конец обучения" });

  if (errors.length) throw new ApiError(422, { errors });

  return student;
}

function getStudentList(params = {}) {
  const students = JSON.parse(readFileSync(DB_FILE) || "[]");
  if (params.search) {
    const search = params.search.trim().toLowerCase();
    return students.filter((student) =>
      [
        student.name,
        student.surname,
        student.lastname,
        student.birthday,
        student.studyStart,
        student.endStudy,
        student.faculty,
      ].some((str) => str.toLowerCase().includes(search))
    );
  }
  return students;
}

function createStudent(data) {
  const newItem = makeStudentFromData(data);
  newItem.id = Date.now().toString();
  newItem.createdAt = newItem.updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify([...getStudentList(), newItem]), {
    encoding: "utf8",
  });
  return newItem;
}

function getStudent(itemId) {
  const student = getStudentList().find(({ id }) => id === itemId);
  if (!student) throw new ApiError(404, { message: "Student Not Found" });
  return student;
}

function updateStudent(itemId, data) {
  const students = getStudentList();
  const itemIndex = students.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1)
    throw new ApiError(404, { message: "Student Not Found" });
  Object.assign(
    students[itemIndex],
    makeStudentFromData({ ...students[itemIndex], ...data })
  );
  students[itemIndex].updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify(students), { encoding: "utf8" });
  return students[itemIndex];
}

function deleteStudent(itemId) {
  const students = getStudentList();
  const itemIndex = students.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1)
    throw new ApiError(404, { message: "Student Not Found" });
  students.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(students), { encoding: "utf8" });
  return {};
}

if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, "[]", { encoding: "utf8" });

module.exports = createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  const [uri, query] = req.url.substr(URI_PREFIX.length).split("?");
  const queryParams = {};

  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }

  try {
    const body = await (async () => {
      if (uri === "" || uri === "/") {
        if (req.method === "GET") return getStudentList(queryParams);
        if (req.method === "POST") {
          const createdItem = createStudent(await drainJson(req));
          res.statusCode = 201;
          res.setHeader("Access-Control-Expose-Headers", "Location");
          res.setHeader("Location", `${URI_PREFIX}/${createdItem.id}`);
          return createdItem;
        }
      } else {
        const itemId = uri.substr(1);
        if (req.method === "GET") return getStudent(itemId);
        if (req.method === "PATCH")
          return updateStudent(itemId, await drainJson(req));
        if (req.method === "DELETE") return deleteStudent(itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Server Error" }));
      console.error(err);
    }
  }
})
  .on("listening", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        `Сервер Students запущен. Вы можете использовать его по адресу http://localhost:${PORT}`
      );
      console.log("Нажмите CTRL+C, чтобы остановить сервер");
      console.log("Доступные методы:");
      console.log(
        `GET ${URI_PREFIX} - получить список студентов, в query параметр search можно передать поисковый запрос`
      );
      console.log(
        `POST ${URI_PREFIX} - создать студента, в теле запроса нужно передать объект { name: string, surname: string, lastname: string, birthday: string, studyStart: string, endStudy: string, faculty: string, about:string}`
      );
      console.log(`GET ${URI_PREFIX}/{id} - получить студента по его ID`);
      console.log(
        `PATCH ${URI_PREFIX}/{id} - изменить студента с ID, в теле запроса нужно передать объект { name?: string, surname?: string, lastname?: string, birthday?: string, studyStart?: string, endStudy?: string, faculty?: string, about?: string}`
      );
      console.log(`DELETE ${URI_PREFIX}/{id} - удалить студента по ID`);
    }
  })
  .listen(PORT);
