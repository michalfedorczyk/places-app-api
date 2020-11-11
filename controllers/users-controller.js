const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Michał M. Fedorczyk",
    email: "test@test.pl",
    password: "pieseafafsał",
  },
  {
    id: "u2",
    name: "Michał M. ",
    email: "test@st.pl",
    password: "piesedfasfł",
  },
  {
    id: "u3",
    name: "Michał Gorczyk",
    email: "test@tst.pl",
    password: "piesfafdafł",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const loggedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!loggedUser || loggedUser.password !== password) {
    throw new HttpError("Could not found user or wrong credentials.", 401);
  }
  res.json({ message: "Logged in!" });
};

module.exports = { getUsers, login, signup };
