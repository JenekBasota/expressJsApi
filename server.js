const express = require("express");
const app = express();
const port = 3000;

let arr = ["first", "second", "third"];

app.use(express.json());

app.post("/weather", (req, res) => {
  if (!req.body) {
    return res.status(400).send("The field is empty");
  } else if (req.body.index < 0 || req.body.index > arr.length) {
    return res.status(400).send("Incorrect range of numbers");
  }
  arr.push(req.body.item);

  res.send(arr);
});

app.get("/weather", (req, res) => {
  res.send(arr);
});

app.delete("/weather", (req, res) => {
  if (!req.body) {
    return res.status(400).send("The field is empty");
  } else if (req.body.index < 0 || req.body.index > arr.length) {
    return res.status(400).send("Incorrect range of numbers");
  }

  arr.splice(req.body.index, 1);

  res.send(arr);
});

app.post("/weather/update", (req, res) => {
  if (!req.body) {
    return res.status(400).send("The field is empty");
  } else if (
    isNaN(req.body.index) ||
    req.body.index < 0 ||
    req.body.index > arr.length
  ) {
    return res.status(400).send("Incorrect range of numbers");
  }

  arr[req.body.index] = req.body.item;

  res.send(arr);
});

app.get("/weather/getByIndex", (req, res) => {
  if (!req.body) {
    return res.status(400).send("The field is empty");
  } else if (
    isNaN(req.body.index) ||
    req.body.index < 0 ||
    req.body.index > arr.length
  ) {
    return res.status(400).send("Incorrect range of numbers");
  }
  res.send(arr[req.body.index]);
});

app.get("/weather/getByName", (req, res) => {
  if (!req.body.item) {
    return res.status(400).send("The field is empty");
  }

  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === req.body.item) {
      counter += 1;
    }
  }

  res.send(`Item '${req.body.item}' found ${counter} times.`);
});

app.get("/weather/getAll", (req, res) => {
  if (req.body.strategy === undefined || req.body.strategy == null) {
    return res.send(arr);
  }

  const strategy = parseInt(req.body.strategy, 10);

  if (strategy === 1) {
    const sortedArr = [...arr].sort();
    return res.send(sortedArr);
  } else if (strategy === -1) {
    const sortedArr = [...arr].sort().reverse();
    return res.send(sortedArr);
  } else {
    return res.status(400).send("Invalid value of the strategy parameter");
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
